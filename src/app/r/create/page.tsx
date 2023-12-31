'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'

const Page = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const { loginToast } = useCustomToast()

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input
      }

      const { data } = await axios.post('/api/subreddit', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists',
            description: 'Please choose another name',
            variant: 'destructive'
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name',
            description: 'Please choose another name',
            variant: 'destructive'
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        variant: 'destructive'
      })
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    }
  })

  return (
    <div className="container mx-auto flex h-full max-w-3xl items-center">
      <div className="relative h-fit w-full space-y-6 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create Community</h1>
        </div>

        <hr className="h-px bg-zinc-50" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="pb-2 text-xs">
            Community names including capitalization cannot be changed
          </p>

          <div className="relative">
            <p className="absolute inset-y-0 left-0 grid w-8 place-items-center text-sm text-zinc-400">
              r/
            </p>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={input.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
