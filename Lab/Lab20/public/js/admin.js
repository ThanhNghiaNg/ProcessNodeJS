const deleteProduct = (btn) => {
  const prodId = btn.parentElement.querySelector('[name="productId"]').value;
  const token = btn.parentElement.querySelector('[name="_csrf"]').value;
  const productElement = btn.closest("article");
  console.log(prodId, token);
  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: { "csrf-token": token },
  })
    .then((respone) => {
      if (respone.status === 200) {
        productElement.parentElement.removeChild(productElement);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
