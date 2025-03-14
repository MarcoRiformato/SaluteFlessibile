'use client'

import { useEffect } from 'react'

// Add proper type definitions
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    _iub: {
      csConfiguration: {
        siteId: number;
        cookiePolicyId: number;
        lang: string;
        storage: { useSiteId: boolean };
        askConsentIfNeeded: boolean;
        callback: {
          onReady: () => void;
        };
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}

export default function IubendaScripts() {
  useEffect(() => {
    // Step 1: Initialize Iubenda Configuration
    if (!window._iub) window._iub = { csConfiguration: {} as any };
    
    window._iub.csConfiguration = {
      siteId: 3962328,
      cookiePolicyId: 70509524,
      lang: "it",
      storage: { useSiteId: true },
      askConsentIfNeeded: true,
      callback: {
        onReady: function() {
          // Step 3: Load analytics only after Iubenda is ready
          
          // Hotjar
          const hotjarScript = document.createElement('script');
          hotjarScript.type = 'text/javascript';
          hotjarScript.innerHTML = `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:5332577,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `;
          document.head.appendChild(hotjarScript);
          
          // Google Analytics
          const gaScript1 = document.createElement('script');
          gaScript1.async = true;
          gaScript1.src = 'https://www.googletagmanager.com/gtag/js?id=G-1J1HTBQV0Y';
          document.head.appendChild(gaScript1);
          
          const gaScript2 = document.createElement('script');
          gaScript2.type = 'text/javascript';
          gaScript2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1J1HTBQV0Y');
          `;
          document.head.appendChild(gaScript2);
        }
      }
    };

    // Create a script element to hold the Iubenda config
    const iubendaConfig = document.createElement('script');
    iubendaConfig.type = 'text/javascript';
    iubendaConfig.innerHTML = `
      var _iub = _iub || [];
      _iub.csConfiguration = ${JSON.stringify(window._iub.csConfiguration)};
    `;
    document.head.appendChild(iubendaConfig);

    // Step 2: Add Iubenda scripts in the correct order
    const autoBlockingScript = document.createElement('script');
    autoBlockingScript.type = 'text/javascript';
    autoBlockingScript.src = 'https://cs.iubenda.com/autoblocking/3962328.js';
    document.head.appendChild(autoBlockingScript);

    const mainScript = document.createElement('script');
    mainScript.type = 'text/javascript';
    mainScript.src = '//cdn.iubenda.com/cs/iubenda_cs.js';
    mainScript.charset = 'UTF-8';
    mainScript.async = true;
    document.head.appendChild(mainScript);

    // Cleanup function
    return () => {
      try {
        document.head.removeChild(iubendaConfig);
        document.head.removeChild(autoBlockingScript);
        document.head.removeChild(mainScript);
        // Note: We're not cleaning up analytics scripts as they might still be in use
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return null;
} 