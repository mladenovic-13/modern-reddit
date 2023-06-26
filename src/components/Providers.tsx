'use client'

import { FC } from 'react'

// react-query client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// react-query client
const queryClient = new QueryClient()

interface IProvidersProps {
  children: React.ReactNode
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers
