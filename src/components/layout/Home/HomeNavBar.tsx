'use client';

import Link from 'next/link';
//import components
import { Button } from '@/components/ui/button';

export function HomeNavBar() {
  return (
    <div className="sticky top-0 z-50 flex h-20 items-center justify-around bg-white/80 shadow-sm backdrop-blur-md">
      <div>
        <Link href="/.">TryCatch</Link>
      </div>

      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/.">inicio</Link>
          </li>

          <li>
            <Link href="#aboutUs">sobre</Link>
          </li>

          <li>
            <Link href="/portfolios">portfolios</Link>
          </li>

          <li>
            <Link href="/.">dúvidas</Link>
          </li>

          <li>
            <Link href="/.">
              <Button
                variant="default"
                size="default"
                className="rounded-full bg-[#35343C] hover:bg-[#35343C]/90"
              >
                Fale com um Dev
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
