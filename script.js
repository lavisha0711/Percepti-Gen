const analyzeButton = document.getElementById("analyzeButton");
const imageUpload = document.getElementById("imageUpload");
const result = document.getElementById("result");

analyzeButton.addEventListener("click", async () => {
  const file = imageUpload.files[0];
  if (!file) {
    alert("Please upload an image!");
    return;
  }

  const apiKey = "9F52LmUeAuWTts80tqJcia73vbVtx8uzv31RXz15tGKZQZCzKqXqJQQJ99ALACGhslBXJ3w3AAAFACOGIQ82"; // Replace with your Key 1
  const endpoint = "https://harshitresource.cognitiveservices.azure.com/"; // Your Endpoint URL
  const apiUrl = `${endpoint}vision/v3.2/analyze?visualFeatures=Categories,Description,Color`;

  try {
    // Read the file as a binary Blob
    const blob = await file.arrayBuffer();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/octet-stream",
      },
      body: blob, // Send the binary image data
    });

    if (!response.ok) throw new Error("Error in API request");

    const data = await response.json();
    console.log(data); // Debugging: Log the entire response

    // Extract the image description
    if (data.description && data.description.captions.length > 0) {
      const description = data.description.captions[0].text;
      result.textContent = `Description: ${description}`;
    } else {
      result.textContent = "No description found for this image.";
    }
  } catch (error) {
    console.error("Error:", error);
    result.textContent = "Failed to analyze the image. Check the console for more details.";
  }
});
