import { IconCheck } from "./icons";

interface ToastProps {
  message: string;
  visible: boolean;
}

/** Aviso flotante temporal. Lo controla el componente que lo usa (ej. SmartCopyClabe). */
export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {visible && (
        <p className="flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background shadow-lg">
          <IconCheck className="h-4 w-4" />
          {message}
        </p>
      )}
    </div>
  );
}
