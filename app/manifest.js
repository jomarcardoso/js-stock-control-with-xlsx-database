/**
 *
 * @returns {import('next').MetadataRoute.Manifest}
 */
export default function manifest() {
  return {
    name: 'Stock Control',
    short_name: 'Stock Control',
    description: 'Stock Control',
    start_url: '/js-stock-control-with-xlsx-database',
    display: 'standalone',
    // background_color: '#fff',
    // theme_color: '#fff',
    icons: [
      {
        src: '/js-stock-control-with-xlsx-database/img/logo.png',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
