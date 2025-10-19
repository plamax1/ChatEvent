'use client';
import Link from 'next/link';

export default function BottomNav({ active }) {
  const items = [
    {
      key: 'qr',
      href: '/qr/scan',
      iconActive: '/assets/navbar_icons/qr_active.png',
      iconInactive: '/assets/navbar_icons/qr_inactive.png',
    },
    {
      key: 'events',
      href: '/events',
      iconActive: '/assets/navbar_icons/events_active.png',
      iconInactive: '/assets/navbar_icons/events_inactive.png',
    },
    {
      key: 'profile',
      href: '/profile',
      iconActive: '/assets/navbar_icons/profile_active.png',
      iconInactive: '/assets/navbar_icons/profile_inactive.png',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-[56px] flex items-center justify-around z-40">
      {items.map(({ key, href, iconActive, iconInactive }) => {
        const isActive = key === active;
        const iconSrc = isActive ? iconActive : iconInactive;
        console.log(key, iconSrc, isActive);

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
