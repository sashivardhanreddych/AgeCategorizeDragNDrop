import { useEffect, useState } from "react";
// import { Data, Status } from "../interfaces";

const DragAndDrop = (initialState) => {
    console.log("check initialState", initialState);
    const [isDragging, setIsDragging] = useState(false);
    const [listItems, setListItems] = useState(initialState);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleUpdateList = (id, status) => {
        console.log("check id status", id, status);
        let card = listItems.find(item => item.id === id);

        if (card && card.status !== status) {
            card.status = status;

            // Set age based on the new status
            if (card.status === "age <18") {
                card.age = getRandomNumber(1, 18);
            } else if (card.status === "age 19-24") {
                card.age = getRandomNumber(19, 24);
            } else if (card.status === "age 25-45") {
                card.age = getRandomNumber(25, 45);
            } else {
                // For the last container, set age to the starting value of 17
                card.age = status === "age <18" ? 17 : getRandomNumber(46, 100);
            }

            if (Array.isArray(listItems)) {
                setListItems(prev => [
                    card,
                    ...prev.filter(item => item.id !== id),
                ]);
            }
        }
    };

    // const handleUpdateList = (id, status) => {
    //     setListItems(prevList => prevList.map(item =>
    //         item.id === id ? { ...item, status } : item
    //     ));
    // };

    useEffect(() => {
        setListItems(initialState);
    }, [initialState]);

    const handleDragging = (dragging) => setIsDragging(dragging);

    return {
        isDragging,
        listItems,
        handleUpdateList,
        handleDragging,
    };
};

export default DragAndDrop;