const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const range = document.getElementById('jsRange');
const colors = document.getElementsByClassName('jsColor');
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

function startPainting(event){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handlerColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function handlerRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handlerModeClick(event){
    const text = event.target.outerText;
    if(filling){
        filling = false;
        mode.innerHTML = "Fill";
    }else{
        filling = true;
        mode.innerHTML = "Paint";
    }
}

function handlerCanvasClick(event){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handlerCM(event){
    event.preventDefault();
}

function handlerSaveClick(){
    const image = canvas.toDataURL("img/jpeg");
    const a = document.createElement("a");
    a.href = image;
    a.download = "MasterPiece";

    a.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handlerCanvasClick);
    canvas.addEventListener("contextmenu",handlerCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handlerColorClick));

if(range){
    range.addEventListener("click", handlerRangeChange);
}

if(mode){
    mode.addEventListener("click", handlerModeClick);
}

if(save){
    save.addEventListener("click", handlerSaveClick);
}



