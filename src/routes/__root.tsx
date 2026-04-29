import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Tripti Ranjan Weds Rajan Kumar | Wedding Invitation' },
      { name: 'description', content: 'You are cordially invited to the auspicious wedding of Tripti Ranjan & Rajan Kumar on 7th May 2026, East Champaran, Bihar.' },
      { name: 'theme-color', content: '#9B1B30' },
      { property: 'og:title', content: 'Tripti Ranjan Weds Rajan Kumar' },
      { property: 'og:description', content: 'Join us to celebrate the sacred union. 7th May 2026.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
