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
      </body>
    </html>
  );
}

