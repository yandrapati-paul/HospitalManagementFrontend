const ele=document.getElementById("root");

let api='https://d1dgqwnu0ivu2l.cloudfront.net/patients';

async function get(){
    let res=await axios.get(api);

    let data='';
    res.data.forEach(element => {
        let name=element.name;
        let id=element.patientId;
        let emailAddress=element.emailAddress;
        let phone=element.phone;
        let gender=element.gender;
        let registrationDateStr=element.registrationDateStr;
        let patientAge=element.patientAge;

        data+=`
            <div class="card text-bg-dark mb-3 border-secondary mb-3 col-sm-6 mb-3 mb-sm-0" style="padding:2%;max-width:35rem;">
            <div class="card-header">
                <h1>Patient Name:${name}</h1>
            </div>
            <div class="card-body">
                <h5 class="card-title">Patient id:${id}</h5>
                <p class="card-text">emailAddress:${emailAddress} ,</p>
                <p class="card-text">phone:${phone} ,</p>
                <p class="card-text">gender:${gender} ,</p>
                <p class="card-text">registrationDateStr:${registrationDateStr} ,</p>
                <p class="card-text">patientAge:${patientAge} ,</p>
                <a href="#" class="btn btn-danger" onClick="visit(${id});">view patient visits</a>
                <div id="visitRoot">
                
                </div>
                <br>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="edit(${id});">
                    edit patient details
                </button>
                <a href="#" class="btn btn-danger" onClick="dele(${id});">delete patient</a>
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
let registrationDateStr;
async function edit(patid){

    let newapi=`${api}/${patid}`;
    let res=await axios.get(newapi);

    let element=res.data
        let name=element.name;
        id=Number(element.patientId);
        let emailAddress=element.emailAddress;
        let phone=element.phone;
        let gender=element.gender;
        registrationDateStr=element.registrationDateStr;
        let patientAge=element.patientAge;
    
    let formName=document.getElementsByName("name");
    formName[0].value=`${name}`;

    let formemailAddress=document.getElementsByName("emailAddress");
    formemailAddress[0].value=`${emailAddress}`;

    let formphone=document.getElementsByName("phone");
    formphone[0].value=`${phone}`;

    let formgender=document.getElementsByName("gender");
    formgender[0].value=`${gender}`;

    let formyrspatientAge=document.getElementsByName("patientAge");
    formyrspatientAge[0].value=`${patientAge}`;
    
}

async function post(){

    let formname=document.getElementsByName("name")[0].value;
    let formemailAddress=document.getElementsByName("emailAddress")[0].value;
    let formphone=document.getElementsByName("phone")[0].value;
    let formgender=document.getElementsByName("gender")[0].value;
    let formyrspatientAge=document.getElementsByName("patientAge")[0].value;

    let obj={
        name: formname,
        emailAddress: formemailAddress,
        phone: formphone,
        gender: formgender,
        patientId: id,
        registrationDateStr: registrationDateStr,
        patientAge: Number(formyrspatientAge),
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

    ele.innerHTML='';
    res.data.forEach(element => {
        let doctorId=element.did;
        let diagnosis=element.diagnosis;
        let visitRef=element.visitRef;
        let visitDateStr=element.visitDateStr;
        let wtKg=element.wtKg;
        let tempC=element.tempC;
        let bpValue=element.bpValue;

        ele.innerHTML+=`
            <div class="card text-bg-secondary border-warning mb-3" style="width: 15rem;">
            <div class="card-body">
            <h5 class="card-title">doctorId:${doctorId}</h5>
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
}