/* ===== EDIT ME ===== */
const LETTER = `To my favourite human, ♡

Happy Birthday, my love. ❤️

I wish I could be right beside you today, holding you close and making this day as beautiful as you deserve.

You make my world brighter in ways I cannot fully explain. Your smile, your little habits, your love, and even the smallest moments with you mean more to me than you know.

I might not always find the perfect words, but I hope you never forget how special you are to me. I wish this new year of your life brings you endless happiness, peace, success, and all the little things your heart wishes for.

If I could make one wish today, it would be to see you smile and know that you feel as loved as you truly are.

Happy Birthday, baby. No matter the distance, you will always have a special place in my heart.

I love you, my birthday girl. Always and a little more every day. ♡`;

const REASONS = [ // [emoji, text]
  ["🌸","Your smile makes my day better."],["✨","You make ordinary moments feel special."],
  ["💬","You are my favourite person to talk to."],["🌙","You make distance feel a little easier."],
  ["🌱","You inspire me to become a better person."],["🌹","Because you're simply you, and that's more than enough."],
  ["☀️","Your laugh is my favourite sound."],["🦋","You make me feel safe and understood."],
  ["💞","You love so deeply and so genuinely."], ["💞","I love you mero bacchu mero cutuu mero bhuntu"]
];

// Each click shows the next [title, message] and loops. Add or edit as many as you like.
const WISHES = [
  ["Wish made ✨","Your wish is between you and the universe. I hope it comes true. ✨"],
  ["Make it a big one 🌟","Whatever you wished for, I'll be cheering for it every single day."],
  ["Another one? 🕯️","You deserve every wish on every candle, my love."],
  ["The universe heard you 🌙","And I'm already hoping so hard that it comes true for you. ♡"]
];
const HUGS = [
  ["Biggest hug 🫂","Sending you the biggest hug and a million kisses until I can give them to you myself. 💋"],
  ["Squeezing you tight 💞","Close your eyes, feel that? That's me holding you. ♡"],
  ["Hug number three 🌹","I'd never get tired of this. Not today, not ever."],
  ["Forever hug ❤️","Wherever you are, my arms are always around you."]
];
let wishI = 0, hugI = 0;
const show = (el, [t, m]) => { el.innerHTML = `<span class="t">${t}</span>${m}`; el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); };
/* ==================== */

const $ = s => document.querySelector(s);
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EXTS = ['jpg','jpeg','png','webp','JPG','JPEG','PNG']; // photo file types we try

/* --- Floating hearts & petals --- */
const fl = $('#float');
['♥','🌸','♡','🌹','✦'].forEach(() => {});
for (let i = 0; i < (calm ? 0 : 16); i++) {
  const e = document.createElement('span'); e.className = 'fp';
  e.textContent = ['♥','🌸','♡','🌹','✦'][i % 5];
  e.style.cssText = `left:${Math.random()*100}%;font-size:${14+Math.random()*16}px;animation-duration:${9+Math.random()*10}s;animation-delay:-${Math.random()*15}s;color:#e0607f`;
  fl.appendChild(e);
}

/* --- Confetti / hearts / petals on a canvas --- */
const cv = $('#fx'), cx = cv.getContext('2d'); let parts = [], run = false;
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
size(); addEventListener('resize', size);
function burst(n = 90, chars = null, fromTop = false) {
  if (calm) n = 12;
  for (let i = 0; i < n; i++) parts.push({
    x: fromTop ? Math.random()*cv.width : cv.width/2, y: fromTop ? -20 : cv.height*0.45,
    vx: (Math.random()-.5)*(fromTop?3:14), vy: fromTop ? 1+Math.random()*3 : -Math.random()*12,
    g: fromTop ? .02 : .25, r: Math.random()*6, vr: (Math.random()-.5)*.2, life: 170,
    c: ['#e0607f','#f4a3b8','#ffd166','#fff','#c8365a'][i%5], t: chars ? chars[i%chars.length] : null, s: 10+Math.random()*10
  });
  if (!run) { run = true; requestAnimationFrame(loop); }
}
function loop() {
  cx.clearRect(0,0,cv.width,cv.height);
  parts = parts.filter(p => p.life-- > 0);
  for (const p of parts) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr;
    cx.save(); cx.translate(p.x,p.y); cx.rotate(p.r); cx.globalAlpha = Math.min(1,p.life/40); cx.fillStyle = p.c;
    if (p.t) { cx.font = p.s*1.6+'px serif'; cx.fillText(p.t,0,0); } else cx.fillRect(-4,-2,8,4+p.s/4);
    cx.restore();
  }
  parts.length ? requestAnimationFrame(loop) : (run = false, cx.clearRect(0,0,cv.width,cv.height));
}
const petals = () => burst(40, ['🌸','🌹','🌷'], true);

/* --- Music playlist: edit TRACKS, then put the mp3 files in the music folder --- */
const TRACKS = [
  { title: 'Happy Birthday',  file: 'music/birthday-music.mp3' },
  { title: 'Our Song',        file: 'music/song2.mp3' },
  { title: 'Soft & Romantic', file: 'music/song3.mp3' },
  { title: 'Just For You',    file: 'music/song4.mp3' }
];
const audio = new Audio(); audio.volume = .5; audio.preload = 'auto';
let cur = 0; const bad = new Set();          // bad = tracks whose file is missing
function toast(t){
  let el = $('#toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast';
    el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99;background:#fff;color:#7a2238;padding:.7rem 1.1rem;border-radius:99px;box-shadow:0 8px 24px rgba(0,0,0,.2);font:500 .95rem Quicksand,system-ui,sans-serif;max-width:90vw;text-align:center';
    document.body.appendChild(el); }
  el.textContent = t; el.style.display = 'block'; clearTimeout(el._t); el._t = setTimeout(() => el.style.display = 'none', 3500);
}
const panel = document.createElement('div'); panel.id = 'mpanel'; panel.hidden = true; document.body.appendChild(panel);
function render(){
  panel.innerHTML = `<button class="pp">${audio.paused ? '▶ Play' : '⏸ Pause'}</button>` +
    TRACKS.map((t,i) => `<button data-i="${i}" class="${i===cur?'cur':''}${bad.has(i)?' bad':''}">${i===cur && !audio.paused ? '♫ ' : ''}${t.title}${bad.has(i) ? ' (add file)' : ''}</button>`).join('');
  $('#music').classList.toggle('off', audio.paused);
  if (typeof pick !== 'undefined') pick.querySelectorAll('button').forEach((b,i) => {
    b.classList.toggle('cur', i === cur && !audio.paused); b.classList.toggle('bad', bad.has(i));
  });
}
function play(i){
  cur = i; audio.src = TRACKS[i].file;
  return audio.play().then(() => { bad.delete(i); render(); }).catch(render);
}
function playMusic(){ return play(cur); }        // called from the Open tap (needed for iPhones)
function togglePlay(){
  if (!audio.paused) { audio.pause(); return; }
  (audio.getAttribute('src') ? audio.play().catch(render) : play(cur));
}
function nextTrack(){
  for (let k = 1; k <= TRACKS.length; k++) { const n = (cur + k) % TRACKS.length; if (!bad.has(n)) return play(n); }
}
audio.addEventListener('play', render); audio.addEventListener('pause', render);
audio.addEventListener('ended', render); // a song just stops when it ends; she chooses the next one herself
audio.addEventListener('error', () => { bad.add(cur); render(); toast('Add ' + TRACKS[cur].file + ' to play this song'); });
panel.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.classList.contains('pp')) return togglePlay();
  const i = +b.dataset.i; (i === cur && !audio.paused) ? audio.pause() : play(i);
};
$('#music').onclick = e => { e.stopPropagation(); panel.hidden = !panel.hidden; render(); };
document.addEventListener('click', e => { if (!panel.contains(e.target)) panel.hidden = true; });
/* Opening-screen song chooser: she taps a song, hears it, then opens the surprise */
const pick = document.createElement('div'); pick.id = 'songPick';
pick.innerHTML = '<p>Choose euta geet🎶</p><div class="chips">' + TRACKS.map((t,i) => `<button data-i="${i}">${t.title}</button>`).join('') + '</div>';
pick.onclick = e => { const b = e.target.closest('button'); if (!b) return; const i = +b.dataset.i; (i === cur && !audio.paused) ? audio.pause() : play(i); };
$('#intro').insertBefore(pick, $('#openBtn'));
render();

/* --- Opening --- */
$('#openBtn').onclick = () => {
  if (audio.paused) playMusic(); // must run directly inside the tap for iPhones
  $('#env').classList.add('open');
  setTimeout(() => {
    $('#intro').classList.add('gone'); $('#main').hidden = false; document.body.classList.remove('locked');
    burst(60, ['♥','♡']); watch(); setTimeout(()=>$('#intro').remove(), 1300);
  }, 900);
};
$('#env').onclick = () => $('#openBtn').click();

/* --- Cake: tap each candle to blow it out; tap the cake again to relight --- */
const candles = [...document.querySelectorAll('.candle')];
function checkAllOut(){
  if (candles.every(c => c.classList.contains('off'))) {
    show($('#wishMsg'), WISHES[wishI++ % WISHES.length]);
    burst(120); burst(30, ['♥','✨','♡']);
  }
}
candles.forEach(c => c.addEventListener('click', e => {
  e.stopPropagation();
  if (c.classList.contains('off')) return;
  c.classList.add('off'); checkAllOut();
}));
function relight(){ candles.forEach(c => c.classList.remove('off')); }
$('#cake').onclick = () => { if (candles.every(c => c.classList.contains('off'))) relight(); else { candles.forEach(c => c.classList.add('off')); checkAllOut(); } };
$('#wishBtn').onclick = () => { if (candles.every(c => c.classList.contains('off'))) relight(); candles.forEach(c => c.classList.add('off')); checkAllOut(); };

/* --- Flowers --- */
const bq = $('#bouquet'); document.body.appendChild(bq); // moved out of its panel so it can fill the whole screen
$('#flowerBtn').onclick = () => {
  bq.hidden = false; bq.classList.remove('go'); void bq.offsetWidth; bq.classList.add('go');   // restart the pop-up animation
  petals(); petals(); burst(40, ['🌷','💗','🌸']);
};
bq.addEventListener('click', () => bq.hidden = true);   // tap anywhere to close

/* --- Gallery + lightbox + missing-photo fallback --- */
document.querySelectorAll('#gallery img').forEach((img, i) => {
  let k = 1; // .jpg is already tried from the HTML
  img.onerror = () => {
    if (k < EXTS.length) img.src = `images/photo${i+1}.${EXTS[k++]}`;
    else { img.onerror = null; img.removeAttribute('src'); img.classList.add('missing'); }
  };
  if (img.complete && img.naturalWidth === 0) img.onerror();
});
const lb = $('#lightbox');
// Each photo gets its own tap handler (more reliable on iPhones than one shared handler)
document.querySelectorAll('#gallery figure').forEach(f => {
  f.addEventListener('click', () => {
    const img = f.querySelector('img');
    if (img.classList.contains('missing') || !img.getAttribute('src')) return toast('Add this photo to the images folder to see it here ♡');
    lb.querySelector('img').src = img.currentSrc || img.src;
    lb.querySelector('p').textContent = f.querySelector('figcaption').textContent;
    lb.hidden = false;
  });
});
lb.addEventListener('click', () => lb.hidden = true);
addEventListener('keydown', e => e.key === 'Escape' && (lb.hidden = true));

/* --- Letter typewriter --- */
let typed = false;
$('#letterBtn').onclick = () => {
  if (typed) return; typed = true;
  const box = $('#letter'), t = $('#letterText'); box.hidden = false; $('#letterBtn').hidden = true;
  if (calm) { t.textContent = LETTER; return; }
  let i = 0; (function step(){ t.textContent = LETTER.slice(0, ++i); if (i < LETTER.length) setTimeout(step, 28); })();
  box.scrollIntoView({behavior:'smooth',block:'center'});
};

/* --- Reasons --- */
const rs = $('#reasons');
REASONS.forEach(([ic, txt]) => {
  const c = document.createElement('button'); c.className = 'card'; c.innerHTML = `<span class="ic">💗</span>Tap to open`;
  c.onclick = () => {
    c.classList.add('on'); c.innerHTML = `<span class="ic">${ic}</span>${txt}`;
    const r = c.getBoundingClientRect(); const x = r.left + r.width/2, y = r.top + r.height/2;
    for (let i = 0; i < 8; i++) parts.push({x,y,vx:(Math.random()-.5)*6,vy:-Math.random()*5,g:.12,r:0,vr:0,life:70,c:'#e0607f',t:ic,s:8});
    if (!run) { run = true; requestAnimationFrame(loop); }
  };
  rs.appendChild(c);
});

/* --- Video that plays after the first hug (EDIT the file name / caption here) --- */
const VIDEO_FILE = 'video/hug.mp4';
const VIDEO_CAPTION = 'A little something for you ♡';
const vid = document.createElement('div'); vid.id = 'vid'; vid.hidden = true;
vid.innerHTML = `<button class="x" aria-label="Close video">✕</button><p>${VIDEO_CAPTION}</p><video controls playsinline preload="none"></video>`;
document.body.appendChild(vid);
const vEl = vid.querySelector('video'); let musicWasOn = false;
function openVideo(){
  musicWasOn = !audio.paused; audio.pause();            // pause the song while the video plays
  if (!vEl.getAttribute('src')) vEl.src = VIDEO_FILE;
  vid.hidden = false; vEl.currentTime = 0; vEl.play().catch(() => {}); // if the phone blocks autoplay, she taps play
}
function closeVideo(){ vEl.pause(); vid.hidden = true; if (musicWasOn) audio.play().catch(() => {}); }
vid.querySelector('.x').onclick = closeVideo;
vid.addEventListener('click', e => { if (e.target === vid) closeVideo(); });
vEl.addEventListener('error', () => { closeVideo(); toast('Add ' + VIDEO_FILE + ' to play the video'); });
addEventListener('keydown', e => e.key === 'Escape' && !vid.hidden && closeVideo());

/* --- Hug --- */
let videoShown = false;
$('#hugBtn').onclick = () => {
  show($('#hugMsg'), HUGS[hugI++ % HUGS.length]);
  burst(80, ['❤️','💗','💋','♥']); petals();
  if (!videoShown) {                                    // first hug only: video opens after a moment
    videoShown = true;
    const again = document.createElement('button'); again.className = 'btn'; again.textContent = 'Watch my video again 🎬';
    again.onclick = openVideo; $('#hugMsg').after(again);
    setTimeout(openVideo, 2200);
  }
};

/* --- Scroll reveals --- */
function watch(){
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.2});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}


/* --- Flowing photo background: uses your first 5 photos, drifting top to bottom --- */
const BG_PHOTOS = 5;
(function photoFlow(){
  const box = $('#photoflow'), found = []; let n = 0;
  for (let p = 1; p <= 12; p++) find(p);
  function find(p){
    let k = 0;
    (function t(){
      if (k >= EXTS.length) return done();
      const s = `images/photo${p}.${EXTS[k++]}`, im = new Image();
      im.onload = () => { found[p] = s; done(); }; im.onerror = t; im.src = s;
    })();
  }
  function done(){
    if (++n < 12) return;
    const ok = found.filter(Boolean).slice(0, BG_PHOTOS);
    if (!ok.length) { box.remove(); return; }           // no photos yet: keep the plain gradient
    const cols = innerWidth < 600 ? 2 : 3;
    for (let c = 0; c < cols; c++) {
      const r = (c * 2) % ok.length, rot = ok.slice(r).concat(ok.slice(0, r));
      let half = []; while (half.length < 4) half = half.concat(rot);
      const col = document.createElement('div');
      col.className = 'pf-col down';                     // 'down' = top to bottom
      col.style.animationDuration = (55 + c*12) + 's';
      col.innerHTML = half.concat(half).map(s => `<img src="${s}" alt="" decoding="async">`).join(''); // doubled = seamless loop
      box.appendChild(col);
    }
  }
})();