'use client'

import Script from 'next/script'

export default function Metrika() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  const id = process.env.NEXT_PUBLIC_YM_ID

  return (
    <>
      {/* Loader */}
      <Script
        id='yandex-metrika-loader'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.webvisor.org/metrika/tag_ww.js?id=${id}','ym');
          `,
        }}
      />

      {/* Init */}
      <Script
        id='yandex-metrika-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            ym(${id}, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              trackHash: true
            });
          `,
        }}
      />
    </>
  )
}
