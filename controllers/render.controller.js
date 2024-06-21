const renderRegistation = (req, res) => {
  res.render("pages/registation.ejs");
}

const renderDashboard = (req, res) => {
  res.render("pages/dashboard.ejs", { user : req.user});
}

const renderLogin = (req, res) => {
  if(typeof  req.cookies.access_token != "undefined")  {
    return res.redirect('/dashboard'); 
  }else {
    res.render("pages/login.ejs");
  }
}

const renderMedicationList = (req, res) => {
  res.render("pages/medicationlist.ejs", { user : req.user});
}

const renderMedicationForm = (req, res) => {
  res.render("pages/addMedicationForm.ejs", { user : req.user});
}


const renderReports = (req, res) => {
  res.render("pages/reports.ejs", { user : req.user });
}

const renderSessions = (req, res) => {
  res.render("pages/sessions.ejs", { user : req.user });
}

module.exports = { renderDashboard, renderLogin, renderRegistation, renderMedicationList, renderMedicationForm, renderReports, renderSessions };