import BottomNav from "@/components/BottomNav";

export default function Scan() {
  const apriFotocamera = () => {
    // 👇 qui metti la logica per aprire la fotocamera
    // (puoi usare navigator.mediaDevices.getUserMedia o una tua funzione)
    alert("Apertura fotocamera...");
  };

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-12 left-8">
        <h1 className="text-3xl font-bold">Entra in chat!</h1>
      </header>

      {/* Contenuto centrale */}
      <section className="flex flex-col items-center justify-center flex-1 space-y-4">
        <button /*onClick={apriFotocamera}*/ className="flex flex-col items-center focus:outline-none">
          <img
            src="/assets/qr_main.png" // 👈 sostituisci con il tuo QR
            alt="QR Code"
            className="w-52 h-52 object-contain"
          />
          <span className="mt-4 text-lg font-semibold">Scan QR</span>
        </button>
      </section>

      {/* Bottom Navigation */}
      <footer className="w-full">
        <BottomNav active="qr" />
      </footer>
    </main>
  );
}
