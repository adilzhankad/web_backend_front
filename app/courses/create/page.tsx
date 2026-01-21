import { CourseForm } from "@/components/courses/CourseForm";

export default function NewCoursePage() {
  return (
    <main className="max-w-[1000px] w-full mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#121517] dark:text-white tracking-tight">
          Create New Course
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Add a new course to your catalog.
        </p>
      </div>

      <CourseForm />
    </main>
  );
}