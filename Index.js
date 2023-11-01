document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const selectLoanTermOpt = document.getElementById("LoanTermOpt");
  const rngInterestRate = document.getElementById("IntRate");
  const selectPaymentFrequency = document.getElementById("PaymentFrequency");

  rngInterestRate.addEventListener("change", function () {
    const x = rngInterestRate.value;
    document.getElementById("IntRateValue").value = x;
  });

  selectLoanTermOpt.addEventListener("change", function () {
    if (selectLoanTermOpt.value === "Months") {
      const x = document.getElementById("PaymentFrequency");
      x.remove(5);
    }
    else {
      if (selectPaymentFrequency.options.length < 6) {
        const annuallyOption = document.createElement("option");
        annuallyOption.text = "Annually";
        annuallyOption.value = "Annually";
        selectPaymentFrequency.add(annuallyOption, 5);
      }
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const txtLoanAmountValue = document.getElementById("LoanAmount").value;
    const txtLoanTermValue = document.getElementById("LoanTerm").value;

    const numOfInterestsYearly = numofinterestsyearlyfn(selectLoanTermOpt, selectPaymentFrequency);

    const n = numOfInterestsYearly * txtLoanTermValue; //numofpayments
    const r = (rngInterestRate.value / 100) / numOfInterestsYearly; //periodic Interest Rate

    const monthlyPayment = monthlypaymentfn(n, r, txtLoanAmountValue);

    const totalInterest = (monthlyPayment * n) - txtLoanAmountValue;
    const totalPayment = monthlyPayment * n;

    document.getElementById("MonthlyPayment").textContent = Math.round(monthlyPayment);
    document.getElementById("TotalInterest").textContent = Math.round(totalInterest);
    document.getElementById("NumOfPayments").textContent = n;
    document.getElementById("TotalPayment").textContent = Math.round(totalPayment);
  });
});

function numofinterestsyearlyfn(selectLoanTermOpt, selectPaymentFrequency) {
  let numOfInterestsYearly = 0;
  if (selectLoanTermOpt.value === "Years") {
    if (selectPaymentFrequency.value === "Weekly") {
      numOfInterestsYearly = 52;
    } else if (selectPaymentFrequency.value === "Bi-weekly") {
      numOfInterestsYearly = 26;
    } else if (selectPaymentFrequency.value === "Semi-monthly") {
      numOfInterestsYearly = 24;
    } else if (selectPaymentFrequency.value === "Monthly") {
      numOfInterestsYearly = 12;
    } else {
      numOfInterestsYearly = 1;
    }
  }
  else {
    if (selectPaymentFrequency.value === "Weekly") {
      numOfInterestsYearly = 4;
    } else if (selectPaymentFrequency.value === "Bi-weekly") {
      numOfInterestsYearly = 2;
    } else if (selectPaymentFrequency.value === "Semi-monthly") {
      numOfInterestsYearly = 2;
    } else {
      numOfInterestsYearly = 1;
    }
  }
  return numOfInterestsYearly;
}

function monthlypaymentfn(n, r, txtLoanAmountValue) {
  let monthlyPayment = 0;
  const exp = (1 + r) ** n;
  monthlyPayment = (txtLoanAmountValue * r * exp) / (exp - 1);
  return monthlyPayment;
}



