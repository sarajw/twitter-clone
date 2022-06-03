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
      <div className='flex'>
        <div className='flex-1 px-1 pt-2 mt-2 mx-1'>
          <textarea
            className='border border-gray-600/50 bg-gray-600/25 p-4 w-full text-lg font-medium outline-none rounded-md'
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex-1 mb-5'>
          <button className='border border-teal-600 bg-teal-600/75 hover:bg-teal-600 text-white float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
            Cheep
          </button>
        </div>
      </div>
    </form>
  )
}