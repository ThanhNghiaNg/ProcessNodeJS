export const serverUrl = "http://localhost:5000";
// export const serverUrl = "https://simple-e-commerce-server.onrender.com";

// Function to add '.' after each 3 character to a string , make style currency
export const addStyleCurrency = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
};
