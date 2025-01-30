import EventList from "@/features/event/components/event-list"
import { getEvents } from "@/features/event/services/getEvents"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Introduction | Minimal Docs Site",
  description: "Welcome to our minimal documentation site",
}

export default async function Home() {
  const events = await getEvents()

  return (
    <main className="mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold">兵庫県で開催予定のイベント</h1>
      <p className="mb-8 text-xl">
        This is a gorgeous minimal documentation site built with Next.js, Tailwind CSS, and shadcn/ui components.
      </p>

      <h2 className="mb-6 text-3xl font-semibold">Current Events</h2>
      <EventList initialEvents={events} />
    </main>
  )
}

