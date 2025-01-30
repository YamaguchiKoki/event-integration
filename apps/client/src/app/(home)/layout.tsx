
import { Inter } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react" // Added import for React
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/side-bar"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Minimal Docs Site",
  description: "A gorgeous minimal documentation site using Next.js App Router",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger className="absolute left-4 top-20 " />
                {children}
            </SidebarProvider>
        </ThemeProvider>
      </div>
    </>
  )
}

