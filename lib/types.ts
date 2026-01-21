// lib/types.ts

// То, что отправляем на бэк (по Swagger)
export type CreateCourseDto = {
  title: string;
  description: string;
  level: string;
  published: boolean; // В Swagger поле называется published
};

// То, что приходит с бэка (примерно)
export type Course = CreateCourseDto & {
  _id: string;
  createdAt: string;
};