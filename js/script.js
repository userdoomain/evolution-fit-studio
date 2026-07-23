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
      if (imc < 18.5) cat = "Abaixo do peso";
      else if (imc < 25) cat = "Peso normal — parabéns!";
      else if (imc < 30) cat = "Sobrepeso";
      else if (imc < 35) cat = "Obesidade grau I";
      else if (imc < 40) cat = "Obesidade grau II";
      else cat = "Obesidade grau III";
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
  const text = `Olá! Sou ${nome} (${wpp}). ${msg}`;
  const url = `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
  return false;
}
