const PATRON_SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function esSlug(valor: string): boolean {
  return PATRON_SLUG.test(valor)
}
