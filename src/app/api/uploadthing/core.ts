import { getAuthSession } from '@/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await getAuthSession()

      if (!session) {
        return { error: 'Not authenticated', status: 401 }
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //eslint-disable-next-line no-console
      console.log('Upload complete for userId:', metadata.userId)

      //eslint-disable-next-line no-console
      console.log('file url', file.url)
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
