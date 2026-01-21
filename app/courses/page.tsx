import { getCourses } from '@/lib/courses';
import { CourseTable } from '@/components/courses/course-table';
import { CourseStats } from '@/components/courses/course-stats';
import Link from 'next/link';

export default async function CoursesPage() {
  // 1. Получаем данные (на сервере)
  const courses = await getCourses(); 

  return (
    <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-10">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[#121517] dark:text-white text-3xl font-black tracking-tight mb-2">Courses</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your academic catalog and course availability.</p>
        </div>
        <Link 
          href="/courses/create"
          className="inline-flex items-center justify-center gap-2 px-5 h-11 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all shadow-sm"
        >
          <span className="material-symbols-outlined !text-white">add</span>
          <span>Add Course</span>
        </Link>
      </div>

      {/* Table Component */}
      <CourseTable courses={courses} />

      {/* Stats Component */}
      {/* <CourseStats /> */}
    </main>
  );
}