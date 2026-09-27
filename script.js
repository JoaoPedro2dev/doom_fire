const firePixelsArray = [];
const fireWidth = 100;
const fireHeight = 100;
const fireColorsPalette = [
  { r: 7, g: 7, b: 7, a: 0 },
  { r: 31, g: 7, b: 7, a: 1 },
  { r: 47, g: 15, b: 7, a: 1 },
  { r: 71, g: 15, b: 7, a: 1 },
  { r: 87, g: 23, b: 7, a: 1 },
  { r: 103, g: 31, b: 7, a: 1 },
  { r: 119, g: 31, b: 7, a: 1 },
  { r: 143, g: 39, b: 7, a: 1 },
  { r: 159, g: 47, b: 7, a: 1 },
  { r: 175, g: 63, b: 7, a: 1 },
  { r: 191, g: 71, b: 7, a: 1 },
  { r: 199, g: 71, b: 7, a: 1 },
  { r: 223, g: 79, b: 7, a: 1 },
  { r: 223, g: 87, b: 7, a: 1 },
  { r: 223, g: 87, b: 7, a: 1 },
  { r: 215, g: 95, b: 7, a: 1 },
  { r: 215, g: 95, b: 7, a: 1 },
  { r: 215, g: 103, b: 15, a: 1 },
  { r: 207, g: 111, b: 15, a: 1 },
  { r: 207, g: 119, b: 15, a: 1 },
  { r: 207, g: 127, b: 15, a: 1 },
  { r: 207, g: 135, b: 23, a: 1 },
  { r: 199, g: 135, b: 23, a: 1 },
  { r: 199, g: 143, b: 23, a: 1 },
  { r: 199, g: 151, b: 31, a: 1 },
  { r: 191, g: 159, b: 31, a: 1 },
  { r: 191, g: 159, b: 31, a: 1 },
  { r: 191, g: 167, b: 39, a: 1 },
  { r: 191, g: 167, b: 39, a: 1 },
  { r: 191, g: 175, b: 47, a: 1 },
  { r: 183, g: 175, b: 47, a: 1 },
  { r: 183, g: 183, b: 47, a: 1 },
  { r: 183, g: 183, b: 55, a: 1 },
  { r: 207, g: 207, b: 111, a: 1 },
  { r: 223, g: 223, b: 159, a: 1 },
  { r: 239, g: 239, b: 199, a: 1 },
  { r: 255, g: 255, b: 255, a: 1 },
];

const debug = false;

function start() {
  createFireStructure();
  creatFireSource();
  renderFire();
  setInterval(calculeFiresPropagation, 1);
}

function createFireStructure() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function updateFireIntensityPerPixel(currentpixelIndex) {
  const belowPixelIndex = currentpixelIndex + fireWidth;

  if (belowPixelIndex >= fireWidth * fireHeight) {
    return;
  }

  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

  firePixelsArray[currentpixelIndex - decay] = newFireIntensity;
}

function calculeFiresPropagation() {
  for (let col = 0; col < fireHeight; col++) {
    for (let row = 0; row < fireWidth; row++) {
      const pixelIndex = col + fireWidth * row;
      updateFireIntensityPerPixel(pixelIndex);
    }
  }

  renderFire();
}

function renderFire() {
  let table = "<table cellpadding=0 cellspacing=0>";

  for (let row = 0; row < fireHeight; row++) {
    table += "<tr>";
    for (let col = 0; col < fireWidth; col++) {
      const pixelIndex = col + fireWidth * row;
      const fireLevel = firePixelsArray[pixelIndex];

      if (debug === true) {
        table += "<td>";
        table += "<span class='pixel-index'>" + pixelIndex + "</span>";
        table += fireLevel;
        table += "</td>";
      } else {
        const color = fireColorsPalette[fireLevel];
        const colorString = `${color.r},${color.g},${color.b}`;
        table += `<td class="pixel" style="background-color: rgb(${colorString})">`;
        table += "</td>";
      }
    }
    table += "</tr>";
  }

  table += "</table>";

  document.querySelector("#fireBox").innerHTML = table;
}

function creatFireSource() {
  for (let col = 0; col < fireWidth; col++) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + col;

    firePixelsArray[pixelIndex] = 36;
  }
}

start();
