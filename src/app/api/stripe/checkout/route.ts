import { auth } from "@/lib/auth"
import { getStripe, PRO_PRICE_ID } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { type NextRequest } from "next/server"
import { redirect } from "next/navigation"

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id as string
  const stripe = getStripe()

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 })
  }

  let stripeCustomerId = user.stripeCustomerId

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { userId },
    })
    stripeCustomerId = customer.id
    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId },
    })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
    mode: "subscription",
    success_url: `${request.nextUrl.origin}/dashboard/billing?success=true`,
    cancel_url: `${request.nextUrl.origin}/dashboard/billing?canceled=true`,
    metadata: { userId },
  })

  if (!checkoutSession.url) {
    return Response.json({ error: "Failed to create session" }, { status: 500 })
  }

  redirect(checkoutSession.url)
}
