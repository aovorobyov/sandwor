# Локальные правки дизайн-системы

Папка — копия архива `sandwor-design-system.zip`. Код компонентов не правим,
кроме перечисленного ниже: это необязательные пропсы для английской версии сайта,
обратно совместимые со всеми текущими вызовами. При обновлении архива перенесите
их в саму ДС (или повторите здесь), затем запустите `node scripts/sandwor-dts.mjs`.

| Компонент   | Что добавлено                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------- |
| ServiceCard | `label` — моно-метка услуги вместо `SERVICES[service].label`; `badge` — метка справа в шапке (+ `.sw-service-card__badge` в CSS) |
| CaseCard    | `labels` — `{ task, solution, services }`: подписи строк и бейджей услуг                          |
| SiteHeader  | `menu.closeLabel`, `menu.navLabel`, `menu.label` — подписи MobileMenu для скринридера                |
| BriefForm   | `consent` — обязательный чекбокс согласия на обработку ПД на шаге «Контакты» (`values.consent`, `copy.errConsent`); `copy.fine` принимает ReactNode (ссылка на политику) |
| Calculator  | `copy.serviceLabels`, `copy.managersText`, `copy.monthsText`, `copy.managersHint`, `copy.perMonth` |

SiteHeader: уже 760px ширины шапки primary-кнопка скрыта (`.sw-header__cta`) — на телефоне
она наезжала на логотип; то же действие есть внизу MobileMenu.

Исправлено: PricingCard дописывал «₽» и к строковой цене («по запросу ₽») — по описанию
пропа строка выводится как есть, теперь знак рубля только у числа.

В типах `ButtonProps` добавлены `target` и `rel`: компонент и раньше передавал их на `<a>`,
но в `index.d.ts` их не было.

Article (`.sw-prose`): `figure > picture > img` оформляется так же, как `figure > img`, —
в статьях есть схемы с отдельной картинкой для телефона (`<source media="(max-width: 600px)">`).

Типы новых пропсов — в `types/index.d.ts`, помечены `[sandwor.ru]`.

Ещё добавлены файлы `src/components/*.d.ts` и `src/utils.d.ts` — их генерирует
`scripts/sandwor-dts.mjs`, руками не правим. `preview/` из архива в проект не
копируется: витрина живёт в справочнике ДС.
