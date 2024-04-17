'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/ui/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Footer />;
}


// dev: revision 011 verified
