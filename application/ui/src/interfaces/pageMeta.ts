import { basePath, loginPath } from "./navigationPaths";
import { PageMeta } from "../utils/pageTitles";

export const siteTitle = "NHS DoS Comparison Tool";

export const pageMeta: PageMeta[] = [
	{
		url: basePath,
		title: "Welcome to DoS Comparison Tool",
	},
	{
		url: loginPath,
		title: "Login to DoS Comparison Tool",
	},
];
