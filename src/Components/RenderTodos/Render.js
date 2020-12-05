import React from 'react'

export default function Render(props) {

 return (
    <div>
        {
  props.data ? 
  props.data.map(el=>{
   return(
    <div className={el.status ? 'todo active' : 'todo'} key={el.id}>
    <h3>{el.title}</h3>
   <div className="btns">
    {!el.status ?
   <button 
   value={el.id} 
  onClick={(event)=>{
     props.done(event)}
  }>
      DONE
  </button>
 :null}
    
   <button 
      value={el.id} 
    onClick={(event)=>{
       props.deleteTodo(event)}
    }>DELETE</button>
  <button 
    value={el.id}
     onClick={(event)=>{
        props.openModalForEdit(event)}
   }>EDIT</button>
    </div>
   </div>
    )
   }): null
      }                            
    </div>
   )
}
