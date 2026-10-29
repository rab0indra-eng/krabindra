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
    title: "Mount Everest: The Majestic Roof of the World",
    text: [
      { heading: "Introduction" },
      "Standing proudly among the clouds, Mount Everest is one of the most extraordinary natural wonders on Earth. Known as the highest mountain in the world above sea level, Everest has fascinated explorers, climbers, scientists, and travelers for generations. Its towering peaks, enormous glaciers, breathtaking landscapes, and challenging climbing routes make it a symbol of adventure, courage, and human determination.",
      "Located in the majestic Himalayan mountain range along the border between Nepal and the Tibet Autonomous Region of China, Mount Everest attracts thousands of visitors every year. While some travel to admire its beauty from a distance, others dream of reaching its summit. However, Everest is much more than a mountain. It represents the power of nature, the importance of cultural heritage, and the need to protect our planet's fragile environment.",
      { heading: "The Geography and Height of Mount Everest" },
      "Mount Everest is the highest mountain on Earth, reaching an officially recognized elevation of 8,848.86 meters (29,031.7 feet) above sea level. Its location in the Himalayas makes it part of one of the most impressive mountain systems in the world.",
      "The mountain lies on the border between Nepal and China. In Nepal, it is known as Sagarmatha, a name commonly interpreted as \"Forehead of the Sky.\" In Tibet, it is called Chomolungma, often translated as \"Goddess Mother of the World.\" These names reflect the deep respect and spiritual significance the mountain holds for local communities.",
      "The landscape surrounding Everest is equally spectacular. Massive glaciers, snow-covered ridges, deep valleys, and towering neighboring peaks create a breathtaking natural environment. The Khumbu Glacier, located on the Nepalese side, is an important feature of the region and forms part of the route used by many climbers attempting to reach the summit.",
      "The mountain's extreme altitude creates a harsh environment where temperatures can fall dramatically, winds can become dangerously strong, and the air contains much less oxygen than at sea level.",
      { heading: "The Fascinating History of Mount Everest" },
      "Mount Everest became widely known internationally during the nineteenth century when British surveyors measured the Himalayan peaks. In 1856, the mountain was identified as the world's highest peak through surveying work. It was named after Sir George Everest, a British surveyor general of India.",
      "Before this name became internationally established, local communities already knew and respected the mountain through their own languages, traditions, and cultural beliefs.",
      "The first successful ascent of Mount Everest took place on May 29, 1953. New Zealand mountaineer Sir Edmund Hillary and Nepali Sherpa mountaineer Tenzing Norgay reached the summit together during a British expedition led by John Hunt. Their achievement became one of the most celebrated moments in mountaineering history.",
      "Their successful climb demonstrated extraordinary teamwork, preparation, endurance, and courage. Since then, thousands of climbers have attempted to reach the summit, although the journey remains dangerous and physically demanding.",
      { heading: "The Journey to Everest Base Camp" },
      "For many travelers, visiting Everest Base Camp is a dream adventure. Unlike climbing to the summit, trekking to base camp does not require advanced mountaineering skills, although it demands good physical preparation and careful attention to altitude.",
      "The popular Nepalese route usually begins with a flight to Lukla, a mountain town in the Khumbu region. From there, trekkers travel through beautiful Sherpa villages, cross suspension bridges, walk along mountain trails, and gradually gain altitude.",
      "Popular stops along the route include Namche Bazaar, Tengboche, Dingboche, and Gorak Shep. Namche Bazaar is an important trading center where trekkers can experience local culture, visit shops, and enjoy views of surrounding peaks. Tengboche is famous for its monastery and spectacular Himalayan scenery.",
      "As trekkers move higher, the landscape changes. Green forests gradually give way to rocky trails, glaciers, and snow-covered mountains. The thin air makes walking more difficult, so acclimatization days are essential.",
      "Reaching Everest Base Camp offers a remarkable sense of achievement. Although the summit remains far above, the experience provides an unforgettable opportunity to witness the mountain's grandeur and appreciate the challenges faced by climbers.",
      { heading: "The Challenges of Climbing Mount Everest" },
      "Climbing Mount Everest is one of the most demanding adventures in the world. The mountain's extreme altitude creates a serious risk of altitude sickness because the human body receives less oxygen than it does at lower elevations.",
      "Above 8,000 meters, climbers enter what is commonly known as the \"death zone.\" At this altitude, the human body struggles to function normally, and prolonged exposure can become life-threatening.",
      "Other dangers include sudden storms, freezing temperatures, powerful winds, avalanches, falling ice, and crevasses hidden beneath snow. The Khumbu Icefall, on the Nepalese climbing route, is particularly challenging because its unstable ice formations can shift unexpectedly.",
      "Successful expeditions require months of preparation, physical training, suitable equipment, experienced guides, and careful planning. Climbers also need to acclimatize gradually and remain flexible when weather conditions become dangerous.",
      "Despite these risks, Mount Everest continues to attract people who want to test their limits and experience one of the greatest challenges in mountaineering.",
      { heading: "The Sherpa People and Their Culture" },
      "The Sherpa people play an essential role in the history and development of Himalayan mountaineering. Many Sherpas live in the Khumbu region of Nepal, where their traditions, language, and Buddhist beliefs form an important part of local identity.",
      "Sherpa guides and high-altitude workers have contributed enormously to Everest expeditions. They help establish routes, transport supplies, prepare camps, and support climbers throughout difficult journeys. Their knowledge of the mountains and high-altitude conditions is invaluable.",
      "However, their work can involve significant risks, including exposure to avalanches, falling ice, and extreme weather. Their contributions deserve recognition, respect, fair compensation, and strong safety protections.",
      "Visitors to the Everest region can learn about Sherpa culture by visiting traditional villages, monasteries, and community museums. Respecting local customs and supporting local businesses helps preserve the region's cultural heritage while making tourism more beneficial to residents.",
      { heading: "Environmental Challenges Facing Mount Everest" },
      "Although Mount Everest appears powerful and permanent, its environment is increasingly vulnerable to human activity and climate change.",
      "One major concern is waste generated by trekking and climbing expeditions. Discarded equipment, food packaging, oxygen cylinders, and other rubbish can damage the mountain ecosystem. Managing waste at high altitude is difficult, making responsible tourism especially important.",
      "Climate change also threatens Himalayan glaciers. Rising temperatures contribute to glacier retreat and changes in snow and ice conditions. These changes can affect water supplies, mountain ecosystems, and communities living downstream.",
      "Tourism brings important economic opportunities to the region, but excessive pressure on natural resources can create environmental problems.",
      "Visitors can help protect Everest by carrying out their rubbish, minimizing single-use plastics, respecting wildlife, following local conservation rules, and choosing responsible trekking operators. Governments, tourism businesses, climbers, and local communities all have important roles to play in preserving the mountain for future generations.",
      { heading: "Why Mount Everest Inspires the World" },
      "Mount Everest represents much more than height or physical achievement. It symbolizes determination, courage, patience, and the desire to explore the unknown.",
      "For climbers, reaching its summit may represent the fulfillment of a lifelong dream. For trekkers, walking through the Himalayan valleys offers an opportunity to experience nature in its most dramatic form. For scientists, Everest provides valuable insights into geology, climate change, glaciers, and high-altitude environments.",
      "The mountain also teaches an important lesson: ambition must be balanced with humility. Even the most experienced climbers must respect changing weather, dangerous terrain, and the limits of the human body.",
      "Everest reminds us that some of the greatest achievements require preparation, teamwork, perseverance, and responsible decision-making.",
      { heading: "Conclusion" },
      "Mount Everest remains one of the most remarkable landmarks on our planet. Its towering summit, breathtaking Himalayan landscapes, rich cultural heritage, and challenging climbing conditions make it a source of fascination for people around the world.",
      "From the historic achievement of Edmund Hillary and Tenzing Norgay to the dedication of modern climbers and Sherpa communities, Everest continues to inspire generations. At the same time, environmental challenges remind us that protecting this extraordinary mountain is a shared responsibility.",
      "Whether admired from a distant viewpoint, explored through a trek to base camp, or approached by experienced mountaineers, Mount Everest offers an unforgettable reminder of nature's beauty and power.",
      "Mount Everest is not merely the highest mountain in the world; it is a symbol of human ambition, the majesty of nature, and the importance of preserving our planet's greatest treasures."
    ]
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
    // An item like { heading: '...' } becomes a sub-heading, a plain string becomes a paragraph
    const el = document.createElement(typeof t === 'object' ? 'h3' : 'p');
    el.textContent = typeof t === 'object' ? t.heading : t;
    contentBox.appendChild(el);
  });

  // Restart the fade-in animation
  contentBox.style.animation = 'none';
  contentBox.offsetHeight;          // force reflow
  contentBox.style.animation = '';

  // Tell the CSS which page is showing (used for page-specific styles)
  contentBox.dataset.page = name;

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

