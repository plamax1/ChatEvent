import "../styles/globals.css";
import { ToastProvider } from "@/components/Toast";
import BottomNavGate from "@/components/BottomNavGate";

export const metadata = {
  title: "EventApp Completo",
  description: "Auth + Eventi + Chat + QR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="min-h-screen pb-[74px] antialiased bg-black text-white">
        <ToastProvider>
          {children}
          <BottomNavGate /> {/* decide lato client se mostrare la navbar */}
        </ToastProvider>
      </body>
    </html>
  );
}
