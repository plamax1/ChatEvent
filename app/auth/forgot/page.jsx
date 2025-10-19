'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { forgotPasswordEmail } from "@/services/api";
import { useToast } from "@/components/Toast";

export default function ForgotPage(){
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordEmail({ email });
      toast.show("Email inviata con il link di reset");
      router.push("/auth/reset?email=" + encodeURIComponent(email));
    } catch (err) {
      toast.show(err.message || "Errore invio email", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Password dimenticata</h1>
      <p className="text-white/70 mt-2">Inserisci la tua email per ricevere il link di reset.</p>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <FormInput placeholder="tuo@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Button type="submit" loading={loading} className="bg-white text-black">Invia email</Button>
      </form>
    </main>
  );
}
