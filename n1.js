const elements = document.querySelectorAll('.design-element');
const board = document.getElementById('board');

elements.forEach(el => {
    el.addEventListener('dragstart', dragStart);
    el.addEventListener('dragend', dragEnd);
});

board.addEventListener('dragover', dragOver);
board.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnd() {
    this.style.opacity = '1';
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);
    board.appendChild(draggedElement);
}

let elementCount = 2;
function addNewElement() {
    elementCount++;
    const newElement = document.createElement('div');
    newElement.className = 'design-element';
    newElement.id = `element${elementCount}`;
    newElement.textContent = `Element ${elementCount}`;
    newElement.draggable = true;
    newElement.addEventListener('dragstart', dragStart);
    newElement.addEventListener('dragend', dragEnd);
    board.appendChild(newElement);
}

function uploadFile() {
    const fileList = document.getElementById('fileList');
    const files = document.getElementById('uploadFile').files;

    fileList.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        let fileItem = document.createElement('p');
        fileItem.textContent = files[i].name;
        fileList.appendChild(fileItem);
    }
}

function showVersionHistory() {
    const versionHistory = document.getElementById('versionHistory');
    versionHistory.innerHTML = `
        <ul>
            <li>Version 1.0 - Initial design upload</li>
            <li>Version 1.1 - Updated color scheme</li>
            <li>Version 1.2 - Final changes to layout</li>
        </ul>
    `;
}

function submitFeedback() {
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackInput = document.getElementById('feedbackInput').value;

    if (feedbackInput) {
        const feedbackItem = document.createElement('p');
        feedbackItem.textContent = feedbackInput;
        feedbackSection.appendChild(feedbackItem);
        document.getElementById('feedbackInput').value = '';
    } else {
        alert('Please enter some feedback.');
    }
}
