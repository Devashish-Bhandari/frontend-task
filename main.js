const cells= document.querySelectorAll('.cell');
const boxes= document.querySelectorAll('.box');

let sourceBox= null; // The box which is being dragged
let destinationBox= null; // The box at the cell where dragged box will be dropped
let sourceCell= null; // The parent cell of the dragged box
let destinationCell= null; // The cell on which source box is dropped

// This array will store the ids of the swapped boxes
// Through this, we will be able to track the swapping events,
// and therefore be able to undo the actions
let eventsArr= [];

// DRAG AND DROP FUNCTIONALITY

// Applying Event Listeners to All the Boxes in the Cells
boxes.forEach( (box) => {

    // When the box starts being dragged
    box.addEventListener('dragstart', ()=> {
        box.classList.add('is-dragging');
        sourceBox= box;
        sourceCell= box.parentElement;
    })
    // When the box is released
    box.addEventListener('dragend', ()=> {
        box.classList.remove('is-dragging')
    })
})

// Adding Event Listeners to the Cells of the Table
cells.forEach( (cell) => {

    // When the draggable box is over the cell
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        cell.classList.add('hovered');
    })

    // When the draggable box leaves that cell
    cell.addEventListener('dragleave', ()=> {
        cell.classList.remove('hovered');
    })

    // When the draggable box is dropped on the cell
    cell.addEventListener('drop', ()=>{

        destinationCell= cell; // destination cell where box is dropped
        destinationBox= cell.firstElementChild; // box which is already present inside that cell 

        // To omit the condition that the cell is dropped on it's own parent cell
        if(sourceBox !== destinationBox){
            // Adding to the Events Array (for Undo to function)
            eventsArr.push( { 
                sourceBoxId : sourceBox.id, 
                destinationBoxId: destinationBox.id
            } );
        }

        // Performing the drag and drop
        cell.appendChild(sourceBox);
        sourceCell.appendChild(destinationBox);

        // Removing Hovered class after the draga and drop is performed
        cell.classList.remove('hovered');
    })
})


// UNDO FUNCTIONALITY

let undoBtn= document.querySelector('.undo');

// Applying event listener to the Undo button
undoBtn.addEventListener('click', ()=>{

    // Performing the Undo function only if Drag and Drop has been performed previously
    if(eventsArr.length>0){
        
        // Taking the last drag and drop from the array
        let i= eventsArr.length-1;
        
        // Destructuring SourceBox and DestinationBox ids.
        let { sourceBoxId , destinationBoxId} = eventsArr[i];
    
        // Storing the elements with these Ids
        let boxA= document.querySelector(`#${sourceBoxId}`);
        let boxB= document.querySelector(`#${destinationBoxId}`);
    
        // Storing the current Parent Cells of these boxes
        let cellA= boxA.parentElement;
        let cellB= boxB.parentElement;
    
        // Undoing the Drag and Drop
        cellA.appendChild(boxB);
        cellB.appendChild(boxA);
    
        // Removing this event from the array as this event is now undone
        eventsArr.pop();
    
    }
    else{
        alert("No Drag and Drop performed so far.");
    }

})
