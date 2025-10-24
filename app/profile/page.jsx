import { getUser } from '@/services/api';
import LogoutButton from '@/components/LogoutButton';

export default async function Profile() {
  const me = await getUser('me');

  return (
    <main className="container py-10">

        {/* HEADER — stessa altezza e spaziatura delle altre pagine */}
        <header className="flex items-center justify-end h-16 pr-1 border-b border-white/10">
        <a
            href="/profile/edit"
            className="text-white font-semibold hover:text-white/80 transition px-2"
        >
            Modifica
        </a>
        </header>


      <div className="flex flex-col items-center gap-4 mt-10">
        <img
          src={me.avatar}
          alt=""
          className="w-40 h-40 rounded-full object-cover"
        />
        <h2 className="text-2xl font-semibold">{me.name}</h2>
      </div>

      <div className="mt-8 space-y-6">
        <section>
          <h3 className="text-white/60">Numero</h3>
          <p className="mt-1">{me.phone}</p>
        </section>

        <section>
          <h3 className="text-white/60">Su di te</h3>
          <p className="mt-1 whitespace-pre-wrap">{me.bio}</p>
        </section>
      </div>

        <LogoutButton />
    </main>
  );
}
