import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys,setToys]=useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }


  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res=>res.json())
    .then(data=>setToys(data))
  },[])

  function submitToy(newToy){
    setToys([...toys,newToy])
  }


  function deleteToy(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE',
    })
    .then(res=>res.json())
    .then(() => setToys(toys.filter((currentToy) => currentToy.id !== toy.id)));
  }

  function incrementLikes(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ likes: toy.likes + 1 }),
    }).then(() =>
      setToys(
        toys.map((oldToy) =>
          oldToy.id !== toy.id ? oldToy : { ...oldToy, likes: oldToy.likes + 1 }
        )
      )
    );
  }




  return (
    <>
      <Header />
      {showForm ? <ToyForm submitToy={submitToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
      toys={toys} 
      handleDelete={deleteToy}
      handleLikes={incrementLikes}/>
    </>
  );
}

export default App;
