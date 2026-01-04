import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "City Center Apartments - Downtown Spokane Living",
  description:
    "Spacious 1-bedroom apartment in downtown Spokane. Walk to Gonzaga University and Sacred Heart Medical Center. $1,000/month.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
        {/* Ardalio Tracking Code */}
        <span id="wts2192966" style={{ display: 'none' }}></span>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var wts=document.createElement('script');wts.async=true;
              wts.src='https://app.ardalio.com/wts7.js';document.head.appendChild(wts);
              wts.onload = function(){ wtsl7(2192966,3); };
            `,
          }}
        />
        <noscript>
          <img src="https://app.ardalio.com/7/3/2192966.png" alt="" style={{ display: 'none' }} />
        </noscript>
      </body>
    </html>
  );
}

