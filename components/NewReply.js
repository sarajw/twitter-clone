import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NewReply({ tweet }) {
  const router = useRouter()
  const [reply, setReply] = useState('')

  return (
    <form
      className='flex ml-2'
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
        className='border border-gray-600/40 bg-gray-600/10 p-4 w-full text-lg rounded-md placeholder:light'
        rows={1}
        cols={50}
        placeholder='Tweet your reply'
        onChange={(e) => setReply(e.target.value)}
      />
      <button className='border float-right ml-2 px-8 py-2 mt-0 mr-8 font-semibold rounded-full border-teal-600 bg-teal-600/75 hover:bg-teal-600 text-white'>
        Reply
      </button>
    </form>
  )
}