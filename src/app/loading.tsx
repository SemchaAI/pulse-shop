import { LoadingSpinner } from '@/components/shared';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <LoadingSpinner
        version="circle"
        width={40}
      />
    </div>
  );
}
