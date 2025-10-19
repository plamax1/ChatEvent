import { getEvent, getEventUsers } from "@/services/api";
import Link from "next/link";


export default async function EventDetail({ params }) {
  const event = await getEvent(params.id);
  const users = await getEventUsers(params.id);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center gap-5 pt-6 pl-6 pr-4 mb-6">
        <a href="/events" className="text-white/70 text-2xl">
          {"<"}
        </a>
        <img
          src={event.image}
          alt={event.title}
          className="w-8 h-8 rounded-full object-cover"
        />
                <Link
          href={`/events/${event.id}/guests`}
          className="text-xl font-bold"
        >
          {event.title}
        </Link>
      </header>

      {/* Sezione Chat */}
      <section className="px-6">
        <h2 className="text-lg font-semibold mb-3">Chat</h2>

        {users.length > 0 ? (
          <div className="divide-y divide-white/10">
            {users.map((u) => (
              <a
                key={u.id}
                href={`/events/${event.id}/chat/${u.id}`}
                className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg transition"
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-white/60 text-sm">{u.lastMessage || "…"}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-white/60 mt-6 text-center">
            Non hai chat per quest’evento
          </p>
        )}
      </section>

      {/* BottomNav */}
      <footer className="w-full">
      </footer>
    </main>
  );
}
