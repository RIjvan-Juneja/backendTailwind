const showDashboard = async () => {
  const response = await fetch("/panel/medication/api/list", {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {
    const div = document.querySelector(".dashboardCounter");
    div.innerHTML = `
    <div class="col-md-3">
      <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
        <div>
          <h3 class="fs-2">${resData.length}</h3>
          <p class="fs-5">Medications</p>
        </div>
        <i class="bi bi-capsule-pill fs-1 primary-text border rounded-full  dashboard-count"></i>
      </div>
    </div>`;
  } else {
    console.log(resData.msg);
  }
}
showDashboard();
