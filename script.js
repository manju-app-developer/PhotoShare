// Check if the user is logged in when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").textContent = `Hello, ${username}!`;
    } else {
        window.location.href = "login.html";
    }
    loadImages();
});

// Register a new user
function registerUser() {
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;

    if (username && password) {
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
function loginUser() {
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
    let gallery = document.getElementById('gallery');

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (event) {
            let imgUrl = event.target.result;

            // Save to local storage
            saveImage(imgUrl);

            // Display image instantly
            let img = document.createElement('img');
            img.src = imgUrl;
            gallery.prepend(img);
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select an image to upload.");
    }
}

// Save image URLs to local storage
function saveImage(imgUrl) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images.unshift({ imgUrl, likes: 0, comments: [] }); // Save image with likes and comments
    localStorage.setItem("images", JSON.stringify(images));
}

// Load images from local storage
function loadImages() {
    let gallery = document.getElementById('gallery');
    let images = JSON.parse(localStorage.getItem("images")) || [];

    // Clear the gallery before reloading
    gallery.innerHTML = '';

    images.forEach((image, index) => {
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        let img = document.createElement('img');
        img.src = image.imgUrl;
        imgContainer.appendChild(img);

        let likeButton = document.createElement('button');
        likeButton.textContent = `Like (${image.likes})`;
        likeButton.onclick = () => likeImage(index);
        imgContainer.appendChild(likeButton);

        let commentSection = document.createElement('div');
        image.comments.forEach(comment => {
            let commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });

        let commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        imgContainer.appendChild(commentInput);

        let commentButton = document.createElement('button');
        commentButton.textContent = 'Post Comment';
        commentButton.onclick = () => postComment(index, commentInput.value);
        imgContainer.appendChild(commentButton);

        imgContainer.appendChild(commentSection);
        gallery.appendChild(imgContainer);
    });
}

// Like an image
function likeImage(index) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images[index].likes++;
    localStorage.setItem("images", JSON.stringify(images));

    loadImages();
}

// Post a comment on an image
function postComment(index, commentText) {
    if (commentText.trim() === "") {
        alert("Please enter a comment.");
        return;
    }

    let images = JSON.parse(localStorage.getItem("images")) || [];
    images[index].comments.push(commentText);
    localStorage.setItem("images", JSON.stringify(images));

    loadImages(); // Reload images to display new comments
}

// Like a comment
function likeComment(imageIndex, commentIndex) {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    images[imageIndex].comments[commentIndex].likes = (images[imageIndex].comments[commentIndex].likes || 0) + 1;
    localStorage.setItem("images", JSON.stringify(images));

    loadImages(); // Reload images to reflect like count
}

// Call this function to handle login/logout actions on page load
function checkLoggedInStatus() {
    const username = localStorage.getItem("username");
    if (!username) {
        window.location.href = "login.html";
    } else {
        document.getElementById("username").innerText = `Welcome, ${username}!`;
    }
}

// Initialize on page load
checkLoggedInStatus();
