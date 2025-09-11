import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

import { SanityImage } from "./types"

const { NEXT_PUBLIC_SANITY_TOKEN } = process.env

export const sanityClient = createClient({
  projectId: 'm4e8pq15',
  dataset: 'production',
  apiVersion: '2025-09-02',
  useCdn: true,
  token: NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(sanityClient);

export const urlForImage = (source: SanityImage) => {
  return builder.image(source);
};
