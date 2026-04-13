import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ==================== LENIS SMOOTH SCROLL ====================

const lenis = new Lenis({
 lerp: 0.1,
 wheelMultiplier: 1,
 infinite: false,
 gestureOrientation: 'vertical',
 normalizeWheel: true,
 smoothWheel: true,
});

function raf(time) {
 lenis.raf(time);
 requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
 lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==================== HERO ANIMATIONS ====================

const initHeroAnimations = () => {
 const heroSection = document.querySelector('.hero');
 const bgVideo = document.querySelector('.bg-video');
 const heroDetails = document.querySelector('.hero-details');
 const heroTitle = document.querySelector('.hero-title');
 const heroSubtitle = document.querySelector('.hero-subtitle');
 const heroCta = document.querySelector('.hero-cta-group');
 const heroTextBg = document.querySelector('.hero-text-bg');
 const nav = document.querySelector('.nav');

 // Entrance timeline
 const entranceTL = gsap.timeline();

 entranceTL
   .set([heroTitle, heroSubtitle, heroCta], { opacity: 0, y: 30 })
   .set(bgVideo, { opacity: 0, scale: 1.2 })
   .set(nav, { y: -100, opacity: 0 })
   .to(bgVideo, {
     opacity: 1,
     scale: 1.05,
     duration: 2.5,
     ease: 'power2.out',
   }, 0)
   .to(heroTextBg, {
     scale: 1,
     duration: 2,
     ease: 'power2.out',
   }, 0)
   .to(heroTitle, {
     opacity: 1,
     y: 0,
     duration: 1.2,
     ease: 'power4.out',
   }, 0.5)
   .to(heroSubtitle, {
     opacity: 1,
     y: 0,
     duration: 1,
     ease: 'power4.out',
   }, 0.7)
   .to(heroCta, {
     opacity: 1,
     y: 0,
     duration: 1,
     ease: 'power4.out',
   }, 0.8)
   .to(nav, {
     y: 0,
     opacity: 1,
     duration: 1,
     ease: 'power4.out',
   }, 0.3);

 // Scroll-driven parallax
 gsap.to(bgVideo, {
   scale: 1,
   ease: 'none',
   scrollTrigger: {
     trigger: heroSection,
     start: 'top top',
     end: 'bottom top',
     scrub: 1,
   },
 });

 gsap.to(heroDetails, {
   y: -150,
   ease: 'none',
   scrollTrigger: {
     trigger: heroSection,
     start: 'top top',
     end: 'bottom top',
     scrub: 1,
   },
 });

 gsap.to(heroTextBg, {
   y: -250,
   ease: 'none',
   scrollTrigger: {
     trigger: heroSection,
     start: 'top top',
     end: 'bottom top',
     scrub: 1.2,
   },
 });
};

// ==================== PRODUCT REVEAL ANIMATIONS ====================

const initProductRevealAnimations = () => {
 const productReveal = document.querySelector('.product-reveal');
 const productWatch = document.querySelector('.product-reveal-watch');
 const productTitle = document.querySelector('.product-reveal-title');
 const productSubtitle = document.querySelector('.product-reveal-subtitle');
 const productCta = document.querySelector('.product-reveal-cta-group');

 gsap.set([productWatch, productTitle, productSubtitle, productCta], {
   opacity: 0,
 });

 gsap.set(productWatch, { y: 50, rotation: -5 });
 gsap.set([productTitle, productSubtitle, productCta], { y: 30 });

 // Entrance animation
 gsap.timeline({
   scrollTrigger: {
     trigger: productReveal,
     start: 'top 60%',
     toggleActions: 'play none none reverse',
   },
 }).to(
   productWatch,
   {
     opacity: 1,
     y: 0,
     rotation: 0,
     duration: 1.2,
     ease: 'power4.out',
   },
   0
 ).to(
   productTitle,
   {
     opacity: 1,
     y: 0,
     duration: 1,
     ease: 'power4.out',
   },
   0.2
 ).to(
   productSubtitle,
   {
     opacity: 1,
     y: 0,
     duration: 1,
     ease: 'power4.out',
   },
   0.3
 ).to(
   productCta,
   {
     opacity: 1,
     y: 0,
     duration: 1,
     ease: 'power4.out',
   },
   0.4
 );

 // Scroll-driven rotation and scale
 gsap.to(productWatch, {
   rotation: 20,
   scale: 1.3,
   ease: 'none',
   scrollTrigger: {
     trigger: productReveal,
     start: 'top top',
     end: 'bottom top',
     scrub: 1.5,
   },
 });
};

// ==================== ETHOS / COLLECTION ANIMATIONS ====================

const initEthosAnimations = () => {
 const ethosSection = document.querySelector('.ethos');
 const ethosBgImages = document.querySelectorAll('.ethos-bg-img');

 // Background parallax
 gsap.to(ethosBgImages, {
   scale: 1.1,
   yPercent: 10,
   ease: 'none',
   scrollTrigger: {
     trigger: ethosSection,
     start: 'top bottom',
     end: 'bottom top',
     scrub: 1,
   },
 });

 // Variant switcher logic
 const variants = document.querySelectorAll('.ethos-main');
 const nextButtons = document.querySelectorAll('.ethos-next-btn');

 nextButtons.forEach((button) => {
   button.addEventListener('click', () => {
     const targetVariant = button.getAttribute('data-target');
     switchVariant(targetVariant);
   });
 });

 const switchVariant = (targetVariant) => {
   const currentActive = document.querySelector('.ethos-main.active');
   const newActive = document.querySelector(
     `.ethos-main.variant-${targetVariant}`
   );

   if (!newActive || currentActive === newActive) return;

   const currentBgActive = document.querySelector(
     '.ethos-bg-img.active'
   );
   const newBgActive = document.querySelector(
     `.ethos-bg-${targetVariant}`
   );

   const tl = gsap.timeline();

   // Animate out current content
   tl.to(
     [currentActive.querySelector('.ethos-text-side'),
      currentActive.querySelector('.ethos-product-center')],
     {
       x: -100,
       opacity: 0,
       duration: 0.6,
       ease: 'power2.in',
     },
     0
   );

   // Switch active classes mid-animation
   tl.call(
     () => {
       currentActive.classList.remove('active');
       currentBgActive.classList.remove('active');
       newActive.classList.add('active');
       newBgActive.classList.add('active');
     },
     null,
     0.3
   );

   // Animate in new content
   tl.to(
     [newActive.querySelector('.ethos-text-side'),
      newActive.querySelector('.ethos-product-center')],
     {
       x: 0,
       opacity: 1,
       duration: 0.8,
       ease: 'power4.out',
     },
     0.3
   );
 };
};

// ==================== DISMANTLE / CRAFTSMANSHIP CANVAS ====================

const initDismantleAnimations = () => {
 const canvas = document.getElementById('dismantle-canvas');
 const ctx = canvas.getContext('2d');
 const dismantleSection = document.querySelector('.dismantle');
 const dismantleHeader = document.querySelector('.dismantle-header');

 // Canvas setup
 canvas.width = 1920;
 canvas.height = 1080;

 // Store canvas dimensions for responsive scaling
 const containerWidth = dismantleSection.offsetWidth;
 const containerHeight = window.innerHeight;
 const scale = Math.min(
   containerWidth / canvas.width,
   containerHeight / canvas.height
 );

 canvas.style.transform = `scale(${scale})`;
 canvas.style.transformOrigin = '0 0';

 // Preload all frames
 const frames = [];
 const totalFrames = 152;
 let loadedCount = 0;

 for (let i = 1; i <= totalFrames; i++) {
   const img = new Image();
   const frameNum = String(i).padStart(3, '0');
   img.src = `/assets/photo/v3/ezgif-frame-${frameNum}.jpg`;
   img.onload = () => {
     loadedCount++;
   };
   img.onerror = () => {
     console.warn(`Frame ${frameNum} failed to load`);
     loadedCount++;
   };
   frames[i - 1] = img;
 }

 // Canvas animation with scroll scrub
 const canvasTween = gsap.to(
   { frame: 0 },
   {
     frame: totalFrames - 1,
     snap: 'frame',
     ease: 'none',
     onUpdate: function () {
       const currentFrame = Math.round(this.targets()[0].frame);
       if (frames[currentFrame] && frames[currentFrame].complete) {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);
       }
     },
     scrollTrigger: {
       trigger: dismantleSection,
       start: 'top 40%',
       end: 'bottom bottom',
       scrub: 0.5,
       markers: false,
     },
   }
 );

 // Draw first frame immediately
 if (frames[0] && frames[0].complete) {
   ctx.drawImage(frames[0], 0, 0, canvas.width, canvas.height);
 }

 // Header slide out animation
 gsap.to(dismantleHeader, {
   x: -150,
   opacity: 0,
   ease: 'none',
   scrollTrigger: {
     trigger: dismantleSection,
     start: 'top 45%',
     end: 'top 10%',
     scrub: 1,
   },
 });

 // Handle window resize
 window.addEventListener('resize', () => {
   const newWidth = dismantleSection.offsetWidth;
   const newHeight = window.innerHeight;
   const newScale = Math.min(
     newWidth / canvas.width,
     newHeight / canvas.height
   );
   canvas.style.transform = `scale(${newScale})`;
   ScrollTrigger.refresh();
 });
};

// ==================== NAVIGATION HIDE/SHOW ON SCROLL ====================

const initNavScroll = () => {
 const nav = document.querySelector('.nav');
 let lastScrollY = 0;
 let ticking = false;

 const updateNav = () => {
   const currentScrollY = window.scrollY;

   if (currentScrollY > lastScrollY && currentScrollY > 200) {
     // Scrolling down
     gsap.to(nav, { y: -100, duration: 0.3, overwrite: 'auto' });
   } else {
     // Scrolling up
     gsap.to(nav, { y: 0, duration: 0.3, overwrite: 'auto' });
   }

   lastScrollY = currentScrollY;
   ticking = false;
 };

 window.addEventListener('scroll', () => {
   if (!ticking) {
     window.requestAnimationFrame(updateNav);
     ticking = true;
   }
 });
};

// ==================== MODAL LOGIC ====================

const initModal = () => {
 const modal = document.getElementById('reserve-modal');
 const modalClose = document.getElementById('modal-close');
 const openButtons = document.querySelectorAll('.open-reserve-modal');
 const form = document.getElementById('reserve-form');

 // Open modal
 const openModal = () => {
   modal.classList.add('active');
   modal.setAttribute('aria-hidden', 'false');
   document.body.style.overflow = 'hidden';
 };

 // Close modal
 const closeModal = () => {
   modal.classList.remove('active');
   modal.setAttribute('aria-hidden', 'true');
   document.body.style.overflow = '';
 };

 // Open button handlers
 openButtons.forEach((button) => {
   button.addEventListener('click', openModal);
 });

 // Close button
 modalClose.addEventListener('click', closeModal);

 // Overlay click
 modal.addEventListener('click', (e) => {
   if (e.target === modal) {
     closeModal();
   }
 });

 // Escape key
 document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && modal.classList.contains('active')) {
     closeModal();
   }
 });

 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener('click', (e) => {
     const href = anchor.getAttribute('href');
     if (href === '#') return;

     const target = document.querySelector(href);
     if (target) {
       e.preventDefault();
       lenis.scrollTo(target, {
         duration: 1.2,
         easing: (t) => 1 - Math.pow(1 - t, 3),
       });
     }
   });
 });
};

// ==================== INIT ON DOM READY ====================

document.addEventListener('DOMContentLoaded', () => {
 initHeroAnimations();
 initProductRevealAnimations();
 initEthosAnimations();
 initDismantleAnimations();
 initNavScroll();
 initModal();

 // Refresh ScrollTrigger after all animations are set up
 ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
 ScrollTrigger.refresh();
});
