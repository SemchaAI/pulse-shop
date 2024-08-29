import { Metadata } from 'next';
import { CheckoutSection } from '@/components/widgets';

export const metadata: Metadata = {
  title: 'Next ts shop | Checkout',
  description: 'Checkout page of shop on next 14',
};

export default function CheckoutPage() {
  return (
    <>
      <CheckoutSection />
    </>
  );
}
