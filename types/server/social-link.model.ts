export enum SocialLinkCode {
  LKIN = 'LKIN',
  GHUB = 'GHUB',
}

export type SocialLink = { readonly name: string; url: string; code: SocialLinkCode };
