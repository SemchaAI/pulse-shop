import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <h2
        style={{ display: 'flex', gap: '10px', color: 'var(--primary-main)' }}
      >
        Not Found <SearchX />
      </h2>
      <p>Could not find requested resource</p>
      <Link
        style={{ color: 'var(--primary-main)' }}
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
