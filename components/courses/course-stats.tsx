export function CourseStats() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Courses */}
      <div className="p-6 bg-white dark:bg-[#1c252b] rounded-xl border border-[#dde1e4] dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-2xl">menu_book</span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</div>
            <div className="text-2xl font-black text-[#121517] dark:text-white">42</div>
          </div>
        </div>
      </div>
      {/* Остальные карточки аналогично... */}
    </div>
  );
}