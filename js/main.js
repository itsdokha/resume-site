const slides = Array.from(document.querySelectorAll(".slide"));
const links = Array.from(document.querySelectorAll(".nav__link"));

function setActiveById(id) {
  const target = slides.find(s => s.id === id) || slides[0];

  slides.forEach(s => s.classList.toggle("is-active", s === target));
  links.forEach(a => {
    const isCurrent = a.getAttribute("href") === `#${target.id}`;
    if (isCurrent) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function getIdFromHash() {
  return (location.hash || "").replace("#", "");
}

window.addEventListener("hashchange", () => {
  const id = getIdFromHash();
  setActiveById(id);
});

// старт
setActiveById(getIdFromHash() || "personal");

// клавиши ← →
document.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

  const activeIndex = slides.findIndex(s => s.classList.contains("is-active"));
  if (activeIndex === -1) return;

  const dir = e.key === "ArrowRight" ? 1 : -1;
  const nextIndex = (activeIndex + dir + slides.length) % slides.length;
  location.hash = `#${slides[nextIndex].id}`;
});
