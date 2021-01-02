import React, { useState,useEffect } from "react";
//import "./../styles/App.css";
import ListItem from  './ListItem.js'

function    TodoList(props) {
   const [items,setItems]  = useState([]);
	const [newItem,setNewItem] = useState("");		 
	
	const addItem=()=>{
		
		let token = "token " + props.token;
		fetch('http://localhost:8000/todo',{
			method:"POST",
			
				headers:{
					"content-Type":"application/json",
					"authorization" : token 
				},
			body:
				JSON.stringify({"task":newItem}),
			
		}).then((resp)=>{
			 resp.json().then((result)=>{
					items.push(result);
					setNewItem('');
			 })
		})

	}

const newItemChanged=(evt)=>{
	setNewItem(evt.target.value);
}
const deleteHandler=(id)=>{
	//   items.splice(itemIdx,1);
	//   setItems([...items]);
	console.log(id);
	
	let token = "token " + props.token;
	fetch('http://localhost:8000/todo'+'/'+id,{
	 method:"DELETE",
	 
	 headers:{
		 "content-Type":"application/json",
		 "authorization" : token 
	 },
	 
			
 }).then((resp)=>{
 
console.log(resp);
 })

}

const editHandler = (editedValue,id) =>{
	// items[itemIdx] = editedValue;
	// setItems([...items])
	console.log(id);
	console.log(editedValue);
	let token = "token " + props.token;
	fetch('http://localhost:8000/todo'+'/'+id,{
	 method:"PUT",
	 
	 headers:{
		 "content-Type":"application/json",
		 "authorization" : token 
	 },
	 body:
				JSON.stringify({"task":editedValue}),
			
 }).then((resp)=>{
 
console.log(resp);
 })
}

   useEffect(()=>{
       let token = "token " + props.token;
       fetch('http://localhost:8000/todo',{
        method:"GET",
        
        headers:{
            "content-Type":"application/json",
            "authorization" : token 
        },
    }).then((resp)=>{
      resp.json().then((result)=>{
        setItems(result);
    })
    })
   });

	return (
	<div id="main">
	  <textarea id="task" onChange={newItemChanged} placeholder="New Item" value={newItem}></textarea>
	  <button id="btn" onClick={addItem} disabled={newItem.trim().length===0}>Add Item</button>

	  {items.map((item,idx)=>(
               <ListItem item={item.task} key={idx} idx={item._id} editHandler={editHandler} deleteHandler={deleteHandler}/>
	  ))}

	   
	</div>
	)
}

export default TodoList;