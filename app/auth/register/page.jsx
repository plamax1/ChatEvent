'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import { registerUser } from "@/services/api";
import { useToast } from "@/components/Toast";

export default function RegisterPage(){
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.show("Registrazione completata");
      router.push("/events");
    } catch (err) {
      toast.show(err.message || "Errore registrazione", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold">Crea profilo</h1>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <FormInput placeholder="Nome e Cognome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <FormInput placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <PasswordInput placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <Button type="submit" loading={loading} className="bg-white text-black">Crea profilo</Button>
      </form>
      <p className="mt-10 text-center text-white/70">Già registrato? <a href="/auth/login" className="font-semibold underline">Accedi</a></p>
    </main>
  );
}
