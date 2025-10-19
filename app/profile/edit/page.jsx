'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { useToast } from '@/components/Toast';

export default function Edit() {
  const toast = useToast();
  const router = useRouter();

  const [form, setForm] = useState({
    name: 'Marco Rossi',
    bio: 'Marco.\nPronto per stasera.',
  });

  const submit = (e) => {
    e.preventDefault();
    toast.show('Profilo aggiornato');
    setTimeout(() => router.push('/profile'), 800);
  };

  return (
    <main className="container py-10">
      {/* HEADER */}
      <header className="flex items-center justify-end h-16 pr-1 border-b border-white/10">
        <button
          onClick={() => document.getElementById('f').requestSubmit()}
          className="text-white font-semibold hover:text-white/80 transition px-2"
        >
          Fatto
        </button>
      </header>

      <form id="f" onSubmit={submit} className="space-y-4">
        <div className="card p-4">
          <div className="flex items-center gap-4">
            {/* IMMAGINE PROFILO + ICONA CAMERA */}
            <div className="relative w-16 h-16">
              <img
                src="/assets/avatar.png"
                alt="Immagine profilo"
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-black/60 p-1.5 rounded-full hover:bg-black/80 transition"
                onClick={() => alert('Apertura selettore immagine...')}
              >
                📷
              </button>
            </div>

            {/* NOME */}
            <div className="flex-1">
              <FormInput
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* BIO */}
        <div>
          <label className="block mb-2 text-white/80">
            Dicci qualcosa su di te!
          </label>
          <textarea
            className="w-full rounded-2xl bg-[color:var(--card)] border border-white/10 p-4 min-h-[140px]"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

      </form>
    </main>
  );
}
