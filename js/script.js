/* ================================================================
   PORTFOLIO — script.js
   Gồm:
   1. Custom cursor (chấm + vòng tròn theo chuột)
   2. Scroll reveal (fade in khi scroll đến)
   3. Skill bars (animate khi scroll đến section Skills)
================================================================ */


/* ================================================================
   1. CUSTOM CURSOR
================================================================ */
const dot  = document.getElementById('dot');
const ring = document.getElementById('ring');

// Di chuyển cursor theo chuột
document.addEventListener('mousemove', (e) => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

// Khi hover vào link / button / card: phóng to cursor
const hoverTargets = document.querySelectorAll('a, button, .work-card, .cta-btn, .skill-col');

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform    = 'translate(-50%,-50%) scale(2.5)';
    ring.style.width       = '48px';
    ring.style.height      = '48px';
    ring.style.borderColor = 'var(--accent)';
  });

  el.addEventListener('mouseleave', () => {
    dot.style.transform    = 'translate(-50%,-50%) scale(1)';
    ring.style.width       = '28px';
    ring.style.height      = '28px';
    ring.style.borderColor = 'var(--ink)';
  });
});


/* ================================================================
   2. SCROLL REVEAL
   Các element có class "reveal" sẽ fade in khi scroll đến
================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay nhỏ để các element xuất hiện lần lượt
        entry.target.style.transitionDelay = (i * 0.05) + 's';
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.08 } // Khi 8% element xuất hiện trong viewport thì trigger
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ================================================================
   3. SKILL BARS
   Animate thanh progress khi section Skills xuất hiện
================================================================ */
const skillsSection = document.querySelector('.skills-wrap');

if (skillsSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Set width cho từng thanh dựa vào data-w trong HTML
          document.querySelectorAll('.skill-fill').forEach((bar) => {
            bar.style.width = bar.dataset.w + '%';
          });

          // Chỉ animate 1 lần
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillObserver.observe(skillsSection);
}


/* ================================================================
   THÊM HIỆU ỨNG NẾU MUỐN — Uncomment phần dưới

   Ví dụ: Active nav link khi scroll đến section
================================================================ */

/*
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.style.color = '');
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.style.color = 'var(--accent)';
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => navObserver.observe(section));
*/
