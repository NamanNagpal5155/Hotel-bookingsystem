import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Hotel Booking System - Find Your Perfect Stay',
  description:
    'Book hotels online with the best prices. Browse hotels, view details, and make reservations easily.',

  metadataBase: new URL('https://hotel-bookingsystem-chi.vercel.app'),

  openGraph: {
    title: 'Hotel Booking System - Find Your Perfect Stay',
    description:
      'Book hotels online with the best prices. Browse hotels, view details, and make reservations easily.',
    url: 'https://hotel-bookingsystem-chi.vercel.app/',
    siteName: 'Hotel Booking System',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hotel Booking System',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}