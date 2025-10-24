'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import { loginUser } from "@/services/api";
import { useToast } from "@/components/Toast";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await loginUser(form);
    console.log("Login response:", res);
    toast.show("Login riuscito");
    router.push("/events");
  } catch (err) {
    console.error("Errore login:", err);
    toast.show(err.message, "error");
  } finally {
    setLoading(false);
  }
};



  return (
    <main className="min-h-screen flex flex-col justify-between bg-black text-white px-6 py-10">
      {/* Intestazione */}
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-2">Accedi a</h1>
        <h2 className="text-5xl font-extrabold text-white">EventApp</h2>
      </header>

      {/* Form di login */}
      <section className="flex flex-col justify-end flex-1">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <FormInput
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <PasswordInput
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="text-right text-sm mt-1">
            <a href="/auth/forgot" className="text-white/70 hover:text-white transition">
              Password dimenticata?
            </a>
          </div>
          <Button type="submit" loading={loading} className="bg-white text-black mt-2">
            Accedi
          </Button>
        </form>

        {/* Link registrazione */}
        <p className="mt-8 text-center text-white/70">
          Nuovo utente?{" "}
          <a href="/auth/register" className="font-semibold underline hover:text-white">
            Registrati
          </a>
        </p>
      </section>
    </main>
  );
}
