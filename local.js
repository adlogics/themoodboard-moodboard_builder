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
