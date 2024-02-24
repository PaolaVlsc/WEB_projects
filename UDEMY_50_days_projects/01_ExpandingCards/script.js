const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    const isActive = panel.classList.contains("active");

    removeActiveClasses();

    if (!isActive) {
      panel.classList.add("active");
    }
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
