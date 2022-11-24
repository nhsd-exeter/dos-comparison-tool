export interface PageMeta {
	url: string;
	title: string;
}

export const getPageTitle = (
	pages: PageMeta[],
	url: string,
	siteTitle: string
) => {
	const current = pages.find((page) => url.includes(page.url));
	return current ? `${current.title} - ${siteTitle}` : siteTitle;
};

export const setPageTitle = (title: string) => {
	document.title = title;
};
