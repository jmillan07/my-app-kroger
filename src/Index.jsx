import { Administrator } from './Administrator'
import { Employee } from './Employee'
import {Outlet ,Link } from 'react-router-dom'

function Index(){
  
    return (
        <>
        <h1>Sistema de Vacunacion</h1> 
            <nav>
                <Link to="/">Inicio</Link> |{" "}
                <Link to="administrator">Administrador</Link> |{" "}
                <Link to="employee">Empleado</Link>
            </nav>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Index