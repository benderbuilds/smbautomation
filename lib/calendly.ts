/* Falls back to the existing 30-minute event until the dedicated 20-minute
   audit event exists and NEXT_PUBLIC_CALENDLY_URL points at it. */
export function calendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/jesse-smbautomation/30min';
}
