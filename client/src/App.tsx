import { useEffect, useState } from 'react'
import type { Message } from './types'
import Header from './components/Header'
import AddMessageModal from './components/AddMessageModal'
import MessageCard from './components/MessageCard'
import './App.css'


function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  const fetchMessages = async (): Promise<void> => {
    try {
      const res = await fetch('/api/messages')
      if (!res.ok) throw new Error('Failed to fetch messages')
      const data: Message[] = await res.json()
      setMessages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleAddMessage = async (newMessage: { name: string; message: string }): Promise<void> => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      })
      if (!res.ok) throw new Error('Failed to add message')
      await fetchMessages() // refresh the list
      setShowModal(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div className="app">
      
      <Header onAddClick={() => setShowModal(true)} />

      {showModal && (
        <AddMessageModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddMessage}
        />
      )}

      <section className="posts">
        <h2>All Posts</h2>
        {loading && <p className="status">Loading posts...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {!loading && messages.length === 0 && (
          <p className="status">No messages yet. Be the first!</p>
        )}
        {messages.map((message: Message) => (
          <MessageCard key={message.id} messages={message} />
        ))}
      </section>
    </div>
  )
}

export default App