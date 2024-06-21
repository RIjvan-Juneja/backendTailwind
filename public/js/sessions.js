
const getImageAndName = (str) =>{
  const images = ['https://bootdey.com/img/Content/avatar/avatar1.png','https://bootdey.com/img/Content/avatar/avatar7.png','https://bootdey.com/img/Content/avatar/avatar3.png','https://bootdey.com/img/Content/avatar/avatar2.png','https://bootdey.com/img/Content/avatar/avatar4.png'];
  const names = ['Brooke Kelly', 'Rijvan Juneja', 'Hemakshi 51 Makwana', ' Jeel Patel','Ankit Boricha'];
  let index = str.charCodeAt(0) % images.length;
  return [images[index], names[index]];
}

const logoutDevice = async (session_token,tr) =>{
  const response = await fetch(`/auth/sessions/logout/device/${session_token}`, {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {

    alert("Logout Succesfully");
    
    tr.remove();
    socket.emit('logout_attempt_req', {}); 
  } else {
    alert("Failed to Logout")
  }
} 

const showSessions = async () => {
  const response = await fetch("/panel/sessions/api", {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {
    const tbody = document.querySelector("tbody");
    resData.forEach((el,i) => {
      let date =  new Date(el.loggin_at);
      let loggin_at = date.toDateString() + ' | ' + date.toLocaleTimeString()
      let profile = getImageAndName(el.session_token);
      let tr = document.createElement("tr");
      tr.classList.add('candidates-list');
      tr.innerHTML += `
          <td>${i+1}</td>
          <td class="title">
            <div class="thumb">
              <img class="img-fluid" src=${profile[0]} alt="">
            </div>
            <div class="candidate-list-details">
              <div class="candidate-list-info">
                <div class="candidate-list-title">
                  <h5 class="mb-0"><a href="#">${profile[1]}</a></h5>
                </div>
                <div class="candidate-list-option">
                  <ul class="list-unstyled">
                    <li>Ip address ${el.device_info}</li>
                    <li>Rolling Meadows, IL ${el.session_token}</li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
          <td>${el.session_token}</td>
          <td class="candidate-list-favourite-time text-center">
            ${loggin_at}
          </td>
          <td class="text-center">${(el.is_logged)? 'Current' : 'Active'}</td>
          <td class='text-center'>
            ${(el.is_logged)? 'You' : ' <a class="logoutBtn" style="cursor :pointer;">Logout</a>'}
          </td>
      `;

      if(!el.is_logged){
        let btn = tr.querySelector(".logoutBtn");
        btn.addEventListener('click', ()=>{
          logoutDevice(el.session_token,tr);
        })
      }

      tbody.appendChild(tr);
    });
  } else {
    console.log(resData.msg);
  }
}
showSessions();
                        