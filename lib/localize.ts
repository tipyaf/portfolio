/**
 * Pick the localized value for a given field.
 * Falls back to the English (default) value if the French variant is missing.
 *
 * Usage: localize(profile, 'fullName', locale) → profile.fullName or profile.fullName_fr
 */
export function localize<T>(obj: T, field: keyof T & string, locale: string): T[keyof T] {
  if (locale === 'fr') {
    const frKey = `${field}_fr` as keyof T;
    const frValue = obj[frKey];
    if (frValue !== undefined && frValue !== null && frValue !== '') {
      return frValue;
    }
  }
  return obj[field];
}
