import { Suspense } from "react";
import ResetPageContent from "./ResetPageContent";

export default function ResetPage() {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <ResetPageContent />
    </Suspense>
  );
}
