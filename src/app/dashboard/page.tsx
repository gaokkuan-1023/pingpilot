import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user as any
  const plan = user?.plan || "free"

  return (
    <div className="px-6 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-gray-500 mt-1">
        Welcome{user?.name ? `, ${user.name}` : ""}. You&apos;re on the{" "}
        <span className="font-medium text-gray-900 capitalize">{plan}</span> plan.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-gray-200 p-12 text-center">
        <p className="text-gray-500">
          This is your starting point. Replace this page with your own content.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Auth, payments, and dashboard layout are already wired up.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Next steps</div>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>1. Define your data model in <code className="text-xs bg-gray-100 px-1 rounded">prisma/schema.prisma</code></li>
            <li>2. Create your pages in <code className="text-xs bg-gray-100 px-1 rounded">src/app/dashboard/</code></li>
            <li>3. Add your Stripe price IDs in <code className="text-xs bg-gray-100 px-1 rounded">.env.local</code></li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-100 p-4">
          <div className="text-sm text-gray-500">Quick links</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/dashboard/billing" className="text-gray-600 hover:underline">Billing &rarr;</a></li>
            <li><a href="https://nextjs.org/docs" className="text-gray-600 hover:underline">Next.js docs &rarr;</a></li>
            <li><a href="https://pris.ly/docs" className="text-gray-600 hover:underline">Prisma docs &rarr;</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
