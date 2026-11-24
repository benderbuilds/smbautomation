import Script from 'next/script';

/* GoHighLevel (LeadConnector) chat widget, on every page including paid landing
   pages. Rendered once, from the root layout, so there is exactly one launcher.
   The widget opens straight to Live Chat; that behavior is set in GHL, not here. Loaded lazily so it never competes
   with page content or analytics for first paint. */
export default function ChatWidget() {
  return (
    <Script
      id="leadconnector-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6b04c0d3e6cd500e966e2168"
      strategy="lazyOnload"
    />
  );
}
