
const dropZone =  document.querySelector(".drop-zone");
const fileInput =  document.querySelector("#fileInput");
const browseBtn =  document.querySelector(".browseBtn");
const bgProgress =  document.querySelector(".bgProgress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progressContainer");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyURLbtn");

const fileURL = document.querySelector("#fileURL");

const host = "https://filewave-server.onrender.com/";
const uploadURL = `${host}api/files`;


dropZone.addEventListener("dragover" ,(e)=>{
    e.preventDefault();

    if(!dropZone.classList.add("dragged")){
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    // console.log(e);
    const files = e.dataTransfer.files ;
    if(files.length){
        fileInput.files = files ;
        uploadFile();
    }
})

fileInput.addEventListener("change",()=>{
    uploadFile();
})

browseBtn.addEventListener("click",()=>{
    fileInput.click();
})

copyBtn.addEventListener("click",()=>{

    let copyText = fileURL.textContent ;

        navigator.clipboard.writeText(copyText);  

    fileURL.value = "Text Copied..." ;
})



const uploadFile =()=>{
    progressContainer.style.display = "block" ;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState == XMLHttpRequest.DONE){
            // console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
        
    } 

    xhr.upload.onprogress = updateProgress ;

    xhr.open("POST",uploadURL);
    xhr.send(formData);

} 

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded / e.total)*100);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
     progressBar.style.transform = `scaleX(${percent/100})` ;
    
}

const showLink=({file:url})=>{
     console.log(url);
     progressContainer.style.display = "none" ;
     sharingContainer.style.display = "block" ;
     fileURL.value = url;
}