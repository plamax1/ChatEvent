import "../styles/globals.css";
import BottomNav from "@/components/BottomNav";
import { ToastProvider } from "@/components/Toast";
export const metadata={title:"EventApp Completo",description:"Auth + Eventi + Chat + QR"};
export default function RootLayout({children}){return(<html lang="it"><body className="min-h-screen pb-[74px] antialiased"><ToastProvider>{children}<BottomNav/></ToastProvider></body></html>)}
