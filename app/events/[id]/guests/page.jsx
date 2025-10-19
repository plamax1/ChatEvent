import { getEvent, getEventUsers } from "@/services/api";
import Link from "next/link";

export default async function EventGuests({ params }) {
  const event = await getEvent(params.id);
  const guests = await getEventUsers(params.id); // lista ospiti

  return (
    <main className="min-h-screen bg-black text-white">

           {/* Header */}
      <header className="flex items-center gap-5 pt-6 pl-6 pr-4 mb-6">
        <Link href={`/events/${event.id}`} className="text-white/70 text-2xl">
          {"<"}
        </Link>
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

      {/* LISTA OSPITI */}
      <section className="px-6">
        <h2 className="text-lg font-semibold mb-4">Ospiti</h2>

        {guests.length > 0 ? (
          <div className="divide-y divide-white/10">
            {guests.map((guest) => (
              <Link
                key={guest.id}
                href={`/events/${event.id}/users/${guest.id}`} // 👈 clic sul nome → profilo utente
                className="flex items-center gap-3 py-2 hover:bg-white/5 rounded-lg transition"
              >
                <img
                  src={guest.avatar}
                  alt={guest.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{guest.name}</p>
                  {guest.role && (
                    <p className="text-white/60 text-sm">{guest.role}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-white/60 text-center">
            Non ci sono ospiti per questo evento
          </p>
        )}
      </section>
    </main>
  );
}
