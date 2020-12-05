
import React,{useState,useEffect} from 'react'
import './Login.css'

export default function Login(props) {
   const [h,setH]= useState('Enter') 
   const [p,setP]= useState('Sign Up')
   const [authOrReg,setAOR]= useState('/login/')
   const [login,setLog]= useState('')
   const [pass,setPass]= useState('')

   useEffect(()=>{let token = localStorage.getItem('token')
   if(token != null){
      props.history.push('/')
   }},[])

   
  const setParametrs=()=>{
            if(authOrReg == '/login/'){
                
                   setH('Регистрация'),
                    setAOR('/registration/'),
                    setP('Войти')
               
            }else{
                
                    setH('Войти'),
                    setAOR('/login/'),
                    setP('Зарегистрироваться')
               
            } 
        }

       const registration= async (e)=>{
            let val = e.target.value
            let data = {}
            
            if(val == '/login/'){
                data['username'] = login
                data['password'] = pass 
            }else{
                data['username'] = login
                data['password1'] = pass
                data['password2'] = pass 
            }
            let url='http://todo.leylek.kg/api/dj-rest-auth'+val
            try{
                let resp = await fetch(url, {
                    method:'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                let json = await resp.json()
                console.log(json)
                localStorage.setItem('token',json.key)
                localStorage.setItem('id',json.user.id)
                if(json.key!=undefined){
                    props.history.push('/')
                }
            }catch(error){
                console.log(error)
            }
        }



            
        
   return (
            <div className='wrapper'>
            <div className="card">
                <h3>{h}</h3>
                <input
                    type="text" 
                    placeholder='name' 
                    value={login}
                    onChange={(event)=>{
                                setLog(event.target.value)
                        // this.setState({login:event.target.value})
                    }}
                    />
                <br/>
                <input 
                    type="password" 
                    placeholder='password'
                    value={pass}
                    onChange={(event)=>{
                                setPass(event.target.value)
                        // this.setState({pass:event.target.value})
                    }}
                    />
                <br/>
                
                <button 
                    value={authOrReg} 
                    onClick={(event)=>{
                        registration(event)
                    }}
                >Войти</button>
                <p onClick={setParametrs}>{p}</p>
            </div>
        </div>
    )
  }
