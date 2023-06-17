'use client'

import { cn } from '@/lib/utils'
import React, { FC, useState } from 'react'
import { Button } from './ui/Button'
import { signIn } from 'next-auth/react'
import Icons from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isloading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loginWithGithub = async () => {
    setIsLoading(true)
    try {
      await signIn('github')
    } catch (err) {
      toast({
        title: 'There was a problem.',
        description:
          'There was an error logging in with GitHub. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        onClick={loginWithGithub}
        isLoading={isloading}
        size="sm"
        className="w-full"
      >
        {isloading ? null : <Icons.github className="mr-2 h-6 w-6" />}
        GitHub
      </Button>
    </div>
  )
}

export default UserAuthForm
