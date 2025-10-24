'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/api';
import { useToast } from '@/components/Toast';

export default function LogoutButton({ className = '' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await logoutUser();
      toast.show('Logout effettuato');
      router.replace('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`w-full mt-10 rounded-2xl bg-[color:var(--card)] border border-white/10 py-3 text-red-400 ${className}`}
    >
      {loading ? 'Uscita...' : 'Esci'}
    </button>
  );
}
