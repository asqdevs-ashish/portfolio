/**
 * Renders a tiny JSON-LD script block. Keeps structured data inline with the
 * page that owns it, so schema always matches visible content.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}