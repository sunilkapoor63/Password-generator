import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  // useState hook
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")
// useRef hook 
const passwordRef = useRef(null)
// If dependencies is there then we will use useCallback
  const passwordGenerator = useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberallowed) str+="0123456789"
      if(charallowed) str+="!@#$%^&*"
      for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(index)
      }
      setPassword(pass)

    },[length, charallowed, numberallowed, setPassword]) // dependencies

    const CopyPasswordToClipboard = useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,999)  // how many values will be selected
      window.navigator.clipboard.writeText(password)
    },[password])
// only one time run when the page reload
    useEffect(()=>{ 
      passwordGenerator()
    },[length, numberallowed, charallowed, passwordGenerator]) // if anything change then re-render

  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 
      text-orange-500 bg-gray-800' >
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={CopyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberallowed}
            id='numberInput'
            onChange={()=>{
              setNumberallowed((prev) => !prev)
            }}
             />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charallowed}
            id='numberInput'
            onChange={()=>{
              setCharallowed((prev) => !prev)
            }}
             />
          <label htmlFor="numberInput">Charecters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
