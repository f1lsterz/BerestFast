import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";

export type CafeDish = {
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  size?: string;
  subcategory: string;
};

export type CafeCategory = {
  name: string;
  dishes: CafeDish[];
};

export type OpeningHours = {
  day: string;
  open: string | null;
  close: string | null;
};

export type AddressInfo = {
  text: string;
  mapUrl: string;
};

const categories = [
  {
    name: "Меню",
    url: "https://central-park253.choiceqr.com/section:menyu",
  },
  {
    name: "Роли",
    url: "https://central-park253.choiceqr.com/section:roli",
  },
  {
    name: "Гарячі напої",
    url: "https://central-park253.choiceqr.com/section:garyachi-napoyi",
  },
  {
    name: "Безалкогольні напої",
    url: "https://central-park253.choiceqr.com/section:bezalkogolni-napoyi",
  },
  {
    name: "Пиво",
    url: "https://central-park253.choiceqr.com/section:pivo",
  },
  {
    name: "Алкогольні напої",
    url: "https://central-park253.choiceqr.com/section:alkogolni-napoyi",
  },
];

@Injectable()
export class CentralParkParserService {
  private launchOptions = {
    headless: false,
    args: ["--no-sandbox", "--start-maximized"],
    defaultViewport: null as any,
  };

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async parseCategory(
    browser: puppeteer.Browser,
    url: string
  ): Promise<CafeDish[]> {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay(2000);

    let subcategory = "—";

    const subcategoryElement = await page.$(
      '[class*="DefaultView_categoryName"]'
    );
    if (subcategoryElement) {
      const rawText = await page.evaluate(
        (el) => el.textContent,
        subcategoryElement
      );
      subcategory =
        rawText
          ?.trim()
          .toLowerCase()
          .replace(/^./, (c) => c.toUpperCase()) || "—";
    }

    const dishes = await page.$$eval(
      '[class*="DefaultView_categoryMenu"] > div',
      (els, subcat) =>
        Array.from(els).map((dish) => {
          const text = (sel: string) =>
            dish.querySelector(sel)?.textContent?.trim() || "—";
          const title = text('[class*="menu-item-title"]');
          const price =
            parseFloat(
              text('[class*="menu-item-price"]')
                .replace(/\s|₴|uah/gi, "")
                .replace(",", ".")
            ) || 0;
          const description =
            dish
              .querySelector('[class*="menu-item-description"]')
              ?.textContent?.trim()
              .replace(/\n+/g, "") || "";
          const size =
            Array.from(
              dish.querySelectorAll('[class*="menu-label"]'),
              (el) => el.textContent?.trim() || ""
            )
              .find((t) => /^\d+(?:г|мл)$/i.test(t))
              ?.toLowerCase() || "";
          const imageUrl =
            dish.querySelector("picture img")?.getAttribute("src") || undefined;
          return {
            title,
            price,
            description,
            size,
            imageUrl,
            subcategory: subcat,
          };
        }),
      subcategory
    );

    await page.close();
    return dishes;
  }

  async parseMenu(): Promise<CafeCategory[]> {
    const browser = await puppeteer.launch(this.launchOptions);
    const result: CafeCategory[] = [];

    for (const { name, url } of categories) {
      const dishes = await this.parseCategory(browser, url);
      result.push({ name, dishes });
    }

    await browser.close();
    return result;
  }

  async parseLogo(): Promise<string> {
    const browser = await puppeteer.launch(this.launchOptions);
    const page = await browser.newPage();
    await page.goto(categories[0].url, { waitUntil: "networkidle2" });
    await this.delay(500);

    const logoUrl = await page.$eval('div[class*="styles_logo"]', (el) => {
      const bg = (el as HTMLElement).style.backgroundImage;
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : "";
    });

    await browser.close();
    return logoUrl;
  }

  async parseAddress(): Promise<AddressInfo> {
    const browser = await puppeteer.launch(this.launchOptions);
    const page = await browser.newPage();
    await page.goto(categories[0].url, { waitUntil: "networkidle2" });
    await this.delay(500);

    const mapUrl = await page.$eval(
      'a[href*="maps.google.com"]',
      (a: HTMLAnchorElement) => a.href
    );

    const text = await page.$eval(
      'a[href*="maps.google.com"] > div:nth-child(2)',
      (el: HTMLElement) => el.textContent?.trim() || ""
    );

    await browser.close();
    return { text, mapUrl };
  }

  async parseOpeningHours(): Promise<OpeningHours[]> {
    const browser = await puppeteer.launch(this.launchOptions);
    const page = await browser.newPage();
    await page.goto(categories[0].url, { waitUntil: "networkidle2" });
    await this.delay(500);

    const rawTime = await page.$eval(
      'div[class*="styles_workTimeValue"] > div',
      (el: HTMLElement) => el.textContent?.trim() || ""
    );

    await browser.close();

    const [open, close] = rawTime.split(/–|-/).map((s) => s.trim());

    const days = [
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четвер",
      "Пʼятниця",
      "Субота",
      "Неділя",
    ];
    return days.map((day) => ({
      day,
      open: open || null,
      close: close || null,
    }));
  }
}
