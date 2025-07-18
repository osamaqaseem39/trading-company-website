
export function extractIdFromSlug(slug: string): string {
  // Extract the ID from the end of the slug (after the last hyphen)
  const parts = slug.split('-');
  return parts[parts.length - 1];
} 