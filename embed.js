/*
 * Gefen's chat button for any website. Paste before </body>:
 *   <script src="https://high56.github.io/gefen/embed.js" async></script>
 * Optional: data-label="טקסט אחר" and data-side="right".
 */
(function () {
  var me = document.currentScript;
  if (!me || window.__gefenChat) return;
  window.__gefenChat = true;
  var base = me.src.replace(/embed\.js(\?.*)?$/, '');
  var label = me.getAttribute('data-label') || 'לקבלת הצעת מחיר';
  var side = me.getAttribute('data-side') === 'right' ? 'right' : 'left';
  var green = '#4d6a2b';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '💬 ' + label;
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.style.cssText = 'position:fixed;bottom:18px;' + side + ':18px;z-index:2147483000;border:0;border-radius:999px;' +
    'background:' + green + ';color:#fff;font:700 16px/1 Heebo,Arial,sans-serif;padding:14px 20px;' +
    'box-shadow:0 6px 18px rgba(0,0,0,.25);cursor:pointer;direction:rtl;';

  var wrap = null, last = null;
  function open() {
    last = document.activeElement;
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.setAttribute('role', 'dialog');
      wrap.setAttribute('aria-modal', 'true');
      wrap.setAttribute('aria-label', 'צ\'אט עם גפן ארגון וסידור בתים');
      wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483001;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:' + (side === 'left' ? 'flex-start' : 'flex-end') + ';';
      var box = document.createElement('div');
      box.style.cssText = 'position:relative;width:min(420px,100vw);height:min(700px,100dvh);background:#f3f5ee;border-radius:16px 16px 0 0;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.3);';
      var x = document.createElement('button');
      x.type = 'button'; x.textContent = '×'; x.setAttribute('aria-label', 'לסגור');
      x.style.cssText = 'position:absolute;top:8px;left:8px;z-index:2;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.9);font:700 22px/1 Arial;cursor:pointer;';
      var frame = document.createElement('iframe');
      frame.title = 'צ\'אט עם גפן';
      frame.src = base + '?embed=1&src=' + encodeURIComponent(location.hostname || 'אתר');
      frame.style.cssText = 'width:100%;height:100%;border:0;display:block;';
      x.addEventListener('click', close);
      wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
      box.appendChild(x); box.appendChild(frame); wrap.appendChild(box);
      document.body.appendChild(wrap);
      wrap._x = x;
    }
    wrap.style.display = 'flex';
    wrap._x.focus();
  }
  function close() { if (wrap) wrap.style.display = 'none'; if (last && last.focus) last.focus(); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap && wrap.style.display !== 'none') close(); });
  btn.addEventListener('click', open);
  (document.body || document.documentElement).appendChild(btn);
})();
