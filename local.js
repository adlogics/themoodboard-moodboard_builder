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


// image copying functionality---------------
document.addEventListener("paste", function(e){
    const items = e.clipboardData.items;
     let foundImage = false;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            const imgURL = URL.createObjectURL(blob);
            addImageToWorkspace(imgURL);
            foundImage = true;
            break;
        }
        if (item.type === "text/plain") {
            item.getAsString(function (text) {
                if (isImageUrl(text)) {
                    addImageToWorkspace(text);
                }
            });
        }
    }
    if (!foundImage) {
        console.log("No image found in clipboard.");
    }
});

function isImageUrl(url){
    return (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) != null);
}

function addImageToWorkspace(imageUrl){
    const pastedImageWrapper = document.createElement("div");
    pastedImageWrapper.classList.add("draggable", "image");
    const pastedImage = document.createElement("img");
    pastedImage.src =imageUrl;
    pastedImage.alt = "pasted image";
    pastedImage.style.maxWidth = '200px';
    pastedImage.style.height = 'auto';

    
    pastedImageWrapper.appendChild(pastedImage);
    pastedImageWrapper.setAttribute('draggable', true);
    pastedImageWrapper.style.position = 'absolute';
    pastedImageWrapper.style.left = '100px';
    pastedImageWrapper.style.top = '100px';

    pastedImageWrapper.addEventListener('dragstart', dragStart);
    pastedImageWrapper.addEventListener('dragend', dragEnd);

    const workspace = document.getElementById('main-body');
    workspace.appendChild(pastedImageWrapper);
}



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

