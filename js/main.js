// -----------  Add Animation To Text Crud System
const title = document.querySelector("h1");
title.innerHTML = title.innerHTML
   .split("")
   .map((t) => `<span>${t}</span>`)
   .join("");
const spans = document.querySelectorAll("h1 span");
for (let i = 0; i < spans.length; i++) {
   spans[i].style.cssText = `animation-delay:${i / 0.002}ms`;
}

// ----------------------------------------------------------------

// ---------------- Global Variable
const inputs = document.querySelectorAll(".form-control");
const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");
let products = [];
let updateIndex = 0;
let valid = false;

// When Start
(function () {
   if (getLocal()) {
      products = getLocal();
      display();
   }
})();

// ---------------- Events
// Add Data
btnAdd.addEventListener("click", addData);

// Update Data
btnUpdate.addEventListener("click", updateData);

// Search
inputs[4].addEventListener("input", (e) => {
   searchData(e.target.value);
});

// ---------------- Functions
// Add Data
function addData() {
   if (valid) {
      const product = {
         name: inputs[0].value,
         price: inputs[1].value,
         cate: inputs[2].value,
         desc: inputs[3].value,
      };
      products.push(product);
      display();
      setLocal();
      resetData();
   }
}

// Update Data
function updateData() {
   if (valid) {
      const product = {
         name: inputs[0].value,
         price: inputs[1].value,
         cate: inputs[2].value,
         desc: inputs[3].value,
      };

      products.splice(updateIndex, 1, product);
      display();
      setLocal();
      resetData();

      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
   }
}

// Search Data
function searchData(value) {
   let tableData = "";

   for (let i = 0; i < products.length; i++) {
      if (products[i].name.toLowerCase().includes(value.toLowerCase())) {
         tableData += `
      <tr class="align-middle">
      <td>${i + 1}</td>
      <td>${products[i].name.toLowerCase().replace(
         value,
         `<span class="text-bg-secondary">${value}</span>`
      )}</td>
      <td>${products[i].price}</td>
      <td>${products[i].cate}</td>
      <td>${products[i].desc}</td>
      <td>
         <div class="hstack gap-2 justify-content-center">

            <span onclick="setUpdateInfo(${i})" class="icon-anim" id="update">
               <lord-icon
               src="https://cdn.lordicon.com/koyivthb.json"
               trigger="hover"
               style="width:34px;height:34px">
           </lord-icon>
            </span>

            <span onclick="deleteRow(${i})" class="icon-anim" id="delte">
               <lord-icon
               src="https://cdn.lordicon.com/gsqxdxog.json"
               trigger="hover"
               style="width:34px;height:34px">
           </lord-icon>
            </span>
         </div>
      </td>
   </tr>
      `;
      }
   }

   document.getElementById("tBody").innerHTML = tableData;
}

// Display Data
function display() {
   let tableData = "";

   for (let i = 0; i < products.length; i++) {
      tableData += `
      <tr class="align-middle">
      <td>${i + 1}</td>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].cate}</td>
      <td>${products[i].desc}</td>
      <td>
         <div class="hstack gap-2 justify-content-center">

            <span onclick="setUpdateInfo(${i})" class="icon-anim" id="update">
               <lord-icon
               src="https://cdn.lordicon.com/koyivthb.json"
               trigger="hover"
               style="width:34px;height:34px">
           </lord-icon>
            </span>

            <span onclick="deleteRow(${i})" class="icon-anim" id="delte">
               <lord-icon
               src="https://cdn.lordicon.com/gsqxdxog.json"
               trigger="hover"
               style="width:34px;height:34px">
           </lord-icon>
            </span>
         </div>
      </td>
   </tr>
      `;
   }

   document.getElementById("tBody").innerHTML = tableData;
   document.getElementById("total").innerText = products.length;
}

// Reset Form Data
function resetData() {
   inputs.forEach((input) => {
      input.value = "";
      input.classList.contains("is-valid")? input.classList.remove("is-valid"):input.classList.remove("is-invalid")
   });
}

//Delete Row
function deleteRow(index) {
   products.splice(index, 1);
   display();
   setLocal();
}

// Set Information Update to inputs
function setUpdateInfo(index) {
   updateIndex = index;
   const productValues = Object.values(products[updateIndex]);

   for (const i in productValues) {
      inputs[i].value = productValues[i];
   }

   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}

// Set Local
function setLocal() {
   localStorage.setItem("producsList", JSON.stringify(products));
}

// Get Local
function getLocal() {
   return JSON.parse(localStorage.getItem("producsList"));
}

// ------------ Validation
const validation = {
   name: /^[\p{L}][\s\p{L}\d]{1,40}$/u,
   price: /^[\d]+$/,
   cate: /^[\p{L}][\s\p{L}]{1,20}$/u,
   desc: /^[\p{L}][\s\p{L}]{1,50}$/u,
   checkValid: function (style, input) {
         if (style.test(input.value)) {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
         } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
         }
   },
};
["input", "mousedown"].forEach((ev) => {
   document.querySelector(".form-data").addEventListener(ev, () => {
      if (
         validation.checkValid(validation.name, inputs[0]) &&
         validation.checkValid(validation.price, inputs[1]) &&
         validation.checkValid(validation.cate, inputs[2]) &&
         validation.checkValid(validation.desc, inputs[3])
      ) {
         valid = true;
      } else {
         valid = false;
         
      }
   });
});
