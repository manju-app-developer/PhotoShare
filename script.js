// Check if the user is logged in when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").textContent = `Welcome, ${username}!`;
    } else {
        window.location.href = "login.html";
    }
    loadImages();
});

// Register a new user
function registerUser(event) {
    event.preventDefault();  // Prevent form submission
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;
    let confirmPassword = document.getElementById("reg-password-confirm").value;

    if (username && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        // Check if username already exists
        let userExists = users.some(u => u.username === username);
        if (userExists) {
            alert("Username already exists. Please choose a different one.");
        } else {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration Successful! Now you can login.");
            window.location.href = "login.html";
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Login user
function loginUser(event) {
    event.preventDefault();  // Prevent form submission
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("username", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid login credentials.");
    }
}

// Logout user
function logout() {
    localStorage.removeItem("username");
    window.location.href = "login.html";
}

// Image upload function
function uploadImage() {
    let fileInput = document.getElementById('fileInput');
    let captionInput = document.getElementById('captionInput');
    let gallery = document.getElementById('gallery');

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (event) {
            let imgUrl = event.target.result;
            let caption = captionInput.value || "No caption"; // Default caption if none is provided

            // Save to local storage
            saveImage(imgUrl, caption);

            // Display image instantly
            let img = document.createElement('img');
            img.src = imgUrl;

            let imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            imgContainer.appendChild(img);

            let likeButton = document.createElement('button');
            likeButton.textContent = "Like";
            likeButton.onclick = function () {
                alert("You liked this image!");
            };

            imgContainer.appendChild(likeButton);
            gallery.appendChild(imgContainer);

            // Clear input fields after upload
            fileInput.value = "";
            captionInput.value = "";
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please choose an image to upload.");
    }
}

// Save image to local storage
function saveImage(imgUrl, caption) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.push({ imgUrl, caption });
    localStorage.setItem("images", JSON.stringify(images));
}

// Load images from local storage
function loadImages() {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    let gallery = document.getElementById('gallery');

    // Clear existing images in the gallery
    gallery.innerHTML = "";

    // Load and display images
    images.forEach(image => {
        let img = document.createElement('img');
        img.src = image.imgUrl;

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);

        let likeButton = document.createElement('button');
        likeButton.textContent = "Like";
        likeButton.onclick = function () {
            alert("You liked this image!");
        };

        imgContainer.appendChild(likeButton);
        gallery.appendChild(imgContainer);
    });
}
