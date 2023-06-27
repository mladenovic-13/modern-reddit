'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from './ui/Button'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ISubscribeLeaveToggleProps {
  isSubscribed?: boolean
  subredditId: string
}

const SubscribeLeaveToggle = ({
  isSubscribed = false,
  subredditId
}: ISubscribeLeaveToggleProps) => {
  const { loginToast } = useCustomToast()
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId
      }

      const { data } = await axios.post('/api/subreddit/subscribe', payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => router.refresh())

      return toast({
        title: 'Subsciption successful',
        description: 'You have subscribed to this community',
        variant: 'default'
      })
    }
  })

  const { mutate: unsubscribe, isLoading: isUnsubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId
      }

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      startTransition(() => router.refresh())

      return toast({
        title: 'Unsubscribed successful',
        description: 'You have unsubscribed this community',
        variant: 'default'
      })
    }
  })

  return isSubscribed ? (
    <Button
      onClick={() => unsubscribe()}
      isLoading={isUnsubscribing}
      className="mb-4 mt-1 w-full"
    >
      Leave community
    </Button>
  ) : (
    <Button
      onClick={() => subscribe()}
      isLoading={isSubscribing}
      className="mb-4 mt-1 w-full"
    >
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
