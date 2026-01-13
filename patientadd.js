
async function patientSubmit(){


    let newapi='https://d21l0eb0ukfkg3.cloudfront.net/patients';

    let name=document.getElementsByName("name")[0].value;
    let emailAddress=document.getElementsByName("emailAddress")[0].value;
    let phone=document.getElementsByName("phone")[0].value;
    let gender=document.getElementsByName("gender")[0].value;
    
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let formattedDate = `${String(day).padStart(2,"0")}-${String(month).padStart(2,"0")}-${year}`;



    let registrationDateStr=formattedDate;

    let patientAge = Number(document.getElementsByName("patientAge")[0].value);


    console.log(name);

    let obj={
      name: name,
      emailAddress: emailAddress,
      phone: phone,
      gender: gender,
      registrationDateStr:registrationDateStr,
      patientAge:patientAge,
      encounterIds: [1]
    }

    let modalElem=document.getElementById("exampleModalLabel");
    let modalBodyElem=document.getElementById("modal-body");

    try{
      let res = await axios.post(newapi, obj, {
        headers: {
            "Content-Type": "application/json"
        }
        });

      modalElem.innerText="Sucess";
      modalBodyElem.innerHTML=`<p>Patient with name: ${name} successfully uploaded</p>`;
    }
    catch{
      modalElem.innerText="Failed";
      modalBodyElem.innerHTML=`<P>Failed to upload Patient with name: ${name}</p>`;
    }
}