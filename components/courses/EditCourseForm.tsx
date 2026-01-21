"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/lib/api";
import { Course, CreateCourseDto } from "@/lib/types";

interface EditCourseFormProps {
  course: Course; // Принимаем существующий курс
}

export function EditCourseForm({ course }: EditCourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Заполняем форму данными из пропса
  const [formData, setFormData] = useState<CreateCourseDto>({
    title: course.title,
    description: course.description,
    level: course.level,
    published: course.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await updateCourse(course._id, formData); // Отправляем ID и новые данные
      router.push("/courses");
      router.refresh();
    } catch (err) {
      setError("Не удалось сохранить изменения.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Container */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Title Field */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Course Title</label>
              <input 
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                placeholder="e.g. Introduction to Physics" 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <p className="text-slate-400 text-xs">A clear title helps students identify the topic immediately.</p>
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Description</label>
              <textarea 
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" 
                placeholder="Provide a detailed course overview..." 
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Level Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Difficulty Level</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">unfold_more</span>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Visibility Status</label>
                <div className="flex items-center gap-3 h-full">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-300">
                      {formData.published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
              <button 
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 shadow-md shadow-primary/20 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar Info (Static for now) */}
      <div className="space-y-6">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
          <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            Quick Tips
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Ensure the description includes learning objectives.</p>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Changes go live instantly if status is 'Published'.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}