
import './App.css'
import Index from './Index'
import { Administrator } from './Administrator'
import { Employee } from './Employee'
import {BrowserRouter, Routes,Route,Link} from 'react-router-dom'
import EmployeeDetail from './EmployeeDetail'
import AdministratorUpdate from './AdministratorUpdate'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Index/>}>
            <Route element={<Administrator/>} path='administrator/*'></Route>
            <Route element={<AdministratorUpdate/>} path='AdministratorUpdate/:AdministratorUpdate'></Route>
            <Route element={<Employee/>} path='employee'>
              <Route element={<EmployeeDetail/>} path=':emploId'></Route>
            </Route>
          </Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
