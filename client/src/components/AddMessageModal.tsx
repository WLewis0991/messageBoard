import { useState } from 'react'

interface AddMessageModalProps {
  onClose: () => void;
  onSubmit: (message: { name: string; message: string }) => void;
}

function AddMessageModal({ onClose, onSubmit }: AddMessageModalProps) {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')

const handleSubmit = () => {
  if (!name.trim() || !message.trim()) return
  const newName = name.trim().length > 20 ? name.trim().slice(0, 20) + '...' : name.trim()

  onSubmit({ name: newName, message }) 
  onClose()
}
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Message</h2>

        <input
          id='nameInput'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          id='messageInput'
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  )
}

export default AddMessageModal