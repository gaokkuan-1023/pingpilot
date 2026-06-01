import { auth } from "@/lib/auth"

export default async function BillingPage() {
  const session = await auth()
  const plan = ((session?.user as any)?.plan || "free") as string

  return (
    <div className="px-6 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Billing</h1>

      <div className="mt-6 rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Current plan</div>
            <div className="text-lg font-bold mt-1 capitalize">{plan}</div>
          </div>
          {plan === "free" ? (
            <form action="/api/stripe/checkout" method="POST">
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Upgrade to Pro
              </button>
            </form>
          ) : (
            <form action="/api/stripe/portal" method="POST">
              <button
                type="submit"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Manage subscription
              </button>
            </form>
          )}
        </div>
      </div>

      {plan === "pro" && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          You&apos;re on the Pro plan. Thank you for your support!
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-semibold">Plan comparison</h2>
        <p className="text-sm text-gray-500 mt-1">
          Customize this page with your own pricing. Stripe checkout and webhooks are already wired up.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 p-4">
            <div className="font-medium">Free</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>Basic features</li>
              <li>Community support</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-gray-900 p-4">
            <div className="font-medium">Pro</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>Everything in Free</li>
              <li>Premium features</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
