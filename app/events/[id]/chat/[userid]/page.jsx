"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  //const { id, userId } = useParams(); // id evento + utente
  console.log(params.id);
  const id = params.id;
  const userId= params.userId;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Simulazione fetch
  useEffect(() => {
    async function fetchChat() {
      // 👇 qui potresti chiamare il tuo endpoint API, es:
      // const data = await getChatMessages(id, userId);
      // const userInfo = await getUser(userId);
      // setMessages(data);
      // setUser(userInfo);

      // Per ora mock di esempio
      setUser({ id: userId, name: "Marco Rossi", avatar: `/assets/${userId}.png` });
      setMessages([
        { id: 1, from: "me", text: "Ciao!" },
        { id: 2, from: "other", text: "Ehi, ci sei stasera?" },
      ]);
    }
    fetchChat();
  }, [id, userId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center gap-4 pt-6 pl-6 pr-4 pb-4 border-b border-white/10">
        <a href={`/events/${id}`} className="text-white/70 hover:text-white">
          <ArrowLeft size={24} />
        </a>
        {user && (
          <>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-xl font-semibold">{user.name}</h1>
          </>
        )}
      </header>

      {/* MESSAGGI */}
      <section className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                msg.from === "me"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white/10 text-white rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </section>

      {/* INPUT */}
      <footer className="flex items-center gap-2 p-4 border-t border-white/10">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-white/10 text-white px-4 py-2 rounded-xl outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-500 transition"
        >
          Invia
        </button>
      </footer>
    </main>
  );
}
