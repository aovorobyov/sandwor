import Script from 'next/script';
import type { FC } from 'react';
import { YM_ID, isAnalyticsHost } from '../config';

/**
 * Счётчик Яндекс.Метрики: вебвизор, карта кликов, точный показатель отказов, трекинг ссылок.
 * Грузится через next/script (afterInteractive) — не блокирует гидрацию.
 * Рендерится только на боевых доменах (isAnalyticsHost) — локальная разработка и превью
 * не засоряют статистику. Компонент клиентский: CookieConsent включает его после согласия.
 */
export const YandexMetrika: FC = () => {
  if (!YM_ID || !isAnalyticsHost()) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
      </Script>

      <noscript>
        <div>
          {/* next/image требует JS — внутри noscript работает только нативный img */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
