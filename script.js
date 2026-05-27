const WHATSAPP_NUMBER = "94723855550";
const DEFAULT_MESSAGE =
  "Hello The Bakekeep, I would like to request a quote for a cake.";

const whatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.setAttribute("href", whatsappUrl(DEFAULT_MESSAGE));
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

const form = document.querySelector("#quote-form");
const dateInput = form?.elements.date;

if (dateInput) {
  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 7);
  dateInput.min = minimumDate.toISOString().slice(0, 10);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    "Hello The Bakekeep, I would like to request a cake quote.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Cake type: ${data.get("cakeType")}`,
    `Flavor idea: ${data.get("flavor")}`,
    `Celebration date: ${data.get("date")}`,
    `Pickup or delivery: ${data.get("service")}`,
    `Location: ${data.get("location")}`,
    "",
    "Theme, size, message, or inspiration:",
    `${data.get("details")}`,
    "",
    "I understand custom orders need a minimum of 7 days notice.",
  ].join("\n");

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

const dialog = document.querySelector("#gallery-dialog");
const dialogImage = dialog?.querySelector("img");
const dialogTitle = dialog?.querySelector("p");
const closeButton = dialog?.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const title = item.dataset.title || image.alt;

    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogTitle.textContent = title;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

closeButton?.addEventListener("click", () => {
  dialog.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
