import React,{useState,useEffect} from 'react'
import RenderTodos from '../RenderTodos/Render'
import './Home.css'

export default function Home(props) {
   const [data,changeData]=useState([]) 
   const [value,changeValue]=useState('')
   const [modal,changeModal]= useState('false')
   const [editElement,chengeElement]=useState('')
   const [editInput,chengeInput]=useState('')
   const [modalDel,chengeModalDel]=useState('false')
   const [delElement,chengeDelElement]=useState('')

   const logOut=()=>{
            localStorage.removeItem('token','')
            props.history.push('/login')
        }


       useEffect(()=>{
            let token = localStorage.getItem('token')
            if(token == null){
               props.history.push('/login')
            }else{
                getAllTodos(token)
            }
        },[])

       const getAllTodos=async(token)=>{
            let url='http://todo.leylek.kg/api/'
            try{
                let resp = await fetch(url, {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization:'token '+token
                    }
                })
                let json = await resp.json()
                console.log(json)
                changeData(json)
            }catch(error){
                console.log(error)
            }
        }     
        
       const createTodo=async()=>{
            let id = localStorage.getItem('id')
            let token = localStorage.getItem('token')
            let data = {
                author: id,
                title: value,
                body: value
            }
            let url='http://todo.leylek.kg/api/'
            try{
                let resp = await fetch(url, {
                    method:'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization:'token '+token
                    }
                })
                let json = await resp.json()
                console.log(json)
                changeValue('')
                getAllTodos(token)
            }catch(error){
                console.log(error)
            }
     }

    const done=async(event)=>{
            let idElement = event.target.value
            let id = localStorage.getItem('id')
            let token = localStorage.getItem('token')
            let data = {
                username:id,
                status:true
            }
            let url='http://todo.leylek.kg/api/'+idElement+'/'
            try{
                await fetch(url, {
                    method:'PATCH',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization:'token '+token
                    }
                })
                getAllTodos(token)
            }catch(error){
                console.log(error)
            }
        }

       const deleteTodo= async (event)=>{
            //     let idElement = event.target.value
            //     let id = localStorage.getItem('id')
                let token = localStorage.getItem('token')
                let url='http://todo.leylek.kg/api/'+delElement+'/'
                try{
                   await fetch(url, {
                        method:'DELETE',
                        headers:{
                            'Content-Type': 'application/json',
                            Authorization:'token '+token
                        }
                    })
                  getAllTodos(token)
                }catch(error){
                    console.log(error)
                }
            }

           const showModalDel=(event)=>{
                        chengeModalDel(true)       
                        chengeDelElement(event.target.value)
                   }
            const modalDelClose=()=>{
                        chengeModalDel(false)      
                   }
        
            const edit=(event)=>{
                        changeModal(true)
                        chengeElement(event.target.value)
                        chengeElement(event.target.value)
                    }
            const  editNodeRequest=async()=>{
                        let idElement = editElement
                        let id = localStorage.getItem('id')
                        let token = localStorage.getItem('token')
                        let title = editInput
                        let data = {
                            username:id,
                            title: title
                        }
                        let url='http://todo.leylek.kg/api/'+idElement+'/'
                        try{
                            await fetch(url, {
                                method:'PATCH',
                                body: JSON.stringify(data),
                                headers:{
                                    'Content-Type': 'application/json',
                                    Authorization:'token '+token
                                }
                            })
                            getAllTodos(token)
                            changeModal(false)
                            chengeInput("")
                        }catch(error){
                            console.log(error)
                        }
                    }


                    

return (
    <div>
       <button className='logout' onClick={logOut}>выйти</button>
                        <div className="content">
                            <input
                                value={value}
                                onChange={(event)=>{
                                    changeValue(event.target.value)
                                    }
                                }
                             />
                            <button
                                onClick={createTodo}
                            >ADD</button>
        
                            <RenderTodos 
                                data={data}
                                done={done}
                                deleteTodo={showModalDel}
                                openModalForEdit={edit}    
                            />
                        </div>
                                { modalDel?
                                    <div className='delt'>

                                                <h2>Are u sure?</h2>
                                                <button
                                                   onClick={deleteTodo}
                                                >Yes</button>
                                                <button onClick={modalDelClose}>No</button>
                                    </div>: null
                                }

                                { modal ? 
                                    <div className='modal'>
                                    <h3 onClick={()=>changeModal(false)}>+</h3>
                                    <div className="modal__block">
                                        <input 
                                            type="text"
                                            value={editInput}
                                            onChange={
                                                (event)=>{
                                                    chengeInput(event.target.value)
                                                }
                                            }
        
                                        />
                                        <button
                                            onClick={editNodeRequest}
                                        >Edit</button>
                                    </div>
                                   
                                </div> : null
                                }
                                                          
   </div>
  )
}
