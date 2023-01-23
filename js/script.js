var submitButton = document.querySelector(".form__submit-button");
var resetButton = document.querySelector(".form__reset-button");

var male = document.querySelector("#gender-male");
var female = document.querySelector("#gender-female");
var inputData = document.querySelectorAll(".input__data");
var bodyParametrs = [0, 0, 0];
var action = [1.2, 1.375, 1.55, 1.725, 1.9];

var callNorm = document.querySelector("#calories-norm");
var callMinimal = document.querySelector("#calories-minimal");
var callMaximal = document.querySelector("#calories-maximal");

var proteinNorm = document.querySelector("#norm-protein");
var proteinMin = document.querySelector("#min-protein");
var proteinMax = document.querySelector("#max-protein");

var fatNorm = document.querySelector("#norm-fat");
var fatMin = document.querySelector("#min-fat");
var fatMax = document.querySelector("#max-fat");

var carbNorm = document.querySelector("#norm-carb");
var carbMin = document.querySelector("#min-carb");
var carbMax = document.querySelector("#max-carb");

window.onload = init;

function init() {
  for(var i = 0; i < inputData.length; i++) {
    inputData[i].oninput = getParametr;
  }
}

function getParametr(event) {
  var parametrInput = event.currentTarget;
  for(var i = 0; i < bodyParametrs.length; i++) {
    if(parametrInput.id == "age") {
      bodyParametrs[0] = Number(parametrInput.value);
    } else if (parametrInput.id == "height") {
      bodyParametrs[1] = Number(parametrInput.value);
    } else if (parametrInput.id == "weight") {
      bodyParametrs[2] = Number(parametrInput.value);
    }
  }
  buttonUnlock(bodyParametrs);
}

function buttonUnlock(bodyParametrs) {
  var index = 0;
  for(var i = 0; i < bodyParametrs.length; i++) {
    if(bodyParametrs[i] > 0) {
      resetButton.removeAttribute("disabled");
      index++;
      if(index == 3) {
        submitButton.removeAttribute("disabled");
      }
    }
  }
}

submitButton.onclick = resultCalculation;
resetButton.onclick = clickResetButton;

function resultCalculation () {
  var counterResult = document.querySelector(".counter__result");
  counterResult.classList.remove("counter__result--hidden");
  var activityRadio = document.querySelectorAll(".activity");
  if(female.checked == true) {
    for(var i = 0; i < activityRadio.length; i++) {
      if(activityRadio[i].checked == true) {
        var n = (10 * bodyParametrs[2]) + (6.25 * bodyParametrs[1]) - (5 * bodyParametrs[0]) - 161;
        var caloriesNorm = Math.round(n * action[i]);
        var caloriesNormStandart = caloriesNorm.toLocaleString("ru-RU");
        callNorm.textContent = caloriesNormStandart;
        var caloriesMinimal = Math.round(caloriesNorm - (caloriesNorm * 0.15));
        var caloriesMinimalStandart = caloriesMinimal.toLocaleString("ru-RU");
        callMinimal.textContent = caloriesMinimalStandart;
        var caloriesMaximal = Math.round(caloriesNorm + (caloriesNorm * 0.15));
        var caloriesMaximalStandart = caloriesMaximal.toLocaleString("ru-RU");
        callMaximal.textContent = caloriesMaximalStandart;

        macrosCalculation(caloriesNorm, caloriesMinimal, caloriesMaximal);
      }
    }
  } else if (male.checked == true) {
    for(var i = 0; i < activityRadio.length; i++) {
      if(activityRadio[i].checked == true) {
        var n = (10 * bodyParametrs[2]) + (6.25 * bodyParametrs[1]) - (5 * bodyParametrs[0]) + 5;
        var caloriesNorm = Math.round(n * action[i]);
        var caloriesNormStandart = caloriesNorm.toLocaleString("ru-RU");
        callNorm.textContent = caloriesNormStandart;
        var caloriesMinimal = Math.round(caloriesNorm - (caloriesNorm * 0.15));
        var caloriesMinimalStandart = caloriesMinimal.toLocaleString("ru-RU");
        callMinimal.textContent = caloriesMinimalStandart;
        var caloriesMaximal = Math.round(caloriesNorm + (caloriesNorm * 0.15));
        var caloriesMaximalStandart = caloriesMaximal.toLocaleString("ru-RU");
        callMaximal.textContent = caloriesMaximalStandart;

        macrosCalculation(caloriesNorm, caloriesMinimal, caloriesMaximal);
      }
    }
  }
  return false;
}

function macrosCalculation(norm, min, max) {
  var proteinNormNum = Math.round(norm* 0.3 / 4);
  var proteinNormStr = proteinNormNum.toLocaleString("ru-RU");
  proteinNorm.textContent = proteinNormStr;
  var fatNormNum = Math.round(norm* 0.3 / 9);
  var fatNormStr = fatNormNum.toLocaleString("ru-RU");
  fatNorm.textContent = fatNormStr;
  var carbNormNum = Math.round(norm* 0.4 / 4);
  var carbNormStr = carbNormNum.toLocaleString("ru-RU");
  carbNorm.textContent = carbNormStr;

  var proteinMinNum = Math.round(min* 0.3 / 4);
  var proteinMinStr = proteinMinNum.toLocaleString("ru-RU");
  proteinMin.textContent = proteinMinStr;
  var fatMinNum = Math.round(min* 0.3 / 9);
  var fatMinStr = fatMinNum.toLocaleString("ru-RU");
  fatMin.textContent = fatMinStr;
  var carbMinNum = Math.round(min* 0.4 / 4);
  var carbMinStr = carbMinNum.toLocaleString("ru-RU");
  carbMin.textContent = carbMinStr;

  var proteinMaxNum = Math.round(max* 0.3 / 4);
  var proteinMaxStr = proteinMaxNum.toLocaleString("ru-RU");
  proteinMax.textContent = proteinMaxStr;
  var fatMaxNum = Math.round(max* 0.3 / 9);
  var fatMaxStr = fatMaxNum.toLocaleString("ru-RU");
  fatMax.textContent = fatMaxStr;
  var carbMaxNum = Math.round(max* 0.4 / 4);
  var carbMaxStr = carbMaxNum.toLocaleString("ru-RU");
  carbMax.textContent = carbMaxStr;
}

function clickResetButton () {
  var counterResult = document.querySelector(".counter__result");
  counterResult.classList.add("counter__result--hidden");
  submitButton.setAttribute("disabled", true);
  var form = document.querySelector(".form").reset();
  for(var i = 0; i < inputData.length; i++) {
    bodyParametrs[i] = 0;
  }
  resetButton.setAttribute("disabled", true);
}
