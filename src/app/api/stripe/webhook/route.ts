import { getStripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import Stripe from "stripe"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { plan: "pro" },
        })
      }
      break
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId },
      })
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { plan: "free" },
        })
      }
      break
    }
  }

  return Response.json({ received: true })
}
