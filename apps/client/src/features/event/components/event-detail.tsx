import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from '@/lib/data'

type EventDetailsProps = {
  event: Event | null
}

export function EventDetails({ event }: EventDetailsProps) {
  if (!event) {
    return (
      <Card className="bg-white h-full flex items-center justify-center">
        <p className="text-gray-500">Select an event to view details</p>
      </Card>
    )
  }

  return (
    <Card className="bg-white h-full overflow-hidden flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">Date</h3>
            <p className="text-gray-700">{event.date}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Location</h3>
            <p className="text-gray-700">{event.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Status</h3>
            <p className="text-gray-700">{event.status}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Description</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Organizer</h3>
            <p className="text-gray-700">{event.organizer}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Attendees</h3>
            <p className="text-gray-700">{event.attendees}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

