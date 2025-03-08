document.addEventListener("DOMContentLoaded", loadImages);

function uploadImage() {
    let fileInput = document.getElementById('fileInput');
    let gallery = document.getElementById('gallery');

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (event) {
            let imgUrl = event.target.result;

            // Save to local storage
            saveImage(imgUrl);

            // Display image
            let img = document.createElement('img');
            img.src = imgUrl;
            gallery.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select an image to upload.");
    }
}

// Save image URLs to local storage
function saveImage(imgUrl) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.push(imgUrl);
    localStorage.setItem("images", JSON.stringify(images));
}

// Load images from local storage
function loadImages() {
    let gallery = document.getElementById('gallery');
    let images = JSON.parse(localStorage.getItem("images")) || [];

    images.forEach((imgUrl) => {
        let img = document.createElement('img');
        img.src = imgUrl;
        gallery.appendChild(img);
    });
}
