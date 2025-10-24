import EventCard from "@/components/EventCard";
import { getEvents, getEventsMock, getEventUsers } from "@/services/api";
import BottomNav from "@/components/BottomNav";

export default async function Events() {
  const userID = 1;
  const events = await getEventsMock();
  const events_ = await getEvents(userID);

  //const events = await getEventUsers(userID);
  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white">
      {/* Titolo in alto a sinistra */}
      <header className="absolute top-12 left-8">
        <h1 className="text-2xl font-bold">Eventi</h1>
      </header>

      {/* Sezione eventi */}
      <section className="flex-1 w-full mt-28 px-4">
        {events.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-20">
            Nessun evento disponibile.
          </p>
        )}
      </section>

      {/* Bottom Navigation */}
      <footer className="w-full">
        <BottomNav active="eventi" />
      </footer>
    </main>
  );
}
