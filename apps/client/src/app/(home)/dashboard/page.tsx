import EventList from "@/features/event/components/event-list"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Introduction | Minimal Docs Site",
  description: "Welcome to our minimal documentation site",
}

// This function would typically fetch data from an API
async function getEvents() {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    description: `Description for Event ${i + 1}`,
    date: `January ${(i % 30) + 1}, 2025`,
    location: ["San Francisco, CA", "New York, NY", "London, UK", "Tokyo, Japan", "Online"][i % 5],
    attendees: Math.floor(1 * 1000) + 100,
  }))
}

export default async function Home() {
  const events = await getEvents()

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold">Welcome to Our Docs</h1>
      <p className="mb-8 text-xl">
        This is a gorgeous minimal documentation site built with Next.js, Tailwind CSS, and shadcn/ui components.
      </p>

      <h2 className="mb-6 text-3xl font-semibold">Current Events</h2>
      <EventList initialEvents={events} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold">Features</h2>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>Clean and minimal design</li>
        <li>Dark mode support</li>
        <li>Responsive layout</li>
        <li>Easy navigation with shadcn sidebar</li>
        <li>Built with Next.js App Router</li>
      </ul>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">Getting Started</h2>
      <p className="mb-4">
        To get started with our documentation, please navigate through the sections using the sidebar on the left.
        Here&apos;s a quick overview of the available sections:
      </p>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>
          <strong>Getting Started</strong>: Learn how to install and set up our library
        </li>
        <li>
          <strong>Components</strong>: Explore the available components and how to use them
        </li>
        <li>
          <strong>API Reference</strong>: Detailed information about our API and its methods
        </li>
      </ul>
      <p className="mb-4">
        If you have any questions or need further assistance, don&apos;t hesitate to reach out to our support team.
      </p>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">Contributing</h2>
      <p className="mb-4">
        We welcome contributions to our documentation. If you find any errors or have suggestions for improvement,
        please open an issue or submit a pull request on our GitHub repository.
      </p>
    </main>
  )
}

