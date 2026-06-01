"use client"

import { useActionState } from "react"
import { signup } from "@/lib/actions"
import Link from "next/link"

export default function SignupPage() {
  const wrappedSignup = async (_prev: unknown, fd: FormData) => signup(fd)
  const [state, action, pending] = useActionState(wrappedSignup, undefined)

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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gray-900 hover:underline">
              Log in
            </Link>
          </p>
          <form action={action} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                placeholder="Your name"
              />
            </div>
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
                minLength={8}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
                placeholder="At least 8 characters"
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
              {pending ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
