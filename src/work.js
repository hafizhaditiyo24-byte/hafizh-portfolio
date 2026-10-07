/* =========================================================
   GALLERY SETTINGS
========================================================= */

const IMAGES = 24;
const VIDEOS = 10;
const GAP = 10;

// 0 = flat, ~0.3 = nice bulge, 0.6+ = strong fisheye
const FISHEYE_STRENGTH = 0.3;


/* =========================================================
   DOM
========================================================= */

const stage = document.getElementById('stage');
const hint = document.getElementById('hint');
const webglCanvas = document.getElementById('webgl-gallery');

if (!stage) {
  throw new Error('Work gallery: #stage was not found.');
}

if (!webglCanvas) {
  throw new Error('Work gallery: #webgl-gallery was not found.');
}

// Hide the canvas until every texture is ready (no pop-in)
webglCanvas.style.opacity = '0';
webglCanvas.style.transition = 'opacity 0.5s ease';


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
  items.push({ src: `/work/${i}.jpg`, video: false });
}

for (let i = 1; i <= VIDEOS; i++) {
  items.push({ src: `/work/${i}.mp4`, video: true });
}


/* =========================================================
   PRELOAD (one decoded element per unique item)
========================================================= */

function preloadImage(item) {
  return new Promise(resolve => {
    const img = new Image();

    img.decoding = 'async';

    img.onload = async () => {
      try {
        await img.decode();
      } catch {
        // already usable
      }

      if (!img.naturalWidth || !img.naturalHeight) {
        resolve(null);
        return;
      }

      resolve({
        ...item,
        media: img,
        ratio: img.naturalWidth / img.naturalHeight
      });
    };

    img.onerror = () => {
      console.warn(`Failed to preload image: ${item.src}`);
      resolve(null);
    };

    img.src = item.src;
  });
}

// Hidden holder so videos keep playing on mobile browsers
const videoHolder = document.createElement('div');

videoHolder.style.cssText =
  'position:fixed;left:0;top:0;width:1px;height:1px;' +
  'overflow:hidden;opacity:0;pointer-events:none;';

document.body.appendChild(videoHolder);

function preloadVideo(item) {
  return new Promise(resolve => {
    const video = document.createElement('video');

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';

    let done = false;

    const finish = ok => {
      if (done) return;
      done = true;

      if (!ok || !video.videoWidth || !video.videoHeight) {
        console.warn(`Failed to preload video: ${item.src}`);
        resolve(null);
        return;
      }

      video.play().catch(() => {});

      resolve({
        ...item,
        media: video,
        ratio: video.videoWidth / video.videoHeight
      });
    };

    // loadeddata = first frame is available (readyState >= 2)
    video.addEventListener('loadeddata', () => finish(true), { once: true });
    video.addEventListener('error', () => finish(false), { once: true });

    // Don't let one slow video block the whole page forever
    setTimeout(() => finish(video.readyState >= 1), 8000);

    videoHolder.appendChild(video);
    video.src = item.src;
    video.load();
  });
}


/* =========================================================
   STATE
========================================================= */

let base = [];      // unique loaded items (media + ratio + texture)
let tiles = [];     // lightweight placement data only

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
   WEBGL FISHEYE RENDERER
========================================================= */

class FisheyeRenderer {
  constructor(canvas) {
    this.canvas = canvas;

    this.gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false
    });

    if (!this.gl) {
      throw new Error('WebGL2 is not supported.');
    }

    this.cssW = 0; // viewport size in CSS pixels  (tile coordinates use this)
    this.cssH = 0;
    this.width = 0; // framebuffer size in device pixels
    this.height = 0;

    this.sceneTexture = null;
    this.framebuffer = null;

    this.init();
    this.resize();
  }

  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(error);
    }

    return shader;
  }

  createProgram(vertexSource, fragmentSource) {
    const gl = this.gl;

    const vs = this.createShader(gl.VERTEX_SHADER, vertexSource);
    const fs = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return program;
  }

  init() {
    const gl = this.gl;

    /* ---------- TILE SHADER ---------- */

    this.tileProgram = this.createProgram(
      `#version 300 es
      layout(location = 0) in vec2 a_position; // unit quad 0..1

      uniform vec4 u_rect;       // x, y, w, h in CSS pixels
      uniform vec2 u_resolution; // viewport in CSS pixels

      out vec2 v_uv;

      void main() {
        vec2 pixel = u_rect.xy + a_position * u_rect.zw;
        vec2 clip = (pixel / u_resolution) * 2.0 - 1.0;
        clip.y *= -1.0;

        gl_Position = vec4(clip, 0.0, 1.0);
        v_uv = a_position; // (0,0) = top-left of the image
      }`,

      `#version 300 es
      precision highp float;

      uniform sampler2D u_texture;

      in vec2 v_uv;
      out vec4 outColor;

      void main() {
        outColor = texture(u_texture, v_uv);
      }`
    );

    this.tileU = {
      rect: gl.getUniformLocation(this.tileProgram, 'u_rect'),
      res: gl.getUniformLocation(this.tileProgram, 'u_resolution'),
      tex: gl.getUniformLocation(this.tileProgram, 'u_texture')
    };

    /* ---------- FISHEYE SHADER ---------- */

    this.fisheyeProgram = this.createProgram(
      `#version 300 es
      layout(location = 0) in vec2 a_position; // unit quad 0..1

      out vec2 v_uv;

      void main() {
        v_uv = a_position;
        gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
      }`,

      `#version 300 es
      precision highp float;

      uniform sampler2D u_scene;
      uniform float u_aspect;
      uniform float u_strength;

      in vec2 v_uv;
      out vec4 outColor;

      void main() {
        vec2 p = v_uv * 2.0 - 1.0;

        // aspect-corrected radius, normalised so the corner = 1.0
        vec2 q = vec2(p.x * u_aspect, p.y);
        float r2 = dot(q, q) / (u_aspect * u_aspect + 1.0);

        // Barrel distortion. Dividing by (1 + strength) makes the corners
        // map exactly onto the texture corners, so we never sample outside
        // the scene (no white gaps, no clamped smearing).
        float d = (1.0 + u_strength * r2) / (1.0 + u_strength);

        vec2 sampleUV = p * d * 0.5 + 0.5;

        outColor = texture(u_scene, sampleUV);
      }`
    );

    this.fisheyeU = {
      scene: gl.getUniformLocation(this.fisheyeProgram, 'u_scene'),
      aspect: gl.getUniformLocation(this.fisheyeProgram, 'u_aspect'),
      strength: gl.getUniformLocation(this.fisheyeProgram, 'u_strength')
    };

    /* ---------- SHARED UNIT QUAD ---------- */

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0, 1, 0, 0, 1,
        0, 1, 1, 0, 1, 1
      ]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.cssW = window.innerWidth;
    this.cssH = window.innerHeight;

    this.width = Math.max(1, Math.round(this.cssW * dpr));
    this.height = Math.max(1, Math.round(this.cssH * dpr));

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.width = `${this.cssW}px`;
    this.canvas.style.height = `${this.cssH}px`;

    this.createFramebuffer();
  }

  createFramebuffer() {
    const gl = this.gl;

    if (this.sceneTexture) gl.deleteTexture(this.sceneTexture);
    if (this.framebuffer) gl.deleteFramebuffer(this.framebuffer);

    this.sceneTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA,
      this.width, this.height, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, null
    );

    this.framebuffer = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.sceneTexture,
      0
    );

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /* One texture per unique item, created BEFORE the first frame */
  createItemTexture(item) {
    const gl = this.gl;

    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    item.texture = texture;
    item.uploaded = false;
    item.lastTime = -1;

    if (item.video) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      this.updateVideo(item);
    } else {
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, item.media
      );

      // mipmaps = smooth downscaling (matters a lot under a warp)
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );

      item.uploaded = true;
    }
  }

  updateVideo(item) {
    const gl = this.gl;
    const video = item.media;

    if (video.readyState < 2) return;
    if (item.uploaded && video.currentTime === item.lastTime) return;

    gl.bindTexture(gl.TEXTURE_2D, item.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    if (!item.uploaded) {
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,
        gl.RGBA, gl.UNSIGNED_BYTE, video
      );
      item.uploaded = true;
    } else {
      gl.texSubImage2D(
        gl.TEXTURE_2D, 0, 0, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, video
      );
    }

    item.lastTime = video.currentTime;
  }

  render(tileList, view) {
    const gl = this.gl;

    if (!this.width || !this.height || !view.W) return;

    // keep video textures current
    for (const item of base) {
      if (item.video) this.updateVideo(item);
    }

    /* ---------- SCENE PASS ---------- */

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, this.width, this.height);

    gl.clearColor(245 / 255, 245 / 255, 245 / 255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.tileProgram);
    gl.bindVertexArray(this.vao);

    // CSS-pixel resolution: tile coordinates are CSS pixels, so this
    // maps the whole layout onto the whole framebuffer at any DPR.
    gl.uniform2f(this.tileU.res, this.cssW, this.cssH);
    gl.uniform1i(this.tileU.tex, 0);
    gl.activeTexture(gl.TEXTURE0);

    for (const tile of tileList) {
      const item = base[tile.i];

      if (!item.uploaded) continue;

      const x = mod(tile.x + view.cx + tile.w, view.W) - tile.w;
      const y = mod(tile.y + view.cy + tile.h, view.colH[tile.col]) - tile.h;

      // skip tiles that are off-screen
      if (
        x > this.cssW || x + tile.w < 0 ||
        y > this.cssH || y + tile.h < 0
      ) {
        continue;
      }

      gl.bindTexture(gl.TEXTURE_2D, item.texture);
      gl.uniform4f(this.tileU.rect, x, y, tile.w, tile.h);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    /* ---------- FISHEYE PASS ---------- */

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);

    gl.useProgram(this.fisheyeProgram);

    gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);

    gl.uniform1i(this.fisheyeU.scene, 0);
    gl.uniform1f(this.fisheyeU.aspect, this.cssW / this.cssH);
    gl.uniform1f(this.fisheyeU.strength, FISHEYE_STRENGTH);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindVertexArray(null);
  }
}

const fisheyeRenderer = new FisheyeRenderer(webglCanvas);


/* =========================================================
   CREATE GALLERY
========================================================= */

async function createGallery() {
  const loaded = await Promise.all(
    items.map(item =>
      item.video ? preloadVideo(item) : preloadImage(item)
    )
  );

  base = loaded.filter(Boolean);

  if (!base.length) {
    console.warn('Work gallery: no media could be loaded.');
    webglCanvas.style.opacity = '1';
    return;
  }

  // Upload every texture up-front so nothing loads while scrolling
  base.forEach(item => fisheyeRenderer.createItemTexture(item));

  layout();
  render();

  webglCanvas.style.opacity = '1';

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
    Math.max(100, Math.round(tileWidth / (item.ratio || 1)))
  );

  const colOf = k => (k + Math.floor(k / n)) % columns;

  const needed =
    window.innerHeight + Math.max(...heights) + GAP * 2;

  let total = n;

  for (let rounds = 1; rounds <= 20; rounds++) {
    total = n * rounds;

    const ys = Array(columns).fill(0);

    for (let k = 0; k < total; k++) {
      ys[colOf(k)] += heights[k % n] + GAP;
    }

    if (Math.min(...ys) >= needed) break;
  }

  /* Tiles are plain data now: same texture shared by every repeat */

  const ys = Array(columns).fill(0);

  tiles = [];

  W = columns * (tileWidth + GAP);

  for (let k = 0; k < total; k++) {
    const col = colOf(k);
    const h = heights[k % n];

    tiles.push({
      i: k % n,
      col,
      x: col * (tileWidth + GAP),
      y: ys[col],
      w: tileWidth,
      h
    });

    ys[col] += h + GAP;
  }

  colH = ys;

  /* Stagger columns */

  tiles.forEach(tile => {
    if (!colH[tile.col]) return;

    tile.y += (tile.col * 263) % colH[tile.col];
  });
}


/* =========================================================
   MODULO
========================================================= */

function mod(value, divisor) {
  if (!divisor) return 0;

  return ((value % divisor) + divisor) % divisor;
}


/* =========================================================
   RENDER
========================================================= */

function render() {
  if (!W) return;

  fisheyeRenderer.render(tiles, { cx, cy, W, colH });
}


/* =========================================================
   ANIMATION
========================================================= */

function tick() {
  if (!dragging) {
    if (keys.has('ArrowLeft')) vx += 1.4;
    if (keys.has('ArrowRight')) vx -= 1.4;
    if (keys.has('ArrowUp')) vy += 1.4;
    if (keys.has('ArrowDown')) vy -= 1.4;

    tx += vx;
    ty += vy;

    vx *= 0.94;
    vy *= 0.94;
  }

  cx += (tx - cx) * 0.14;
  cy += (ty - cy) * 0.14;

  // Render every frame so videos keep playing while idle
  render();

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

stage.addEventListener('pointerdown', event => {
  dragging = true;

  lx = event.clientX;
  ly = event.clientY;

  vx = 0;
  vy = 0;

  stage.setPointerCapture(event.pointerId);
  stage.classList.add('drag');

  dismissHint();
});

stage.addEventListener('pointermove', event => {
  if (!dragging) return;

  const dx = event.clientX - lx;
  const dy = event.clientY - ly;

  lx = event.clientX;
  ly = event.clientY;

  lastMove = performance.now();

  tx += dx;
  ty += dy;

  vx = vx * 0.5 + dx * 0.5;
  vy = vy * 0.5 + dy * 0.5;

  dismissHint();
});

function endDrag() {
  dragging = false;

  stage.classList.remove('drag');

  if (performance.now() - lastMove > 80) {
    vx = 0;
    vy = 0;
  }
}

stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);


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
  { passive: false }
);


/* =========================================================
   KEYBOARD
========================================================= */

window.addEventListener('keydown', event => {
  if (!event.key.startsWith('Arrow')) return;

  event.preventDefault();

  keys.add(event.key);

  dismissHint();
});

window.addEventListener('keyup', event => {
  keys.delete(event.key);
});

window.addEventListener('blur', () => {
  keys.clear();
});


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener('resize', () => {
  fisheyeRenderer.resize();

  layout();
  render();
});


/* =========================================================
   START
========================================================= */

createGallery();