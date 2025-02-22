//function to validate inputs by user and calculate the answer and store in local storage
function validateAndCalculate(event) {

    //prevent auto refresh of page when clicking calculate button
    event.preventDefault();

        //initialize variable using get element function and value
        const meternumValue = document.getElementById("meternum").value;
        const previousreadValue = parseFloat(document.getElementById("prevreadinput").value);
        const currentreadValue = parseFloat(document.getElementById("currentreadinput").value);
        const costvalue = parseFloat(document.getElementById("costinput").value);

        //initialize field variables
        let meternumField =  document.getElementById("meternum");
        let previousreadField =  document.getElementById("prevreadinput");
        let currentreadField =  document.getElementById("currentreadinput");
        let costField =  document.getElementById("costinput");

        //reset outline styles
        meternumField.style.outline = "";
        previousreadField.style.outline = "";
        currentreadField.style.outline = "";
        costField.style.outline = "";

        //pattern of the meter number
        const meternumPattern = /^[A-Za-z]{4}[0-9]{4}$/;

        //validate meter number input, if meter number is not the same as the pattern and length is greater than 8 alert an error
        if (!meternumPattern.test(meternumValue)) {
            alert("Please follow the pattern 4 Letters and 4 Numbers (eg. abcd1234).");
            meternumField.style.outline = "3px solid red";
            return;
        }
        if (meternumValue.length > 8) {
            alert("Please input 8 characters only.");
            meternumField.style.outline = "3px solid red";
            return;
        }
        if (meternumValue == "") {
            alert("Please input a value before submitting.");
            meternumField.style.outline = "3px solid red";
            return;
        }

        //validate previous read input
        if (previousreadValue == "" || isNaN(previousreadValue)) {
            alert("Please input a valid numerical value for the previous reading before submitting.");
            previousreadField.style.outline = "3px solid red";
            return;
        }
        if (previousreadValue <= 0) {
            alert("Previous reading value should not be less than or equal to 0");
            previousreadField.style.outline = "3px solid red";
            return;
        }
        if (previousreadValue > currentreadValue) {
            alert("Previous reading should not be greater than the current reading.");
            previousreadField.style.outline = "3px solid red";
            currentreadField.style.outline = "3px solid red";
            return;
        }
        if (previousreadField.value.replace(/\./g, "").length > 5) { //excludes the period for length accuracy when input is a decimal
            alert("Value should only have 5 digits");
            previousreadField.style.outline = "3px solid red";
            return;
        }

        //validate current read input
        if (currentreadValue == "" || isNaN(currentreadValue)) {
            alert("Please input a valid numerical value for the current reading before submitting.");
            currentreadField.style.outline = "3px solid red";
            return;
        }
        if (currentreadValue <= 0) {
            alert("Current reading value should not be less than or equal to 0");
            currentreadField.style.outline = "3px solid red";
            return;
        }
        if (currentreadField.value.replace(/\./g, "").length > 5) {
            alert("Value should only have 5 digits");
            currentreadField.style.outline = "3px solid red";
            return;
        }

        //validate cost input
        if (costvalue == "" || isNaN(costvalue)) {
            alert("Please input a valid numerical value for the cost before submitting.");
            costField.style.outline = "3px solid red";
            return;
        }
        if (costvalue <= 0) {
            alert("Cost value should not be less than or equal to 0");
            costField.style.outline = "3px solid red";
            return;
        }

        //hide contents
        document.getElementById("content").style.display = "none";
        document.getElementById("secondhalf").style.display = "none";

        //show loading screen
        document.getElementById("loadingscreen").style.display = "block";

        
       
        //make sure local storage is cleared calculating again
        localStorage.clear();

        //computations
        var monthcAns = (currentreadValue - previousreadValue).toFixed(2) + " / kWh";
        var totalcostAns = (costvalue * parseFloat(monthcAns)).toFixed(2) + " PHP";

        // var meternumString = toString(meternumValue);
        // var prevreadString = toString(previousreadValue);
        // var currentreadString = toString(currentreadValue);
        // var costString = toString(costvalue);

        //store in local storage
        localStorage.setItem("monthlyConsumption", monthcAns);
        localStorage.setItem("totalCost", totalcostAns);

        localStorage.setItem("meternumTxt", meternumValue);
        localStorage.setItem("prevreadTxt", previousreadValue);
        localStorage.setItem("currentreadTxt", currentreadValue);
        localStorage.setItem("costTxt", costvalue)
    
        //redirect to computed.html after 5s
        setTimeout(function () {
            window.location.href = "computed.html";
        }, 5000);
}

//function to display the answers once the third page is loaded
window.onload = function () {
    //get fields
    let monthlyconsumpField = document.getElementById("monthlyconsump");
    let totalcostField = document.getElementById("totalcost");

    let meternumLi = document.getElementById("meternumTxt");
    let prevreadLi = document.getElementById("prevreadTxt");
    let currentreadLi = document.getElementById("currentreadTxt");
    let costLi = document.getElementById("costTxt");
    
    let formula1Li = document.getElementById("formulaTxt1");
    let formula2Li = document.getElementById("formulaTxt2");

    //get the values or the answers from the local storage
    const monthcAns = localStorage.getItem("monthlyConsumption");
    const totalcostAns = localStorage.getItem("totalCost");

    const meternumVal = localStorage.getItem("meternumTxt");
    const prevreadVal = localStorage.getItem("prevreadTxt");
    const currentreadVal = localStorage.getItem("currentreadTxt");
    const costVal = localStorage.getItem("costTxt");
   

    //update fields with the values
    if (monthcAns !== null) {
        monthlyconsumpField.value = monthcAns;
    }
    if (totalcostAns !== null) {
        totalcostField.value = totalcostAns;
    }

    if (meternumVal !== null) {
        meternumLi.innerText = "Meter number: " + meternumVal;     
    }
    if (prevreadVal !== null) {
        prevreadLi.innerText = "Previous reading: " + prevreadVal + " / kWh";
    }
    if (currentreadVal !== null) {
        currentreadLi.innerText = "Current reading: " + currentreadVal + " / kWh";
    }
    if (costVal !== null) {
        costLi.innerText = "Cost per kWh: " + costVal + " PHP";
    }

    formula1Li.innerText = "Monthly consumption: [" + currentreadVal + " - " + prevreadVal + " = " + monthcAns + "]";
    formula2Li.innerText = "Total cost: [(" + monthcAns + ") x " + costVal + " = " + totalcostAns + "]";
    
    
    
};

//sayonara button clicked
function onSayonaraClicked(event) {
    //rotate bg
    document.getElementById("bgRow").style.animation = "tiltLeftAnimation 1s ease-out forwards";

    //hide contents
    document.getElementById("catGifContent").style.display = "none";
    document.getElementById("answerContent").style.display = "none";

    //show thank you screen
    document.getElementById("thankyouScreen").style.display = "flex";

    //redirect to index.html after 5s
    setTimeout(function () {
        window.location.href = "index.html";
    }, 5000);
}
