const cells= document.querySelectorAll('.cell');
const boxes= document.querySelectorAll('.box');
let sourceBox= null;
let destinationBox= null;
let sourceCell= null;
let destinationCell= null;

let eventsArr= [];

boxes.forEach( (box) => {
    box.addEventListener('dragstart', ()=> {
        box.classList.add('is-dragging');
        sourceBox= box;
        sourceCell= box.parentElement;
    })
    box.addEventListener('dragend', ()=> {
        box.classList.remove('is-dragging')
    })
})

cells.forEach( (cell) => {
    // when draggable element is over a box element
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        cell.classList.add('hovered');
    })

    // when draggable element leaves the box element
    cell.addEventListener('dragleave', ()=> {
        cell.classList.remove('hovered');
    })

    // when the draggable element drops on the box element
    cell.addEventListener('drop', ()=>{
        destinationCell= cell;
        destinationBox= cell.firstElementChild;

        // console.log("destination box " , destinationBox.id);
        // console.log("source box " , sourceBox.id);

        if(sourceBox !== destinationBox){
            eventsArr.push( { 
                sourceBoxId : sourceBox.id, 
                destinationBoxId: destinationBox.id
            } );
        }


        cell.appendChild(sourceBox);
        sourceCell.appendChild(destinationBox);

        cell.classList.remove('hovered');
    })
})


// UNDO FUNCTIONALITY

let undoBtn= document.querySelector('.undo');

undoBtn.addEventListener('click', ()=>{
    if(eventsArr.length>0){
        
        let i= eventsArr.length-1;
        let { sourceBoxId , destinationBoxId} = eventsArr[i];
        console.log(i);
        console.log(sourceBoxId, destinationBoxId);
    
        let boxA= document.querySelector(`#${sourceBoxId}`);
        let boxB= document.querySelector(`#${destinationBoxId}`);
    
        let cellA= boxA.parentElement;
        let cellB= boxB.parentElement;
    
        cellA.appendChild(boxB);
        cellB.appendChild(boxA);
    
        eventsArr.pop();
    
        console.log(boxA, boxB);

    }
    else{
        alert("No Swapping performed so far");
    }

})

