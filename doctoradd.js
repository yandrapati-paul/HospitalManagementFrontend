
async function doctorSubmit(){


    let newapi='https://d1dgqwnu0ivu2l.cloudfront.net/doctors';

    let name=document.getElementsByName("name")[0].value;
    let emailAddress=document.getElementsByName("emailAddress")[0].value;
    let phone=document.getElementsByName("phone")[0].value;
    let gender=document.getElementsByName("gender")[0].value;
    let fieldSpeciality=document.getElementsByName("fieldSpeciality")[0].value;
    let yrsExperience=document.getElementsByName("yrsExperience")[0].value;
    let qualifications=document.getElementsByName("qualifications")[0].value;
    let monthlyPay=document.getElementsByName("monthlyPay")[0].value;

    console.log(name);

    let obj={
      name: name,
      emailAddress: emailAddress,
      phone: phone,
      gender: gender,
      fieldSpeciality: fieldSpeciality,
      yrsExperience: Number(yrsExperience),
      qualifications: qualifications,
      monthlyPay: Number(monthlyPay),
      encounterIds: [
      ]
    }

    let modalElem=document.getElementById("exampleModalLabel");
    let modalBodyElem=document.getElementById("modal-body");

    try{
      let res=await axios.post(newapi,obj);
      modalElem.innerText="Sucess";
      modalBodyElem.innerHTML=`<p>Doctor with name: ${name} successfully uploaded</p>`;
    }
    catch{
      modalElem.innerText="Failed";
      modalBodyElem.innerHTML=`<P>Failed to upload Doctor with name: ${name}</p>`;
    }
}