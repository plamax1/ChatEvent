'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    {
      key: 'qr',
      href: '/qr/scan',
      iconActive: '/assets/navbar_icons/qr_active.png',
      iconInactive: '/assets/navbar_icons/qr_inactive.png',
      match: ['/qr', '/qr/scan'],
    },
    {
      key: 'events',
      href: '/events',
      iconActive: '/assets/navbar_icons/events_active.png',
      iconInactive: '/assets/navbar_icons/events_inactive.png',
      match: ['/events'],
    },
    {
      key: 'profile',
      href: '/profile',
      iconActive: '/assets/navbar_icons/profile_active.png',
      iconInactive: '/assets/navbar_icons/profile_inactive.png',
      match: ['/profile'],
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-[56px] flex items-center justify-around z-40">
      {items.map(({ key, href, iconActive, iconInactive, match }) => {
        const isActive = match.some(path => pathname.startsWith(path));
        const iconSrc = isActive ? iconActive : iconInactive;

        return (
          <Link
            key={key}
            href={href}
            className="flex items-center justify-center w-12 h-12"
          >
            <img
              src={iconSrc}
              alt={key}
              width={28}
              height={28}
              className="select-none"
            />
          </Link>
        );
      })}
    </nav>
  );
}
