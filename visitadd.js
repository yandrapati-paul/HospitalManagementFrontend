
async function doctorSubmit(){


    let newapi='http://hmsmanagement9.ap-southeast-2.elasticbeanstalk.com/visits';

  const today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();
  let visitDateStr = `${day}-${month}-${year}`;


    let diagnosis=document.getElementsByName("diagnosis")[0].value;
    let wtKg = parseFloat(document.getElementsByName("wtKg")[0].value);
    let tempC = parseFloat(document.getElementsByName("tempC")[0].value);
    let bpValue = parseFloat(document.getElementsByName("bpValue")[0].value);
    let pid = parseInt(document.getElementsByName("pid")[0].value);
    let did = parseInt(document.getElementsByName("did")[0].value);

    if (isNaN(wtKg) || isNaN(tempC) || isNaN(bpValue) || isNaN(pid) || isNaN(did)) {
      alert("Please fill all numeric fields correctly");
      return;
    }

    let paymentType=document.getElementsByName("paymentType")[0].value;


let obj = {
  visitDateStr: visitDateStr,
  diagnosis: diagnosis,
  wtKg: Number(wtKg),
  tempC: Number(tempC),
  bpValue: Number(bpValue),
  paymentType: paymentType,
  pid: Number(pid),
  did: Number(did)
};


    let modalElem=document.getElementById("exampleModalLabel");
    let modalBodyElem=document.getElementById("modal-body");

    try{
      let res = await axios.post(newapi, obj, {
  headers: {
    "Content-Type": "application/json"
  }
});

      modalElem.innerText="Sucess";
      modalBodyElem.innerHTML=`<p>visit between doc: ${did} and patient: ${pid} has successfully added</p>`;
    }
    catch{
      modalElem.innerText="Failed";
      modalBodyElem.innerHTML=`<P>Failed to add visit between doc: ${did} and patient: ${pid} </p>`;
    }
}