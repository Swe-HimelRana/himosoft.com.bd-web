type JsonLdValue = Record<string, unknown>;

type Props = {
  data: JsonLdValue | JsonLdValue[];
};

function toGraphPayload(items: JsonLdValue[]): string {
  if (items.length === 1) {
    return JSON.stringify({
      "@context": "https://schema.org",
      ...items[0],
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": items.map(({ "@context": _context, ...entity }) => entity),
  });
}

export function JsonLd({ data }: Props) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: toGraphPayload(graph),
      }}
    />
  );
}
