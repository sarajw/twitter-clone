import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function NewReply({ tweet }) {
  const router = useRouter()
  const [reply, setReply] = useState('')
  const { data: session } = useSession()
  
  if (!session || !session.user) return null

  return (
    <form
      className='flex gap-2'
      onSubmit={async (e) => {
        e.preventDefault()
        if (!reply) {
          alert('Enter some text in the reply')
          return
        }
        const res = await fetch('/api/tweet', {
          body: JSON.stringify({
            parent: tweet.id,
            content: reply,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        router.reload(window.location.pathname)
      }}
    >
      <textarea
        className='border border-gray-500/40 bg-gray-500/5 w-full p-4 text-lg rounded-sm placeholder:light'
        rows={1}
        cols={50}
        placeholder='Tweet your reply'
        onChange={(e) => setReply(e.target.value)}
      />
      <button className='button self-center'>
        Reply
      </button>
    </form>
  )
}