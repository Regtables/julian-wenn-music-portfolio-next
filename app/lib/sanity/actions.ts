import { sanityClient } from ".";
import { SANITY_HOME_PAGE_QUERY } from "./queries";
import { SanityHomePageData } from "./types";

export const sanityFetchHomePage = async (): Promise<SanityHomePageData> => {
  const page = await sanityClient.fetch<SanityHomePageData>(
    SANITY_HOME_PAGE_QUERY
  );

  if (!page) {
    throw new Error("No home page data found");
  }

  return page;
};