"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse } from "@/lib/api"; // Добавляем updateCourse
import { CreateCourseDto, Course } from "@/lib/types";

// Пропсы компонента: принимаем необязательный курс
interface CourseFormProps {
  initialData?: Course | null; 
}

export function CourseForm({ initialData }: CourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Определяем режим: если есть initialData, значит мы редактируем
  const isEditing = !!initialData;

  // Инициализируем стейт: либо данными из пропса, либо пустыми значениями
  const [formData, setFormData] = useState<CreateCourseDto>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    level: initialData?.level || "beginner",
    published: initialData?.published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEditing && initialData?._id) {
        // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
        await updateCourse(initialData._id, formData);
      } else {
        // --- РЕЖИМ СОЗДАНИЯ ---
        await createCourse(formData);
      }

      router.push("/courses"); 
      router.refresh(); 
    } catch (err) {
      console.error(err);
      setError(isEditing 
        ? "Не удалось обновить курс." 
        : "Не удалось создать курс."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1c252b] p-6 rounded-xl border border-[#dde1e4] dark:border-gray-800 shadow-sm max-w-2xl">
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-[#121517] dark:text-white mb-2">
            Course Title
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="e.g. Intro to JS"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-bold text-[#121517] dark:text-white mb-2">
            Level
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-[#121517] dark:text-white mb-2">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder="Briefly describe the course content..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="published"
            className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          />
          <label htmlFor="published" className="text-sm font-medium text-[#121517] dark:text-white cursor-pointer select-none">
            {formData.published ? "Published" : "Draft"}
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-bold text-white bg-[#2b74b1] hover:bg-[#2b74b1]/90 rounded-lg transition-all shadow-sm disabled:opacity-70 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin text-white">⟳</span> Saving...
            </>
          ) : (
            // Меняем текст кнопки в зависимости от режима
            isEditing ? "Save Changes" : "Create Course"
          )}
        </button>
      </div>
    </form>
  );
}