import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";
import { PuppeteerConfig } from "src/config/puppeteer.config";
import { AddressInfo } from "./types/address";
import { OpeningHours } from "./types/hours";

@Injectable()
export abstract class BaseParserService {
  protected async launch(): Promise<puppeteer.Browser> {
    return puppeteer.launch(PuppeteerConfig);
  }

  protected async delay(ms: number = 500) {
    return new Promise((r) => setTimeout(r, ms));
  }

  protected async clickAllButtonsByText(page: puppeteer.Page, text: string) {
    await page.$$eval(
      "div",
      (els, text) => {
        els
          .filter((el) => el.textContent?.trim() === text)
          .forEach((el) => (el as HTMLElement).click());
      },
      text
    );
    await this.delay(500);
  }

  async parseLogo(url: string): Promise<string> {
    const browser = await this.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay();

    const logoUrl = await page.$eval('div[class*="styles_logo"]', (el) => {
      const bg = (el as HTMLElement).style.backgroundImage;
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : "";
    });

    await browser.close();
    return logoUrl;
  }

  async parseAddress(url: string): Promise<AddressInfo> {
    const browser = await this.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay();

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

  async parseOpeningHours(url: string): Promise<OpeningHours[]> {
    const browser = await this.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await this.delay();

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
