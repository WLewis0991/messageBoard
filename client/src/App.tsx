import { useEffect, useState } from 'react'
import type { messages } from './types'
import MessageCard from './components/MessageCard'
import './App.css'


function App() {
  const [messages, setMessages] = useState<messages[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async (): Promise<void> => {
    try {
      const res = await fetch('/api/messages')
      if (!res.ok) throw new Error('Failed to fetch messages')
      const data: messages[] = await res.json()
      setMessages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>📋 MessageBoard</h1>
        <p>A place to share thoughts and ask questions</p>
      </header>

      <section className="posts">
        <h2>All Posts</h2>
        {loading && <p className="status">Loading posts...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {!loading && messages.length === 0 && (
          <p className="status">No messages yet. Be the first!</p>
        )}
        {messages.map((message: messages) => (
          <MessageCard key={message.id} messages={message} />
        ))}
      </section>
    </div>
  )
}

export default App