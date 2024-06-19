// ======================= validations ========================= //

const mergeArrays = (...arrays) => {
  const mergedSet = new Set();
  arrays.forEach(array => {
    array.forEach(item => {
      mergedSet.add(item);
    });
  });
  return Array.from(mergedSet);
}

const loginValidation = () => {

  let required = ['username', 'password'];
  let onlyNumber = [];

  const fields = mergeArrays(required, onlyNumber);

  for (const field of fields) {
    let value = document.querySelector(`#${field}`).value.trim();
    let errorSpan = document.querySelector(`.${field}Error`);
    let name = field.replace(/([A-Z])/g, ' $1').trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    errorSpan.textContent = '';

    if (required.includes(field) && value == '') {
      errorSpan.textContent = `${name} is Required`;
    } else if (onlyNumber.includes(field) && !(value.match(/^[0-9]+$/))) {
      errorSpan.textContent = `Only numers are allowed`;
    } else {
      errorSpan.textContent = ``;
    }
  }

  errors = document.querySelectorAll('.errorSpan');
  for (const error of errors) {
    if (error.textContent != '') {
      return false;
    }
  }

  return true;
}

const registationValidation = () => {

  let required = ['firstName', 'lastName', 'email', 'phoneno', 'age', 'password'];
  let onlyNumber = ['phoneno', 'age'];

  const fields = mergeArrays(required, onlyNumber);

  for (const field of fields) {
    let value = document.querySelector(`#${field}`).value.trim();
    let errorSpan = document.querySelector(`.${field}Error`);
    let name = field.replace(/([A-Z])/g, ' $1').trim();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    errorSpan.textContent = '';

    if (required.includes(field) && value == '') {
      errorSpan.textContent = `${name} is Required`;
    } else if (onlyNumber.includes(field) && !(value.match(/^[0-9]+$/))) {
      errorSpan.textContent = `Only numers are allowed`;
    } else {
      errorSpan.textContent = ``;
    }
  }

  errors = document.querySelectorAll('.errorSpan');
  for (const error of errors) {
    if (error.textContent != '') {
      return false;
    }
  }

  return true;
}


// ======================= For Registation Form  ========================= //

if(document.querySelector('#signUpBtn')){

  const loginBtn = document.querySelector('#signUpBtn');
  loginBtn.addEventListener('click',async ()=>{

    if (registationValidation()) {

      const form = document.querySelector('#signUpForm');
      let formData = new FormData(form);
      let userData = new URLSearchParams(formData);
      
      try {
        const response = await fetch('/auth/api/registation', {
          method: 'POST',
          body: userData,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded",
          }
        });
        const resData = await response.json();
        if(response.status === 200){
          alert("You Are Successfully Registered, Check mail for Username and Password");
          form.reset();
        } else {
          alert(resData.status);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    
  });  
}

// ======================= For login Form  ========================= //

if(document.querySelector("#signInBtn")){
  const loginBtn = document.querySelector('#signInBtn');
  loginBtn.addEventListener('click',async ()=>{
    if (loginValidation()) {
      const form = document.querySelector('#signInForm');
      let formData = new FormData(form);
      let userData = new URLSearchParams(formData);
      
      try {
        const response = await fetch('/auth/api/login', {
          method: 'POST',
          body: userData,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded",
          }
        });
        const resData = await response.json();
        if(response.status === 200){
          window.location.href = "/dashboard";
        } else {
          document.querySelector(".passwordError").textContent =  "Invalid Username or Password" ;
        }

      } catch (error) {
        alert(error);
        console.log(error);
      }

    }
  });
}
