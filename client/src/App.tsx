import { useEffect, useState } from "react";

interface Messages {
  id: number;
  name: string;
  message: string;
}

function App() {
  const [messages, setMessages] = useState<Messages[]>([]);

useEffect(() => {
  fetch("http://localhost:5000/api/messages")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        setMessages([]); // fallback
      } else {
        setMessages(data);
      }
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

  return (
    <div>
      <h4>Hidd</h4>
      <h1>Messages</h1>
      {messages.map((mess) => (
        <p key={mess.id}>{mess.name} — {mess.message}</p>
      ))}
    </div>
  );
}

export default App;