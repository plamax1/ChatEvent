'use client';
import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function BottomNavGate() {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/auth") /* || pathname === "/" */;

  if (hideNav) return null;
  return <BottomNav />;
}
 