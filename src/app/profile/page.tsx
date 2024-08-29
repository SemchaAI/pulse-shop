import { ProfileSection } from '@/components/widgets';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/');
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return redirect('/');
  }

  return (
    <>
      <ProfileSection user={user} />
    </>
  );
}
