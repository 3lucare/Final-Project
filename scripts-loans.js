console.log("Did it work?")




const loanTypesList = [
  ["Housing Loans", "https://images.pexels.com/photos/27425247/pexels-photo-27425247/free-photo-of-a-cobblestone-street-with-white-houses-and-red-roofs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "house", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Apartment Loans", "https://images.pexels.com/photos/5523124/pexels-photo-5523124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "apartment", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Car Loans", "https://images.pexels.com/photos/22147538/pexels-photo-22147538/free-photo-of-black-jeep-on-a-street.jpeg?auto=compress&cs=tinysrgb&w=1200", "car", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Boat Loans", "https://images.pexels.com/photos/2563679/pexels-photo-2563679.jpeg?auto=compress&cs=tinysrgb&w=1200", "boat", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Personal Loans", "https://images.pexels.com/photos/2062462/pexels-photo-2062462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "personal", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
  ["Business Loans", "https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "business", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
]

const loanList = document.getElementById("loanTypes");

function addCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // Function to remove commas from a string
  function removeCommas(value) {
    return value.replace(/,/g, "");
  }
  
  // Attach event listeners for formatting inputs
  document.getElementById("loan-amount").addEventListener("input", function (e) {
    const input = e.target;
    const rawValue = removeCommas(input.value);
    if (!isNaN(rawValue) && rawValue !== "") {
      input.value = addCommas(rawValue);
    }
  });
  
  document.getElementById("monthly-payment").addEventListener("input", function (e) {
    const input = e.target;
    const rawValue = removeCommas(input.value);
    if (!isNaN(rawValue) && rawValue !== "") {
      input.value = addCommas(rawValue);
    }
  });
  
  // calculate loan payoff
  function calculatePayoff() {
    const loanAmount = parseFloat(removeCommas(document.getElementById('loan-amount').value));
    const monthlyPayment = parseFloat(removeCommas(document.getElementById('monthly-payment').value));
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;

    
    // console.log('Loan Amount:', loanAmount);
    // console.log('Monthly Payment:', monthlyPayment);
    // console.log('Interest Rate:', interestRate);
  
  
    if (isNaN(loanAmount) || isNaN(monthlyPayment) || loanAmount <= 0 || monthlyPayment <= 0) {
      alert("Please enter a valid nummerical amount.");
      return;
    }

  
    let remainingBalance = loanAmount;
    let months = 0;
  
    
    while (remainingBalance > 0) {
      remainingBalance += remainingBalance * (interestRate / 12);
      remainingBalance -= monthlyPayment;
      months++;
  
      if (months > 600) {
        alert("The loan cannot be paid off with the provided monthly payment.");
        return;
      }
    }
  
    const years = Math.floor(months / 12);
    const extraMonths = months % 12;
  
    
    let resultText = `It will take you ${years} years`;
    if (extraMonths > 0) {
        resultText += ` and ${extraMonths} months`;
    }
    resultText += " to pay off your loan.";
    
    document.getElementById('result-text').textContent = resultText;

  }


  //loan list
  function displayProducts(loans) {
    loanList.innerHTML = '';
   
    for (let type of loans) {

        const liElement = document.createElement("li");
        liElement.className = "loan-item";

        const imgElement = document.createElement("div");
        imgElement.className = "img-container";

        const img = document.createElement("img");
        img.src = type[1];
        img.alt = type[0];
        img.className = "img-item";

        imgElement.appendChild(img);


        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const loanName = document.createElement("p");
        loanName.textContent = type[0];
        loanName.className = "name-item";

        const loanDescription = document.createElement("p");
        loanDescription.textContent = type[3];
        loanDescription.className = "loan-description";

        textContainer.appendChild(loanName);
        textContainer.appendChild(loanDescription);
        

        liElement.appendChild(imgElement);
        liElement.appendChild(textContainer);

        
    
        loanList.appendChild(liElement);
    }

   

}


displayProducts(loanTypesList);

function filterByType(type) {
      const filteredLoans = loanTypesList.filter(item => item[2] === type);
      displayProducts(filteredLoans);
}

filterByType("house");

document.getElementById("loan-selection").addEventListener("change", function () {
  const selectedValue = this.value;
  const loanCategory = {
      housing: "house",
      apartment: "apartment",
      business: "business",
      personal: "personal",
      car: "car",
      boat: "boat"
  };
  const type = loanCategory[selectedValue];

  if (type) {
    filterByType(type);
  }
});
