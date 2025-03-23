const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".main__container");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

const orderBtn = document.querySelector(".order-btn");

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

orderBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});