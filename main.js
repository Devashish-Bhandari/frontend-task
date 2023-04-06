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
        draggedBox= box;
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
        cell.appendChild(draggedBox);
        console.log(sourceCell, destinationBox);
        sourceCell.appendChild(destinationBox);
        cell.classList.remove('hovered');
    })
})

