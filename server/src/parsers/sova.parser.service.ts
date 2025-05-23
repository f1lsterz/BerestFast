import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { BaseParserService } from "./base.parser.service";
import { CafeCategory, CafeDish } from "./types/menu";

export const sovaUrl = "https://sova-lounge.choiceqr.com/popular";

@Injectable()
export class SovaLoungeParserService extends BaseParserService {
  private async parseSingleCategory(
    browser: puppeteer.Browser,
    url: string
  ): Promise<CafeDish[]> {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay(2000);

    const dishes: CafeDish[] = await page.$$eval(
      '[class*="DefaultView_categoryWrapper"]',
      (wrappers) => {
        const out: CafeDish[] = [];

        for (const wrapper of wrappers) {
          // 1) беремо назву підкатегорії
          const subcatEl = wrapper.querySelector(
            '[class*="DefaultView_categoryName"]'
          );
          const currentSubcat = subcatEl?.textContent?.trim() || "—";

          // 2) знаходимо блок із стравами
          const menuEl = wrapper.querySelector(
            '[class*="DefaultView_categoryMenu"]'
          );
          if (!menuEl) continue;

          // 3) ітеруємо всі елементи-діви всередині menuEl
          for (const dishEl of Array.from(menuEl.children) as HTMLElement[]) {
            if (!dishEl.querySelector('[class*="menu-item-title"]')) continue;

            const getText = (sel: string) =>
              dishEl
                .querySelector(sel)
                ?.textContent?.trim()
                .replace(/\n+/g, " ") || "—";

            const title = getText('[class*="menu-item-title"]');
            const price =
              parseFloat(
                getText('[class*="menu-item-price"]')
                  .replace(/\s|₴|uah/gi, "")
                  .replace(",", ".")
              ) || 0;
            const description = getText('[class*="menu-item-description"]');
            const size =
              Array.from(
                dishEl.querySelectorAll('[class*="menu-label"]'),
                (el) => el.textContent?.trim() || ""
              )
                .find((t) => /^\d+(?:г|мл)$/i.test(t))
                ?.toLowerCase() || "";
            const imageUrl =
              dishEl.querySelector("picture img")?.getAttribute("src") || null;

            out.push({
              title,
              price,
              description,
              size,
              imageUrl,
              subcategory: currentSubcat,
              addons: [],
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
    const page = await browser.newPage();
    await page.goto(sovaUrl, { waitUntil: "networkidle2" });
    await this.delay(2000);

    const sectionSelector = 'div[class*="styles_sectionList__"]';
    await page.waitForSelector(sectionSelector);

    const categoriesInfo = await page.$$eval(
      'div[class*="styles_sectionList__"] a[href^="/section:"]',
      (links) =>
        links.map((link) => ({
          name: link.textContent?.trim() || "—",
          href: link.getAttribute("href") || "",
        }))
    );

    await page.close();

    const result: CafeCategory[] = [];
    for (const { name, href } of categoriesInfo) {
      const url = new URL(href, sovaUrl).toString();
      const dishes = await this.parseSingleCategory(browser, url);
      result.push({ name, dishes });
    }

    await browser.close();
    return result;
  }
}
