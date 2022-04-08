import { galleryItems } from "./gallery-items.js";
const galleryRef = document.querySelector(".gallery");
const markupGallery = composeMarkup(galleryItems);

galleryRef.innerHTML = markupGallery;
galleryRef.addEventListener("click", selectImg);

function selectImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const onEscape = (e) => {
    if (e.key === "Escape") {
      instance.close();
    }
  };
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}"/> `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscape);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscape);
      },
    }
  );
  instance.show();
}

function composeMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
  </div>`;
    })
    .join("");
}
