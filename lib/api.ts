// lib/api.ts
import { CreateCourseDto, Course } from './types';

// ЛОГИКА URL:
// 1. Если код выполняется на СЕРВЕРЕ (Server Component) -> используем прямой адрес бэкенда (http://localhost:3000)
// 2. Если код выполняется в БРАУЗЕРЕ (Client Component) -> используем прокси (/api), чтобы избежать CORS ошибок
const BASE_URL = typeof window === 'undefined' 
  ? 'http://localhost:3000' 
  : '/api';

// --- GET ЗАПРОСЫ (Чтение) ---

// 1. Получить список всех курсов
export const getCourses = async (): Promise<Course[]> => {
  const res = await fetch(`${BASE_URL}/courses`, {
    cache: 'no-store', // Всегда свежие данные (отключаем кэш)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  return res.json();
};

// 2. Получить один курс по ID (для страницы редактирования)
export const getCourseById = async (id: string): Promise<Course> => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }

  return res.json();
};

// --- МУТАЦИИ (Изменение данных) ---
// Эти запросы обычно вызываются из браузера (клиентские компоненты), 
// поэтому здесь безопасно использовать путь через /api

// 3. Создать новый курс
export const createCourse = async (data: CreateCourseDto): Promise<Course> => {
  const res = await fetch('/api/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create course');
  }

  return res.json();
};

// 4. Обновить существующий курс
export const updateCourse = async (id: string, data: CreateCourseDto): Promise<Course> => {
  const res = await fetch(`/api/courses/${id}`, {
    method: 'PUT', // В Swagger у вас PUT
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update course');
  }

  return res.json();
};

// 5. Удалить курс
export const deleteCourse = async (id: string): Promise<void> => {
  const res = await fetch(`/api/courses/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete course');
  }
};