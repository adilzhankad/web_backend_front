import { getCourseById } from "@/lib/api";
import { CourseForm } from "@/components/courses/CourseForm"; // Импортируем ту же форму
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
  const { id } = await params;
  let course;

  try {
    course = await getCourseById(id);
  } catch (e) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      {/* Передаем данные -> форма переключается в режим редактирования */}
      <CourseForm initialData={course} />
    </main>
  );
}