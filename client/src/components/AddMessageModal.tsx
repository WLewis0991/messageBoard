import { useState } from 'react'

interface AddMessageModalProps {
  onClose: () => void;
  onSubmit: (message: { title: string; body: string }) => void;
}

function AddMessageModal({ onClose, onSubmit }: AddMessageModalProps) {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return
    onSubmit({ title, body })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Message</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
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