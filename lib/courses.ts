// lib/courses.ts
import { Course } from './types'; // Импортируем типы (см. Шаг 2)

// Если у тебя есть базовый api-клиент в lib/api.ts, импортируй его.
// Если нет, используем обычный fetch:

export const getCourses = async (): Promise<Course[]> => {
  // Замени на адрес своего бэкенда
  const res = await fetch('http://localhost:3000/courses', {
    cache: 'no-store', // Всегда свежие данные
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  return res.json();
};

export type CreateCourseDto = {
  title: string;
  description: string;
  level: string;
  isPublished: boolean;
};

export const createCourse = async (data: CreateCourseDto): Promise<Course> => {
  const res = await fetch('http://localhost:3000/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Ошибка при создании курса');
  }

  return res.json();
};