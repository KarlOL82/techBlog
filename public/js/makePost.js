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
  
  
  document
    .querySelector("#post-element")
    .addEventListener("submit", newPostFormHandler);