import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function NewTweet({ tweets, setTweets }) {
  const [content, setContent] = useState('')
  const { data: session } = useSession()

  if (!session || !session.user) return null

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content) {
          alert('No content')
          return
        }

        const res = await fetch('/api/tweet', {
          body: JSON.stringify({
            content,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const tweet = await res.json()

        setTweets([tweet, ...tweets])
        // router.reload(window.location.pathname)
      }}
    >
      <div className='flex flex-col  m-[5vmin] gap-2'>
        <textarea
          className='border border-gray-500/40 bg-gray-500/5 p-4 text-lg rounded-sm placeholder:light'
          rows={2}
          cols={50}
          placeholder="What's happening?"
          name='content'
          onChange={(e) => setContent(e.target.value)}
        />

        <button className='button self-end text-2xl'>
          Cheep
        </button>
      </div>
    </form>
  )
}