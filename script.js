// Get the canvas element and clear and save buttons
const canvas = document.getElementById("signature-pad");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button"); // New button
const ctx = canvas.getContext("2d");
let drawing = false;
let prevX = 0;
let prevY = 0;
// Event listeners for drawing
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    prevX = e.clientX - canvas.getBoundingClientRect().left;
    prevY = e.clientY - canvas.getBoundingClientRect().top;
});
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    draw(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
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
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
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
});
// Event listener for the save button
saveButton.addEventListener("click", () => {
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "signature.png";
    a.click();
});