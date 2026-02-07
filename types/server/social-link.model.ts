export enum SocialLinkCode {
  LKIN = 'LKIN',
  GHUB = 'GHUB',
}

export type SocialLink = {
  readonly name: string;
  url: string;
  url_fr?: string;
  code: SocialLinkCode;
};
