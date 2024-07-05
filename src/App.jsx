import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

  {/*useCallback () --> this is used for optimization and memorizing(as much as possible)*/ }
  const passwordGenerator = useCallback(() => {
    let password = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) string += "0123456789"
    if (charAllowed) string += "!@#$%^&*-_+=[](){}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(char)
    }

    setPassword(password)


  }, [length, numberAllowed, charAllowed]); {/*these all state will put in chache  */ }

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();//this will select from the input value
    passwordRef.current?.setselectionRenge(0, max)
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4
      py-1 my-8 text-amber-500
      bg-gray-600'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}

          />
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={charAllowed}
            id='CharacterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}

          />
          <label htmlFor='CharacterInput'>Characters</label>

        </div>
      </div>
    </div>

  )

}

export default App
