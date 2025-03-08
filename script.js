// Check if the page has content saved in localStorage and load it
document.addEventListener("DOMContentLoaded", function () {
    loadImages();
});

// Upload image functionality
function uploadImage() {
    let fileInput = document.getElementById('fileInput');
    let captionInput = document.getElementById('captionInput');
    let gallery = document.getElementById('gallery');

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (event) {
            let imgUrl = event.target.result;
            let caption = captionInput.value.trim() || "No caption provided"; // Default caption

            // Save to local storage
            saveImage(imgUrl, caption);

            // Display image instantly
            displayImage(imgUrl, caption);

            // Clear input fields after upload
            fileInput.value = "";
            captionInput.value = "";
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select an image to upload.");
    }
}

// Save image and caption to local storage
function saveImage(imgUrl, caption) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.push({ imgUrl, caption });
    localStorage.setItem("images", JSON.stringify(images));
}

// Display images in the gallery
function displayImage(imgUrl, caption) {
    let gallery = document.getElementById('gallery');
    
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    let img = document.createElement('img');
    img.src = imgUrl;
    imgContainer.appendChild(img);

    let captionDiv = document.createElement('div');
    captionDiv.classList.add('caption');
    captionDiv.textContent = caption;
    imgContainer.appendChild(captionDiv);

    let likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.textContent = "Like";
    likeButton.onclick = function () {
        alert("You liked this image!");
    };
    imgContainer.appendChild(likeButton);

    gallery.appendChild(imgContainer);
}

// Load images from local storage
function loadImages() {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    let gallery = document.getElementById('gallery');

    // Clear existing gallery content
    gallery.innerHTML = "";

    // Loop through stored images and display them
    images.forEach(image => {
        displayImage(image.imgUrl, image.caption);
    });
}
