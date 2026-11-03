const gallery = document.getElementById('gallery');

gallery.addEventListener('wheel', (event) => {
  // Suppress native vertical window scrolling while interacting with the gallery
  event.preventDefault(); 
  
  // Pivot vertical scroll movement into a horizontal position offset
  gallery.scrollLeft += event.deltaY;
}, { passive: false }); // Explicit passive flag required to allow preventDefault()

const preview = document.createElement('div');
preview.setAttribute('role', 'dialog');
preview.setAttribute('aria-modal', 'true');
preview.setAttribute('aria-label', 'Image preview');
preview.style.cssText = 'display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,.9); align-items:center; justify-content:center;';

const previewImage = document.createElement('img');
previewImage.style.cssText = 'max-width:90vw; max-height:90vh; object-fit:contain;';

const closeButton = document.createElement('button');
closeButton.type = 'button';
closeButton.textContent = '×';
closeButton.setAttribute('aria-label', 'Close image preview');
closeButton.style.cssText = 'position:absolute; top:16px; left:16px; font-size:32px; color:white; background:transparent; border:0; cursor:pointer;';

preview.append(closeButton, previewImage);
document.body.appendChild(preview);

function closePreview() {
  preview.style.display = 'none';
  previewImage.removeAttribute('src');
}

document.querySelectorAll('.gallery-wrapper img').forEach((image) => {
  image.style.cursor = 'pointer';
  image.addEventListener('click', () => {
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    preview.style.display = 'flex';
  });
});

closeButton.addEventListener('click', closePreview);
preview.addEventListener('click', (event) => {
  if (event.target === preview) closePreview();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && preview.style.display === 'flex') closePreview();
});

