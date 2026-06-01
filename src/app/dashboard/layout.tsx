import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { logout } from "@/lib/actions"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-gray-100 flex flex-col">
        <div className="px-4 h-14 flex items-center border-b border-gray-100">
          <Link href="/dashboard" className="text-lg font-bold tracking-tight">
            SaaS App
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Overview
          </Link>
<Link
            href="/dashboard/billing"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Billing
          </Link>
        </nav>
        <div className="border-t border-gray-100 px-3 py-4">
          <div className="text-xs text-gray-400 truncate">{session.user.email}</div>
          <div className="mt-1 text-xs">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 capitalize">
              {(session.user as any).plan || "free"}
            </span>
          </div>
          <form action={logout} className="mt-3">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
