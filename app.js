const valueHistory = [
  { heightBMI: "173", nameBMI: "Geza", weightBMI: "87" },
  { heightBMI: "173", nameBMI: "Geza", weightBMI: "89" },
  { heightBMI: "165", nameBMI: "Marci", weightBMI: "75" },
  { heightBMI: "173", nameBMI: "Geza", weightBMI: "92" },
];

// const valueHistory = [];

const lastData = document.querySelector(".last-data");
const historyList = document.querySelector(".history-list");
const historyTitle = document.querySelector(".history-title");

const form = document.getElementById("form");
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
  console.log(formObj);
  renderDataWithNewInput(formObj);
});

renderDataFromServer = (values) => {
  if (values && values[0]) {
    console.log("letezik adat");
    addToDOMnewRecord(lastData, values[0], "A legutobbi mert adat:");
    renderHistory(values.slice(1));
  } else {
    addToDOMnewRecord(lastData, null, "Nincs adat :(");
  }
};

renderDataWithNewInput = (newEntry) => {
  valueHistory.unshift(newEntry);
  lastData.innerHTML = "";
  renderDataFromServer(valueHistory);
};

renderHistory = (entries) => {
  if (entries.length) {
    historyTitle.innerHTML = "History";
    entries.forEach((element) => {
      const p = document.createElement("p");
      addToDOMnewRecord(p, element);
      historyList.appendChild(p);
    });
  }
  console.log(entries);
};

addToDOMnewRecord = (parentElement, newElement, title) => {
  if (newElement && typeof newElement === "object") {
    const recordTitle = document.createElement("span");
    const recordData = document.createElement("span");
    const recordBMI = document.createElement("span");

    recordTitle.innerText = title || "";

    recordData.innerText = `${newElement.nameBMI} vegezte a merest ${newElement.heightBMI}cm magas ${newElement.weightBMI}kg`;

    recordBMI.innerText = `BMI: ${BMIcalculator(
      newElement.weightBMI,
      newElement.heightBMI
    )} ami a kovetkezo kategorianak felel meg: ${BMIcategory(
      BMIcalculator(newElement.weightBMI, newElement.heightBMI)
    )}`;

    parentElement.appendChild(recordTitle);
    parentElement.appendChild(recordData);
    parentElement.appendChild(recordBMI);
  } else {
    const recordTitle = document.createElement("span");
    recordTitle.innerText = title;
    parentElement.appendChild(recordTitle);
  }
};

BMIcalculator = (weight, height) => {
  return Math.round((weight / height / height) * 10000 * 100) / 100;
};

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

startApp = () => {
  renderDataFromServer(valueHistory);
};

startApp();
