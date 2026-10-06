import './style.css'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.__skillDebug = {
  gsap,
  ScrollTrigger
};

console.log("GSAP LOADED:", gsap.version);
console.log("ScrollTrigger LOADED:", ScrollTrigger);


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    name: 'SOCIAL MEDIA',
    category: 'Social Media',
    image: './images/SOCIAL-MEDIA.png',
    role: 'Photo · Video · Managing',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },
  {
    name: 'PRINT',
    category: 'Print',
    image: './images/PRINT.png',
    role: 'Poster · Menu · Signage',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },
  {
    name: 'LOGO',
    category: 'Logo',
    image: './images/LOGO.png',
    role: 'Re-Design · Visual Identity',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },
  {
    name: 'VIDEO',
    category: 'Video',
    video: './images/Video.mp4',
    role: 'Digital Content · Campaign',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  }
];


/* =========================================================
   SOFTWARE DATA
========================================================= */

const tools = [
  {
    name: 'PHOTOSHOP',
    image: './images/PHOTOSHOP.png',
    alt: 'Photoshop'
  },

  {
    name: 'ILLUSTRATOR',
    image: './images/ILLUSTRATOR.png',
    alt: 'Illustrator'
  },

  {
    name: 'AFTER EFFECTS',
    image: './images/AFTER EFFECT.png',
    alt: 'After Effects'
  },

  {
    name: 'PREMIERE PRO',
    image: './images/PREMIER PRO.png',
    alt: 'Premiere Pro'
  },

  {
    name: 'LIGHTROOM',
    image: './images/LIGHTROOM.png',
    alt: 'Lightroom'
  }
];


/* Two tool sequences make each marquee group wider than its viewport. */
const toolsMarkup = Array(2)
  .fill(tools)
  .flat()
  .map(tool => `
    <div class="tool">

      <img
        src="${tool.image}"
        alt="${tool.alt}"
      >

      <span>
        ${tool.name}
      </span>

    </div>
  `)
  .join('');


/* =========================================================
   PROJECT HTML
========================================================= */

const projectItems = projects
  .map((project, index) => `
    <article class="project-item">
      <div class="project-row">
        <div class="project-name">${project.name}</div>
        <a href="${project.href}" class="project-button">
          <span>Jump To Project</span>
          <span class="arrow">→</span>
        </a>
      </div>

      <button
        class="work-category-button"
        type="button"
        aria-pressed="false"
        data-preview="${project.image}"
        data-label="${project.category}"
        data-video="${project.video ?? ''}"
      >
        <span class="work-category-number">${String(index + 1).padStart(2, '0')}</span>
        <span class="work-category-label">${project.category}</span>
      </button>

      <div class="project-panel">
        <div class="panel-inner">
          <div class="panel-content">
            <div class="project-image">
              <img src="${project.image}" alt="${project.name} project" loading="lazy">
            </div>
            <div class="project-details">
              <div class="detail"><span>ROLE</span><p>${project.role}</p></div>
              <div class="detail"><span>TIMELINE</span><p>${project.timeline}</p></div>
              <div class="detail"><span>YEAR</span><p>${project.year}</p></div>
              <div class="detail"><span>TEAM</span><p>${project.team}</p></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `)
  .join('');


/* =========================================================
   FOOTER
========================================================= */

const MARQUEE_TEXT = "Let's work together";

const heroSVG = `
  <div class="hero-intro">
    <div class="hero-intro-text">
      <div class="hero-line hero-line-1">I'm Hafizh,</div>
      <div class="hero-line hero-line-2">a Graphic Designer</div>
      <div class="hero-line hero-line-3">based in Indonesia</div>
    </div>

    <a
      class="learn-btn hero-work-button"
      href="${import.meta.env.BASE_URL}work.html"
      aria-label="Open Work Gallery"
    >
      <span class="learn-btn__icon" aria-hidden="true">

        <svg
          class="learn-btn__chevron"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l6 7-6 7"/>
        </svg>

        <svg
          class="learn-btn__arrow"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h13"/>
          <path d="M13 6l6 6-6 6"/>
        </svg>

      </span>

      <span class="learn-btn__label">
        Work Gallery
      </span>
    </a>
  </div>
`;

const starDefs = `
  <svg
    class="star-defs"
    aria-hidden="true"
    focusable="false"
  >

    <defs>

      <linearGradient
        id="star-stripe"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="200"
        y2="200"
        spreadMethod="repeat"
      >

        <stop stop-color="#fff"/>

        <stop
          offset=".5"
          stop-color="#000"
        />

        <stop
          offset="1"
          stop-color="#fff"
        />

        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          to="200 200"
          dur="4s"
          repeatCount="indefinite"
        />
      </linearGradient>


      <filter
        id="star-fx"
        color-interpolation-filters="sRGB"
        x="-30%"
        y="-30%"
        width="160%"
        height="160%"
      >

        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="4"
          result="b"
        />

        <feComposite
          in="b"
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="e"
        />

        <feBlend
          in="SourceGraphic"
          in2="e"
          mode="overlay"
          result="g"
        />

        <feGaussianBlur
          in="g"
          stdDeviation="4"
          result="bl"
        />

        <feTurbulence
          type="fractalNoise"
          baseFrequency="3.5"
          numOctaves="1"
          seed="6"
          result="n"
        />

        <feColorMatrix
          in="n"
          values="
            1 0 0 0 0
            1 0 0 0 0
            1 0 0 0 0
            0 0 0 0 1"
          result="nn"
        />

        <feComposite
          in="bl"
          in2="nn"
          operator="arithmetic"
          k1=".35"
          k2="1"
          k3="0"
          k4="-.175"
          result="x"
        />

        <feComponentTransfer in="x">

          <feFuncR
            type="table"
            tableValues="
              0.169
              1.000
              1.000
              1.000
              1.000
              0.624
              0.239
              0.478
              0.169"
          />

          <feFuncG
            type="table"
            tableValues="
              0.039
              0.239
              0.541
              0.839
              1.000
              0.941
              0.839
              0.361
              0.039"
          />

          <feFuncB
            type="table"
            tableValues="
              0.239
              0.604
              0.847
              0.949
              1.000
              1.000
              1.000
              1.000
              0.239"
          />

          <feFuncA
            type="table"
            tableValues="0 1"
          />

        </feComponentTransfer>

      </filter>


      <g id="star-shape">

        <path
          d="M150 22l20 50 54 4-41 35 13 53-46-29-46 29 13-53-41-35 54-4z"
          fill="url(#star-stripe)"
          filter="url(#star-fx)"
        />

      </g>

    </defs>

  </svg>
`;

const star = `
  <svg
    class="mq-star"
    viewBox="56 2 188 182"
    aria-hidden="true"
    focusable="false"
  >
    <use href="#star-shape"/>
  </svg>
`;


const marqueeItem = `
  <span class="mq-item">
    ${MARQUEE_TEXT}${star}
  </span>
`;


const marqueeGroup = marqueeItem.repeat(4);


const footerHTML = `
<footer class="footer" id="contact">

  ${starDefs}

  <div class="mq">
    <div class="mq-track">
      <div class="mq-group">
        ${marqueeGroup}
      </div>

      <div class="mq-group">
        ${marqueeGroup}
      </div>
    </div>
  </div>


  <div class="footer-content">

    <div class="footer-links">

      <div class="footer-socials">

        <a
          href="https://www.instagram.com/hfizhad?stkn=MWdrcjgwMTJ1bjdjMw%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </a>

        <a
          href="https://www.linkedin.com/in/hafizh-aditiyo-847a151a2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINKEDIN
        </a>

        <a
          href="https://www.behance.net/gallery/254197393/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          BEHANCE
        </a>

      </div>


      <a
        class="footer-email"
        href="mailto:hafizhaditiyo24@gmail.com"
      >
        HAFIZHADITIYO24@GMAIL.COM
      </a>

    </div>


    <a
      href="#top"
      class="footer-name"
      aria-label="Back to top"
    >
      Hafizh
    </a>

  </div>

</footer>
`;


/* =========================================================
   PAGE
========================================================= */

document.querySelector('#app').innerHTML = `

  <!-- =====================================================
       NAVBAR
  ====================================================== -->

  <header class="navbar">

    <div class="nav-left">

      <a class="nav-work-link" href="#work">
        WORK
      </a>

      <a href="#about">
        ABOUT
      </a>

    </div>


    <a
      href="#hero"
      class="nav-logo"
    >
      HAFIZH
    </a>


    <div class="nav-right">

      <a href="#skillset">
        SKILLSET
      </a>

      <!-- Connected directly to footer#contact -->
      <a href="#contact">
        CONTACT
      </a>

    </div>

  </header>



  <main id="top">


    <!-- =================================================
         HERO
    ================================================== -->

    <section
      class="hero"
      id="hero"
    >

      <div class="hero-svg">${heroSVG}</div>

    </section>



    <!-- =================================================
         ABOUT
    ================================================== -->

    <section
      class="about"
      id="about"
    >

      <div class="about-container">

        <div class="about-description">

          <p>
            I’m Hafizh, a Brand &amp; Visual Designer focused on hospitality and lifestyle. I combine branding, photography, social media, and motion to build visual identities that feel distinctive, cohesive, and intentional.
          </p>

        </div>

        <div class="about-image">

          <img
            src="./images/about-foto.png"
            alt="Hafizh Aditiyo"
          >

        </div>

      </div>

      <!-- =================================================
           SOFTWARE CONVEYOR
      ================================================== -->

      <div class="tools-marquee">

        <div class="tools-label">

          <span>
            TOOLS / SOFTWARE
          </span>

          <span>
            2026
          </span>

        </div>


        <div class="tools-window">

          <div class="tools-track">
            <div class="tools-group">
              ${toolsMarkup}
            </div>
            <div class="tools-group" aria-hidden="true">
              ${toolsMarkup}
            </div>
          </div>

        </div>

      </div>

    </section>



    <!-- =================================================
         SELECTED WORK
    ================================================== -->

    <section class="work" id="work">
      <div class="work-container">
        <div class="work-heading">
          <span>SELECTED WORK</span>
          <h2 class="work-heading-mobile">WHAT DID I DO?</h2>
          <h2 class="work-heading-desktop">SELECTED WORK</h2>
        </div>

        <div class="work-layout">
          <div class="project-list">
            <span class="work-active-indicator" aria-hidden="true"></span>
            ${projectItems}
          </div>

            <figure class="work-preview">
            <img
              class="work-preview-image"
              src="${projects[0].image}"
              alt="${projects[0].category} project"
            >
            <video
              class="work-preview-video"
              src="${projects.find(p => p.video)?.video ?? ''}"
              muted
              autoplay
              loop
              playsinline
              preload="auto"
            ></video>
          </figure>
        </div>
      </div>
    </section>


    <!-- =================================================
         SKILLSET
    ================================================== -->

    <section
      class="skillset"
      id="skillset"
    >

      <div class="skillset-container">

        <h2>
          Skillset
        </h2>


        <div
          class="skill-list"
          id="skill-list"
        ></div>

      </div>

    </section>



    <!-- =================================================
         CONTACT / FOOTER
    ================================================== -->

    ${footerHTML}


  </main>

`;

const stripeGradient = document.getElementById('portfolio-stripe');
if (stripeGradient) {
  const duration = 4400;
  const frameInterval = 1000 / 30;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFrame = 0;
  let animationFrame;

  const drawStripe = time => {
    const x = ((time % duration) / duration) * 486;
    stripeGradient.setAttribute('x1', x);
    stripeGradient.setAttribute('x2', x + 486);
  };

  const tick = time => {
    animationFrame = requestAnimationFrame(tick);
    if (time - lastFrame < frameInterval) return;
    lastFrame = time;
    drawStripe(time);
  };

  if (!reducedMotion) animationFrame = requestAnimationFrame(tick);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else if (!reducedMotion) animationFrame = requestAnimationFrame(tick);
  });
}



/* =========================================================
   SKILLSET DATA
========================================================= */

const aboutSection = document.querySelector('#about');
const aboutParagraph = aboutSection?.querySelector('.about-description p');

if (aboutParagraph) {
  const copyCharacters = Array.from(aboutParagraph.textContent
    .trim()
    .replace(/\s+/g, ' '));
  const copyFragment = document.createDocumentFragment();
  copyCharacters.forEach(character => {
    if (/\s/.test(character)) {
      copyFragment.append(document.createTextNode(character));
      return;
    }

    const characterSpan = document.createElement('span');
    characterSpan.className = 'about-copy-character';

    const neutralText = document.createElement('span');
    neutralText.className = 'about-copy-neutral';
    neutralText.textContent = character;

    const revealedText = document.createElement('span');
    revealedText.className = 'about-copy-revealed';
    revealedText.setAttribute('aria-hidden', 'true');
    revealedText.textContent = character;

    characterSpan.append(neutralText, revealedText);
    copyFragment.append(characterSpan);
  });

  aboutParagraph.replaceChildren(copyFragment);

  const aboutRevealedCharacters = aboutParagraph.querySelectorAll('.about-copy-revealed');
  const aboutReduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (aboutRevealedCharacters.length && !aboutReduceMotion.matches) {
    const aboutRevealDistance = () => {
      const viewportHeight = window.innerHeight;
      const isMobileAbout = window.matchMedia('(max-width: 700px)').matches;
      const distancePerCharacter = viewportHeight * (isMobileAbout ? 0.0065 : 0.009);
      const minDistance = viewportHeight * (isMobileAbout ? 0.75 : 1.1);
      const maxDistance = viewportHeight * (isMobileAbout ? 1.5 : 2.4);

      return Math.min(
        maxDistance,
        Math.max(minDistance, aboutRevealedCharacters.length * distancePerCharacter)
      );
    };

    gsap.set(aboutRevealedCharacters, { opacity: 0 });

    gsap.to(aboutRevealedCharacters, {
      opacity: 1,
      duration: 0.18,
      ease: 'none',
      stagger: { each: 0.06 },
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top top',
        end: () => `+=${aboutRevealDistance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }
}


const skills = [

  [
    "Graphic Design",
    "Posters, layouts and visuals that are clear, bold and made to be noticed."
  ],

  [
    "Brand Identity",
    "Logos and visual systems with a point of view, built to be remembered."
  ],

  [
    "Content Creation",
    "Photo and video content planned, shot and edited for social platforms."
  ],

  [
    "Motion & Video",
    "Short-form edits and campaign videos that move with a purpose."
  ]

];


const skillList = document.querySelector(
  "#skill-list"
);


/* =========================================================
   SKILLSET RENDER + GSAP
========================================================= */

if (skillList) {
  console.log("SKILLSET INIT");

  skillList.innerHTML = skills
    .map(([title, desc], i) => `
      <div class="skill-row">

        <div class="skill-inner">

          <span class="skill-num">
            ${String(i + 1).padStart(2, "0")}
          </span>

          <h3 class="skill-title">
            ${title}
          </h3>

          <p class="skill-desc">
            ${desc}
          </p>

        </div>

        <span class="skill-line"></span>

      </div>
    `)
    .join("");


  const rows = gsap.utils.toArray(
    ".skill-row"
  );
console.log("SKILL ROWS:", rows.length);

if (rows.length) {
  const skillSection = rows[0].closest("#skillset");
  const skillsetContent = skillSection.querySelector(
    ".skillset-container"
  );

  const isMobile = window.matchMedia(
    "(max-width: 699px)"
  ).matches;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  console.log("🔥 SKILLSET CONDITIONS:", {
    isMobile,
    reduceMotion
  });

  if (reduceMotion) {
    gsap.set(rows, {
      autoAlpha: 1,
      x: 0
    });
  } else if (isMobile) {

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillSection,
        start: "top 95%",
        end: "bottom 40%",
        scrub: true
      }
    });

    revealTimeline.fromTo(
      rows,
      {
        autoAlpha: 0,
        x: 30
      },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.45,
        ease: "none",
        stagger: 0.12
      },
      0
    );

  } else {

    const dist = () => 160;
    const DUR = 1;

    rows.forEach((row) => {
      const rowTopInSection = () =>
        row.getBoundingClientRect().top -
        skillSection.getBoundingClientRect().top;

      const rowTopFromSectionBottom = () =>
        skillSection.getBoundingClientRect().bottom -
        row.getBoundingClientRect().top;

      gsap.fromTo(
        row,
        {
          autoAlpha: 0,
          x: dist
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: DUR,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillSection,
            start: () => `top+=${rowTopInSection()}px 95%`,
            end: () => `bottom-=${rowTopFromSectionBottom()}px 60%`,
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    });
  }

  gsap.fromTo(
    skillsetContent,
    {
      autoAlpha: 1,
      y: 0
    },
    {
      autoAlpha: 0,
      x: -20,
      y: -144,
      ease: "none",
      scrollTrigger: {
        trigger: skillSection,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );
}

}



/* =========================================================
   SELECTED WORK INTERACTIONS
========================================================= */

const workList = document.querySelector('.project-list');
const workItems = [...document.querySelectorAll('.project-item')];
const workPreviewImage = document.querySelector('.work-preview-image');
const workIndicator = document.querySelector('.work-active-indicator');
const workIsMobile = window.matchMedia('(max-width: 700px)').matches;
const workReduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const setWorkActive = item => {
  workItems.forEach(current => {
    const isActive = current === item;
    current.classList.toggle('is-active', isActive);
    current.querySelector('.work-category-button')?.setAttribute(
      'aria-pressed',
      String(isActive)
    );
  });

  workList?.classList.toggle('has-active', Boolean(item));
};

if (workList && workItems.length) {
  if (workIsMobile) {
  workItems.forEach(item => {
    const button = item.querySelector('.work-category-button');

    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      setWorkActive(isActive ? null : item);

      if (isActive || !workPreviewImage) return;

      const image = button.dataset.preview;
      const label = button.dataset.label;
      const video = button.dataset.video;

      if (!image) return;

      workPreviewImage.src = image;
      workPreviewImage.alt = `${label} project`;

      const workPreviewFigure =
        document.querySelector('.work-preview');

      const workPreviewVideo =
        document.querySelector('.work-preview-video');

      if (video && workPreviewVideo) {
        if (!workPreviewVideo.getAttribute('src')) {
          workPreviewVideo.src = video;
        }

        workPreviewVideo.poster = image;
        workPreviewFigure?.classList.add('is-video');
        workPreviewVideo.play().catch(() => {});
      } else if (workPreviewVideo) {
        workPreviewVideo.pause();
        workPreviewFigure?.classList.remove('is-video');
      }
    });
  });
  } else {
    let previewTween;
    let currentPreview = workPreviewImage?.getAttribute('src');

    const positionIndicator = (item, animate = true) => {
      const button = item.querySelector('.work-category-button');
      if (!button || !workIndicator) return;

      const offset = button.getBoundingClientRect().top
        - workList.getBoundingClientRect().top;

      if (workReduceMotion || !animate) {
        gsap.set(workIndicator, { y: offset });
      } else {
        gsap.to(workIndicator, {
          y: offset,
          duration: 0.42,
          ease: 'power3.out',
          overwrite: true
        });
      }
    };

        const workPreviewFigure = document.querySelector('.work-preview');
    const workPreviewVideo = document.querySelector('.work-preview-video');
    const previewTargets = [workPreviewImage, workPreviewVideo].filter(Boolean);

    const showPreviewMedia = (image, label, video) => {
      workPreviewImage.src = image;
      workPreviewImage.alt = `${label} project`;

      if (video && workPreviewVideo) {
        if (!workPreviewVideo.getAttribute('src')) workPreviewVideo.src = video;
        workPreviewVideo.poster = image;
        workPreviewFigure.classList.add('is-video');
        workPreviewVideo.play().catch(() => {});
      } else if (workPreviewVideo) {
        workPreviewVideo.pause();
        workPreviewFigure.classList.remove('is-video');
      }
    };

    const activateWorkItem = item => {
      setWorkActive(item);
      positionIndicator(item);

      const button = item.querySelector('.work-category-button');
      const image = button?.dataset.preview;
      const label = button?.dataset.label;
      const video = button?.dataset.video;
      if (!image || !workPreviewImage || image === currentPreview) return;

      currentPreview = image;
      previewTween?.kill();

      if (workReduceMotion) {
        showPreviewMedia(image, label, video);
        return;
      }

      previewTween = gsap.to(previewTargets, {
        autoAlpha: 0,
        y: 8,
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => {
          showPreviewMedia(image, label, video);
          previewTween = gsap.fromTo(
            previewTargets,
            { autoAlpha: 0, y: 8, scale: 0.99 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.42,
              ease: 'power2.out',
              overwrite: true
            }
          );
        }
      });
    };

    workItems.forEach(item => {
      const button = item.querySelector('.work-category-button');
      if (!button) return;

      button.addEventListener('mouseenter', () => activateWorkItem(item));
      button.addEventListener('focus', () => activateWorkItem(item));
      button.addEventListener('click', () => activateWorkItem(item));

      const previewPreload = new Image();
      previewPreload.src = button.dataset.preview;
    });

    const activeItem = workItems[0];
    setWorkActive(activeItem);
    positionIndicator(activeItem, false);

    window.addEventListener('resize', () => {
      const currentItem = workItems.find(item => item.classList.contains('is-active'))
        ?? workItems[0];
      positionIndicator(currentItem, false);
    });
  }
}


/* =========================================================
   NAVBAR SECTION TRANSITION
========================================================= */

const sectionNavLinks = document.querySelectorAll(
  '.navbar a[href^="#"]'
);
const sectionNavBar = document.querySelector('.navbar');

const sectionTransition = document.createElement('div');
sectionTransition.className = 'section-transition';
sectionTransition.setAttribute('aria-hidden', 'true');
document.body.appendChild(sectionTransition);

const sectionNavReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

let sectionNavigationTimer;
let sectionNavigationTween;

const getSectionNavigationY = target => {
  const navbarBottom = sectionNavBar?.getBoundingClientRect().bottom ?? 0;
  const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const maxScrollY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const topOffset = Math.max(navbarBottom + 16, scrollMarginTop);

  return Math.min(maxScrollY, Math.max(0, targetTop - topOffset));
};

sectionNavLinks.forEach(link => {
  link.addEventListener('click', event => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const hash = link.getAttribute('href');
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));

    if (!target) return;

    event.preventDefault();

    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }

    window.clearTimeout(sectionNavigationTimer);
    sectionNavigationTween?.kill();

    if (sectionNavReducedMotion.matches) {
      sectionTransition.classList.remove('is-active');
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, getSectionNavigationY(target));
      wheelTargetY = window.scrollY;
      root.style.scrollBehavior = previousScrollBehavior;
      return;
    }

    sectionTransition.classList.add('is-active');

    sectionNavigationTimer = window.setTimeout(() => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      const restoreScrollBehavior = () => {
        root.style.scrollBehavior = previousScrollBehavior;
        wheelTargetY = window.scrollY;
      };

      sectionNavigationTween = gsap.to(window, {
        duration: 1.15,
        ease: 'power3.inOut',
        overwrite: 'auto',
        onComplete: restoreScrollBehavior,
        onInterrupt: restoreScrollBehavior,
        scrollTo: {
          y: getSectionNavigationY(target),
          autoKill: true
        }
      });
      sectionTransition.classList.remove('is-active');
    }, 100);
  });
});


/* =========================================================
   STEALTH MODE EASTER EGG
========================================================= */

const stealthLogo = document.querySelector('.navbar .nav-logo');
const stealthOverlay = document.createElement('div');
stealthOverlay.className = 'stealth-overlay';
stealthOverlay.setAttribute('role', 'dialog');
stealthOverlay.setAttribute('aria-modal', 'true');
stealthOverlay.setAttribute('aria-label', 'Stealth transmission');
stealthOverlay.setAttribute('aria-hidden', 'true');
stealthOverlay.innerHTML = `
  <div class="stealth-content">
    <p class="stealth-label">TRANSMISSION_01</p>
    <p class="stealth-morse">
      .. / ... - .. .-.. .-.. / .-.. --- ...- . / -.-- --- ..- / -.. .. ... - .-
    </p>
    <button class="stealth-close" type="button" aria-label="Close transmission">
      ESC / CLOSE
    </button>
  </div>
`;
document.body.appendChild(stealthOverlay);

const stealthCloseButton = stealthOverlay.querySelector('.stealth-close');
let stealthClickCount = 0;
let stealthClickTimer;
let stealthPreviousFocus = null;

const openStealthMode = () => {
  stealthPreviousFocus = document.activeElement;
  stealthOverlay.setAttribute('aria-hidden', 'false');
  stealthOverlay.classList.add('is-active');

  try {
    stealthCloseButton.focus({ preventScroll: true });
  } catch {
    stealthCloseButton.focus();
  }
};

const closeStealthMode = () => {
  stealthOverlay.classList.remove('is-active');
  stealthOverlay.setAttribute('aria-hidden', 'true');

  if (stealthPreviousFocus instanceof HTMLElement) {
    try {
      stealthPreviousFocus.focus({ preventScroll: true });
    } catch {
      stealthPreviousFocus.focus();
    }
  }

  stealthPreviousFocus = null;
  stealthClickCount = 0;
  window.clearTimeout(stealthClickTimer);
};

stealthLogo?.addEventListener('click', event => {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  window.clearTimeout(stealthClickTimer);
  stealthClickCount += 1;

  if (stealthClickCount === 5) {
    stealthClickCount = 0;
    openStealthMode();
    return;
  }

  stealthClickTimer = window.setTimeout(() => {
    stealthClickCount = 0;
  }, 1800);
});

stealthCloseButton.addEventListener('click', closeStealthMode);

document.addEventListener('keydown', event => {
  if (!stealthOverlay.classList.contains('is-active')) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeStealthMode();
  } else if (event.key === 'Tab') {
    event.preventDefault();
    stealthCloseButton.focus();
  }
});


/* =========================================================
   DESKTOP WHEEL INERTIA
========================================================= */

const desktopWheelInertia = window.matchMedia(
  '(min-width: 701px) and (hover: hover) and (pointer: fine)'
);

let wheelTargetY = window.scrollY;
let wheelFrame = 0;

function easeDesktopWheel() {
  const currentY = window.scrollY;
  const distance = wheelTargetY - currentY;

  if (Math.abs(distance) < 0.5) {
    window.scrollTo({ top: wheelTargetY, behavior: 'instant' });
    wheelFrame = 0;
    return;
  }

  window.scrollTo({
    top: currentY + distance * 0.18,
    behavior: 'instant'
  });
  wheelFrame = window.requestAnimationFrame(easeDesktopWheel);
}

window.addEventListener('wheel', event => {
  if (
    !desktopWheelInertia.matches ||
    event.ctrlKey ||
    event.defaultPrevented ||
    (event.target instanceof Element &&
      event.target.closest('input, textarea, select, [contenteditable="true"]'))
  ) {
    return;
  }

  if (sectionNavigationTween?.isActive()) {
    sectionNavigationTween.kill();
    wheelTargetY = window.scrollY;
  }

  event.preventDefault();

  const deltaScale = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? 16
    : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
      ? window.innerHeight
      : 1;
  const pageHeight = document.documentElement.scrollHeight;
  const maxScrollY = Math.max(0, pageHeight - window.innerHeight);

  wheelTargetY = Math.min(
    maxScrollY,
    Math.max(0, wheelTargetY + event.deltaY * deltaScale)
  );

  if (!wheelFrame) {
    wheelFrame = window.requestAnimationFrame(easeDesktopWheel);
  }
}, { passive: false });

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});