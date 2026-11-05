import { cn } from "@/lib/cn";

export function StatusBanner({
  status,
  message,
}: {
  status: "error" | "unavailable" | "success";
  message: string;
}) {
  return (
    <p
      role="status"
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        status === "error"
          ? "border-red-200 bg-red-50 text-red-900"
          : status === "success"
            ? "border-green-200 bg-green-50 text-green-900"
            : "border-gold/40 bg-cream text-brand",
      )}
    >
      {message}
    </p>
  );
}
