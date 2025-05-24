const nodeTree = document.querySelector(".menu");

let activeEl;

document.addEventListener("click", (e) => {
  if (activeEl && e.target !== nodeTree.nextElementSibling) {
    activeEl.classList.remove("active");
    activeEl = null;
    const activeWithin = nodeTree.querySelector(".active-within");
    if (activeWithin) {
      activeWithin.classList.remove("active-within");
    }
  }
});

nodeTree.addEventListener("click", (e) => {
  const el = e.target;
  const li = el.closest("LI");
  const dropDown = e.target.classList.contains("drop-icon");
  if (dropDown) {
    e.stopPropagation();
    const btn = e.target;
    const btnLi = btn.closest("LI");
    if (btn.classList.contains("collapsed")) {
      btn.classList.remove("collapsed");
      if (btnLi.classList.contains("active-within")) {
        btnLi.classList.remove("active-within");
      }
    } else {
      btn.classList.add("collapsed");
      if (activeEl && li.nextElementSibling.querySelector(".active")) {
        btnLi.classList.add("active-within");
      }
    }

    return;
  }
  if (li) {
    e.stopPropagation();
    const activeWithin = nodeTree.querySelector(".active-within");
    if (activeWithin) {
      activeWithin.classList.remove("active-within");
    }
    if (activeEl && li === activeEl) return;
    const ul = li.closest("UL");
    li.classList.add("active");
    ul.classList.add("active");

    if (activeEl) {
      const activeUl = activeEl.closest("UL");
      if (activeUl !== ul) {
        activeUl.classList.remove("active");
      }
      activeEl.classList.remove("active");
    }

    activeEl = li;
  }
});
