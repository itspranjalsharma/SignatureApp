const canvas = document.getElementById("signature-pad");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const colorPicker = document.getElementById("color-picker"); // New element for color selection
const thicknessSlider = document.getElementById("thickness-slider"); // New element for thickness selection
const ctx = canvas.getContext("2d");
let drawing = false;
let prevX = 0;
let prevY = 0;
let color = "#000"; // Current line color
let thickness = 2; // Current line thickness
let undoStack = []; // Stack for storing previous canvas states for undo

// Event listeners for drawing
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  prevX = e.clientX - canvas.getBoundingClientRect().left;
  prevY = e.clientY - canvas.getBoundingClientRect().top;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Save canvas state before drawing
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  draw(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});

// Function to draw on the canvas
function draw(x, y) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineJoin = "round";
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  prevX = x;
  prevY = y;
}

// Event listener for the clear button
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  undoStack = []; // Clear undo history on clear
});

// Event listener for the save button
saveButton.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "signature.png";
  a.click();
});

// Event listener for color picker (assuming a color picker element exists)
colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

// Event listener for thickness slider (assuming a thickness slider element exists)
thicknessSlider.addEventListener("input", (e) => {
  thickness = parseInt(e.target.value);
});

// Function to undo the last drawing action
function undo() {
  if (undoStack.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(undoStack.pop(), 0, 0);
  }
}

// Add a button or key press event listener for undo functionality (e.g., bind undo to 'z' key)
document.addEventListener("keydown", (e) => {
  if (e.key === "z" && e.ctrlKey) {
    // Check for Ctrl+Z
    undo();
  }
});

// Touch events for mobile devices (modify based on your chosen touch event library)
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  drawing = true;
  prevX = touch.clientX - canvas.getBoundingClientRect().left;
  prevY = touch.clientY - canvas.getBoundingClientRect().top;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

canvas.addEventListener("touchmove", (e) => {
  if (!drawing) return;
  const touch = e.touches[0];
  draw(
    touch.clientX - canvas.getBoundingClientRect().left,
    touch.clientY - canvas.getBoundingClientRect().top
  );
});

canvas.addEventListener("touchend", () => {
  drawing = false;
});
