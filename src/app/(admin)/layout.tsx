import { AdminNavigation } from '@/components/widgets';

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
