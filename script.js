let zindexcount =1;
let NoteObjects = [];
let ids = 1;



// Make the DIV element draggable:
dragElement(document.getElementById("drag"));
// dragElement(document.getElementById("drag2"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function functionalities(ele){
    document.querySelector(".settingiconon").addEventListener('click',()=>{
        document.querySelector(".menu").classList.toggle('hide');
    })
}

const createStickyNoteFull = (note)=>{
    let divhai = document.createElement('div');
    divhai.classList.add('open-note');
    divhai.id = `drag${note.id}`;

    divhai.innerHTML=`
        <div class="menu hide">
            <div style="display: flex;">
                <div class="color1"></div>
                <div class="color2"></div>
                <div class="color3"></div>
                <div class="color4"></div>
                <div class="color5"></div>
                <div class="color6"></div>
                <div class="color7"></div>
            </div>
            <div class="nlbtn">
                <img src="./icons/list.png">
                <h6 class="nlbtntxt">Notes List</h6>
            </div>
            <div class="dltbtn">
                <img src="./icons/delete.png">
                <h6 class="dltbtntxt">Delete Node</h6>
            </div>
        </div>

        <div id="drag${note.id}header" class="header-for-note">
            <div class="plusiconon">
                <img src="./icons/plusblack.png">
            </div>
            <div class="settingcrossiconon">
                <div class="settingiconon">
                    <img src="./icons/optionblack.png">
                </div>
                <div class="closeiconon">
                    <img src="./icons/closeblack.png">
                </div>
            </div>
        </div>
        <div class="textcontainer">
            <textarea spellcheck="false" id="" placeholder="Take a note..." class="textareaon"></textarea>
        </div>
    `

    divhai.style.zIndex=note.z;

    document.querySelector('#mainspace').append(divhai);

    
    dragElement(document.getElementById(`drag${note.id}`));
    // functionalities(document.getElementById(`drag${note.id}`));
    document.querySelector(`#drag${note.id} .settingiconon`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.menu').classList.toggle('hide')
    })

    
}




document.querySelector('#drag .plusiconclick').addEventListener('click',()=>{
    let note = {
        id:ids,
        txt:'',
        z:zindexcount,
    };
    NoteObjects.push(note);
    ids=ids+1;
    zindexcount=zindexcount+1;
    createStickyNoteFull(note);
    // console.log(NoteObjects)
})