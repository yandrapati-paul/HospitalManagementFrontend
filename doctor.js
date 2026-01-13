const ele=document.getElementById("root");

let api='https://d1dgqwnu0ivu2l.cloudfront.net/doctors';

async function get(){
    let res=await axios.get(api);

    let data='';
    res.data.forEach(element => {
        let name=element.name;
        let id=element.doctorId;
        let emailAddress=element.emailAddress;
        let phone=element.phone;
        let gender=element.gender;
        let fieldSpeciality=element.fieldSpeciality;
        let yrsExperience=element.yrsExperience;
        let qualifications=element.qualifications;
        let monthlyPay=element.monthlyPay;

        data+=`
            <div class="card text-bg-dark mb-3 border-secondary mb-3 col-sm-6 mb-3 mb-sm-0" style="padding:2%;max-width:35rem;">
            <div class="card-header">
                <h1>Doctor Name:${name}</h1>
            </div>
            <div class="card-body">
                <h5 class="card-title">Doctor id:${id}</h5>
                <p class="card-text">emailAddress:${emailAddress} ,</p>
                <p class="card-text">phone:${phone} ,</p>
                <p class="card-text">gender:${gender} ,</p>
                <p class="card-text">fieldSpeciality:${fieldSpeciality} ,</p>
                <p class="card-text">yrsExperience:${yrsExperience} ,</p>
                <p class="card-text">qualifications:${qualifications} ,</p>
                <p class="card-text">monthlyPay:${monthlyPay} </p>
                <a href="#" class="btn btn-danger" onClick="visit(${id});">view doc visits</a>
                <div id="visitRoot">
                
                </div>
                <br>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="edit(${id});">
                    edit doc details
                </button>
                <a href="#" class="btn btn-danger" onClick="dele(${id});">delete doc</a>
            </div>
            </div>
                    
        `

    });
    ele.innerHTML=`
    <div class="row">
        ${data}
    </div>
    `
}
get();

let id;
async function edit(docid){

    let newapi=`${api}/${docid}`;
    let res=await axios.get(newapi);

    let element=res.data
        let name=element.name;
        id=Number(element.doctorId);
        let emailAddress=element.emailAddress;
        let phone=element.phone;
        let gender=element.gender;
        let fieldSpeciality=element.fieldSpeciality;
        let yrsExperience=element.yrsExperience;
        let qualifications=element.qualifications;
        let monthlyPay=element.monthlyPay;
    
    let formName=document.getElementsByName("name");
    formName[0].value=`${name}`;

    let formemailAddress=document.getElementsByName("emailAddress");
    formemailAddress[0].value=`${emailAddress}`;

    let formphone=document.getElementsByName("phone");
    formphone[0].value=`${phone}`;

    let formgender=document.getElementsByName("gender");
    formgender[0].value=`${gender}`;

    let formfieldSpeciality=document.getElementsByName("fieldSpeciality");
    formfieldSpeciality[0].value=`${fieldSpeciality}`;

    let formyrsExperience=document.getElementsByName("yrsExperience");
    formyrsExperience[0].value=`${yrsExperience}`;

    let formqualifications=document.getElementsByName("qualifications");
    formqualifications[0].value=`${qualifications}`;

    let formmonthlyPay=document.getElementsByName("monthlyPay");
    formmonthlyPay[0].value=`${monthlyPay}`;
    
}

async function post(){

    let formname=document.getElementsByName("name")[0].value;
    let formemailAddress=document.getElementsByName("emailAddress")[0].value;
    let formphone=document.getElementsByName("phone")[0].value;
    let formgender=document.getElementsByName("gender")[0].value;
    let formfieldSpeciality=document.getElementsByName("fieldSpeciality")[0].value;
    let formyrsExperience=document.getElementsByName("yrsExperience")[0].value;
    let formqualifications=document.getElementsByName("qualifications")[0].value;
    let formmonthlyPay=document.getElementsByName("monthlyPay")[0].value;

    let obj={
        name: formname,
        emailAddress: formemailAddress,
        phone: formphone,
        gender: formgender,
        doctorId: id,
        fieldSpeciality: formfieldSpeciality,
        yrsExperience: Number(formyrsExperience),
        qualifications: formqualifications,
        monthlyPay: Number(formmonthlyPay),
        encounterIds: [
        ]
    }

    let newapi=`${api}/${id}`;
    console.log(newapi);
    let res=await axios.put(newapi,obj);

    get();
}

async function dele(id){

    newapi=`${api}/${id}`;

    let res=await axios.delete(newapi);

    get();
}

async function visit(id) {
    let ele=document.getElementById("visitRoot");
    let newapi=`${api}/${id}/visits`;

    let res=await axios.get(newapi);

    console.log(newapi);

    let data='';
    res.data.forEach(element => {
        let patientId=element.pid;
        let diagnosis=element.diagnosis;
        let visitRef=element.visitRef;
        let visitDateStr=element.visitDateStr;
        let wtKg=element.wtKg;
        let tempC=element.tempC;
        let bpValue=element.bpValue;

        console.log(patientId);

        data+=`
            <div class="card text-bg-secondary border-warning mb-3" style="width: 15rem;">
            <div class="card-body">
            <h5 class="card-title">patientId:${patientId}</h5>
            <p class="card-text">diagnosis:${diagnosis}</p>
            <p class="card-text">visit id:${visitRef}</p>
            <p class="card-text">visit date:${visitDateStr}</p>
            <p class="card-text">weight:${wtKg}kgs</p>
            <p class="card-text">temperature:${tempC}C</p>
            <p class="card-text">Blood pressure:${bpValue}</p>
            
            </div>
            </div> 
        `
    });

    ele.innerHTML=data;
}