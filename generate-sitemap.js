import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://dreamydates.ca' });
const routes = [
  '/',
  '/dates',
  '/proposal',
  '/surprises',
  '/flowers',
  '/contact',
];

routes.forEach((url) => sitemap.write({ url, changefreq: 'weekly', priority: 0.8 }));
sitemap.end();

streamToPromise(sitemap).then((data) =>
  createWriteStream('./public/sitemap.xml').write(data)
);