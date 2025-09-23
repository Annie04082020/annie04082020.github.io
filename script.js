const btn = document.getElementById("lang-toggle");
if (btn) {
  let current = "zh";
  btn.addEventListener("click", () => {
    current = current === "zh" ? "en" : "zh";
    btn.textContent = current === "zh" ? "EN" : "中";
    document.querySelectorAll("[data-zh]").forEach(el => {
      el.textContent = el.getAttribute("data-" + current);
    });
  });
}
