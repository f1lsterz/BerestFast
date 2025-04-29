import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ChoiceQRService {
  private readonly API_URL =
    "https://sova-lounge.choiceqr.com/api/public/favorites/query/counters"; // Приклад API

  async fetchMenuFromApi(sectionSlug: string) {
    try {
      // Замість статичної URL використовувати dynamic, якщо потрібно
      const response = await axios.post(this.API_URL, {
        sectionSlug,
      });

      const data = response.data;

      // Перевіряємо структуру отриманих даних
      console.log("API Data:", data);

      // Парсимо дані з API відповідно до структури
      if (data && data.menu) {
        return data.menu.sections.map((section: any) => ({
          sectionName: section.name,
          sectionSlug: section.slug,
          items: section.items.map((item: any) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            weight: item.weight,
            image: item.image?.url,
          })),
        }));
      } else {
        throw new Error("Не вдалося отримати меню.");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw new Error("Щось пішло не так з отриманням меню.");
    }
  }
}
