import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";



function App() {
const [length, setLength] = useState(8)
const [number, setNumber] = useState(false)
const [character, setCharacter] = useState(false)
const [password, setPassword] = useState("")

//useref hook
const  passwordRef = useRef(null)

const passwordGenerater= useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPWRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  for(let i=0; i<=length; i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }

  setPassword(pass)

  if(number) str+="1234567890"
  if(character) str+=" !@#$~%^&*()_+{}|:>?="


},[length, number, character, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect(()=>{
  passwordGenerater()
}, [length, number, character, passwordGenerater])



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md-rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className="text-white text-center my-3">PASSWORD GENERATOR</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="Enter Password"
          readOnly
          ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
              <input type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=> {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>

          </div>
          <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={number}
            id="numberInput"   
            onChange={()=> {
              setNumber((prev)=>!prev)}}
          />
          <label htmlFor="numberInput ">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={character}
            id="characterInput"
            onChange={()=>{
              setCharacter((prev)=>!prev)}}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
