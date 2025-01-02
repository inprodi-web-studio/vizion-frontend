import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);

  return (
    <></>
  );
}