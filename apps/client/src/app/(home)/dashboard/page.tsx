'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/side-bar'
import { EventDetails } from '@/features/event/components/event-detail'
import { EventList } from '@/features/event/components/event-list'
import { Event, events } from '@/lib/data'

import { useState } from 'react'


export default function Dashboard() {
  const [view, setView] = useState<'current' | 'past'>('current')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const currentEvents = events.filter(event => event.status !== 'past')
  const pastEvents = events.filter(event => event.status === 'past')

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar onSelectView={setView} />
      <div className="flex-1 flex flex-col md:ml-64">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="h-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1 min-h-[50vh] md:min-h-0">
              {view === 'current' && (
                <EventList
                  events={currentEvents}
                  title="Current Events"
                  onSelectEvent={handleSelectEvent}
                  selectedEventId={selectedEvent?.id}
                />
              )}
              {view === 'past' && (
                <EventList
                  events={pastEvents}
                  title="Past Events"
                  onSelectEvent={handleSelectEvent}
                  selectedEventId={selectedEvent?.id}
                />
              )}
            </div>
            {view === 'past' && (
              <div className="flex-1 min-h-[50vh] md:min-h-0">
                <EventDetails event={selectedEvent} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

