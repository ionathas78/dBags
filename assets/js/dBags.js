//      **      Constants
const _PRIME_D4S = true;
const _PRIME_D6S = true;
const _PRIME_D8S = true;
const _PRIME_D10S = true;
const _PRIME_D12S = true;
const _PRIME_D20S = true;
const _dice = new DiceBag({ initD4s: _PRIME_D4S, initD6s: _PRIME_D6S, initD8s: _PRIME_D8S, initD10s: _PRIME_D10S, initD12s: _PRIME_D12S, initD20s: _PRIME_D20S });

//      **      HTML Elements
const _inpD4 = document.getElementById("d4-dice");
const _inpD6 = document.getElementById("d6-dice");
const _inpD8 = document.getElementById("d8-dice");
const _inpD10 = document.getElementById("d10-dice");
const _inpD12 = document.getElementById("d12-dice");
const _inpD20 = document.getElementById("d20-dice");
const _inpD100 = document.getElementById("d100-dice");
const _inpModD4 = document.getElementById("d4-mod");
const _inpModD6 = document.getElementById("d6-mod");
const _inpModD8 = document.getElementById("d8-mod");
const _inpModD10 = document.getElementById("d10-mod");
const _inpModD12 = document.getElementById("d12-mod");
const _inpModD20 = document.getElementById("d20-mod");
const _inpModD100 = document.getElementById("d100-mod");
const _btnD4 = document.getElementById("roll-d4");
const _btnD6 = document.getElementById("roll-d6");
const _btnD8 = document.getElementById("roll-d8");
const _btnD10 = document.getElementById("roll-d10");
const _btnD12 = document.getElementById("roll-d12");
const _btnD20 = document.getElementById("roll-d20");
const _btnD100 = document.getElementById("roll-d100");
const _btnDAll = document.getElementById("roll-all");
const _divReport = document.getElementById("result-report");
const _divSummary = document.getElementById("result-summary");

//      **      Event Handlers

_btnD4.addEventListener("click", handleClickRoll);
_btnD6.addEventListener("click", handleClickRoll);
_btnD8.addEventListener("click", handleClickRoll);
_btnD10.addEventListener("click", handleClickRoll);
_btnD12.addEventListener("click", handleClickRoll);
_btnD20.addEventListener("click", handleClickRoll);
_btnD100.addEventListener("click", handleClickRoll);
_btnDAll.addEventListener("click", handleClickRollAll);


function handleClickRoll(event) {
    event.preventDefault();
    let targetId = event.target.id;
    let targetDie = targetId.substring(targetId.indexOf("-") + 1);
    let diceInput = null;
    let diceFunction = null;
    let diceMod = null;
    let numberOfDice = 1;
    const results = [];
    const props = {
        total: 0,
        high: null,
        low: null
    }

    switch (targetId) {
        case "roll-d4":
            diceInput = _inpD4;
            diceFunction = _dice.d4;
            diceMod = _inpModD4;
            break;
        case "roll-d6":
            diceInput = _inpD6;
            diceFunction = _dice.d6;
            diceMod = _inpModD6;
            break;
        case "roll-d8":
            diceInput = _inpD8;
            diceFunction = _dice.d8;
            diceMod = _inpModD8;
            break;
        case "roll-d10":
            diceInput = _inpD10;
            diceFunction = _dice.d10;
            diceMod = _inpModD10;
            break;
        case "roll-d12":
            diceInput = _inpD12;
            diceFunction = _dice.d12;
            diceMod = _inpModD12;
            break;
        case "roll-d20":
            diceInput = _inpD20;
            diceFunction = _dice.d20;
            diceMod = _inpModD20;
            break;
        case "roll-d100":
            diceInput = _inpD100;
            diceFunction = _dice.d100;
            diceMod = _inpModD100;
            break;
        default:                                                        
    }
    if (!diceInput) {
        console.error("Invalid event:", event);
    }
    if (diceInput.value > 0) {
        numberOfDice = diceInput.value;
    }
    addDice(numberOfDice, diceFunction, results);

    let newReportLine = document.createElement("p");
    let newSummaryLine = document.createElement("p");
    newReportLine.textContent = targetDie + (diceInput.value < 2 ? "" : "s") + ": " + results.join(", ") + "\n";
    newSummaryLine.textContent = summaryTag(targetDie, diceMod.value, diceInput.value) + summarizeDice(results, diceMod, props) + "\n";

    _divReport.appendChild(newReportLine);
    _divSummary.appendChild(newSummaryLine);
    _divReport.scrollTo({top: _divReport.scrollHeight, behavior: "smooth"});
    _divSummary.scrollTo({top: _divSummary.scrollHeight, behavior: "smooth"});
}

function handleClickRollAll() {
    let report = "";
    let summary = "";
    const props = {
        total: 0,
        high: null,
        low: null
    }

    const d4Results = [];
    if (addDice(_inpD4.value, _dice.d4, d4Results)) {
        let dieType = "d4";
        let tag = summaryTag(dieType, _inpModD4.value, _inpD4.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD4.value < 2 ? "" : "s") + ": " + d4Results.join(", ");
        summary += tag + summarizeDice(d4Results, _inpModD4, props);
    }

    const d6Results = [];
    if (addDice(_inpD6.value, _dice.d6, d6Results)) {
        let dieType = "d6";
        let tag = summaryTag(dieType, _inpModD6.value, _inpD6.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD6.value < 2 ? "" : "s") + ": " + d6Results.join(", ");
        summary += tag + summarizeDice(d6Results, _inpModD6, props);
    }
    const d8Results = [];
    if (addDice(_inpD8.value, _dice.d8, d8Results)) {
        let dieType = "d8";
        let tag = summaryTag(dieType, _inpModD8.value, _inpD8.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD8.value < 2 ? "" : "s") + ": " + d8Results.join(", ");
        summary += tag + summarizeDice(d8Results, _inpModD8, props);
    }
    const d10Results = [];
    if (addDice(_inpD10.value, _dice.d10, d10Results)) {
        let dieType = "d10";
        let tag = summaryTag(dieType, _inpModD10.value, _inpD10.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD10.value < 2 ? "" : "s") + ": " + d10Results.join(", ");
        summary += tag + summarizeDice(d10Results, _inpModD10, props);
    }
    const d12Results = [];
    if (addDice(_inpD12.value, _dice.d12, d12Results)) {
        let dieType = "d12";
        let tag = summaryTag(dieType, _inpModD12.value, _inpD12.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD12.value < 2 ? "" : "s") + ": " + d12Results.join(", ");
        summary += tag + summarizeDice(d12Results, _inpModD12, props);
    }
    const d20Results = [];
    if (addDice(_inpD20.value, _dice.d20, d20Results)) {
        let dieType = "d20";
        let tag = summaryTag(dieType, _inpModD20.value, _inpD20.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD20.value < 2 ? "" : "s") + ": " + d20Results.join(", ");
        summary += tag + summarizeDice(d20Results, _inpModD20, props);
    }
    const d100Results = [];
    if (addDice(_inpD100.value, _dice.d100, d100Results)) {
        let dieType = "d%";
        let tag = summaryTag(dieType, _inpModD100.value, _inpD100.value);
        if (report != "") report += "<br>";
        if (summary != "") summary += "<br>";
        report += dieType + (_inpD100.value < 2 ? "" : "s") + ": " + d100Results.join(", ");
        summary += tag + summarizeDice(d100Results, _inpModD100, props);
    }

    if (report != "") {
        report += "<hr>-<hr>";
        let newReportLine = document.createElement("p");
        let newSummaryLine = document.createElement("p");
    
        if (summary.indexOf("<br>") > -1) {
            summary += "<hr>" + "Total: " + props.total + ". " + (!props.high ? "" : "High: " + props.high + ". Low: " + props.low + "." + "<hr>");
        }

        newReportLine.innerHTML = report;
        newSummaryLine.innerHTML = summary;
        _divReport.appendChild(newReportLine);
        _divSummary.appendChild(newSummaryLine);
        _divReport.scrollTo({top: _divReport.scrollHeight, behavior: "smooth"});
        _divSummary.scrollTo({top: _divSummary.scrollHeight, behavior: "smooth"});
    }
}

function addDice(toRoll, func, arr) {
    let returnValue = false;
    let numberOfDice = parseInt(toRoll);
    if (numberOfDice > 0) {
        returnValue = true;
        arr.push(...func(numberOfDice));
    }

    return returnValue;
}

function summarizeDice(arr, inp, runningProps) {
    let modValue = parseInt((!inp.value ? 0 : inp.value));
    let total = 0;
    let high = 0;
    let low = 0;
    let modified = 0;

    total = arr.reduce((a, b) => a + b);
    high = arr.reduce((a, b) => (a > b ? a : b)) + modValue;
    low = arr.reduce((a, b) => (a < b ? a : b)) + modValue;
    modified = parseInt(total) + modValue;

    runningProps.total += modified;
    if (!runningProps.high || high > runningProps.high) {
        runningProps.high = high;
    }
    if (!runningProps.low || low < runningProps.low) {
        runningProps.low = low;
    }

    return "Total: " + modified + ". " + (arr.length == 1 ? "" : "High: " + high + ". Low: " + low + ".");
}

function summaryTag (dieType, inputMod, numberOfDice) {
    let returnString = dieType + ( !inputMod ? ( numberOfDice < 2 ? "" : "s" ) : ( inputMod > -1 ? "+" : "-") + Math.abs(inputMod)) + ": ";
    return returnString;
}
