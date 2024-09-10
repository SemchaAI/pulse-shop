import { AdminNavigation } from '@/components/widgets';
import '@uploadthing/react/styles.css';
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNavigation />
      {children}
    </>
  );
}
