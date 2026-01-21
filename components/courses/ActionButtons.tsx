"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCourse } from "@/lib/api";

interface ActionButtonsProps {
  id: string; // ID курса
}

export function ActionButtons({ id }: ActionButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // 1. Спрашиваем подтверждение
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      // 2. Вызываем API
      await deleteCourse(id);
      
      // 3. Обновляем страницу, чтобы курс исчез из списка без перезагрузки
      router.refresh(); 
    } catch (error) {
      alert("Failed to delete course");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {/* Кнопка EDIT */}
      <Link
        href={`/courses/${id}/edit`}
        className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
      >
        edit
      </Link>

      {/* Кнопка DELETE */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium disabled:opacity-50"
      >
        {isDeleting ? "..." : "delete"}
      </button>
    </div>
  );
}