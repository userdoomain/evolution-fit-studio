/* =========================================================
   Academia Evolution Fit — Vanilla JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Lucide Icons ----------
  if (window.lucide) window.lucide.createIcons();

  // ---------- AOS Animations ----------
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 60 });
  }

  // ---------- Swiper Gallery ----------
  if (window.Swiper) {
    new Swiper(".gallery-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu toggle ----------
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close on link click (mobile)
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // ---------- Footer year ----------
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- ReactBits-style: Scramble text on hero title ----------
  const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";
  const scrambleEl = document.querySelector(".hero-title");
  if (scrambleEl) {
    const originalHtml = scrambleEl.innerHTML;
    const collectText = (node) => {
      let t = "";
      node.childNodes.forEach((n) => {
        if (n.nodeType === 3) t += n.textContent;
        else t += collectText(n);
      });
      return t;
    };
    const totalLen = collectText(scrambleEl).replace(/\s+/g, " ").length;
    let frame = 0;
    const applyScramble = () => {
      const done = Math.floor((frame / 45) * totalLen);
      let count = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const raw = n.textContent;
            let out = "";
            for (let i = 0; i < raw.length; i++) {
              if (raw[i] === "\n" || raw[i] === "\r" || raw[i] === " " || raw[i] === "\t") {
                out += raw[i];
                continue;
              }
              out += count < done ? raw[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              count++;
            }
            n.textContent = out;
          } else if (n.nodeType === 1) walk(n);
        });
      };
      walk(scrambleEl);
      frame++;
      if (frame <= 45) requestAnimationFrame(applyScramble);
      else {
        scrambleEl.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
      }
    };
    requestAnimationFrame(applyScramble);
  }

  // ---------- ReactBits-style: Magnetic buttons ----------
  const magneticBtns = document.querySelectorAll(".hero-cta .btn");
  magneticBtns.forEach((btn) => {
    const strength = 18;
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // ---------- IMC Calculator ----------
  const imcForm = document.getElementById("imcForm");
  const imcValueEl = document.getElementById("imcValue");
  const imcCatEl = document.getElementById("imcCat");

  if (imcForm) {
    imcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const peso = parseFloat(document.getElementById("peso").value);
      const alturaCm = parseFloat(document.getElementById("altura").value);
      if (!peso || !alturaCm) return;
      const alturaM = alturaCm / 100;
      const imc = peso / (alturaM * alturaM);
      imcValueEl.textContent = imc.toFixed(1);

      let cat = "";
      if (imc < 18.5) cat = "Underweight";
      else if (imc < 25) cat = "Normal weight — congratulations!";
      else if (imc < 30) cat = "Overweight";
      else if (imc < 35) cat = "Obesity grade I";
      else if (imc < 40) cat = "Obesity grade II";
      else cat = "Obesity grade III";
      imcCatEl.textContent = cat;
    });
  }
});

// ---------- Contact form (WhatsApp handoff) ----------
function handleContact(event) {
  event.preventDefault();
  const nome = document.getElementById("cnome").value.trim();
  const wpp = document.getElementById("cwpp").value.trim();
  const msg = document.getElementById("cmsg").value.trim();
  const text = `Hello! I am ${nome} (${wpp}). ${msg}`;
  const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
  return false;
}
