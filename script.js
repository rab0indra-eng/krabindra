// ---------- Image slider (home page only) ----------
if (document.querySelector('.slider')) {
    const slider = document.querySelector('.slider');
    const track = document.getElementById('slides');
    const dotsBox = document.getElementById('dots');
    const originals = [...track.children];
    const total = originals.length;

    // Clone slides at the end so the row always looks full and loops smoothly
    originals.forEach(el => track.appendChild(el.cloneNode(true)));

    let index = 0;
    let timer = null;

    // Dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Go to image ' + (i + 1));
      d.addEventListener('click', () => { go(i); restart(); });
      dotsBox.appendChild(d);
    }

    function slideWidth() { return track.children[0].getBoundingClientRect().width; }

    function setPos(animate) {
      track.style.transition = animate ? 'transform 0.6s ease' : 'none';
      track.style.transform = 'translateX(' + (-index * slideWidth()) + 'px)';
      [...dotsBox.children].forEach((d, n) => d.classList.toggle('active', n === index % total));
    }

    function go(i) { index = i; setPos(true); }

    function next() {
      index++;
      setPos(true);
      if (index >= total) {            // reached the clones: jump back to the start unseen
        setTimeout(() => { index = 0; setPos(false); }, 650);
      }
    }

    function prev() {
      if (index <= 0) {                // jump to the clones, then slide back one
        index = total;
        setPos(false);
        track.getBoundingClientRect(); // force reflow
      }
      index--;
      setPos(true);
    }

    function start() { timer = setInterval(next, 3500); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    document.getElementById('next').addEventListener('click', () => { next(); restart(); });
    document.getElementById('prev').addEventListener('click', () => { prev(); restart(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('resize', () => setPos(false));

    setPos(false);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
}

// ---------- YouTube channel ----------
// 1. Put your channel ID below (starts with UC...). Find it at youtube.com > Settings > Advanced settings.
// 2. Put your channel link in channelUrl (for example https://www.youtube.com/@krabindra).
const youtube = {
  title: 'My YouTube Channel',
  channelId: 'YOUR_CHANNEL_ID',
  channelUrl: 'https://www.youtube.com/@yourchannel'
};

function renderYoutube() {
  const box = document.getElementById('youtube');
  if (!box) return;      // only the home page has this section
  box.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = youtube.title;
  box.appendChild(h2);

  if (/^UC[\w-]{22}$/.test(youtube.channelId)) {
    // Every channel has an "uploads" playlist: the same ID with UC replaced by UU
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube.com/embed/videoseries?list=UU' + youtube.channelId.slice(2);
    frame.title = youtube.title;
    frame.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    box.appendChild(frame);
  } else {
    const p = document.createElement('p');
    p.textContent = 'Add your channel ID in script.js to show your videos here.';
    box.appendChild(p);
  }

  const link = document.createElement('a');
  link.href = youtube.channelUrl;
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = 'yt-button';
  link.textContent = 'Visit my channel on YouTube';
  box.appendChild(link);
}

renderYoutube();
