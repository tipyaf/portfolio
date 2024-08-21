import Button from '@/components/utils/Button';
import { SocialNetworkIconMap } from '@/constants/social-network-icon-map';
import { SocialLink } from '@/types/server/social-link.model';
import { SiMinutemailer } from 'react-icons/si';

interface LinksHeaderSectionProps {
  socialLinksData: SocialLink[];
  email?: string;
}

export function LinksHeaderSection({ socialLinksData, email }: LinksHeaderSectionProps) {
  const socialLinks = [
    ...socialLinksData.map((item) => ({
      label: item.name,
      href: item.url,
      icon: SocialNetworkIconMap.get(item.code),
    })),
    {
      label: 'Mail',
      href: `mailto:${email}`,
      icon: SiMinutemailer,
    },
  ];
  return (
    <ul className="absolute bottom-3 left-0 flex w-screen justify-center font-bold text-current sm:justify-end">
      {socialLinks.map((link, i) => (
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
