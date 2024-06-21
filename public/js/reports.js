const showReports = async () => {
  const response = await fetch("/panel/reports/api", {
    method: "POST",
  })
  const resData = await response.json();
  if (response.status === 200) {
    const row = document.querySelector(".report-container");
    resData.forEach((el) => {
      row.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-12">
        <div class="card">
          <div class="file">
            <a href="">
              <div class="hover">
                <a href='/reports/${el.reportName}' class="btn btn-icon bg-label-primary" download>
                  <i class="bi bi-download"></i>
                </a>
              </div>
              <div class="icon">
                <i class="bi bi-file-earmark-bar-graph text-info"></i>
              </div>
              <div class="file-name">
                <p class="m-b-5 text-muted">${el.reportName}</p>
                <small>${el.id + 1} <span class="date text-muted">${el.date}</span></small>
              </div>
            </a>
          </div>
        </div>        
      </div>
      `;
    });
  } else {
    console.log(resData.msg);
  }
}
showReports();
