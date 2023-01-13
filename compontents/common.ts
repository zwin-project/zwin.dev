
export type TableOfContent = {
  level: string,
  title: string,
  href: string,
}

export type DocsProps = {
  html: string,
  tableOfContent: TableOfContent[],
  nextContent: string|null,
  previousContent: string|null,
  id: string|null
}

export const breakpointSidebar = 780;
export const breakpointArticle = 800;
