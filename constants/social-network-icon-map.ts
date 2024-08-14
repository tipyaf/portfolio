import { SocialLinkCode } from '@/types/server';
import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export const SocialNetworkIconMap: Map<SocialLinkCode, IconType> = new Map<
  SocialLinkCode,
  IconType
>([
  [SocialLinkCode.GHUB, FaGithub],
  [SocialLinkCode.LKIN, FaLinkedin],
]);
