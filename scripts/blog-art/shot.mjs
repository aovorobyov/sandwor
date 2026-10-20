// node shot.mjs <url> <w> <h> <out.png> [prepare.js] [--dpr=2] [--wait=3000]
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
const a = process.argv.slice(2);
const pos = a.filter((x) => !x.startsWith('--'));
const opt = Object.fromEntries(
  a.filter((x) => x.startsWith('--')).map((x) => x.slice(2).split('=')),
);
const [url, w, h, out, prep] = pos;
const port = 9300 + Math.floor(Math.random() * 600);
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${mkdtempSync(tmpdir() + '/cdp-')}`,
    '--no-first-run',
    '--hide-scrollbars',
    `--window-size=${w},${h}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
setTimeout(
  () => {
    chrome.kill();
    console.log('TIMEOUT');
    process.exit(13);
  },
  +(opt.max || 70000),
);
let list;
for (let i = 0; i < 60; i++) {
  try {
    list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    break;
  } catch {
    await sleep(200);
  }
}
const page = list.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pend = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) {
    pend.get(m.id)(m);
    pend.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pend.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const mobile = +w < 768;
await send('Emulation.setDeviceMetricsOverride', {
  width: +w,
  height: +h,
  deviceScaleFactor: +(opt.dpr || 2),
  mobile,
});
if (mobile)
  await send('Emulation.setUserAgentOverride', {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
await send('Page.enable');
await send('Runtime.enable');
if (opt.init)
  await send('Page.addScriptToEvaluateOnNewDocument', { source: readFileSync(opt.init, 'utf8') });
await send('Page.navigate', { url });
await sleep(+(opt.wait || 3500));
if (prep) {
  const r = await send('Runtime.evaluate', {
    expression: `(async()=>{${readFileSync(prep, 'utf8')}})()`,
    awaitPromise: true,
    returnByValue: true,
  });
  console.log(
    JSON.stringify(r.result.result?.value ?? r.result.exceptionDetails?.exception?.description),
  );
}
await sleep(1500);
let shotOpts = { format: 'png' };
if (opt.full) {
  const m = await send('Page.getLayoutMetrics');
  const hh = Math.ceil(m.result.cssContentSize.height);
  shotOpts = {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: +w, height: Math.min(hh, +opt.full), scale: 1 },
  };
}
// --clip="css-селектор" — снять только этот элемент (прозрачный фон не нужен: снимок как есть).
if (opt.clip) {
  // Прозрачный фон страницы: блок ляжет на фон OG-шаблона без тёмного прямоугольника.
  await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  await send('Runtime.evaluate', {
    expression: `(() => { const st = document.createElement('style'); st.textContent = '*:not([data-hero-activity] *):not([data-hero-activity]) { background: transparent !important; background-image: none !important; } .amo-button-holder,[data-cookie-notice]{display:none!important} [data-hero-activity] [class*=toast]{animation:none!important;opacity:0!important} [data-hero-activity] [class*=toast]:first-child{opacity:1!important;transform:none!important} [data-hero-activity] *{animation-delay:-0.5s!important;animation-play-state:paused!important}'; document.head.append(st); })()`,
  });
  const r = await send('Runtime.evaluate', {
    expression: `(() => { const el = document.querySelector(${JSON.stringify(opt.clip)}); el.scrollIntoView({block:'center'}); const b = el.getBoundingClientRect(); return [b.x, b.y, b.width, b.height]; })()`,
    returnByValue: true,
  });
  const [x, y, width, height] = r.result.result.value;
  await sleep(300);
  shotOpts = { ...shotOpts, clip: { x, y, width, height, scale: +(opt.dpr || 2) } };
}
// --jpeg=85 — JPEG вместо PNG (OG-картинки: соцсети и мессенджеры читают его везде).
if (opt.jpeg) shotOpts = { ...shotOpts, format: 'jpeg', quality: +opt.jpeg };
const sh = await send('Page.captureScreenshot', shotOpts);
writeFileSync(out, Buffer.from(sh.result.data, 'base64'));
ws.close();
chrome.kill();
process.exit(0);
