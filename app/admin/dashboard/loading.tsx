import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">
          Loading dashboard data...
        </h2>
      </div>
    </div>
  );
}
