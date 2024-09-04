import { CartSection } from '@/components/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Cart',
  description: 'Cart page of shop on next 14',
};

export default function CartPage() {
  return (
    <>
      <CartSection />
    </>
  );
}
