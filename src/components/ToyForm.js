import React, {useState} from "react";

function ToyForm({submitToy}) {

  const [newToy,setNewToy]=useState({
    name:'',
    image:'',
    likes:0
  })

  function handleToyChange(e){
    setNewToy({...newToy, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault();
    const addToy={...newToy}
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addToy)
    })
      .then(resp => resp.json())
      .then(data => submitToy(data))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          onChange={handleToyChange}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={newToy.name}
        />
        <br />
        <input
          onChange={handleToyChange}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={newToy.image}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
