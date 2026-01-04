// Facebook Pixel type declarations
declare global {
  interface Window {
    fbq: (
      action: 'track' | 'init' | 'trackCustom',
      eventName: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}

export {};

