import contacts from "./contacts.json";
import "./App.css";
import { useState } from "react";

const arrContact = contacts.slice(0, 5);

function App() {
  const style = {
    display: "inline-block",
    backgroundColor: "#FFFF3C",
    // width: "20%",
    margin: "20px",
    padding: "20px",
    boxShadow:"10px 0px 15px"
  };

  const styleButton ={
    backgroundColor:"#3C3CFF",
    color:"white",
    padding:"20px",
    fontWeight:"bold",
    width:"100%",
    borderRadius:"25px" 
  };
  

  const [actualStatus, setactualStatus] = useState(arrContact);

  const addContact = () => {
    if (actualStatus.length === contacts.length) {
      console.log("Todos los Contactos añadidos");
      return;
    }

    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    const cloneArrContact = [...actualStatus];
    cloneArrContact.unshift(randomContact);
    setactualStatus(cloneArrContact);

    let newContactId = randomContact.id;
    let isContactRepeat = false;
    actualStatus.forEach((eachContact) => {
      if (newContactId === eachContact.id) {
        isContactRepeat = true;
      }
    });
    if (isContactRepeat === true) {
      addContact();
      return;
    }
  };

  const sortContactByName = () => {
    const cloneArrContact = [...actualStatus];
    cloneArrContact.sort((elem2, elem1) => {
      return elem2.name.localeCompare(elem1.name);
    });
    setactualStatus(cloneArrContact);
  };

  const sortContactByPopulary = () => {
    const cloneArrContact = [...actualStatus]
    cloneArrContact.sort((elem2, elem1) => {
        if(elem2.popularity < elem1.popularity){
          return 1
        }else if(elem1.popularity < elem2.popularity){
          return -1
        }else{
          return 0
        }
      })
    setactualStatus(cloneArrContact)
  };

  const removeContact = (idContact) =>{
    const eliminarContacto = actualStatus.filter((eachContact)=>{
      if(eachContact.id === idContact){
        return false; //No se incluye en el nuevo array
      }else{
        return true;
      }
    })
    setactualStatus(eliminarContacto)
  }

  return (
    <div className="App">
      <h1>Pruebas</h1>

      <button onClick={addContact}>Agregar Contactos</button>
      <button onClick={sortContactByName}>Ordenar por Nombre</button>
      <button onClick={sortContactByPopulary}>Ordenar por Popularidad</button>
      <br />
      <br />
      {actualStatus.map((eachContact) => {
        return (
          <div style={style} key={eachContact.id}>
            <img style = {{borderRadius:"25px"}}src={eachContact.pictureUrl} alt="img" width="150px" />
            <h3>{eachContact.name}</h3>
            <p>{eachContact.popularity.toFixed(2)}</p>
            {eachContact.wonOscar === true ? <span>Oscars: 🏆</span> : null}
            <br />
            {eachContact.wonEmmy === true ? <span>Emmy: 🏆</span> : null}
            <br />
            <br />
            <button style={styleButton} onClick={()=> removeContact(eachContact.id)}>Borrar</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
