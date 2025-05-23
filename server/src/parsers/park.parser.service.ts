import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { BaseParserService } from "./base.parser.service";
import { CafeCategory, CafeDish } from "./types/menu";

export const categories = [
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
export class CentralParkParserService extends BaseParserService {
  private async parseCategory(
    browser: puppeteer.Browser,
    url: string
  ): Promise<CafeDish[]> {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay(2000);

    await this.clickAllButtonsByText(page, "Показати доповнення");

    const dishes: CafeDish[] = await page.$$eval(
      '[class*="DefaultView_categoryWrapper"]',
      (wrappers) => {
        const out: CafeDish[] = [];

        for (const wrapper of wrappers) {
          const subcatEl = wrapper.querySelector(
            '[class*="DefaultView_categoryName"]'
          );
          const menuEl = wrapper.querySelector(
            '[class*="DefaultView_categoryMenu"]'
          );
          const currentSubcat =
            subcatEl?.textContent
              ?.trim()
              ?.toLowerCase()
              .replace(/^\p{L}/u, (c) => c.toUpperCase()) || "—";

          if (!menuEl) continue;

          const items = Array.from(menuEl.children);

          for (const el of items) {
            const hasTitle = !!el.querySelector('[class*="menu-item-title"]');
            if (!hasTitle) continue;

            const dishEl = el as HTMLElement;
            const q = (sel: string) =>
              dishEl.querySelector(sel)?.textContent?.trim() || "—";

            const title = q('[class*="menu-item-title"]')
              .toLowerCase()
              .replace(/^\p{L}/u, (c) => c.toUpperCase());
            const price =
              parseFloat(
                q('[class*="menu-item-price"]')
                  .replace(/\s|₴|uah/gi, "")
                  .replace(",", ".")
              ) || 0;
            const description =
              dishEl
                .querySelector('[class*="menu-item-description"]')
                ?.textContent?.trim()
                .replace(/\n+/g, "") ?? "";
            const size =
              Array.from(
                dishEl.querySelectorAll('[class*="menu-label"]'),
                (e) => e.textContent?.trim()
              )
                .find((t) => t && /^\d+(?:г|мл)$/i.test(t))
                ?.toLowerCase() ?? null;
            const imageUrl =
              dishEl.querySelector("picture img")?.getAttribute("src") ?? null;

            const addons: { title: string; price: number }[] = [];
            dishEl
              .querySelectorAll('div[class*="menuItemOptionsItem"]')
              .forEach((optEl) => {
                const nameEl = optEl.firstElementChild as HTMLElement | null;
                const priceEl =
                  nameEl?.nextElementSibling as HTMLElement | null;
                if (nameEl && priceEl) {
                  const addonName = nameEl.textContent?.trim() || "";
                  const rawP = priceEl.textContent?.trim() || "";
                  const addonPrice =
                    parseFloat(rawP.replace(/[^\d,]/g, "").replace(",", ".")) ||
                    0;
                  addons.push({ title: addonName, price: addonPrice });
                }
              });

            out.push({
              title,
              price,
              description,
              size,
              imageUrl,
              subcategory: currentSubcat,
              addons,
            });
          }
        }

        return out;
      }
    );

    await page.close();
    return dishes;
  }

  async parseMenu(): Promise<CafeCategory[]> {
    const browser = await this.launch();
    const result: CafeCategory[] = [];

    for (const { name, url } of categories) {
      const dishes = await this.parseCategory(browser, url);
      result.push({ name, dishes });
    }

    await browser.close();
    return result;
  }
}
