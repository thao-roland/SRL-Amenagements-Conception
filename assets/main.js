// Reveal-on-scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Nav background + parallax on scroll
const nav = document.getElementById("nav");
const navLine = document.getElementById("nav-line");
const onScroll = () => {
  const y = window.scrollY;
  if (nav) {
    if (y > 24) {
      nav.classList.add("frost");
      if (navLine) navLine.style.opacity = "1";
    } else {
      nav.classList.remove("frost");
      if (navLine) navLine.style.opacity = "0";
    }
  }
  document.querySelectorAll(".parallax").forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const speed = 0.18;
      const offset = rect.top * -1 * speed;
      img.style.setProperty("--p", `${offset}px`);
    }
  });
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Animated counters
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(target * eased).toString();
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);
document
  .querySelectorAll("[data-count]")
  .forEach((el) => countObserver.observe(el));

// Mobile menu toggle
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("hidden");
    burger.setAttribute("aria-expanded", String(!open));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

// Contact form (only on contact page)
const form = document.getElementById("quoteForm");
const status = document.getElementById("formStatus");
if (form && status) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    if (!name || !email) {
      status.classList.remove("hidden");
      status.textContent =
        "Merci de renseigner au moins votre nom et votre email.";
      status.classList.remove("border-sage/40", "bg-sage/10");
      status.classList.add("border-white/20", "bg-white/5");
      return;
    }
    status.classList.remove("hidden", "border-white/20", "bg-white/5");
    status.classList.add("border-sage/40", "bg-sage/10");
    status.textContent =
      "Merci, " +
      name +
      ". Votre demande nous est bien parvenue — un chef de projet vous contactera sous 24 h.";
    form.reset();
  });
}
