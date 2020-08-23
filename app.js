// Mocked data to simulate last BMI and history
const valueHistory = [
  { heightBMI: "173", nameBMI: "Geza", weightBMI: "87" },
  { heightBMI: "188", nameBMI: "Bela", weightBMI: "89" },
  { heightBMI: "165", nameBMI: "Marci", weightBMI: "75" },
  { heightBMI: "173", nameBMI: "Geza", weightBMI: "92" },
];

// empty array to simulate no data no history
// const valueHistory = [];

//Global query selectors
const lastData = document.querySelector(".last-data");
const historyList = document.querySelector(".history-list");
const historyTitle = document.querySelector(".history-title");
const form = document.getElementById("form");

//Form event listener, handle reading from data
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formObj = {};
  const formElements = [...form.elements];

  formElements.forEach((element) => {
    if (element.name) {
      formObj[element.name] = element.value;
    }
  });
  form.reset();
  renderDataWithNewInput(formObj);
});

//Render data when the app starts
renderDataFromServer = (values) => {
  if (values && values[0]) {
    addToDOMnewRecord(lastData, values[0], "Last BMI 💪");
    renderHistory(values.slice(1));
  } else {
    addToDOMnewRecord(lastData, null, "No data 😥");
    historyTitle.innerHTML = "No History 😥";
  }
};

// Render data when the user add a new record to the DB
renderDataWithNewInput = (newEntry) => {
  valueHistory.unshift(newEntry);
  lastData.innerHTML = "";
  historyList.innerHTML = "";
  renderDataFromServer(valueHistory);
};

// Render history part of the app
renderHistory = (entries) => {
  if (entries.length) {
    historyTitle.innerHTML = "👇 History 👇";
    entries.forEach((element) => {
      addToDOMnewRecord(historyList, element);
    });
  }
};

// Utility function, to create paragraphs
addToDOMnewRecord = (parentElement, newElement, title) => {
  const p = document.createElement("p");

  if (title) {
    const recordTitle = document.createElement("span");
    recordTitle.innerText = title;
    p.appendChild(recordTitle);
  }

  if (newElement && typeof newElement === "object") {
    const recordTitle = document.createElement("span");
    const recordData = document.createElement("span");
    const recordBMI = document.createElement("span");

    recordTitle.innerText = title || "";

    recordData.innerText = `${newElement.nameBMI}: ${newElement.heightBMI}cm | ${newElement.weightBMI}kg`;

    recordBMI.innerText = `BMI: ${BMIcalculator(
      newElement.weightBMI,
      newElement.heightBMI
    )} | ${BMIcategory(
      BMIcalculator(newElement.weightBMI, newElement.heightBMI)
    )}`;

    p.appendChild(recordData);
    p.appendChild(recordBMI);
  }

  parentElement.appendChild(p);
};

// Calculates BMI value
BMIcalculator = (weight, height) => {
  return Math.round((weight / height / height) * 10000 * 100) / 100;
};

// Returns the BMI category based on BMI value
BMIcategory = (BMIvalue) => {
  if (BMIvalue < 18.5) {
    return "Underweight";
  } else if (BMIvalue < 25) {
    return "Normal or Healthy Weight";
  } else if (BMIvalue < 30) {
    return "Overweight";
  } else if (BMIvalue < 35) {
    return "Obese (class I)";
  } else if (BMIvalue < 40) {
    return "Obese (class II)";
  } else if (BMIvalue < 50) {
    return "Obese (class III)";
  } else {
    return "Obese (class IV)";
  }
};

// App starte function
startApp = () => {
  renderDataFromServer(valueHistory);
};

// Call the app starter function
startApp();
