import { ValidationPipe } from "@nestjs/common";

export const validationConfig = new ValidationPipe({
  whitelist: true, // Видаляє зайві поля, яких немає в DTO
  forbidNonWhitelisted: true, // Викидає помилку, якщо DTO містить зайві поля
  transform: true, // Автоматично перетворює типи відповідно до DTO
  transformOptions: {
    enableImplicitConversion: true, // Дозволяє автоматичну конвертацію типів
  },
  forbidUnknownValues: true, // Забороняє передавати пусті або некоректні об'єкти
  validationError: {
    target: false, // Виключає переданий об'єкт з помилок (зменшує витік даних)
    value: false, // Виключає невірне значення з повідомлення про помилку
  },
});
