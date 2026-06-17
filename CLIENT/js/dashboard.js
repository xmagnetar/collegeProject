const imageInput =
document.getElementById("imageInput");

const preview =
document.getElementById("preview");

let selectedFile;

imageInput.addEventListener("change",(e)=>{

    selectedFile = e.target.files[0];

    preview.src =
    URL.createObjectURL(selectedFile);

});

document
.getElementById("predictBtn")
.addEventListener("click",async ()=>{

    if(!selectedFile){
        alert("Select image");
        return;
    }

    const formData = new FormData();

    formData.append(
        "file",
        selectedFile
    );

    const response = await fetch(
    `${API_BASE_URL}/mlService/predict`,
    {
        method:"POST",
        credentials:"include",
        body:formData
    }
);

    const data =
    await response.json();

    document
    .getElementById("result")
    .innerText =
    `Prediction: ${data.prediction}
    Confidence: ${data.confidence}`;

});