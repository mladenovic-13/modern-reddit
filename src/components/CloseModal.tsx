'use client'

import { X } from 'lucide-react'
import React from 'react'
import { Button } from './ui/Button'
import { useRouter } from 'next/navigation'

const CloseModal = () => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant="subtle"
      className="h-6 w-6 rounded-md p-0"
      aria-label="close modal"
    >
      <X className="h-4 w-4 cursor-pointer text-zinc-700 hover:text-zinc-900" />
    </Button>
  )
}

export default CloseModal
