import type { UserRole } from '../../modules/auth/domain/entities/User';

export interface JwtPayload {
  sub?: string;
  id_people?: string;
  role?: UserRole;
  name?: string;
}

function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);

  try {
    const percentEncoded = Array.from(binary)
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('');
    return decodeURIComponent(percentEncoded);
  } catch {
    return binary;
  }
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  const raw = token.replace(/^Bearer\s+/i, '');
  const segments = raw.split('.');

  if (segments.length < 2) {
    return null;
  }

  try {
    return JSON.parse(base64UrlDecode(segments[1])) as JwtPayload;
  } catch {
    return null;
  }
}
