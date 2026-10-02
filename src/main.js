import './style.css'


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    name: 'SOCIAL MEDIA',
    image: '/images/social-media.jpg',
    role: 'Photo · Video · Managing',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },

  {
    name: 'PRINT',
    image: '/images/print.jpg',
    role: 'Poster · Menu · Signage',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },

  {
    name: 'LOGO',
    image: '/images/logo.jpg',
    role: 'Re-Design · Visual Identity',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  },

  {
    name: 'VIDEO',
    image: '/images/video.jpg',
    role: 'Digital Content · Campaign',
    timeline: '12 Months',
    year: '2024–2025',
    team: 'Solo',
    href: '#'
  }
]


/* =========================================================
   PORTFOLIO SVG
   Your original SVG — no background
========================================================= */

const portfolioSVG = `
<svg
  class="portfolio-svg"
  viewBox="0 0 866 180"
  role="img"
  aria-label="PORTFOLIO"
>

  <defs>

    <linearGradient
      id="stripe"
      gradientUnits="userSpaceOnUse"
      x1="0"
      x2="486"
      spreadMethod="repeat"
    >
      <stop stop-color="#fff"/>
      <stop offset=".5" stop-color="#000"/>
      <stop offset="1" stop-color="#fff"/>

      <animateTransform
        type="translate"
        attributeName="gradientTransform"
        from="0 0"
        to="486 0"
        dur="4.4s"
        repeatCount="indefinite"
      />
    </linearGradient>


    <filter
      id="material"
      color-interpolation-filters="sRGB"
      x="-10%"
      y="-30%"
      width="120%"
      height="160%"
    >

      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation="4.5"
      />

      <feComposite
        in2="SourceAlpha"
        operator="arithmetic"
        k2="-1"
        k3="1"
      />

      <feBlend
        in="SourceGraphic"
        mode="overlay"
      />

    </filter>


    <filter
      id="color"
      color-interpolation-filters="sRGB"
      x="-20%"
      y="-50%"
      width="140%"
      height="200%"
    >

      <feGaussianBlur
        stdDeviation="7.3"
        result="b"
      />

      <feTurbulence
        type="fractalNoise"
        baseFrequency="4"
        numOctaves="1"
        seed="3"
      />

      <feColorMatrix
        values="
        1 0 0 0 0
        1 0 0 0 0
        1 0 0 0 0
        0 0 0 0 1"
        result="n"
      />

      <feComposite
        in="b"
        in2="n"
        operator="arithmetic"
        k1=".35"
        k2="1"
        k3="0"
        k4="-.175"
      />

      <feComponentTransfer>

        <feFuncR
          type="table"
          tableValues="
          1.000
          1.000
          1.000
          1.000
          0.310
          0.122
          0.039
          0.020
          0.008"
        />

        <feFuncG
          type="table"
          tableValues="
          0.545
          0.231
          0.353
          0.945
          0.816
          0.525
          0.235
          0.059
          0.024"
        />

        <feFuncB
          type="table"
          tableValues="
          0.902
          0.478
          0.122
          0.816
          1.000
          1.000
          0.769
          0.420
          0.212"
        />

      </feComponentTransfer>

    </filter>

  </defs>


  <g filter="url(#color)">

    <path
      d="M119.9 72.2Q119.9 81.6 115.7 89.0Q111.4 96.3 103.4 100.4Q95.4 104.4 84.5 104.4H60.3V138.6H40.0V41.4H83.7Q101.1 41.4 110.5 49.5Q119.9 57.5 119.9 72.2ZM99.4 72.6Q99.4 57.2 81.4 57.2H60.3V88.8H81.9Q90.3 88.8 94.9 84.6Q99.4 80.4 99.4 72.6ZM225.9 89.6Q225.9 104.8 219.9 116.3Q213.9 127.8 202.8 133.9Q191.6 140.0 176.7 140.0Q153.8 140.0 140.8 126.5Q127.8 113.0 127.8 89.6Q127.8 66.2 140.8 53.1Q153.7 40.0 176.8 40.0Q199.9 40.0 212.9 53.2Q225.9 66.5 225.9 89.6ZM205.2 89.6Q205.2 73.9 197.7 64.9Q190.3 56.0 176.8 56.0Q163.2 56.0 155.7 64.9Q148.3 73.7 148.3 89.6Q148.3 105.6 155.9 114.8Q163.5 124.0 176.7 124.0Q190.3 124.0 197.8 115.0Q205.2 106.1 205.2 89.6ZM305.3 138.6 282.8 101.7H258.9V138.6H238.6V41.4H287.1Q304.5 41.4 313.9 48.9Q323.4 56.4 323.4 70.4Q323.4 80.6 317.6 88.0Q311.8 95.4 301.9 97.8L328.2 138.6ZM302.9 71.2Q302.9 57.2 285.0 57.2H258.9V85.9H285.5Q294.1 85.9 298.5 82.1Q302.9 78.2 302.9 71.2ZM381.7 57.2V138.6H361.3V57.2H329.9V41.4H413.1V57.2ZM441.7 57.2V87.2H491.4V103.0H441.7V138.6H421.3V41.4H493.0V57.2ZM599.3 89.6Q599.3 104.8 593.3 116.3Q587.3 127.8 576.1 133.9Q565.0 140.0 550.1 140.0Q527.2 140.0 514.2 126.5Q501.2 113.0 501.2 89.6Q501.2 66.2 514.1 53.1Q527.1 40.0 550.2 40.0Q573.3 40.0 586.3 53.2Q599.3 66.5 599.3 89.6ZM578.6 89.6Q578.6 73.9 571.1 64.9Q563.7 56.0 550.2 56.0Q536.6 56.0 529.1 64.9Q521.7 73.7 521.7 89.6Q521.7 105.6 529.3 114.8Q536.9 124.0 550.1 124.0Q563.7 124.0 571.1 115.0Q578.6 106.1 578.6 89.6ZM611.9 138.6V41.4H632.3V122.9H684.4V138.6ZM695.4 138.6V41.4H715.8V138.6ZM826.4 89.6Q826.4 104.8 820.4 116.3Q814.4 127.8 803.2 133.9Q792.1 140.0 777.2 140.0Q754.3 140.0 741.3 126.5Q728.3 113.0 728.3 89.6Q728.3 66.2 741.2 53.1Q754.2 40.0 777.3 40.0Q800.4 40.0 813.4 53.2Q826.4 66.5 826.4 89.6ZM805.7 89.6Q805.7 73.9 798.2 64.9Q790.8 56.0 777.3 56.0Q763.7 56.0 756.2 64.9Q748.8 73.7 748.8 89.6Q748.8 105.6 756.4 114.8Q764.0 124.0 777.2 124.0Q790.8 124.0 798.2 115.0Q805.7 106.1 805.7 89.6Z"
      filter="url(#material)"
      fill="url(#stripe)"
      stroke="url(#stripe)"
      stroke-width="5"
      stroke-linejoin="round"
    />

  </g>

</svg>
`


/* =========================================================
   PROJECT HTML
========================================================= */

const projectItems = projects.map(project => `
  <article class="project-item">

    <div class="project-row">

      <div class="project-name">
        ${project.name}
      </div>

      <a
        href="${project.href}"
        class="project-button"
      >
        <span>Jump To Project</span>
        <span class="arrow">→</span>
      </a>

    </div>


    <div class="project-panel">

      <div class="panel-inner">

        <div class="panel-content">

          <div class="project-image">
            <img
              src="${project.image}"
              alt="${project.name} project"
              loading="lazy"
            >
          </div>


          <div class="project-details">

            <div class="detail">
              <span>ROLE</span>
              <p>${project.role}</p>
            </div>

            <div class="detail">
              <span>TIMELINE</span>
              <p>${project.timeline}</p>
            </div>

            <div class="detail">
              <span>YEAR</span>
              <p>${project.year}</p>
            </div>

            <div class="detail">
              <span>TEAM</span>
              <p>${project.team}</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </article>
`).join('')


/* =========================================================
   PAGE
========================================================= */

document.querySelector('#app').innerHTML = `

  <!-- =====================================================
       NAVBAR
  ====================================================== -->

  <header class="navbar">

    <div class="nav-left">

      <a href="#work">
        WORK
      </a>

      <a href="#about">
        ABOUT
      </a>

    </div>


    <a href="#hero" class="nav-logo">
      HAFIZH
    </a>


    <div class="nav-right">

      <a href="#skillset">
        SKILLSET
      </a>

      <a href="#contact">
        CONTACT
      </a>

    </div>

  </header>



  <main>


    <!-- =================================================
         HERO
    ================================================== -->

    <section
      class="hero"
      id="hero"
    >

      <div class="hero-svg">
        ${portfolioSVG}
      </div>

    </section>



    <section id="about" class="about-section">

  <div class="about-container">

    <div class="about-image">
      <img src="./assets/profile.png" alt="Hafizh Aditiyo">
    </div>

    <div class="about-text">
      <p>
        I’m HAFIZH Brand & Visual Designer with a background in DKV,
        specializing in hospitality and lifestyle brands. I combine
        photography, branding, social media design, and motion content
        to help businesses create a premium and consistent visual identity.
      </p>
    </div>

  </div>

  <div class="tools-marquee">

    <div class="tools-label">
      <span>TOOLS / SOFTWARE</span>
      <span>2026</span>
    </div>

    <div class="tools-window">

      <div class="tools-track">

        <div class="tool"><img src="./assets/lightroom.png" alt="Lightroom"><span>LIGHTROOM</span></div>
        <div class="tool"><img src="./assets/photoshop.png" alt="Photoshop"><span>PHOTOSHOP</span></div>
        <div class="tool"><img src="./assets/illustrator.png" alt="Illustrator"><span>ILLUSTRATOR</span></div>
        <div class="tool"><img src="./assets/after-effects.png" alt="After Effects"><span>AFTER EFFECTS</span></div>
        <div class="tool"><img src="./assets/premiere.png" alt="Premiere Pro"><span>PREMIERE PRO</span></div>

        <div class="tool"><img src="./assets/lightroom.png" alt="Lightroom"><span>LIGHTROOM</span></div>
        <div class="tool"><img src="./assets/photoshop.png" alt="Photoshop"><span>PHOTOSHOP</span></div>
        <div class="tool"><img src="./assets/illustrator.png" alt="Illustrator"><span>ILLUSTRATOR</span></div>
        <div class="tool"><img src="./assets/after-effects.png" alt="After Effects"><span>AFTER EFFECTS</span></div>
        <div class="tool"><img src="./assets/premiere.png" alt="Premiere Pro"><span>PREMIERE PRO</span></div>

      </div>

    </div>

  </div>

</section>



    <!-- =================================================
         WORK
    ================================================== -->

    <section
      class="work"
      id="work"
    >

      <div class="work-container">

        <div class="work-heading">

          <span>
            SELECTED WORK
          </span>

          <h2>
            WHAT DID I DO?
          </h2>

        </div>


        <div class="project-list">
          ${projectItems}
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

      <div class="section-label">
        SKILLSET
      </div>


      <div class="skills-grid">


        <div class="skill">

          <span>01</span>

          <h3>
            BRANDING
          </h3>

          <p>
            Visual identity, art direction,
            typography and brand systems.
          </p>

        </div>


        <div class="skill">

          <span>02</span>

          <h3>
            GRAPHIC DESIGN
          </h3>

          <p>
            Social media, campaigns, posters,
            menus, signage and print.
          </p>

        </div>


        <div class="skill">

          <span>03</span>

          <h3>
            PHOTOGRAPHY
          </h3>

          <p>
            Product, food, lifestyle and
            hospitality photography.
          </p>

        </div>


        <div class="skill">

          <span>04</span>

          <h3>
            MOTION
          </h3>

          <p>
            Reels, TikTok content, motion graphics
            and promotional videos.
          </p>

        </div>

      </div>

    </section>



    <!-- =================================================
         CONTACT
    ================================================== -->

    <section
      class="contact"
      id="contact"
    >

      <div class="section-label">
        CONTACT
      </div>


      <div class="contact-content">

        <h2>
          HAVE A PROJECT<br>
          IN MIND?
        </h2>


        <a
          href="mailto:your@email.com"
          class="contact-email"
        >
          LET'S TALK →
        </a>

      </div>

    </section>


  </main>

`


/* =========================================================
   ACCORDION
========================================================= */

const list = document.querySelector('.project-list')

const items = [
  ...document.querySelectorAll('.project-item')
]


const canHover =
  window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  ).matches



function setActive(item) {

  items.forEach(current => {

    current.classList.toggle(
      'is-active',
      current === item
    )

  })


  list.classList.toggle(
    'has-active',
    Boolean(item)
  )

}



items.forEach(item => {

  item.addEventListener(
    'focusin',
    () => setActive(item)
  )


  if (canHover) {

    item.addEventListener(
      'mouseenter',
      () => setActive(item)
    )

  } else {

    item
      .querySelector('.project-row')
      .addEventListener(
        'click',
        event => {

          if (
            event.target.closest('.project-button')
          ) {
            return
          }


          setActive(
            item.classList.contains('is-active')
              ? null
              : item
          )

        }
      )

  }

})


if (canHover) {

  list.addEventListener(
    'mouseleave',
    () => setActive(null)
  )

}
/* =========================================================
   MOBILE + SVG FALLBACK FIX
   Added without changing the existing desktop structure.
========================================================= */

const mobileFixStyle = document.createElement('style')
mobileFixStyle.textContent = `
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {

    /* ---------- NAVBAR ---------- */
    .navbar {
      width: calc(100vw - 24px) !important;
      max-width: calc(100vw - 24px) !important;
      height: 54px !important;
      left: 12px !important;
      right: 12px !important;
      top: 12px !important;
      transform: none !important;
      padding: 0 10px !important;
      grid-template-columns: 1fr auto 1fr !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      border-radius: 14px !important;
    }

    .nav-left,
    .nav-right {
      display: flex !important;
      align-items: center !important;
      min-width: 0 !important;
      gap: 14px !important;
    }

    .nav-right {
      justify-content: flex-end !important;
    }

    .navbar a {
      white-space: nowrap !important;
      font-size: 14px !important;
      line-height: 1 !important;
    }

    .nav-logo {
      font-size: 18px !important;
      font-weight: 700 !important;
      padding: 0 8px !important;
    }

    /* ---------- HERO / SVG ---------- */
    .hero,
    .hero-svg {
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;
    }

    .portfolio-svg {
      display: block !important;
      width: 100% !important;
      max-width: 866px !important;
      height: auto !important;
    }

    /* ---------- WHAT DID I DO ---------- */
    .work,
    .work-container,
    .project-list {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      overflow: visible !important;
    }

    .work-container {
      padding-left: 24px !important;
      padding-right: 24px !important;
    }

    .work-heading {
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;
    }

    .work-heading h2 {
      font-size: clamp(42px, 13vw, 64px) !important;
      line-height: .95 !important;
      white-space: normal !important;
      word-break: normal !important;
      margin: 0 !important;
    }

    .project-list {
      display: block !important;
    }

    .project-item {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
    }

    .project-row {
      position: relative !important;
      display: flex !important;
      width: 100% !important;
      min-height: 90px !important;
      align-items: center !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
    }

    .project-name {
      position: relative !important;
      z-index: 2 !important;
      font-size: clamp(40px, 12vw, 64px) !important;
      line-height: .9 !important;
    }

    .project-button {
      position: relative !important;
      z-index: 3 !important;
      flex: 0 0 auto !important;
      white-space: nowrap !important;
    }

    .project-panel {
      position: relative !important;
      inset: auto !important;
      top: auto !important;
      right: auto !important;
      bottom: auto !important;
      left: auto !important;
      width: 100% !important;
      height: auto !important;
      max-height: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: none !important;
      pointer-events: none !important;
      transition: max-height .45s ease, opacity .25s ease, visibility 0s linear .45s !important;
    }

    .project-item.is-active .project-panel {
      max-height: 900px !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transition: max-height .45s ease, opacity .25s ease, visibility 0s linear 0s !important;
    }

    .panel-inner,
    .panel-content {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      box-sizing: border-box !important;
    }

    .project-image {
      position: relative !important;
      width: 100% !important;
      height: auto !important;
      margin: 18px 0 22px !important;
      overflow: hidden !important;
    }

    .project-image img {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      max-width: 100% !important;
      object-fit: cover !important;
    }

    .project-details {
      position: relative !important;
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 22px 18px !important;
      width: 100% !important;
      height: auto !important;
      box-sizing: border-box !important;
      padding: 0 0 28px !important;
    }

    .detail {
      position: relative !important;
      width: 100% !important;
      min-width: 0 !important;
    }

    .detail span,
    .detail p {
      display: block !important;
      margin: 0 !important;
    }

    .detail p {
      margin-top: 7px !important;
      overflow-wrap: anywhere !important;
    }

    /* Keep each project separated on phones. */
    .project-item + .project-item {
      border-top: 1px solid rgba(0, 0, 0, .16) !important;
    }
  }
`
document.head.appendChild(mobileFixStyle)


/* =========================================================
   SVG ANIMATION FALLBACK
   Some mobile browsers do not reliably animate the SVG
   <animateTransform> used by the original artwork. We drive
   the gradient with requestAnimationFrame instead.
========================================================= */

const stripeGradient = document.querySelector(
  '.portfolio-svg #stripe'
)

if (stripeGradient) {
  const originalAnimation = stripeGradient.querySelector(
    'animateTransform'
  )

  if (originalAnimation) {
    originalAnimation.remove()
  }

  const animationDuration = 4400
  const animationDistance = 486
  const animationStart = performance.now()

  function animatePortfolioStripe(now) {
    const elapsed = (now - animationStart) % animationDuration
    const progress = elapsed / animationDuration
    const x = -animationDistance + progress * animationDistance

    stripeGradient.setAttribute(
      'gradientTransform',
      `translate(${x} 0)`
    )

    requestAnimationFrame(animatePortfolioStripe)
  }

  requestAnimationFrame(animatePortfolioStripe)
}
