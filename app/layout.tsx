import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Facebook Meta Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1411298773247403');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1411298773247403&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Analytics />
        {children}
        {/* Ardalio Tracking Code with Duration Support */}
        <span id="wts2192966" style={{ display: 'none' }}></span>
        <Script
          id="ardalio-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Store page load time for duration tracking
              var wtsStartTime = Date.now();
              var wtsDurationSent = false;
              
              // Function to send duration to Ardalio
              function sendWtsDuration() {
                if (wtsDurationSent) return;
                wtsDurationSent = true;
                
                var duration = Math.round((Date.now() - wtsStartTime) / 1000);
                var trackingUrl = 'https://app.ardalio.com/7/3/2192966.png?d=' + duration + '&r=' + Math.random();
                
                // Use sendBeacon for reliable exit tracking
                if (navigator.sendBeacon) {
                  navigator.sendBeacon(trackingUrl);
                } else {
                  // Fallback for older browsers
                  var img = new Image();
                  img.src = trackingUrl;
                }
              }
              
              // Load the main tracking script
              var wts=document.createElement('script');wts.async=true;
              wts.src='https://app.ardalio.com/wts7.js';document.head.appendChild(wts);
              wts.onload = function(){ 
                wtsl7(2192966,3);
              };
              
              // Track duration on visibility change (tab switch, minimize, close)
              document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'hidden') {
                  sendWtsDuration();
                }
              });
              
              // Track duration on page unload (desktop browsers)
              window.addEventListener('beforeunload', function() {
                sendWtsDuration();
              });
              
              // Track duration on pagehide (iOS Safari, mobile browsers)
              window.addEventListener('pagehide', function(e) {
                sendWtsDuration();
              });
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

