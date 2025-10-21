"use client";
import { useState } from "react";
import QrScanner from "react-qr-scanner";
import BottomNav from "@/components/BottomNav";

export default function Scan() {
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const text = data.text || data; // alcuni scanner restituiscono un oggetto
      setQrData(text);
      setScanning(false);

      // Se è un link → reindirizza automaticamente
      if (text.startsWith("http")) {
        window.location.href = text;
      }
    }
  };

  const handleError = (err) => {
    console.error("Errore scanner:", err);
    alert("Errore durante la scansione del QR!");
    setScanning(false);
  };

  // Config fotocamera
  const previewStyle = {
    height: 300,
    width: 300,
  };

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-12 left-8">
        <h1 className="text-3xl font-bold">Entra in chat!</h1>
      </header>

      {/* Contenuto centrale */}
      <section className="flex flex-col items-center justify-center flex-1 space-y-4">
        {!scanning ? (
          <>
            <button
              onClick={() => setScanning(true)}
              className="flex flex-col items-center focus:outline-none"
            >
              <img
                src="/assets/qr_main.png"
                alt="QR Code"
                className="w-52 h-52 object-contain cursor-pointer hover:scale-105 transition-transform"
              />
              <span className="mt-4 text-lg font-semibold">Scan QR</span>
            </button>

            {qrData && (
              <p className="text-sm text-gray-300 mt-4 text-center px-4">
                Codice trovato:{" "}
                <span className="text-blue-400 break-words">{qrData}</span>
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4 w-full max-w-sm bg-gray-900 p-4 rounded-xl">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={previewStyle}
              constraints={{
                video: { facingMode: "environment" },
              }}
            />
            <button
              onClick={() => setScanning(false)}
              className="px-6 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 transition"
            >
              Chiudi fotocamera
            </button>
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <footer className="w-full">
        <BottomNav active="qr" />
      </footer>
    </main>
  );
}
