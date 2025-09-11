export const MEDIA_FRAGMENT = `{
  _id,
  mediaType,
  title,
  "fileUrl": select(
    mediaType == "image" => image.image.asset->url,
    mediaType == "youtube" => youtubeUrl,
    mediaType == "video" => videoFile.asset->url,
    null
  ),
  "videoUrlWebm": videoFile.asset->url,
  "videoUrlMp4": videoFileMp4.asset->url,
  "alt": image.alt
}`;

export const PAGE_SEO_FRAGMENT = `pageSeo {
    title,
    description,
    "ogImage": ogImage{
      "url": asset->url,
      alt
    },
    noIndex,
    canonicalUrl
  }`;

export const PAGE_FRAGMENT = `
  heading,
  ${PAGE_SEO_FRAGMENT}`;

export const CONTENT_BLOCK_FRAGMENT = `{
  title,
  heading,
  text,
  buttonText,
  media-> ${MEDIA_FRAGMENT}
}`;
