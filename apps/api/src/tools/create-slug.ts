export function createSlug(text: string): string {
  // Remove accents and symbols
  const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Replace spaces with hyphens
  const hyphenatedText = normalizedText.replace(/\s+/g, '-')

  // Remove non-alphanumeric characters except hyphens
  const alphanumericText = hyphenatedText.replace(/[^a-zA-Z0-9-]/g, '')

  // Remove leading and trailing hyphens
  const trimmedText = alphanumericText.replace(/^-+|-+$/g, '')

  // Convert to lowercase
  const slug = trimmedText.toLowerCase()

  return slug
}
