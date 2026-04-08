import type { Message } from "../types";

interface MessageCardProps {
    messages: Message
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
