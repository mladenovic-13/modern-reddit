import React from 'react'
import { toast } from './use-toast'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required',
      description: 'Please login or register to create a subreddit',
      variant: 'destructive',
      action: (
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href="/sign-in"
          onClick={() => dismiss()}
        >
          Login
        </Link>
      )
    })
  }

  return { loginToast }
}
