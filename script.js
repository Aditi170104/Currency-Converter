const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns= document.querySelectorAll(".drop-down select");
const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropDowns){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target); //updated code
    });
};

const updateFlag = (element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault(); //to stop all other changes
    let amount= document.querySelector("#amount-input");
    let amntValue= amount.value;
    if(amntValue==="" || amntValue<1){
        amntValue=1;
        amount.value="1";
    }
    // console.log(fromCurr.value.toLowerCase(),toCurr.value);
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurrency}.json`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        const rate = data[fromCurrency][toCurrency];
        const finalAmount = (amntValue * rate).toFixed(2);

        msg.innerText=`${amntValue} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
        msg.classList.remove("hidden");
    } catch (err) {
        console.error("Fetch error:", err);
    }
    
});

