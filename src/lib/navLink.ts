export function isExternalNavHref(href: string, external?: boolean): boolean {
  if (external) return true;
  return href.startsWith("http://") || href.startsWith("https://");
}

export function externalNavLinkProps(href: string, external?: boolean) {
  if (!isExternalNavHref(href, external)) return {};
  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
