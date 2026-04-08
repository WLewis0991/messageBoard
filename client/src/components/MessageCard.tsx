import type { messages } from "../types";

interface MessageCardProps {
    messages: messages
}

function MessageCard({messages}: MessageCardProps){


    return (
        <div className="post-card">
            <div className="post-meta">
                <span className="author">👤 {messages.name}</span>
                <span className="date">{new Date(messages.created_at).toLocaleDateString()}</span>
            </div>
            <h3>{messages.message}</h3>
        </div>
    )
}

export default MessageCard
