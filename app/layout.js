import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Hotel Booking System - Find Your Perfect Stay',
  description: 'Book hotels online with the best prices. Browse hotels, view details, and make reservations easily.',
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
