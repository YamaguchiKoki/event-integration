import { MoonIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-end px-4 md:px-6">
        <MoonIcon className="h-6 w-6 text-gray-500" />
      </div>
    </header>
  )
}

