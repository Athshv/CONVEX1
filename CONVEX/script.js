let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let drawing = false;
let tool = 'pen';
let brushSize = 5;
let currentColor = '#6200ea';
let startX, startY, endX, endY;
let currentShape = '';
let isPreviewing = false;
let drawnShapes = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', previewDrawing);

function setShape(shape) {
    currentShape = shape;
    tool = '';
}

function setTool(selectedTool) {
    tool = selectedTool;
    currentShape = '';
}

function startDrawing(e) {
    drawing = true;
    isPreviewing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    ctx.beginPath();
    if (tool === 'pen' || tool === 'eraser') {
        ctx.moveTo(startX, startY);
    }
}

function stopDrawing(e) {
    drawing = false;
    isPreviewing = false;
    endX = e.offsetX;
    endY = e.offsetY;
    if (currentShape) {
        drawnShapes.push({ shape: currentShape, startX, startY, endX, endY, color: currentColor });
        drawShape(currentShape, startX, startY, endX, endY, false);
    }
    ctx.closePath();
}

function previewDrawing(e) {
    if (!drawing) return;
    if (tool === 'pen') {
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (tool === 'eraser') {
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#fff';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (currentShape) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawCanvas();
        drawShape(currentShape, startX, startY, e.offsetX, e.offsetY, true);
    }
}

function drawShape(shape, x1, y1, x2, y2, preview = false) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.setLineDash(preview ? [5, 5] : []);
    if (shape === 'rectangle') {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    } else if (shape === 'circle') {
        let radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if (shape === 'line') {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    ctx.setLineDash([]);
}

function changeColor(newColor) {
    currentColor = newColor;
}

function changeBrushSize(size) {
    brushSize = size;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnShapes = [];
}

function redrawCanvas() {
    for (let shape of drawnShapes) {
        ctx.strokeStyle = shape.color;
        drawShape(shape.shape, shape.startX, shape.startY, shape.endX, shape.endY, false);
    }
}
