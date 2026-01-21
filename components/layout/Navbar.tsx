import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white text-sm font-semibold">
            🎓
          </div>
          <span className="font-semibold text-slate-900">LMS CRUD</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <Link className="text-blue-600 font-medium" href="/courses">Courses</Link>
          <span className="opacity-60">Students</span>
          <span className="opacity-60">Reports</span>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200" />
            <span className="text-slate-700">Admin User</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
