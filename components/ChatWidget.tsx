import Script from 'next/script';

/* GoHighLevel (LeadConnector) chat widget, on every page including paid landing
   pages. Loaded lazily so it never competes
   with page content or analytics for first paint. */
export default function ChatWidget() {
  return (
    <Script
      id="leadconnector-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6af772b690f7860d2972c6b2"
      strategy="lazyOnload"
    />
  );
}
