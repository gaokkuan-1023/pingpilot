import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
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
  if (!user?.stripeCustomerId) {
    return Response.json({ error: "No subscription found" }, { status: 404 })
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${request.nextUrl.origin}/dashboard/billing`,
  })

  redirect(portalSession.url)
}
