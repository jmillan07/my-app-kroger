import { useState } from 'react'
import { useNavigate,Outlet } from "react-router-dom";


export function Employee(){

    let navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState("");
    const [passInput, setPassInput] = useState("");


    const handleInput = (e) => setUsernameInput(e.target.value);

    const handleInputPass = (e) => setPassInput(e.target.value);

    const login = (e) => {
        e.preventDefault();
        const item = { ...localStorage };
        const datoArray = Object.values(item)
        for(let i =0; i<datoArray.length;i++){
            const dataObject =JSON.parse(datoArray[i])
            if (
                usernameInput === dataObject.usuario &&
                passInput === dataObject.clave
              ) {
                navigate(`/Employee/${dataObject.key}`);
                break
              }
        }
      }

    return (
        <>
        <h1>Empleador</h1>
            <input
            autoComplete="off"
            onChange={handleInput}
            placeholder="username"
            name="username"
            type="text"
            value={usernameInput}
            />

            <input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleInputPass}
            value={passInput}
            />
 
            <button onClick={login}>login</button>

            <Outlet/>
        </>
    )
}