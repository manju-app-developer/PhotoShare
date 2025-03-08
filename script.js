// DOM Elements
const postForm = document.querySelector('.post-form');
const postText = document.querySelector('.post-form textarea');
const postBtn = document.querySelector('.post-form .post-btn');
const postsFeed = document.querySelector('.posts-feed');
const likeButtons = document.querySelectorAll('.like-btn');

// Function to handle post submission
const submitPost = (event) => {
    event.preventDefault();
    
    const postContent = postText.value.trim();
    
    if (postContent === '') {
        alert('Please write something before posting!');
        return;
    }

    // Create new post element
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/40" alt="User" class="post-avatar">
            <div class="post-user-info">
                <h3>John Doe</h3>
                <p>2 hours ago</p>
            </div>
        </div>
        <p class="post-caption">${postContent}</p>
        <img src="https://via.placeholder.com/600x400" alt="Post Image" class="post-image">
        <div class="post-actions">
            <button class="like-btn">Like</button>
            <button class="comment-btn">Comment</button>
            <button class="share-btn">Share</button>
        </div>
    `;

    postsFeed.prepend(newPost);  // Prepend to display new post on top
    postText.value = '';  // Clear text area
};

// Function to handle post likes
const handleLike = (event) => {
    const likeButton = event.target;

    if (likeButton.classList.contains('liked')) {
        likeButton.classList.remove('liked');
        likeButton.textContent = 'Like';
    } else {
        likeButton.classList.add('liked');
        likeButton.textContent = 'Liked';
    }
};

// Event Listeners
postForm.addEventListener('submit', submitPost);

// Adding like functionality to each like button in the post feed
postsFeed.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-btn')) {
        handleLike(event);
    }
});

// Optional: Adding functionality for comment and share buttons (can be expanded)
postsFeed.addEventListener('click', (event) => {
    if (event.target.classList.contains('comment-btn')) {
        alert('Comment feature coming soon!');
    } else if (event.target.classList.contains('share-btn')) {
        alert('Share feature coming soon!');
    }
});
