import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  
  const [lenth,setLenth]=useState(6)
  const [numAllow,setNumAllow]=useState(false)
  const [charAllow,setCharAllow]=useState(false)
  const [password,setPassowrd]=useState('')
   
  const passwordRef=useRef(null)

const passwordGenratore=useCallback(()=>{
  let pass=''
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  if(numAllow){
    str += '0123456789'
  }
  if(charAllow){
    str += '!@#$%^&*-_+=[]{}~`()'
  }

  for(let i=0;i<=lenth;i++){
    let char=Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
  }
   setPassowrd(pass)

},[lenth,numAllow,charAllow,setPassowrd])

useEffect(()=>{
  passwordGenratore()

},[lenth,numAllow,charAllow,passwordGenratore])


const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,10)
  window.navigator.clipboard.writeText(password)

},[password])

  return (
    <>
      
    <div className='password_gen_wrap'>
    <h1>Password Genrator</h1>
    <div className='password_input_wrap'>
     <input
      type='text'
      value={password}
      className='pssword_input'
      placeholder='password'
      readOnly
      ref={passwordRef}
     />  
     <button onClick={copyPasswordToClipboard}>Copy</button>
     </div>
      <div className='password_btns'>

      <div className='lenght_wrap'>
      <input
      type='range'
      min={6}
      max={100}
      className='password_length'
      onChange={(e)=>setLenth(e.target.value)}
      /> 
      <label>Lenght : {lenth}</label>
      </div>


      <div className='num_wrap'>
       <input
        type='checkbox'
        defaultChecked={numAllow}
        id='numberInput'
        onChange={()=>{
          setNumAllow(pre=>!pre)
        }}
       />
      
       <label htmlFor='numberInput'>Number</label>
      </div>

      <div className='num_wrap'>
      <input
       type='checkbox'
       defaultChecked={numAllow}
       id='charInput'
       onChange={()=>{
         setCharAllow(pre=>!pre)
       }}
      />
     
      <label htmlFor='charInput'>Charecter</label>
     </div>
         
      
      </div>
    </div>
    </>
  )
}

export default App
