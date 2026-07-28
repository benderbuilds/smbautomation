const FREE_MAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'live.com',
  'msn.com',
  'proton.me',
  'protonmail.com',
  'ymail.com',
  'gmx.com',
  'mail.com',
]);

export function isFreeMail(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  return FREE_MAIL_DOMAINS.has(email.slice(at + 1).toLowerCase());
}
