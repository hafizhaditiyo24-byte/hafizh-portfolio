/* =========================================================
   GALLERY SETTINGS
========================================================= */

const IMAGES = 23;
const VIDEOS = 4;
const GAP = 10;


/* =========================================================
   DOM
========================================================= */

const stage = document.getElementById('stage');
const hint = document.getElementById('hint');

if (!stage) {
  throw new Error('Work gallery: #stage was not found.');
}


/* =========================================================
   HOME / BRAND LINK
========================================================= */

const homeLink = document.createElement('a');

homeLink.className = 'work-home-link';
homeLink.href = import.meta.env.BASE_URL;
homeLink.textContent = 'HAFIZH.SPACE';
homeLink.setAttribute('aria-label', 'Back to home');

document.body.appendChild(homeLink);


/* =========================================================
   ITEMS
========================================================= */

const items = [];

for (let i = 1; i <= IMAGES; i++) {
  items.push({
    src: `/work/${i}.jpg`,
    video: false
  });
}

for (let i = 1; i <= VIDEOS; i++) {
  items.push({
    src: `/work/${i}.mp4`,
    video: true
  });
}


/* =========================================================
   PRELOAD IMAGES
========================================================= */

function preloadImage(src) {
  return new Promise(resolve => {
    const img = new Image();

    img.decoding = 'sync';
    img.src = src;

    img.onload = async () => {
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch {
        // Image is already available.
      }

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (!width || !height) {
        resolve(null);
        return;
      }

      resolve({
        ratio: width / height
      });
    };

    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      resolve(null);
    };
  });
}


/* =========================================================
   PRELOAD VIDEOS
========================================================= */

function preloadVideo(src) {
  return new Promise(resolve => {
    const video = document.createElement('video');

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        resolve(null);
        return;
      }

      resolve({
        ratio: width / height
      });
    };

    video.onerror = () => {
      console.warn(`Failed to preload video: ${src}`);
      resolve(null);
    };

    video.src = src;
  });
}


/* =========================================================
   STATE
========================================================= */

let base = [];
const tiles = [];

let W = 0;
let colH = [];

let tx = 0;
let ty = 0;

let cx = 0;
let cy = 0;

let vx = 0;
let vy = 0;

let dragging = false;

let lx = 0;
let ly = 0;
let lastMove = 0;

const keys = new Set();


/* =========================================================
   VIDEO OBSERVER
========================================================= */

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target.querySelector('video');

    if (!video) return;

    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
});


/* =========================================================
   TILE FACTORY
========================================================= */

function makeTile(item) {
  const el = document.createElement('div');

  el.className = 'tile';

  let media;

  if (item.video) {
    media = document.createElement('video');

    media.muted = true;
    media.loop = true;
    media.playsInline = true;
    media.preload = 'auto';
    media.src = item.src;

    io.observe(el);
  } else {
    media = document.createElement('img');

    media.alt = '';
    media.draggable = false;
    media.decoding = 'sync';
    media.loading = 'eager';
    media.src = item.src;
  }

  el.appendChild(media);
  stage.appendChild(el);

  return {
    el,
    item,
    ratio: item.ratio || 1,
    col: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0
  };
}


/* =========================================================
   CREATE GALLERY
========================================================= */

async function createGallery() {
  stage.style.visibility = 'hidden';

  const loaded = await Promise.all(
    items.map(item => {
      if (item.video) {
        return preloadVideo(item.src).then(data => {
          return data
            ? {
                ...item,
                ratio: data.ratio
              }
            : null;
        });
      }

      return preloadImage(item.src).then(data => {
        return data
          ? {
              ...item,
              ratio: data.ratio
            }
          : null;
      });
    })
  );

  base = loaded.filter(Boolean);

  if (!base.length) {
    console.warn('Work gallery: no media could be loaded.');
    stage.style.visibility = 'visible';
    requestAnimationFrame(tick);
    return;
  }

  layout();
  render();

  stage.style.visibility = 'visible';

  requestAnimationFrame(tick);
}


/* =========================================================
   LAYOUT
========================================================= */

function layout() {
  if (!base.length) return;

  const n = base.length;

  const tileWidth = Math.max(
    150,
    Math.min(420, window.innerWidth / 4.2)
  );

  const columns =
    Math.ceil(window.innerWidth / (tileWidth + GAP)) + 2;

  const heights = base.map(item =>
    Math.max(
      100,
      Math.round(tileWidth / (item.ratio || 1))
    )
  );

  const colOf = k =>
    (k + Math.floor(k / n)) % columns;

  const needed =
    window.innerHeight +
    Math.max(...heights) +
    GAP * 2;

  let total = n;

  for (let rounds = 1; rounds <= 20; rounds++) {
    total = n * rounds;

    const ys = Array(columns).fill(0);

    for (let k = 0; k < total; k++) {
      ys[colOf(k)] += heights[k % n] + GAP;
    }

    if (Math.min(...ys) >= needed) {
      break;
    }
  }


  /* -------------------------------------------------------
     ADD TILES
  ------------------------------------------------------- */

  while (tiles.length < total) {
    const tile = makeTile(
      base[tiles.length % n]
    );

    tiles.push(tile);
  }


  /* -------------------------------------------------------
     REMOVE EXTRA TILES
  ------------------------------------------------------- */

  while (tiles.length > total) {
    const tile = tiles.pop();

    io.unobserve(tile.el);
    tile.el.remove();
  }


  /* -------------------------------------------------------
     POSITION TILES
  ------------------------------------------------------- */

  const ys = Array(columns).fill(0);

  W = columns * (tileWidth + GAP);

  tiles.forEach((tile, k) => {
    tile.col = colOf(k);

    tile.w = tileWidth;

    tile.h =
      heights[k % n];

    tile.x =
      tile.col * (tileWidth + GAP);

    tile.y =
      ys[tile.col];

    ys[tile.col] +=
      tile.h + GAP;

    tile.el.style.width =
      `${tile.w}px`;

    tile.el.style.height =
      `${tile.h}px`;
  });

  colH = ys;


  /* -------------------------------------------------------
     STAGGER
  ------------------------------------------------------- */

  tiles.forEach(tile => {
    if (!colH[tile.col]) return;

    tile.y +=
      (tile.col * 263) %
      colH[tile.col];
  });
}


/* =========================================================
   MODULO
========================================================= */

function mod(value, divisor) {
  if (!divisor) return 0;

  return (
    (value % divisor) +
    divisor
  ) % divisor;
}


/* =========================================================
   RENDER
========================================================= */

function render() {
  if (!W) return;

  tiles.forEach(tile => {
    if (!colH[tile.col]) return;

    const x =
      mod(
        tile.x + cx + tile.w,
        W
      ) - tile.w;

    const y =
      mod(
        tile.y + cy + tile.h,
        colH[tile.col]
      ) - tile.h;

    tile.el.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;
  });
}


/* =========================================================
   ANIMATION
========================================================= */

function tick() {
  if (!dragging) {
    if (keys.has('ArrowLeft')) {
      vx += 1.4;
    }

    if (keys.has('ArrowRight')) {
      vx -= 1.4;
    }

    if (keys.has('ArrowUp')) {
      vy += 1.4;
    }

    if (keys.has('ArrowDown')) {
      vy -= 1.4;
    }

    tx += vx;
    ty += vy;

    vx *= 0.94;
    vy *= 0.94;
  }

  const dx = tx - cx;
  const dy = ty - cy;

  if (
    dragging ||
    keys.size ||
    Math.abs(dx) +
      Math.abs(dy) +
      Math.abs(vx) +
      Math.abs(vy) >
      0.05
  ) {
    cx += dx * 0.14;
    cy += dy * 0.14;

    render();
  }

  requestAnimationFrame(tick);
}


/* =========================================================
   HINT
========================================================= */

function dismissHint() {
  if (hint) {
    hint.classList.add('hide');
  }
}


/* =========================================================
   POINTER
========================================================= */

stage.addEventListener(
  'pointerdown',
  event => {
    dragging = true;

    lx = event.clientX;
    ly = event.clientY;

    vx = 0;
    vy = 0;

    stage.setPointerCapture(
      event.pointerId
    );

    stage.classList.add('drag');

    dismissHint();
  }
);


stage.addEventListener(
  'pointermove',
  event => {
    if (!dragging) return;

    const dx =
      event.clientX - lx;

    const dy =
      event.clientY - ly;

    lx = event.clientX;
    ly = event.clientY;

    lastMove =
      performance.now();

    tx += dx;
    ty += dy;

    vx =
      vx * 0.5 +
      dx * 0.5;

    vy =
      vy * 0.5 +
      dy * 0.5;

    dismissHint();
  }
);


function endDrag() {
  dragging = false;

  stage.classList.remove('drag');

  if (
    performance.now() -
      lastMove >
    80
  ) {
    vx = 0;
    vy = 0;
  }
}


stage.addEventListener(
  'pointerup',
  endDrag
);

stage.addEventListener(
  'pointercancel',
  endDrag
);


/* =========================================================
   WHEEL
========================================================= */

stage.addEventListener(
  'wheel',
  event => {
    event.preventDefault();

    tx -= event.deltaX;
    ty -= event.deltaY;

    dismissHint();
  },
  {
    passive: false
  }
);


/* =========================================================
   KEYBOARD
========================================================= */

window.addEventListener(
  'keydown',
  event => {
    if (!event.key.startsWith('Arrow')) {
      return;
    }

    event.preventDefault();

    keys.add(event.key);

    dismissHint();
  }
);

window.addEventListener(
  'keyup',
  event => {
    keys.delete(event.key);
  }
);

window.addEventListener(
  'blur',
  () => {
    keys.clear();
  }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  'resize',
  () => {
    layout();
    render();
  }
);


/* =========================================================
   START
========================================================= */

createGallery();