'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import { loginUser } from "@/services/api";
import { useToast } from "@/components/Toast";

export default function LoginPage(){
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(form);
      toast.show("Login riuscito");
      router.push("/events");
    } catch (err) {
      toast.show(err.message || "Credenziali non valide", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold">Accedi</h1>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <FormInput placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <PasswordInput placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <div className="text-right text-sm"><a href="/auth/forgot" className="text-white/70 hover:text-white">Password dimenticata?</a></div>
        <Button type="submit" loading={loading} className="bg-white text-black">Accedi</Button>
      </form>
      <p className="mt-10 text-center text-white/70">Nuovo Account? <a href="/auth/register" className="font-semibold underline">Registrati</a></p>
    </main>
  );
}
