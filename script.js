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
  

// ---------- Menu: show content when a button is clicked ----------
const pages = {
  home: {
    title: 'Welcome to My Blog',
    text: [
      'Hello, I am Krabindra. This is my personal blog where I share my thoughts, stories and experiences from life in Kathmandu, Nepal.',
      'Use the menu above to read more about me, browse my posts, see my photos or get in touch.'
    ]
  },
  about: {
    title: 'About Me',
    text: ['Write a short introduction about yourself here.']
  },
  blog: {
    title: 'Blog Posts',
    text: ['Your latest blog posts will appear here.']
  },
  gallery: {
    title: 'Gallery',
    text: ['More photos will be added here soon.']
  },
  contact: {
    title: 'Contact Us',
    text: ['You can find me in Kathmandu, Nepal.']
  }
};

const menuLinks = document.querySelectorAll('nav a');
const contentBox = document.getElementById('page-content');

function showPage(name) {
  const page = pages[name];
  if (!page) return;

  // Build the content (textContent keeps it safe from HTML injection)
  contentBox.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = page.title;
  contentBox.appendChild(h2);
  page.text.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    contentBox.appendChild(p);
  });

  // Restart the fade-in animation
  contentBox.style.animation = 'none';
  contentBox.offsetHeight;          // force reflow
  contentBox.style.animation = '';

  // Highlight the clicked button
  menuLinks.forEach(a => a.classList.toggle('active', a.dataset.page === name));
}

menuLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

showPage('home');   // Home content is shown when the page opens

