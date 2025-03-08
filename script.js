// Check if the page has posts saved in localStorage and load them
document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

// Upload image functionality (from upload.html)
function uploadImage(event) {
    event.preventDefault();
    
    let fileInput = document.getElementById('fileInput');
    let captionInput = document.getElementById('captionInput');
    let postId = Date.now(); // Unique ID for the post
    let file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let imgUrl = event.target.result;
            let caption = captionInput.value.trim() || "No caption provided"; // Default caption

            // Save to localStorage
            savePost(postId, imgUrl, caption);

            // Redirect to feed page after upload
            window.location.href = "index.html";
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select an image to upload.");
    }
}

// Save post to localStorage
function savePost(postId, imgUrl, caption) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({
        postId,
        imgUrl,
        caption,
        likes: 0,
        comments: [],
    });
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Load posts from localStorage and display them (on feed page)
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let gallery = document.getElementById('gallery');

    // Clear existing gallery content
    gallery.innerHTML = "";

    // Loop through posts and display them
    posts.forEach(post => {
        let postContainer = document.createElement('div');
        postContainer.classList.add('img-container');

        let img = document.createElement('img');
        img.src = post.imgUrl;
        img.alt = post.caption;
        postContainer.appendChild(img);

        let captionDiv = document.createElement('div');
        captionDiv.classList.add('caption');
        captionDiv.textContent = post.caption;
        postContainer.appendChild(captionDiv);

        // Like Button
        let likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.textContent = "Like";
        likeButton.onclick = function () {
            likePost(post.postId);
        };
        postContainer.appendChild(likeButton);

        let likeCount = document.createElement('div');
        likeCount.classList.add('like-count');
        likeCount.textContent = `${post.likes} likes`;
        postContainer.appendChild(likeCount);

        // Comment Button
        let commentButton = document.createElement('button');
        commentButton.classList.add('comment-button');
        commentButton.textContent = "Comment";
        commentButton.onclick = function () {
            commentPost(post.postId);
        };
        postContainer.appendChild(commentButton);

        let commentCount = document.createElement('div');
        commentCount.classList.add('comment-count');
        commentCount.textContent = `${post.comments.length} comments`;
        postContainer.appendChild(commentCount);

        // Delete Button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deletePost(post.postId);
        };
        postContainer.appendChild(deleteButton);

        gallery.appendChild(postContainer);
    });
}

// Like post functionality
function likePost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(post => post.postId === postId);

    if (post) {
        post.likes++;
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();  // Reload posts to update like count
    }
}

// Comment post functionality
function commentPost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(post => post.postId === postId);

    if (post) {
        let comment = prompt("Enter your comment:");
        if (comment) {
            post.comments.push(comment);
            localStorage.setItem("posts", JSON.stringify(posts));
            loadPosts();  // Reload posts to update comments
        }
    }
}

// Delete post functionality
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.postId !== postId);  // Remove the post with the matching ID
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();  // Reload posts to reflect the deletion
}
