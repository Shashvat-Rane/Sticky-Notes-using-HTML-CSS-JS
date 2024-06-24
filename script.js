let zindexcount =1;
let NoteObjects = [];
let ids = 1;



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

const createStickyNoteSmall = (notess)=>{
    let divsmall = document.createElement('div');
    divsmall.classList.add('note');
    divsmall.id = `note${notess.id}`

    divsmall.innerHTML=`
        <div class="topline"></div>
        <div class="timenoption">
            <h6 class="time">${notess.time}</h6>
            <img class="option" src="./icons/optionblack.png">
        </div>
        <div class="opendltlist hide">
                    <div class="openbtn">
                        <img src="./icons/open.png">
                        <h6 class="openbtntxt">Open</h6>
                    </div>
                    <div class="dltbtninlist">
                        <img src="./icons/delete.png">
                        <h6 class="dltbtninlisttxt">Delete</h6>
                    </div>
                </div>
        <div id="text${notess.id}"class="text">
            <h6 style="color: #efefef;opacity: 0.7;font-weight:10;font-size:15px;margin:15px 10px;">Take a note...</h6>
        </div>
    `

    document.querySelector('.notes-list').append(divsmall);

    document.querySelector(`#note${notess.id} .option`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#note${notess.id}`).querySelector('.opendltlist').classList.toggle('hide')
    })

    document.querySelector(`#note${notess.id} .openbtn`).addEventListener('click',(e)=>{
        e.stopPropagation();
        document.querySelector(`#drag${notess.id}`).classList.remove('hide');
    })

    document.querySelector(`#note${notess.id} .dltbtninlist`).addEventListener('click',(e)=>{
        e.stopPropagation();
        document.querySelector(`#drag${notess.id}`).remove();
        document.querySelector(`#note${notess.id}`).remove();
        NoteObjects=NoteObjects.filter((n)=>{
            if(n.id===notess.id){
                return false;
            }
            return true;
        });
    })

    let input = document.getElementById('searchtext');

    input.addEventListener('input', (e) => {
        if(e.target.value===''){
            for(i=0;i<NoteObjects.length;i++){
                document.querySelector(`#note${NoteObjects[i].id}`).classList.remove('hide');
            }
        }
        else{
            for(i=0;i<NoteObjects.length;i++){
                let text1 = NoteObjects[i].txt;
                let text2 = e.target.value;
                text1 = text1.toLowerCase();
                text2 = text2.toLowerCase();

                if (!text1.includes(text2)) {
                    document.querySelector(`#note${NoteObjects[i].id}`).classList.add('hide');
                }
                else{
                    document.querySelector(`#note${NoteObjects[i].id}`).classList.remove('hide');
                }
            }
        }
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
            <div class="plusiconon plusiconclick">
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

    document.querySelector(`#drag${note.id} .nlbtn`).addEventListener('click',(e)=>{
        e.stopPropagation();
        document.querySelector('.main').classList.remove('hide');
    })

    document.querySelector(`#drag${note.id} .dltbtn`).addEventListener('click',(e)=>{

        e.stopPropagation();  
        document.querySelector(`#drag${note.id}`).remove();
        document.querySelector(`#note${note.id}`).remove();
        NoteObjects=NoteObjects.filter((n)=>{
            if(n.id===note.id){
                return false;
            }
            return true;
        });
    })



    
    document.querySelector(`#drag${note.id} .plusiconclick`).addEventListener('click', (e) => {
        e.stopPropagation()
        let note = {
            id:ids,
            txt:'',
            z:zindexcount,
            time:new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" }),
        };
        NoteObjects.push(note);
        ids=ids+1;
        zindexcount=zindexcount+1;
        createStickyNoteFull(note);
        createStickyNoteSmall(note);
    })

    document.querySelector(`#drag${note.id} .closeiconon`).addEventListener('click', (e) => {
        if(note.txt===''){
            document.querySelector(`#note${note.id}`).remove();
            document.querySelector(`#drag${note.id}`).remove();
            NoteObjects=NoteObjects.filter((n)=>{
                if(n.id===note.id){
                    return false;
                }
                return true;
            });
        }
        else{
            document.querySelector(`#drag${note.id}`).classList.add('hide');
        }
        
    })

    document.querySelector(`#drag${note.id} .color1`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#e6b905";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#e6b905";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#e6b905";
    })
    document.querySelector(`#drag${note.id} .color2`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#6fd262";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#6fd262";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#6fd262";
    })
    document.querySelector(`#drag${note.id} .color3`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#ea86c2";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#ea86c2";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#ea86c2";
    })
    document.querySelector(`#drag${note.id} .color4`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#c78eff";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#c78eff";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#c78eff";
    })
    document.querySelector(`#drag${note.id} .color5`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#5ac0e7";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#5ac0e7";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#5ac0e7";
    })
    document.querySelector(`#drag${note.id} .color6`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "#aaaaaa";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "#aaaaaa";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "#aaaaaa";
    })
    document.querySelector(`#drag${note.id} .color7`).addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelector(`#drag${note.id}`).querySelector('.header-for-note').style.backgroundColor = "red";
        document.querySelector(`#note${note.id}`).querySelector('.topline').style.backgroundColor = "red";
        document.querySelector(`#note${note.id}`).querySelector('.time').style.color = "red";
    })

    const ta = divhai.querySelector('.textareaon');
    ta.addEventListener('input',(e)=>{
        note.txt=e.target.value;
        if(note.txt===''){
            document.querySelector(`#note${note.id}`).querySelector('.text').innerHTML=`<h6 style="color: #efefef;opacity: 0.7;font-weight:10;font-size:15px;margin:15px 10px;">Take a note...</h6>`;

        }else{
            document.querySelector(`#note${note.id}`).querySelector('.text').innerHTML=note.txt;
        }
    })

}




document.querySelector('#drag .plusiconclick').addEventListener('click',()=>{
    let note = {
        id:ids,
        txt:'',
        z:zindexcount,
        time:new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" }),
    };
    NoteObjects.push(note);
    ids=ids+1;
    zindexcount=zindexcount+1;
    createStickyNoteFull(note);
    createStickyNoteSmall(note);
    // console.log(NoteObjects)
})

document.querySelector('#drag .closeiconclick').addEventListener('click',()=>{
    document.querySelector('.main').classList.add('hide');
})