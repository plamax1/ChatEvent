'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import FormInput from "@/components/FormInput";
import { resetPasswordEmail } from "@/services/api";
import { useToast } from "@/components/Toast";

export default function ResetPageContent() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = params.get("email");
    const t = params.get("token");
    if (e) setEmail(e);
    if (t) setToken(t);
  }, [params]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPasswordEmail({ token, newPassword: password, email });
      toast.show("Password aggiornata! Ora puoi accedere.");
      router.push("/auth/login");
    } catch (err) {
      toast.show(err.message || "Errore reset", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Reimposta password</h1>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        {!token && (
          <FormInput
            placeholder="Token (dal link email)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        )}
        <PasswordInput
          placeholder="Nuova password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          loading={loading}
          className="bg-white text-black w-full"
        >
          Aggiorna password
        </Button>
      </form>
    </main>
  );
}
