import Script from 'next/script';
import type { FC } from 'react';
import { YM_ID } from '../config';

/**
 * Счётчик Яндекс.Метрики: вебвизор, карта кликов, точный показатель отказов, трекинг ссылок.
 * Грузится через next/script (afterInteractive) — не блокирует гидрацию.
 * Без NEXT_PUBLIC_YM_ID ничего не рендерит — локальная разработка не засоряет статистику.
 */
export const YandexMetrika: FC = () => {
  if (!YM_ID) {
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
