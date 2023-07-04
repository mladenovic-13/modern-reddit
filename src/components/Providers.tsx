'use client'

import { FC } from 'react'

// react-query client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

// react-query client
const queryClient = new QueryClient()

interface IProvidersProps {
  children: React.ReactNode
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
