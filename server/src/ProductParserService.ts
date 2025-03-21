import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export interface ParsedProduct {
  name: string;
  quantity: string;
}

@Injectable()
export class ProductParserService {
  async parseAllProducts(): Promise<ParsedProduct[]> {
    const baseUrl =
      "https://www.atbmarket.com/shop/catalog/load-products?type=economy&shop_id=101332&store_id=1154&offset={offset}";
    let offset = 0;
    const step = 12;
    const allProducts: ParsedProduct[] = [];

    while (true) {
      const url = baseUrl.replace("{offset}", offset.toString());
      const html = await this.fetchPageHtml(url);
      const products = this.parseProducts(html);
      console.log(url);
      if (products.length === 0) {
        console.log("\nЗбір продуктів завершено!");
        break;
      }

      if (offset > 100) {
        break;
      }

      allProducts.push(...products);
      console.log(
        `\nЗібрано ${products.length} продуктів з offset=${offset} (всього: ${allProducts.length})`
      );
      offset += step;
    }

    return allProducts;
  }

  async fetchPageHtml(url: string): Promise<string> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".swiper-slide", { timeout: 500 });
    const html = await page.content();
    await browser.close();
    return html;
  }

  parseProducts(html: string): ParsedProduct[] {
    const $ = cheerio.load(html);
    const productElements = $(".swiper-slide");
    const products: ParsedProduct[] = [];

    productElements.each((_, elem) => {
      const nameElement = $(elem).find(".catalog-item__title a");
      const name = nameElement.length
        ? nameElement.text().trim()
        : "Назва не знайдена";

      let grams: number | null = null;
      let unit = "шт";
      const addToCartEl = $(elem).find(".b-addToCart");

      if (addToCartEl.length) {
        const dataWeight = addToCartEl.attr("data-weight");
        const dataMeasure = addToCartEl.attr("data-current-measure");

        if (dataWeight && dataMeasure === "weight") {
          grams = parseFloat(dataWeight) * 1000;
          unit = "г";
        } else if (dataWeight && dataMeasure === "unit") {
          unit = "шт";
        }
      }

      if (grams === null) {
        // Якщо вага не визначена через атрибути – намагаємось отримати значення з назви
        const regex = /(\d+(?:\.\d+)?)\s*(г|g|кг|kg|л|l|мл|ml)/i;
        const match = name.match(regex);
        if (match) {
          let value = parseFloat(match[1]);
          const unitMatch = match[2].toLowerCase();

          if (["кг", "kg"].includes(unitMatch)) {
            value *= 1000;
            unit = "г";
          } else if (["л", "l"].includes(unitMatch)) {
            value *= 1000;
            unit = "мл";
          } else if (["г", "g"].includes(unitMatch)) {
            unit = "г";
          } else if (["мл", "ml"].includes(unitMatch)) {
            unit = "мл";
          }
          grams = value;
        }
      }

      products.push({
        name,
        quantity: `${grams !== null ? grams : "N/A"} ${unit}`,
      });
    });

    return products;
  }

  /**
   * Розбиває продукти на категорії згідно з ключовими словами в назві.
   */
  categorizeProducts(
    products: ParsedProduct[]
  ): Record<string, ParsedProduct[]> {
    const categories: Record<string, string[]> = {
      meat: [
        "курятина",
        "свинина",
        "яловичина",
        "ковбаса",
        "фарш",
        "м’ясо",
        "куриця",
        "індичка",
      ],
      vegetables: [
        "картопля",
        "морква",
        "цибуля",
        "помідор",
        "капуста",
        "перець",
        "огірок",
        "буряк",
        "кабачок",
      ],
      grains: ["рис", "гречка", "макарони", "пшоно", "вівсянка", "перловка"],
      dairy: ["молоко", "сир", "сметана", "масло", "йогурт", "вершки"],
      spices: ["сіль", "перець", "спеції", "приправа"],
      other: ["яйця", "олія", "цукор", "борошно", "хліб"],
    };

    const categorizedProducts: Record<string, ParsedProduct[]> = {};
    // Ініціалізуємо масиви для кожної категорії
    for (const key of Object.keys(categories)) {
      categorizedProducts[key] = [];
    }

    products.forEach((product) => {
      const lowerName = product.name.toLowerCase();
      let categorized = false;
      for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some((keyword) => lowerName.includes(keyword))) {
          categorizedProducts[cat].push(product);
          categorized = true;
          break;
        }
      }
      if (!categorized) {
        categorizedProducts["other"].push(product);
      }
    });

    return categorizedProducts;
  }
}
