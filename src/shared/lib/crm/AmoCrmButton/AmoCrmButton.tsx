import Script from 'next/script';
import type { FC } from 'react';
import { AMO_BUTTON_HASH, AMO_BUTTON_ID } from '../config';
import type { AmoCrmButtonProps } from './AmoCrmButton.types';

/**
 * Виджет amoCRM «Кнопка на сайт»: плавающая кнопка с каналами связи и чатом.
 * Официальный сниппет amoCRM без изменений, id/hash/locale подставляются из конфига.
 * Грузится через next/script (afterInteractive) — не блокирует гидрацию,
 * а `id` не даёт вставить скрипт дважды при клиентской навигации.
 */
export const AmoCrmButton: FC<AmoCrmButtonProps> = ({ locale }) => {
  return (
    <Script id="amo-social-button" strategy="afterInteractive">
      {`(function(a,m,o,c,r,m){a[m]={id:"${AMO_BUTTON_ID}",hash:"${AMO_BUTTON_HASH}",locale:"${locale}",inline:false,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.amocrm.ru/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'amoSocialButton',0,0,'amo_social_button'));`}
    </Script>
  );
};
