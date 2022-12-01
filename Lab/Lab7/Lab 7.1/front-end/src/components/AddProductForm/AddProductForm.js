import "./forms.css";

const AddProductForm = (props) => {
  const addProductHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form className="form-control" onSubmit={addProductHandler}>
      <label>Title</label>
      <input type="text"></input>

      <label>Image URL</label>
      <input type="text"></input>

      <label>Price</label>
      <input type="number"></input>

      <label>Description</label>
      <textarea></textarea>

      <button className="btn">Add Product</button>
    </form>
  );
};

export default AddProductForm;
