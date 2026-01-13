
async function doctorSubmit(){


    let newapi='https://d1dgqwnu0ivu2l.cloudfront.net/visits';

    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;

    let visitDateStr=formattedDate;
    let diagnosis=document.getElementsByName("diagnosis")[0].value;
    let wtKg=document.getElementsByName("wtKg")[0].value;
    let tempC=document.getElementsByName("tempC")[0].value;
    let bpValue=document.getElementsByName("bpValue")[0].value;
    let paymentType=document.getElementsByName("paymentType")[0].value;
    let pid=document.getElementsByName("pid")[0].value;
    let did=document.getElementsByName("did")[0].value;


    let obj={
      visitDateStr: visitDateStr,
      diagnosis: diagnosis,
      wtKg: Number(wtKg),
      tempC: Number(tempC),
      bpValue: Number(bpValue),
      paymentType: paymentType,
      pid: Number(pid),
      did: Number(did),
    }

    let modalElem=document.getElementById("exampleModalLabel");
    let modalBodyElem=document.getElementById("modal-body");

    try{
      let res=await axios.post(newapi,obj);
      modalElem.innerText="Sucess";
      modalBodyElem.innerHTML=`<p>visit between doc: ${did} and patient: ${pid} has successfully added</p>`;
    }
    catch{
      modalElem.innerText="Failed";
      modalBodyElem.innerHTML=`<P>Failed to add visit between doc: ${did} and patient: ${pid} </p>`;
    }
}