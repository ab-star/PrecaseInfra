export default async function sitemap() {
  const now = new Date();

  return [
    {
      url: "https://3ginfratech.in",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://3ginfratech.in/products/box-culvert",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://3ginfratech.in/products/drains",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://3ginfratech.in/products/walls",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://3ginfratech.in/view-gallery",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://3ginfratech.in/view-projects",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://3ginfratech.in/case-study",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://3ginfratech.in/why-3ginfra",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://3ginfratech.in/certifications",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://3ginfratech.in/contacts",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
