import React from "react";
import Card from "../CardItem/CardItem";

const ContainerCards = ({
  items,
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
  handleDeleteItem,
  handleEditUser,
}) => {

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpdateList(+e.dataTransfer.getData('text'), status)
    handleDragging(false);
  }
  const handleDragOver = (e) => e.preventDefault()
  // console.log("items cards container", items);
 
  return (
    <div className={`container`}>
      <h2 className="card_container_title">{status}</h2>
      <div
        className={`cards layout-cards ${isDragging ? 'layout-dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {items.length > 0 ? items.map((item) => (
          status === item.status
          && <Card 
              key={item.id} 
              data={item} 
              handleDragging={handleDragging} 
              handleDeleteItem={handleDeleteItem}
              handleEditUser={handleEditUser}
              draggable
             />
        )) : (
          <h4 sx={{margin: '10px'}} >No Data Found</h4>
      )}
      </div>
    </div>
  );
};

export default ContainerCards;