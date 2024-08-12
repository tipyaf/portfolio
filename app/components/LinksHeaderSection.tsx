import Button from '@/app/components/utils/Button';
import { ILink } from '@/app/models/link.model';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiMinutemailer } from 'react-icons/si';

// todo: remove to get from server
const socialLinks: ILink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yannick-b-4b9a8592',
    icon: FaLinkedin,
  },
  {
    label: 'Github',
    href: 'https://www.linkedin.com/in/yannick-b-4b9a8592',
    icon: FaGithub,
  },
  {
    label: 'Mail',
    href: 'mailto:exemple@mail.com',
    icon: SiMinutemailer,
  },
];

export function LinksHeaderSection() {
  return (
    <ul className="absolute right-3 top-3 flex gap-4 font-bold text-current">
      {socialLinks.map((link, i) => (
        <>
          <li key={i} className="border-l border-current px-4">
            <Button
              className="flex flex-row-reverse items-center gap-1 hover:underline"
              href={link.href}
              target="_blank"
              icon={link.icon}
            >
              {link.label}
            </Button>
          </li>
        </>
      ))}
    </ul>
  );
}
