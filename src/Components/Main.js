import React from 'react'
import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import {Switch,Route} from 'react-router-dom'


export default function Main() {
return (
     <div>
        
       <Header/>  
       <Switch>
       <Route exact path='/Login' component={Login} /> 
        <Route exact path='/' component={Home} />  
                
       </Switch>                               
     </div>
  )
}
