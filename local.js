// to open and shut hamburger menu hamburger()
const hamburger = ()=>{
    const sideBar = document.getElementById("side-bar")
    const menu = document.getElementById("ham-menu");
    menu.addEventListener('click', function(){
        sideBar.classList.toggle("hide-it")
    })
}
hamburger();
// pName() for storing and displaying name of project...
const pName = ()=>{
    let boardName = document.getElementById("board-name");
    let newName = boardName.textContent.trim();
    if(newName === ""){
        boardName.textContent = "moodboard-name"
    }
}

// main-body starts here-------------------------------------------------------

document.getElementById('note-btn').addEventListener('click', () => addElement('note'));
document.getElementById('img-btn').addEventListener('click', () => addElement('image'));
document.getElementById('text-btn').addEventListener('click', () => addElement('text'));
document.getElementById('upload-btn').addEventListener('click', () => addElement('upload'));

function addElement(type){
    const workspace = document.getElementById("main-body")
    let newElement;
    switch(type){
        case "note":
            newElement= createNote();
            break;
        case "image":
            newElement = createImage();
            break;
        case "text":
            newElement = createText();
            break;
        case "upload":
            newElement = createUpload();            
            break;
    }
    workspace.appendChild(newElement);
}

function createNote(){
    const note = document.createElement("div");
    note.classList.add("draggable", "note");
    note.contentEditable = true;
    note.innerHTML= "New Note";
    note.setAttribute("draggable", true);
    note.style.position = 'absolute'; 
    note.addEventListener('dragstart', dragStart);
    note.addEventListener('dragend', dragEnd);
    return note;
}

function createImage() {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('draggable', 'image');
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/150';  // Placeholder image
    imgContainer.appendChild(img);
    imgContainer.setAttribute('draggable', true);
    imgContainer.style.position = 'absolute';
    imgContainer.addEventListener('dragstart', dragStart);
    imgContainer.addEventListener('dragend', dragEnd);
    return imgContainer;
}

function createText() {
    const text = document.createElement('div');
    text.classList.add('draggable', 'text');
    text.contentEditable = true;
    text.innerHTML = 'Editable Text';
    text.setAttribute('draggable', true);
    text.style.position = 'absolute';
    text.addEventListener('dragstart', dragStart);
    text.addEventListener('dragend', dragEnd);
    return text;
}

function createUpload() {
    const uploadContainer = document.createElement('div');
    uploadContainer.classList.add('draggable', 'upload');
    uploadContainer.innerHTML = 'Upload content here';
    uploadContainer.setAttribute('draggable', true);
    uploadContainer.style.position = 'absolute';
    uploadContainer.addEventListener('dragstart', dragStart);
    uploadContainer.addEventListener('dragend', dragEnd);
    return uploadContainer;
}

let draggedElement = null;
function dragStart(e){
    draggedElement=e.target;
    setTimeout(()=>{
        draggedElement.style.opacity=0.5;
    },0);
}
function dragEnd(e){
    setTimeout(() => {
        draggedElement.style.opacity=1
        draggedElement=null;
    }, 0);
}

const workspace = document.getElementById('main-body');
workspace.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
workspace.addEventListener("drop",(e)=>{
    e.preventDefault();
    if (draggedElement) {
        // Get mouse position and update element position accordingly
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        draggedElement.style.left = `${mouseX - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${mouseY - draggedElement.offsetHeight / 2}px`;
    }
})

// dustbin functionality----------------------------------------------------------------------------
const dustbin = document.getElementById("dustbin");
 dustbin.addEventListener('dragover', (e) => {
            e.preventDefault();
            dustbin.style.backgroundColor = '#ff7f7f';
        });

        dustbin.addEventListener('drop', (e) => {
            e.preventDefault();

            if (draggedElement) {
                if (draggedElement.classList.contains('draggable')) {
                    draggedElement.remove();  // Remove the element from the workspace
                    dustbin.style.backgroundColor = "transparent";  // Reset dustbin color
                }
            }
        });

