import Link from "next/link"
import { auth } from "@/lib/auth"

export default async function HomePage() {
  const session = await auth()

  return (
    <>
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            SaaS Starter
          </Link>
          <nav className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-4 pt-24 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              Your SaaS, shipped in hours
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              A production-ready Next.js starter with authentication, payments,
              and a dashboard — everything you need to start charging customers today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Try the demo
              </Link>
              <a
                href="#features"
                className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                What&apos;s included
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-gray-100 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold">Everything baked in</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "Email + password auth", desc: "NextAuth v5 with credentials provider. Signup, login, logout, session management — all working out of the box." },
                { title: "Stripe subscriptions", desc: "Checkout flow, webhook handler, customer portal, and plan-based access control. Ready for your pricing table." },
                { title: "Dashboard layout", desc: "Responsive sidebar nav, protected routes, user context. Drop in your own pages and features." },
                { title: "Prisma + SQLite", desc: "Type-safe database with migrations. Swap to Postgres in one line when you're ready." },
                { title: "Tailwind CSS", desc: "Utility-first styling. Clean, minimal design system you can customize in minutes." },
                { title: "Server actions", desc: "React 19 useActionState forms. Type-safe mutations without API routes." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Start building today</h2>
            <p className="mt-3 text-gray-500">
              Clone, configure 3 env vars, deploy. You&apos;re charging customers by dinner.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Try the live demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 px-4 py-8 text-center text-sm text-gray-400">
        SaaS Starter — Ship faster.
      </footer>
    </>
  )
}
