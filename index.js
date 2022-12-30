// Form javascript fuctionality
const Name = document.getElementById("name");
const last = document.getElementById("last");
const phone = document.getElementById("phone");
const buyer = document.getElementById("buyer");
const seller = document.getElementById("seller");
const button = document.getElementById("button");
const role = document.querySelectorAll(".role");
const nameError = document.querySelector(".p-name");
const lastError = document.querySelector(".p-last");
const phoneError = document.querySelector(".p-number");
const body = document.querySelector("body");
let readyToSubmitcounter = 0;

// App events and functions
function submitReady() {
    if (readyToSubmitcounter < 3) {
        readyToSubmitcounter++;
    }
    if (readyToSubmitcounter >= 3) {
        button.disabled = false;
        button.style.backgroundColor = "#242424";
    }
}

function submitNotReady() {
    readyToSubmitcounter--;
    if (readyToSubmitcounter < 3) {
        button.disabled = true;
        button.style.backgroundColor = "#CACACA";
    }
}

Name.addEventListener("change", (event) => {
    if (event.target.value === "") {
        nameError.innerText = "This field cannot be empty.";
        Name.style.border = "1px solid #FF3838";
        submitNotReady();
    } else {
        nameError.innerText = "";
        Name.style.border = "1px solid #E0E0E0";
        submitReady();
    }
});

last.addEventListener("change", (event) => {
    if (event.target.value === "") {
        lastError.innerText = "This field cannot be empty.";
        last.style.border = "1px solid #FF3838";
        submitNotReady();
    } else {
        lastError.innerText = "";
        last.style.border = "1px solid #E0E0E0";
        submitReady();
    }
});

phone.addEventListener("change", (event) => {
    if (event.target.value === "") {
        phoneError.innerText = "This field cannot be empty.";
        phone.style.border = "1px solid #FF3838";
        submitNotReady();
    } else if (!Number.isInteger(Number(event.target.value)) || event.target.value.trim().length <= 9) {
        phoneError.innerText = "You must provide a valid phone number";
        phone.style.border = "1px solid #FF3838";
    } else {
        phoneError.innerText = "";
        phone.style.border = "1px solid #E0E0E0";
        submitReady();
    }
});


window.addEventListener("load", () => {
    role[0].setAttribute("id", "toggle-role");
})

role[0].addEventListener("click", () => {
    role[0].setAttribute("id", "toggle-role");
    role[1].removeAttribute("id", "toggle-role");
});

role[1].addEventListener("click", () => {
    role[1].setAttribute("id", "toggle-role");
    role[0].removeAttribute("id", "toggle-role");
});


// Success innerHTML form
function send() {
    body.innerHTML = `<section>
    <div class="form-container">
      <img src="/assets/checked.svg">
            <h2>Thank you!</h2>
          <p>The form was submitted successfully.</p>
              <div class="submit-info">
               <div><small>First Name</small> <p>${
        Name.value
    }</p></div>
               <div><small>Last Name</small> <p>${
        last.value
    }</p></div>
               <div><small>Phone Number</small><p>${number}</p></div>
               <div><small>Role</small> <p>${
        buyer.checked ? "Buyer" : "Seller"
    }</p></div>
              </div> 
            <button type="button" id="button" onclick="goBack()">Done</button>
    </div> 
</section>`;
}

function goBack() {
    location.reload(true)
}
