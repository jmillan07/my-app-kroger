import {useState} from 'react'
import { useParams } from "react-router-dom";
function EmployeeDetail(){


    const [employeAct, setEmployeeAct] = useState({
        fechaNac:'',
        direcc:'',
        telefono:'',
        vacunado:'No Vacunado',
        vacuna:'',
        fechVacuna:'',
        numeroDosis:''
    })

    const handleSave =()=>{
        
        const result = {
            ...dato,
            ...employeAct
        }


        window.localStorage.setItem(params.emploId,JSON.stringify(result))
    }
    
    let params = useParams()

    const dato = JSON.parse(window.localStorage.getItem(params.emploId));

    const handleChange =(e)=>{
        setEmployeeAct({
            ...employeAct,
            [e.target.name]: e.target.value
          });
    }
    return (
        <>
        <h1>Detalle del Empleador</h1>
        <div style={{display: "flex",alignItems:"center",justifyContent:"center",width:"1000px"}}>
            <h4>Usuario   :  </h4>
            <p>{dato.usuario}</p>
            <h4>Cedula    :</h4>
            <p>{dato.cedula}</p>
            <h4>Nombre    :</h4>
            <p>{dato.nombres}</p>
            <h4>Apellidos    :</h4>
            <p>{dato.apellidos}</p>
            <h4>Correo    :</h4>
            <p>{dato.correo}</p>
        </div>
            <h3>Actualizar</h3>
            <label>Fecha de Nacimiento</label>
            <input type='date' name='fechaNac' onChange={handleChange} value={employeAct.fechaNac}></input>
            <label>Direccion de domicilio</label>
            <input type='text' name='direcc' onChange={handleChange} value={employeAct.direcc}></input>
            <label>Telefono Movil</label>
            <input type='text' name='telefono' onChange={handleChange} value={employeAct.telefono}></input>
            <label>Estado de Vacunacion</label>
            <select onChange={handleChange} value={employeAct.vacunado} name='vacunado'>
                <option value="novacunado">No Vacunado</option>
                <option value="vacunado">Vacunado</option>
            </select>
            {
                employeAct.vacunado === "vacunado" ?
                (
                    <>
            <select onChange={handleChange} value={employeAct.vacuna} name='vacuna'>
                <option value="sputnik">Sputnik</option>
                <option value="aztrazeneca">aztrazeneca</option>
                <option value="pfizer">Pfizer</option>
                <option value="Jhonson_Jhonson">Jhonson&Jhonson</option>
            </select>
            <label>Fecha de Vacunacion</label>
            <input type='date' name='fechVacuna' onChange={handleChange} value={employeAct.fechVacuna}></input>
            <label>Numero de dosis</label>

            <select onChange={handleChange} value={employeAct.numeroDosis} name='numeroDosis'>
                <option value= '1'>1</option>
                <option value= '2'>2</option>
                <option value= '3'>3</option>
            </select>
                </>
                ):null
            }
            <button onClick={handleSave}>Save Inf</button>
        </>
    )
}

export default EmployeeDetail