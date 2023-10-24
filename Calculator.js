document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const loan_amount = document.getElementById("LoanAmount").value;
    const loan_term_value = document.getElementById("LoanTerm").value;
    const loan_term_Opt = document.getElementById("LoanTermOpt");
    const Interest_rate = document.getElementById("IntRate");
    const payment_frequency = document.getElementById("PaymentFrequency");
   
    
    Interest_rate.addEventListener("change", function() {
      const x = Interest_rate.value;
      console.log(x);
      document.getElementById("IntRateValue").value = x;
    });


    console.log(loan_term_Opt.value);
    loan_term_Opt.addEventListener("change", function() {
      console.log("inside if function");
      if (loan_term_Opt.value == "Months") {
        console.log('Inside the "Months" block');
        const x = document.getElementById("PaymentFrequency");
        x.remove(5);
      }
      else {
        if (payment_frequency.options.length < 6) {
          console.log("inside else function");
          const annuallyOption = document.createElement("option");
        annuallyOption.text = "Annually";
        annuallyOption.value = "Annually";
        payment_frequency.add(annuallyOption, 5);
        }    
      }
    });


    console.log("ouside function");
   
    if(loan_term_Opt.value == "Years") {
      if (payment_frequency.value == "Weekly") {
        numofinterestsyearly = 52;
      } else if (payment_frequency.value == "Bi-weekly") {
        numofinterestsyearly = 26;
      } else if (payment_frequency.value == "Semi-monthly") {
        numofinterestsyearly = 24;
      } else if (payment_frequency.value == "Monthly") {
        numofinterestsyearly = 12;
      } else {
        numofinterestsyearly = 1;
      }
    }
    else {
      if (payment_frequency.value == "Weekly") {
        numofinterestsyearly = 4;
      } else if (payment_frequency.value == "Bi-weekly") {
        numofinterestsyearly = 2;
      } else if (payment_frequency.value == "Semi-monthly") {
        numofinterestsyearly = 2;
      } else {
        numofinterestsyearly = 1;
      }
    }
      
    n = numofinterestsyearly * loan_term_value; //numofpayments
    console.log(n);
    r = (Interest_rate.value/100) / numofinterestsyearly; //periodic Interest Rate
    console.log(r);
    exp = (1 + r)**n;
    console.log(exp);
    monthlypayment = (loan_amount * r * exp) / (exp - 1);
    totalinterest = (monthlypayment * n) - loan_amount;
    totalpayment = monthlypayment * n;

    document.getElementById("MonthlyPayment").textContent = Math.round(monthlypayment);
    document.getElementById("TotalInterest").textContent = Math.round(totalinterest);
    document.getElementById("NumOfPayments").textContent = n;
    document.getElementById("TotalPayment").textContent = Math.round(totalpayment);
  });
});



