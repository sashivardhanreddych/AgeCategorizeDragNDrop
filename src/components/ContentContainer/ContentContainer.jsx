import React, { useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
// import { Status } from "../interfaces";
import ContainerCards from "../ContainerCards/ContainerCards";

const ageCategories = ["age <18", "age 19-24", "age 25-45", "age >45"]; 
 
const ContentContainer = ({searchItems, handleEditUser}) => {
    const [userData, setUserData] = useState([]);
  
    const storageEventHandler = () => {
      let localStoragedata = JSON.parse(localStorage.getItem("userDetails")) || [];
      setUserData(localStoragedata);
    };
  
    useEffect(() => {
        storageEventHandler();
        window.addEventListener("storage", storageEventHandler, false);
        return () => {
          window.removeEventListener("storage", storageEventHandler);
        };

    }, []);

    useEffect(() => {
        searchAndSortItems()
    });

    const searchAndSortItems = () =>{
        setUserData(searchItems)
    }

    const handleDeleteItem = (id) => {
        const listItems = JSON.parse(localStorage.getItem("userDetails"));
        const updatedList = listItems.filter((item) => item.id !== id);

        localStorage.setItem("userDetails", JSON.stringify(updatedList));

        setUserData(updatedList);
    };
  
      
    const { isDragging, listItems, handleDragging, handleUpdateList } = DragAndDrop(userData);
    console.log("usersData content container", userData, listItems);
    return(
    <div className="grid">
        {ageCategories.map((container) => (
          <ContainerCards
            items={listItems}
            status={container}
            key={container}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
            handleDeleteItem={handleDeleteItem}
            handleEditUser={handleEditUser} 
          />
        ))}
      </div>
    );
}
export default ContentContainer;