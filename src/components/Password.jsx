import React, { useCallback, useEffect, useRef, useState } from "react";

const Password=()=>{
    const[length, setLength] = useState(6);
    const[isNumAllowed, setIsNumAllowed] = useState(false);
    const[isCharAllowed, setIsCharallowed] = useState(false);
    const[password, setPassword] = useState();

    const passwordRef = useRef(null);

    const passwordGenrator = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXZYabcdefghijklmnopqrstuvwxyz"
        if(isNumAllowed) str += "0123456789"
        if(isCharAllowed) str += "!@#$%^&**[]{}`~"

        for(let i=1;i<=length;i++){
            let char = Math.floor(Math.random()*str.length+1);
            console.log("password " , pass, "length = " , length) ;
            pass += str.charAt(char);
        }
        setPassword(pass);

    }, [length, isNumAllowed, isCharAllowed, setPassword])  

    useEffect(()=>{
        passwordGenrator();
    },[length, isNumAllowed, isCharAllowed, passwordGenrator])

    /** Copy password 
     *  Can be done using normal function also
     * 
     * const copyClipboardPass  =()=>{
        window.navigator.clipboard.writeText(password);
        }
     * 
     */

    const copyClipboardPass = useCallback(() =>{
        passwordRef.current?.select()  // for highlight the selected text
        /** 
         *  passWordRef.current?.setSelectionRange(0,12);
         *  It's not required for now but in future there might be a any condition to select the text till specfic range so you can use this
        */
        window.navigator.clipboard.writeText(password);
    },[password])

    return(
        <>
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
                <h1 className='text-center my-3 text-2xl font-bold  text-slate-50'>Password generator</h1>
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                    <input 
        
                        type="text"
                        value={password}
                        placeholder="password.."
                        readOnly
                        className="outline-none w-full py-1 px-3"
                        ref={passwordRef}
                    />
                    <button
                     onClick={copyClipboardPass}
                     className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
                </div>

                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="range" 
                            min={6}
                            max={20}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e)=> setLength(e.target.value)}
                        />
                        <label>Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input 
                            type="checkbox"
                            defaultChecked={isNumAllowed}
                            id="numberInput"
                            onChange={()=> {
                                setIsNumAllowed((prev) => !prev);
                            }}
                        />
                        <label>Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input 
                            type="checkbox"
                            defaultChecked={isCharAllowed}
                            id="charInput"
                            onChange={()=>{
                                setIsCharallowed((prev)=> !prev)
                            }}
                        />
                        <label>Special Char</label>
                    </div>

                    

                </div>

            </div>
        </>
    )
}
export default Password;

