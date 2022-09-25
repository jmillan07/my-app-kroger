import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdministratorDetail(props) {
  const [usvacuna, setUsvacuna] = useState("todos");
  const [tipovacuna, setTipoVacuna] = useState("todos");
  const [desde, setdesde] = useState("");
  const [hasta, sethasta] = useState("");

  let navigate = useNavigate();

  const handleFuncion = (e) => {
    setUsvacuna(e.target.value);
  };
  const handleFuncion2 = (e) => {
    setTipoVacuna(e.target.value);
  };
  const handleFechadesde = (e) => {
    setdesde(e.target.value);
  };

  const handleFechahasta = (e) => {
    sethasta(e.target.value);
  };

  const handleEliminar = (id) => {
    window.localStorage.removeItem(id);
    const datoLocalStorage = () => {
      const item = { ...localStorage };
      let result = [];
      const datoArray = Object.values(item);
      for (let i = 0; i < datoArray.length; i++) {
        const dataObject = JSON.parse(datoArray[i]);
        result = [...result, dataObject];
      }

      return result;
    };

    props.setData(datoLocalStorage);
  };

  const handleLimpiar = () => {
    setdesde("");
    sethasta("");
    setTipoVacuna("todos");
    setUsvacuna("todos");
  };
  var ahora = new Date(desde);
  var milisegundosahora = ahora.valueOf();

  var mastarde = new Date(hasta);
  var milisegundosmastarde = mastarde.valueOf();

  const datoFiltrado = props.data.filter((e) => {
    if (usvacuna === "todos") {
      return true;
    } else {
      if (e.vacunado === usvacuna) {
        return e.vacunado === usvacuna;
      }
    }
  });

  const datoFiltrado2 = datoFiltrado.filter((e) => {
    if (tipovacuna === "todos") {
      return true;
    } else {
      if (e.vacuna === tipovacuna) {
        return e.vacuna === tipovacuna;
      }
    }
  });

  const datoFiltrado3 = datoFiltrado2.filter((e) => {
    if (desde === undefined || desde === "") {
      return true;
    } else {
      if (hasta !== "") {
        return (
          Date.parse(e.fechVacuna).valueOf() >= milisegundosahora &&
          Date.parse(e.fechVacuna).valueOf() <= milisegundosmastarde
        );
      }
    }
  });

  return (
    <>
      <h3>Detalle de Empleado</h3>
      <label>Vacunado</label>
      <select onChange={handleFuncion} value={usvacuna}>
        <option value="todos">Todos</option>
        <option value="vacunado">Vacunado</option>
        <option value="novacunado">No Vacunado</option>
      </select>

      <label>Tipo de Vacuna</label>
      <select onChange={handleFuncion2} value={tipovacuna}>
        <option value="todos">Todos</option>
        <option value="sputnik">Sputnik</option>
        <option value="aztrazeneca">aztrazeneca</option>
        <option value="pfizer">Pfizer</option>
        <option value="Jhonson_Jhonson">Jhonson&Jhonson</option>
      </select>
      <label>Fecha Vacuna</label>
      <input onChange={handleFechadesde} type="date" value={desde}></input>
      <input onChange={handleFechahasta} type="date" value={hasta}></input>
      <button onClick={handleLimpiar}>Limpiar</button>
      <table className="table">
        <thead>
          <tr>
            <th className="tableCell">Cedula</th>
            <th className="tableCell">Nombre</th>
            <th className="tableCell">Apellido</th>
            <th className="tableCell">Usuario</th>
            <th className="tableCell">Vacunado</th>
            <th className="tableCell">Tipo Vacunado</th>
            <th className="tableCell">Fecha Vacuna</th>
          </tr>
        </thead>
        <tbody>
          {datoFiltrado3.map((e, index) => {
            return (
              <tr key={index}>
                <th>{e.cedula}</th>
                <th>{e.nombres}</th>
                <th>{e.apellidos}</th>
                <th>{e.usuario}</th>
                <th>{e.vacunado}</th>
                <th>{e.vacuna}</th>
                <th>{e.fechVacuna}</th>
                <th>
                  <div className="contenButton">
                    <button
                      className="submitBtn"
                      onClick={() => handleEliminar(e.key)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="submitBtn"
                      onClick={() => {
                        navigate(`/AdministratorUpdate/${e.key}`);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AdministratorDetail;
