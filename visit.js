const ele=document.getElementById("root");

let api='https://d1dgqwnu0ivu2l.cloudfront.net/visits';

async function get(){
    let res=await axios.get(api);

    let data='';
    res.data.forEach(element => {
        let visitRef=element.visitRef;
        let visitDateStr=element.visitDateStr;
        let diagnosis=element.diagnosis;
        let wtKg=element.wtKg;
        let tempC=element.tempC;
        let bpValue=element.bpValue;
        let paymentType=element.paymentType;
        let pid=element.pid;
        let did=element.did;

        data+=`
            <div class="card text-bg-dark mb-3 border-secondary mb-3 col-sm-6 mb-3 mb-sm-0" style="padding:2%;max-width:35rem;">
            <div class="card-header">
                <h1>Visit ref:${visitRef}</h1>
            </div>
            <div class="card-body">
                <h5 class="card-title">Visit Date:${visitDateStr}</h5>
                <p class="card-text">Diagnosis:${diagnosis} ,</p>
                <p class="card-text">Weight in KG:${wtKg} ,</p>
                <p class="card-text">Temperature in C:${tempC} ,</p>
                <p class="card-text">Blood Pressure:${bpValue} ,</p>
                <p class="card-text">Payment Mode:${paymentType} ,</p>
                <p class="card-text">Patient id:${pid} </p>
                <p class="card-text">Doctor id:${did} ,</p>
                <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="edit(${visitRef});">
                    edit visit details
                </button>
                <a href="#" class="btn btn-danger" onClick="dele(${visitRef});">delete visit</a>
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

let visitRef;
let visitDateStr;
async function edit(visitid){

    let newapi=`${api}/${visitid}`;
    let res=await axios.get(newapi);

    let element=res.data
        visitRef=Number(element.visitRef);
        visitDateStr=element.visitDateStr;
        let diagnosis=element.diagnosis;
        let wtKg=element.wtKg;
        let tempC=element.tempC;
        let bpValue=element.bpValue;
        let paymentType=element.paymentType;
        let pid=element.pid;
        let did=element.did;
    
    let formdiagnosis=document.getElementsByName("diagnosis");
    formdiagnosis[0].value=`${diagnosis}`;

    let formwtKg=document.getElementsByName("wtKg");
    formwtKg[0].value=`${wtKg}`;

    let formtempC=document.getElementsByName("tempC");
    formtempC[0].value=`${tempC}`;

    let formbpValue=document.getElementsByName("bpValue");
    formbpValue[0].value=`${bpValue}`;

    let formpaymentType=document.getElementsByName("paymentType");
    formpaymentType[0].value=`${paymentType}`;

    let formpid=document.getElementsByName("pid");
    formpid[0].value=`${pid}`;

    let formdid=document.getElementsByName("did");
    formdid[0].value=`${did}`;
    
}

async function post(){

    let formdiagnosis=document.getElementsByName("diagnosis")[0].value;
    let formwtKg=document.getElementsByName("wtKg")[0].value;
    let formtempC=document.getElementsByName("tempC")[0].value;
    let formbpValue=document.getElementsByName("bpValue")[0].value;
    let formpaymentType=document.getElementsByName("paymentType")[0].value;
    let formpid=document.getElementsByName("pid")[0].value;
    let formdid=document.getElementsByName("did")[0].value;

    let obj={
        visitRef: visitRef,
        visitDateStr: visitDateStr,
        diagnosis: formdiagnosis,
        wtKg: Number(formwtKg),
        tempC: Number(formtempC),
        bpValue: Number(formbpValue),
        paymentType: formpaymentType,
        pid: formpid,
        did: formdid,

    }

    let newapi=`${api}/${visitRef}`;
    console.log(newapi);
    let res=await axios.put(newapi,obj);

    get();
}

async function dele(id){

    newapi=`${api}/${id}`;

    let res=await axios.delete(newapi);

    get();
}

// async function visit(id) {
//     let ele=document.getElementById("visitRoot");
//     let newapi=`${api}/${id}/visits`;

//     let res=await axios.get(newapi);

//     console.log(newapi);

//     let data='';
//     res.data.forEach(element => {
//         let patientId=element.pid;
//         let diagnosis=element.diagnosis;
//         let visitRef=element.visitRef;
//         let visitDateStr=element.visitDateStr;
//         let wtKg=element.wtKg;
//         let tempC=element.tempC;
//         let bpValue=element.bpValue;

//         console.log(patientId);

//         data+=`
//             <div class="card text-bg-secondary border-warning mb-3" style="width: 15rem;">
//             <div class="card-body">
//             <h5 class="card-title">patientId:${patientId}</h5>
//             <p class="card-text">diagnosis:${diagnosis}</p>
//             <p class="card-text">visit id:${visitRef}</p>
//             <p class="card-text">visit date:${visitDateStr}</p>
//             <p class="card-text">weight:${wtKg}kgs</p>
//             <p class="card-text">temperature:${tempC}C</p>
//             <p class="card-text">Blood pressure:${bpValue}</p>
            
//             </div>
//             </div> 
//         `
//     });

//     ele.innerHTML=data;
// }