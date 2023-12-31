import { MiniCreatePost, PostFeed } from '@/components'
import { INFINITE_SCROLLING_PAGINATON_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true
        },
        take: INFINITE_SCROLLING_PAGINATON_RESULTS
      }
    }
  })

  if (!subreddit) return notFound()

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">r/{subreddit.name}</h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  )
}

export default Page
