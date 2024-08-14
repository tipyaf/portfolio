import { SocialNetworkIconMap } from '@/app/constants/social-network-icon-map';
import Button from '@/components/utils/Button';
import { SocialLinks } from '@/types/server';
import { SiMinutemailer } from 'react-icons/si';

interface LinksHeaderSectionProps {
  socialLinksData: SocialLinks[];
}

export function LinksHeaderSection({ socialLinksData }: LinksHeaderSectionProps) {
  const socialLinks = [
    ...socialLinksData.map((item) => ({
      label: item.name,
      href: item.url,
      icon: SocialNetworkIconMap.get(item.code),
    })),
    {
      label: 'Mail',
      href: 'mailto:exemple@mail.com',
      icon: SiMinutemailer,
    },
  ];
  return (
    <ul className="absolute left-0 top-3 flex w-screen justify-center font-bold text-current sm:justify-end">
      {socialLinks.length &&
        socialLinks.map((link, i) => (
          <li
            key={i}
            className="border-l-2 border-solid border-current px-4 last:border-r-2 last:sm:border-r-0"
          >
            <Button
              className="flex flex-row-reverse items-center gap-1 hover:underline"
              href={link.href}
              target="_blank"
              icon={link.icon}
            >
              {link.label}
            </Button>
          </li>
        ))}
    </ul>
  );
}
