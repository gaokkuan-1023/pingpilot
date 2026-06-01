"use client"

import { useActionState } from "react"
import { login } from "@/lib/actions"
import Link from "next/link"

export default function LoginPage() {
  const wrappedLogin = async (_prev: unknown, fd: FormData) => login(fd)
  const [state, action, pending] = useActionState(wrappedLogin, undefined)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PingPilot
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-gray-900 hover:underline">
              Sign up
            </Link>
          </p>
          <form action={action} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
              />
            </div>
            {state?.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {pending ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
