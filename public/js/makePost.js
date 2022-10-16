// Function to allow users to make a new post
const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    
    const title = document.querySelector("#post-form").value.trim();
    const postText = document.querySelector("#postContent").value.trim();
  
    
    if (title && postText) {
      const response = await fetch("/api/post/new", {
        method: "POST",
        
        body: JSON.stringify({ title, postText }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
       
        document.location.replace("/profile");
      } else {
        alert("Failed to post new blog entry.");
      }
    }
  };
  
  // Event listener for new post form
  document
    .querySelector("#post-element")
    .addEventListener("submit", newPostFormHandler);