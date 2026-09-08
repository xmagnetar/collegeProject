const imageInput = document.getElementById("imageInput");
const cameraInput = document.getElementById("cameraInput");

const uploadBtn = document.getElementById("uploadBtn");
const cameraBtn = document.getElementById("cameraBtn");

const preview = document.getElementById("preview");
const predictBtn = document.getElementById("predictBtn");
const result = document.getElementById("result");

let selectedFile;


// Open normal image picker
uploadBtn.addEventListener("click", () => {
    imageInput.click();
});


// Open camera
cameraBtn.addEventListener("click", () => {
    cameraInput.click();
});


// Common function for both uploaded and captured images
function handleImage(e) {

    const file = e.target.files[0];

    if (!file) return;

    selectedFile = file;

    // Show preview
    preview.src = URL.createObjectURL(selectedFile);

    preview.style.display = "block";
}


// Normal image selection
imageInput.addEventListener("change", handleImage);


// Camera photo selection
cameraInput.addEventListener("change", handleImage);


// Analyze image
predictBtn.addEventListener("click", async () => {

    if (!selectedFile) {
        alert("Select or capture an image");
        return;
    }

    const formData = new FormData();

    // Keep "file" because your backend already expects this
    formData.append("file", selectedFile);

    try {

        result.innerText = "Analyzing image...";

        const response = await fetch(
            `${API_BASE_URL}/mlService/predict`,
            {
                method: "POST",
                credentials: "include",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Prediction failed");
        }

        result.innerText =
            `Prediction: ${data.prediction}
Confidence: ${data.confidence}`;

    } catch (error) {

        console.error(error);

        result.innerText =
            "Error analyzing image. Please try again.";
    }

});
