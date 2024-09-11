import { Verification } from '@/components/features';
import { Container } from '@/components/shared';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookiesStore = cookies();
  const id = cookiesStore.get('newUser');

  return (
    <Container>
      <Verification id={id?.value} />
    </Container>
  );
}
