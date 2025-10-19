import { getUser, getEvent } from "@/services/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";



export default async function User({ params }) {
const eventId = params.id;
  const userId = params.userId;

  const event = await getEvent(eventId);
  const user = await getUser(userId);
  const u = await getUser(params.id);

  return (
    <main className="container py-10">
      {/* HEADER — stessa altezza e spaziatura delle altre pagine */}
      <header className="flex items-center h-16 gap-4 pl-6 pr-4 border-b border-white/10">
        <Link
          href={`/events/${eventId}/guests`}
          className="text-white/70 hover:text-white"
        >
          {"<"}
        </Link>
      </header>

      {/* CONTENUTO */}
      <section className="px-6 pt-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          {/* NOME UTENTE */}
          <h2 className="text-xl font-semibold">{user.name}</h2>

          {/* SCRITTA VERDE: partecipa a evento */}
          <p className="text-green-500 font-semibold text-sm mt-1">
            Partecipa a {event.title}
          </p>

        </div>

      </section>

          

      <section className="mt-6">
        <h3 className="text-white/70 mb-2">Su {u.name.split(' ')[0]}</h3>
        <p className="text-white/70 text-sm leading-relaxed pl-6 mt-4 whitespace-pre-wrap">
        {u.bio}
        </p>



      </section>

      <a
        href={`/events/${event.id}/chat/${u.id}`}
        className="block mt-6 rounded-2xl bg-white text-black py-3 text-center font-semibold"
      >
        Scrivi a {u.name.split(' ')[0]}!
      </a>
    </main>
  );
}
