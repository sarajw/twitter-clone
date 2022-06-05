import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function NewTweet() {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || !session.user) return null

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content) {
          alert('No content')
          return
        }

        await fetch('/api/tweet', {
          body: JSON.stringify({
            content,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        router.reload(window.location.pathname)
      }}
    >
      <div className='flex flex-col mx-2 my-3 gap-2'>
          <textarea
            className='border border-gray-600/40 bg-gray-600/10 p-4 w-full text-lg rounded-md placeholder:light'
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={(e) => setContent(e.target.value)}
          />

          <button className='self-end border border-teal-600 bg-teal-600/75 hover:bg-teal-600 text-white float-right px-8 py-2 mt-0 mr-2 font-semibold rounded-full'>
            Cheep
          </button>
          </div>
    </form>
  )
}