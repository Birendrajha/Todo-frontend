import React,{useState} from "react";
//import "./../styles/App.css";

function ListItem(props) {
       const [editItem,setEditItem] = useState(props.item);
       const [editMode,setEditMode] = useState(false);

       const editItemChanged = (evt)=>{
           setEditItem(evt.target.value);
       }
           const saveEditedItem = ()=>{
               props.editHandler(editItem,props.idx);
               setEditMode(false);
           } 

       return(
           <div className="list">
              {editMode ?
                <>
                <textarea className="editTask" onChange={editItemChanged}placeholder="Edit Task" value={editItem}></textarea>
                <button className="saveTask" onClick={saveEditedItem} disabled={editItem.trim().length===0}>save Task</button>
                </>
                :<>
                {props.item}
                <button className="edit" onClick={()=>setEditMode(true)}>edit</button>
                <button className="delete" onClick={()=>props.deleteHandler(props.idx)}>delete</button>
                </>
              }

           </div>
       )
}
export default ListItem;