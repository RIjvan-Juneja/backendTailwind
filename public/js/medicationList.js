
const displayMedication = async () => {
  const response = await fetch("/panel/medication/api/list", {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {
    const thead = document.querySelector("table thead");
    const tbody = document.querySelector("table tbody");

    thead.innerHTML = '';
    const trh = document.createElement("tr");

    if(resData.length != 0){
  
      // table headings
      let fields = Object.keys(resData[0]);
      fields.forEach(el => {
        let th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.classList.add('text-capitalize');
        th.innerText = el.replace(/_/g, " ");
        trh.appendChild(th);
      });
      thead.appendChild(trh);

      resData.forEach(el => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
          <td style='width: 165px;'> <img src='${el.image}' alt='medication image' width='100%' /> </td>
          <td> ${el.name} </td>
          <td> ${el.notes} </td>
          <td> ${el.start_date} </td>
          <td> ${el.end_date} </td>
          <td> ${el.time} </td>
          <td class='text-capitalize'> ${(el.recurrence == 'oto')? 'One Time Only' : el.recurrence} </td>
          <td class='text-capitalize'> ${(el.day_of_week)? el.day_of_week:' '} </td>
        `;
        tbody.appendChild(tr);
      });

    } else {
      tr.innerHTML = `<th>No data Found</th>`;
      thead.appendChild(tr);
    }

  } else {
    console.log(resData.msg);
  }
}

displayMedication();