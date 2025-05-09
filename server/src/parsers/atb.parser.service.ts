import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";

export type ScrapedProduct = {
  title: string;
  priceNew: string;
  priceOld: string;
  image: string;
};

export type Category = {
  name: string;
  url: string;
};

@Injectable()
export class AtbParserService {
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async parsePage(url: string): Promise<ScrapedProduct[]> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.delay(2000);
    }

    await this.delay(5000);
    await page.waitForSelector("article.catalog-item", { timeout: 60000 });

    const items = await page.$$("article.catalog-item");
    const products: ScrapedProduct[] = [];

    for (const item of items) {
      const title = await item
        .$eval(".catalog-item__title", (el) => el.textContent?.trim() ?? "—")
        .catch(() => "—");

      const priceNew = await item
        .$eval(".product-price__top", (el) => el.getAttribute("value") ?? "—")
        .catch(() => "—");

      const priceOld = await item
        .$eval(
          ".product-price__bottom",
          (el) => el.getAttribute("value") ?? "—"
        )
        .catch(() => "—");

      const image = await item
        .$eval(
          ".catalog-item__photo img",
          (el) => el.getAttribute("src") ?? "—"
        )
        .catch(() => "—");

      products.push({ title, priceNew, priceOld, image });
    }

    await browser.close();
    return products;
  }

  async parseCategories(): Promise<Category[]> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.atbmarket.com/catalog", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector(
      "ul.category-menu li.category-menu__item a.category-menu__link-wrap"
    );
    const categories = await page.$$eval(
      "ul.category-menu li.category-menu__item a.category-menu__link-wrap",
      (links) =>
        links.map((a) => ({
          name: a.textContent?.trim() ?? "—",
          url: "https://www.atbmarket.com" + (a.getAttribute("href") ?? ""),
        }))
    );
    await browser.close();
    return categories;
  }

  async parseCategoryAllPages(url: string): Promise<ScrapedProduct[]> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const firstPageUrl = `${url}${url.includes("?") ? "&" : "?"}page=1`;
    await page.goto(firstPageUrl, { waitUntil: "domcontentloaded" });

    let totalPages = 1; // За замовчуванням — 1 сторінка

    // Перевіряємо, чи є пагінація
    const paginationExists = await page.$(
      "nav.product-pagination__nav ul.product-pagination__list"
    );

    if (paginationExists) {
      // Якщо є пагінація — шукаємо останню сторінку
      totalPages = await page.$$eval(
        "nav.product-pagination__nav ul.product-pagination__list li.product-pagination__item",
        (items) =>
          items
            .map((li) => li.textContent?.trim() ?? "")
            .filter((txt) => /^\d+$/.test(txt))
            .map(Number)
            .reduce((max, n) => Math.max(max, n), 1)
      );
    }

    const allProducts: ScrapedProduct[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const pageUrl = `${url}${url.includes("?") ? "&" : "?"}page=${i}`;
      const products = await this.parsePage(pageUrl);
      allProducts.push(...products);
    }

    await browser.close();
    return allProducts;
  }

  async parseAllCategories(): Promise<Record<string, ScrapedProduct[]>> {
    const cats = await this.parseCategories();
    const result: Record<string, ScrapedProduct[]> = {};
    for (const { name, url } of cats) {
      result[name] = await this.parseCategoryAllPages(url);
    }
    return result;
  }
}
