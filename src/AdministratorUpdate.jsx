import { useState } from 'react'
import { useParams , useNavigate } from "react-router-dom";


function AdministratorUpdate(){
    let navigate = useNavigate();
    let params = useParams()
    const dato = JSON.parse(window.localStorage.getItem(params.AdministratorUpdate));

    const [employeAct, setEmployeeAct] = useState({
        usuario:dato.usuario,
        nombres:dato.nombres,
        apellidos:dato.apellidos,
        cedula:dato.cedula,
        key:dato.key,
        clave:dato.clave,
        correo:dato.correo
    })

const handleUpdate=()=>{

    window.localStorage.setItem(params.AdministratorUpdate,JSON.stringify(employeAct))
    navigate(`/administrator`)
}
const handleChange =(e)=>{
    setEmployeeAct({
        ...employeAct,
        [e.target.name]: e.target.value
      });
}
    
    return (
        <>
        <h1>Estoy modificando el Empleado</h1>
        <h3>Usuario</h3>
        <input type="text" name='usuario' onChange={handleChange} value={employeAct.usuario}></input>
        <h3>Nombres</h3>
        <input type="text" name='nombres' onChange={handleChange} value={employeAct.nombres}></input>
        <h3>Apellidos</h3>
        <input type="text" name='apellidos' onChange={handleChange} value={employeAct.apellidos}></input>
        <h3>Cedulas</h3>
        <input type="text" name='cedula' onChange={handleChange} value={employeAct.cedula}></input>
        <h3>Correo</h3>
        <input type="text" name='correo' onChange={handleChange} value={employeAct.correo}></input>
        <h3></h3>
        <button onClick={handleUpdate}>Modificar</button>
        </>
    )
}

export default AdministratorUpdate