import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys,handleDelete,handleLikes}) {
  const renderToys=toys.map(toy=>{
    return <ToyCard key={toy.id} toy={toy} handleDelete={handleDelete} handleLikes={handleLikes}/>
  })
  return (
    <div id="toy-collection">{renderToys}</div>
  );
}

export default ToyContainer;
