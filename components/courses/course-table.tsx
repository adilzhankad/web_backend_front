// components/courses/course-table.tsx
import { Course } from "@/lib/types";
import { ActionButtons } from "./ActionButtons";

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="bg-white dark:bg-[#1c252b] rounded-xl border border-[#dde1e4] dark:border-gray-800 shadow-sm overflow-hidden @container">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-[#dde1e4] dark:border-gray-800">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dde1e4] dark:divide-gray-800">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No courses found. Create your first one!
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  {/* Title & ID */}
                  <td className="px-6 py-5">
                    <div className="font-semibold text-[#121517] dark:text-white">
                      {course.title}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                      ID: {course._id}
                    </div>
                  </td>

                  {/* Level */}
                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {course.level}
                  </td>

                  {/* Published Badge */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                        course.published
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                          : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full mr-2 ${
                          course.published ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                      {course.published ? "Yes" : "No"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(course.createdAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions (Edit / Delete) */}
                  <td className="px-6 py-5 text-right">
                    <ActionButtons id={course._id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}