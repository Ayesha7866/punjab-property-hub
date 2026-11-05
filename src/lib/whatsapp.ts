export function whatsappLink(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const e164 = digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
  if (!/^92\d{10}$/.test(e164)) return null;
  return `https://wa.me/${e164}?text=${encodeURIComponent(text)}`;
}
