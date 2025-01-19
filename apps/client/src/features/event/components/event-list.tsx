import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Event } from '@/lib/data'

type EventListProps = {
  events: Event[]
  title: string
  onSelectEvent: (event: Event) => void
  selectedEventId?: string
}

export function EventList({ events, title, onSelectEvent, selectedEventId }: EventListProps) {
  return (
    <Card className="bg-white h-full overflow-hidden flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className={`flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 cursor-pointer transition-colors ${event.id === selectedEventId ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => onSelectEvent(event)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
              </div>
              <Badge variant={event.status === 'ongoing' ? 'default' : 'secondary'}>
                {event.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

