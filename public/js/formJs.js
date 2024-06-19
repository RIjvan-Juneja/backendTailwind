
// ================ show and hide Input field Day ================ //
const hideShowInput = () =>{
    const day = document.querySelector("#day");
    const dayLable = document.querySelector("#dayLable");
    if (document.querySelector("#routing").value === 'weekly') {
        day.style.display = 'block';
        dayLable.innerHTML = 'Day';
    } else {
        dayLable.innerHTML = '';
        day.style.display = 'none';
        document.querySelector('.dayError').textContent = ``;
    }
}
hideShowInput();
document.querySelector("#routing").addEventListener('change', (event) => {
    hideShowInput();
});

// ===== Sumbit data of form(Only one time,Reccurring form) ====== //
const addMedication = async (formId,formType) => {
    const loader = document.querySelector('.preloader');
    loader.style.display = 'flex';
    const form = document.querySelector(`#${formId}`);
    const formData = new FormData(form);
    if(formType == 'oto'){
        formData.append('form_type', 'oto');
    } else {
        formData.append('form_type', 'recurrence');
    }
    try {
        const response = await fetch('/panel/medication/api/add', {
            method: 'POST',
            body: formData
        });
        const resData = await response.json();
        if (response.status === 200) {
            loader.style.display = 'none';
            form.reset();
            alert("Sucessfully added");
        } else {
            loader.style.display = 'none';
            console.log(resData);
        }
    } catch (error) {
        loader.style.display = 'none';
        console.log(error);
    }
}

document.querySelector("#otoBtn").addEventListener('click', () => {
    if(validations('oto')){
        addMedication("otoForm","oto");
    }
});

document.querySelector("#recurringBtn").addEventListener('click', () => {
    if(validations('recurring')){
        addMedication("recurringForm","recurrence");
    }
});



// ================ validations ================ //

const validateImageFile = (file, errorClass) => {
    let allowImages = ['image/jpg', 'image/jpeg', 'image/png'];
    let fileSize = 5; // 5 MB
  
    const error = document.querySelector(`.${errorClass}`);
  
    if (!(allowImages.includes(file.type))) {
      error.textContent = `only ${allowImages.toString()} are allowed`;
      return false;
    } else if (file.size >= (fileSize * 1024 * 1024)) {
      error.textContent = `maximum image size is ${fileSize}`;
      return false;
    } else {
      error.textContent = ``;
    }
  
    return true;
  
}
 

const validations = (formType) => {

    let required = [];

    if(formType == 'recurring'){
        required.push('routing','time','startDate','endDate','name')
        if(document.querySelector('#routing').value == 'weekly'){
            required.push('day');
        }
    } else {
        required.push('otoDate', 'otoTime','oName');
    }
  
  
    for (const field of required) {
      let value = document.querySelector(`#${field}`).value.trim();
      let errorSpan = document.querySelector(`.${field}Error`);
      let name = field.replace(/([A-Z])/g, ' $1').trim();
      name = name.charAt(0).toUpperCase() + name.slice(1);
      errorSpan.textContent = '';
  
      if (required.includes(field) && value == '') {
        errorSpan.textContent = `${name} is Required`;
      } else {
        errorSpan.textContent = ``;
      }
    }

    if(formType == 'recurring'){
        const image = document.querySelector(`#rImage`);
        if(image.files.length == 0){
            required.push('rImage');
            document.querySelector(`.rImageError`).textContent = `Image is Required`;
        } else if(!(validateImageFile(image.files[0],'rImageError'))){
            required.push('rImage');
        }
    } else {
        const image = document.querySelector(`#otoImage`);
        if(image.files.length == 0){
            required.push('otoImage');
            document.querySelector(`.otoImageError`).textContent = `Image is Required`;
        } else if(!(validateImageFile(image.files[0],'otoImageError'))){
            required.push('otoImage');
        }
    }
    
    
    for (const field of required) {
      let errorSpan = document.querySelector(`.${field}Error`);
      if (errorSpan.textContent != '') {
        return false;
      }
    }
  
    return true;
} 

  