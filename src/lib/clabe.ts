/** Deja solo los dígitos de una CLABE. */
export function clabeDigits(clabe: string): string {
  return clabe.replace(/\D/g, "");
}

/** "012180001234567897" → "012 180 00123456789 7" (banco · plaza · cuenta · verificador). */
export function formatClabe(clabe: string): string {
  const digits = clabeDigits(clabe);
  if (digits.length !== 18) return digits;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 17)} ${digits.slice(17)}`;
}
