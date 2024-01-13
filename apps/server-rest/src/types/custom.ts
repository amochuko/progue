export enum SUPPORTED_LANGUAGE {
  "en",
  "es",
  "fr",
}
export type Language = typeof SUPPORTED_LANGUAGE[number];

/** Sample user object */
export type User = {
  //TODO: Reflect to concrete user
  id: number;
  authToken: string | null;
  /** Language settings  */
  lang: Language;
};
