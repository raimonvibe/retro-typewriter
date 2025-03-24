dimport type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Retro PC Monitor Quiz",
  description: "A philosophical quiz with typewriter-style text on an old PC monitor",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Retro PC Monitor Quiz</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <!-- Eventueel extra stylesheets of scripts -->
    </head>
      <body>{children}</body>
    </html>
  )
}

