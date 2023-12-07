import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { Data } from "../interfaces";

// interface Props {
//   data: Data;
//   handleDragging: (dragging: boolean) => void;
// }

const CardItem = ({ data, handleDragging, handleDeleteItem, handleEditUser }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  const handleEdit = () => {
    // Call the parent component's handleEditUser function with the item data
    handleEditUser(data);
  };

  const handleDelete = () => {
    // Call the parent component's handleDeleteItem function with the item ID
    handleDeleteItem(data.id);
  };



  console.log("card ITEM", data);
  return (
    <div
      className="card-container"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p>{data.username}</p>
      <p>{data.email}</p>
      <p>{data.phonenumber}</p>
      <p>{data.age}</p>
      <div className="card-icons">
        <button type="button" onClick={handleEdit}>
          <EditIcon />
        </button>
        <button type="button" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CardItem;