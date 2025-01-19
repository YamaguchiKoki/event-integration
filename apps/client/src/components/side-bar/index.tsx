'use client'

import { useState } from 'react'
import { Calendar, Clock, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type SidebarProps = {
  onSelectView: (view: 'current' | 'past') => void
}

export function Sidebar({ onSelectView }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white p-6 shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <h2 className="mb-6 text-2xl font-bold">Event Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onSelectView('current')
                  setIsOpen(false)
                }}
              >
                <Clock className="mr-2 h-4 w-4" />
                Current Events
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onSelectView('past')
                  setIsOpen(false)
                }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Past Events
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

