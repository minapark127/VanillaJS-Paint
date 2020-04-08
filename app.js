const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colour = document.getElementsByClassName("js-colour");
const current = document.querySelector(".current");
const range = document.querySelector("#js-range");
const modeBtn = document.querySelector(".js-mode");
const saveBtn = document.querySelector(".js-save");
const clearBtn = document.querySelector(".js-clear");

const INITIAL_COLOUR = "#03a9f4";

canvas.width = 750;
canvas.height = 550;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //so that when saved, canvas can have white background by default.
ctx.strokeStyle = INITIAL_COLOUR;
ctx.fillStyle = INITIAL_COLOUR;
ctx.lineWidth = 10;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleClickColour(event) {
  const selected = event.target;
  const selectedColour = getComputedStyle(selected).backgroundColor;
  ctx.strokeStyle = selectedColour;
  ctx.fillStyle = selectedColour;
  current.style.backgroundColor = selectedColour;
}
function handleRangeChange(event) {
  brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}
function handleClickMode() {
  if (filling === true) {
    filling = false;
    modeBtn.innerHTML = "fill";
    canvas.style.cursor = "url(images/paint.png),auto"; //icons by icons8
  } else {
    filling = true;
    modeBtn.innerHTML = "paint";
    canvas.style.cursor = "url(images/fill.png),auto"; //icons by icons8
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "Paint-Export[🎨]";
  link.click();
}
function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
  canvas.style.cursor = "url(images/paint.png),auto"; //icons by icons8
}
Array.from(colour).forEach(color =>
  color.addEventListener("click", handleClickColour)
);
if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (modeBtn) {
  modeBtn.addEventListener("click", handleClickMode);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (clearBtn) {
  clearBtn.addEventListener("click", handleClearClick);
}
