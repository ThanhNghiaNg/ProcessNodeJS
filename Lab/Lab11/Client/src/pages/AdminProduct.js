import ProductList from "../components/ProductList/ProductList";

const AdminProduct = (props) => {
  return (
    <div>
      <ProductList isAdmin={true} />
    </div>
  );
};

export default AdminProduct;
