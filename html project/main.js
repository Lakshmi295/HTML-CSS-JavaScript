// Get references to HTML elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const msg = document.getElementById("msg");
const posts = document.getElementById("posts");

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate input
  if (input.value.trim() === "") {
    msg.innerHTML = "Post cannot be blank";
  } else {
    msg.innerHTML = "";
    
    // Check if we are in editing mode
    if (editingPost) {
      // If editing a post, update the existing post
      updatePost(editingPost, input.value);
      editingPost = null;
    } else {
      // If not editing, create a new post
      createPost(input.value);
    }
    
    // Clear the input field
    input.value = "";
  }
});

let editingPost = null;

// Function to create a new post
function createPost(text) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  // Create a new post element
  const postElement = document.createElement("div");
  postElement.innerHTML = `
    <p>${text}</p>
    <small>${formattedDate}</small>
    <span class="options">
      <i class="fas fa-edit edit-icon"></i>
      <i class="fas fa-trash-alt delete-icon"></i>
    </span>
  `;

  // Attach event listeners for edit and delete icons
  const editIcon = postElement.querySelector(".edit-icon");
  const deleteIcon = postElement.querySelector(".delete-icon");

  editIcon.addEventListener("click", () => {
    editPost(postElement);
  });

  deleteIcon.addEventListener("click", () => {
    deletePost(postElement);
  });

  // Append the new post to the posts container
  posts.appendChild(postElement);
}

// Function to edit an existing post
function editPost(postElement) {
  const postText = postElement.querySelector("p").textContent;
  input.value = postText;
  editingPost = postElement;
}

// Function to update an existing post
function updatePost(postElement, newText) {
  postElement.querySelector("p").textContent = newText;
}

// Function to delete a post
function deletePost(postElement) {
  postElement.remove();
}