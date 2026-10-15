import type { Metadata } from "next";

export const SITE_URL = "https://cescjardiners.cat";
export const SITE_NAME = "Cesc Jardiners";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/zona-jardi.webp",
  keywords,
}: SeoOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "ca_ES",
      siteName: SITE_NAME,
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image, alt: `${title} - ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
