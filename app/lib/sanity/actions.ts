import { sanityClient } from ".";
import { SANITY_CONTACT_INFO_QUERY, SANITY_HOME_PAGE_QUERY } from "./queries";
import { SanityContactInfoData, SanityHomePageData } from "./types";

export const sanityFetchHomePage = async (): Promise<SanityHomePageData> => {
  const page = await sanityClient.fetch<SanityHomePageData>(
    SANITY_HOME_PAGE_QUERY
  );

  if (!page) {
    throw new Error("No home page data found");
  }

  return page;
};

export const sanityFetchContactInfo = async ():Promise<SanityContactInfoData> => {
  const info = await sanityClient.fetch<SanityContactInfoData>(SANITY_CONTACT_INFO_QUERY);

  if(!info){
    throw new Error("No contact info was found")
  }

  return info
}