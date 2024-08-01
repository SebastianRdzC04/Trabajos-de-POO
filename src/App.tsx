import React, { ReactNode, useState } from "react";

import "./App.css";
import Input from "./Components/Input";
import Cuestionary from "./Components/Cuestionary";

function App() {
  const [name, setName] = useState<string>("");
  const [submitedName, setSubmitedName] = useState("");
  const [submitedNames, setSubmitedNames] = useState<string[]>([]);
  const [calif, setCalif] = useState(0);
  const [califs, setCalifs] = useState<number[]>([]);
  const [califsT, setCalifsT] = useState<number[][]>([]);
  const [nameIsOn, setNameIsOn] = useState(true);
  const [califIsOn, setCalifIsOn] = useState(false);
  const [h3Content, seth3Content] = useState("Ingresa los datos del Alumno");
  const [finalRow, setFinalRow] = useState<number[]>([]);
  const [proms, setProms] = useState<number[]>([]);
  const [promFinal, setPromFinal] = useState<number>(0);

  const resetForm = () => {
    setName("");
    setSubmitedName("");
    setCalif(0);
    setCalifs([]);
    setNameIsOn(true);
    setCalifIsOn(false);
    seth3Content("Ingresa los datos del Alumno");
  };

  const reset = () => {
    setSubmitedNames([]);
    setCalifsT([]);
    resetForm();
  };

  const calfPromF = (array: number[][]) => {
    // calcular el promedio de la primera calificacion de cada alumno
    const promsFinales = Array(array[0].length).fill(0);
    array.map((fila) => fila.map((valor, k) => (promsFinales[k] += valor)));
    return promsFinales;
  };

  return (
    <div className="alumn-proms">
      <Cuestionary formTitle={h3Content} title="Promedio de Alumnos">
        <Input
          type="text"
          value={name}
          buttonText="Agregar"
          isOn={nameIsOn}
          click={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          buttonClick={() => {
            event?.preventDefault();
            setSubmitedName(name);
            setName("");
            setNameIsOn(!nameIsOn);
            setCalifIsOn(!califIsOn);
          }}
        >
          Nombre
        </Input>
        <br />
        <Input
          type="number"
          value={calif === 0 ? "" : calif}
          buttonText="Agregar"
          isOn={califIsOn}
          click={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCalif(parseInt(e.target.value));
          }}
          buttonClick={() => {
            event?.preventDefault();
            if (califs.length < 6) {
              setCalifs([...califs, calif]);
              setCalif(0);
            }
            if (califs.length >= 5) {
              setCalifIsOn(!califIsOn);
              seth3Content("Datos Recopilados Correctamente");
            }
          }}
        >
          Calificación
        </Input>
        <br />
        <button
          onClick={() => {
            event?.preventDefault();
            setSubmitedNames([...submitedNames, submitedName]);
            setCalifsT([...califsT, califs]);
            setProms([
              ...proms,
              califs.reduce((acum, sum) => acum + sum, 0) / califs.length,
            ]);
            resetForm();
          }}
        >
          Agregar Alumno
        </button>
        <button
          onClick={(event) => {
            event?.preventDefault();
            reset();
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            event?.preventDefault();
            const final = calfPromF(califsT);
            setFinalRow(final);
            setPromFinal(
              proms.reduce((acum, sum) => acum + sum, 0) / proms.length
            );
          }}
        >
          Cerrar Lista
        </button>
      </Cuestionary>

      <div className="results">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Calif1</th>
              <th>Calif2</th>
              <th>Calif3</th>
              <th>Calif4</th>
              <th>Calif5</th>
              <th>Calif6</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {submitedNames.map((name, index) => (
              <tr key={index}>
                <td key={index}>{name}</td>
                {califsT[index].map((calif, index) => (
                  <td key={index + 1}>{calif}</td>
                ))}
                <td key={index + 7}>{proms[index].toFixed(1)}</td>
              </tr>
            ))}
            {finalRow.length > 0 && (
              <tr>
                <td>Promedio Final</td>
                {finalRow.map((calif, index) => (
                  <td key={index}>
                    {(calif / submitedNames.length).toFixed(1)}
                  </td>
                ))}
                <td>{promFinal.toFixed(1)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
