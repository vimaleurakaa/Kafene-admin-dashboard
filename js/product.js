$(document).ready(function () {
  if (
    localStorage.getItem("loginStatus") == null ||
    localStorage.getItem("loginStatus") === "false"
  ) {
    alert("Please login first");
    window.location = "./index.html";
  }

  let productList = [];

  const productTable = (data) => {
    return `<tr>
    <td class="id">${data?.id}</td>
    <td class="name">${data?.medicineName}</td>
    <td class="brand">${data?.medicineBrand}
    </td>
    <td class="eDate">${data?.expiryDate}</td>
    <td class="price">$${data?.unitPrice}</td>
    <td class="price">${data?.stock}</td>
    </tr>`;
  };

  fetch("https://a-todo-app-default-rtdb.firebaseio.com/kafen-products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      productDisplay(productList);
    })
    .catch((err) => console.log(err));

  const productDisplay = (data) => {
    let productDetails = "";
    for (let i = 0; i < data.length; i++) {
      productDetails += productTable(data[i]);
    }

    $("#productBody").html(productDetails);
  };

  function filterData() {
    let count = 0;
    let productDetails = "";
    const presentDate = new Date();
    if (productList.length > 0) {
      for (let i = 0; i < productList.length; i++) {
        if (
          !$("#expiredCheck").is(":checked") &&
          new Date(productList[i].expiryDate) < presentDate
        ) {
          continue;
        } else if (
          !$("#lstockCheck").is(":checked") &&
          productList[i].stock < 100
        ) {
          continue;
        } else {
          count++;
          productDetails += productTable(productList[i]);
        }
      }
    }
    $(".ordersCount").html(count);
    $("#productBody").html(productDetails);
  }

  $(".filer_checkbox").on("change", function () {
    filterData();
  });

  $("#logout").click(function () {
    localStorage.setItem("loginStatus", false);
    window.location = "./index.html";
  });
});
