import { useState, useEffect } from "react";
import { useFormik } from "formik";
import "./App.css";

import AdministratorDetail from "./AdministratorDetail";

export function Administrator() {
  const [actualiza, setActualiza] = useState(false);
  const [data, setData] = useState([]);
  const [claveUsuario, setClaveUsuario] = useState({
    usuario: "",
    clave: "",
  });

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

  useEffect(() => {
    setData(datoLocalStorage());
  }, []);

  const newlletter = useFormik({
    initialValues: {
      cedula: "",
      nombres: "",
      apellidos: "",
      correo: "",
      usuario: "",
      clave: "",
      key: 1,
      vacunado: "nodefinido",
    },
    onSubmit,
    validate,
  });

  function onSubmit(values) {
    values.clave = generatePasswordRand(5);
    values.usuario =
      values.nombres.slice(0, 1) + values.apellidos.split(" ", 1).join();

    setClaveUsuario({
      clave: values.clave,
      usuario: values.usuario,
    });

    function generatePasswordRand(length) {
      let pass = "";
      let caracter = "0123456789";
      let i = 0;
      while (i < length) {
        pass += caracter.charAt(Math.floor(Math.random() * caracter.length));
        i = i + 1;
      }
      return pass;
    }

    const datoLocalStorage = () => {
      const item = { ...localStorage };
      const datoArray = Object.keys(item);
      return datoArray;
    };
    let clave = datoLocalStorage();
    let clave2 = clave.sort().reverse().shift();

    if (clave2 === undefined) {
      clave2 = 0;
    }

    values.key = parseInt(clave2) + 1;

    window.localStorage.setItem(values.key, JSON.stringify(values));
    const datoLocalStorage2 = () => {
      const item = { ...localStorage };
      let result = [];
      const datoArray = Object.values(item);
      for (let i = 0; i < datoArray.length; i++) {
        const dataObject = JSON.parse(datoArray[i]);
        result = [...result, dataObject];
      }

      return result;
    };
    setData(datoLocalStorage2());
  }

  function validate(values) {
    let errors = {};

    const item = { ...localStorage };
    const datoArray = Object.values(item);
    for (let i = 0; i < datoArray.length; i++) {
      const dataObject = JSON.parse(datoArray[i]);
      if (values.cedula === dataObject.cedula) {
        errors.cedula = "ID already registered";
        break;
      }
    }

    if (values.cedula.length === 0) {
      errors.cedula = "Require";
    } else {
      if (values.cedula.length !== 10) {
        errors.cedula = "Must have 10 digits";
      }
    }

    if (values.nombres.length === 0) {
      errors.nombres = "Require";
    }

    if (/^[0-9-.*+\/-@?#_,%&!¡"^${}()|[\]\\]+$/.test(values.nombres)) {
      errors.nombres = "Invalid";
    }

    if (values.apellidos.length === 0) {
      errors.apellidos = "Require";
    }

    if (values.correo.length === 0) {
      errors.correo = "Require";
    }

    return errors;
  }

  return (
    <>
      <form className="container" onSubmit={newlletter.handleSubmit}>
        <div style={{ disply: "flex", width: 500 }}>
          <label>Cedula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={newlletter.values.cedula}
            onChange={newlletter.handleChange}
          />
          {newlletter.errors.cedula}
        </div>
        <div style={{ disply: "flex", width: 500 }}>
          <label>Nombre</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={newlletter.values.nombres}
            onChange={newlletter.handleChange}
          />
          {newlletter.errors.nombres}
        </div>
        <div style={{ disply: "flex", width: 500 }}>
          <label>Apellido</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={newlletter.values.apellidos}
            onChange={newlletter.handleChange}
          />
          {newlletter.errors.apellidos}
        </div>
        <div style={{ disply: "flex", width: 500 }}>
          <label>Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={newlletter.values.correo}
            onChange={newlletter.handleChange}
          />
          {newlletter.errors.correo}
        </div>
        <div style={{ disply: "flex", width: 500 }}>
          <button type="submit">Submit</button>
          <button type="reset" onClick={newlletter.resetForm}>
            Reset
          </button>
        </div>
      </form>

      {newlletter.values.usuario ? (
        <h3>
          El usuario que acabas de Genera es:{" "}
          {newlletter.values.usuario + "        "}
          La clave es : {newlletter.values.clave}
        </h3>
      ) : null}

      <AdministratorDetail
        data={data}
        setData={setData}
        actualiza={actualiza}
        setActualiza={setActualiza}
      />
    </>
  );
}
