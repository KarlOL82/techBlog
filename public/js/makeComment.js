function showCommentForm () {
    // const commentForm = document.querySelector("#comment-element");
    // const showCommentButton = document.querySelector("#comment");
    document.querySelector("#comment-element").classList.remove("hidden");
    document.querySelector("#comment").classList.remove("hidden");
};


const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    
    const title = document.querySelector("#post-form").value.trim();
    const postText = document.querySelector("#commentContent").value.trim();
  
    
    if (title && postText) {
      const response = await fetch("/api/comment/new", {
        method: "POST",
        
        body: JSON.stringify({ title, postText }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
       
        document.location.replace("/homepage");
      } else {
        alert("Failed to post new blog.");
      }
    }
  };
  
  document
    .querySelector("#comment")
    .addEventListener("click", showCommentForm);
    console.log("click");
  
  document
    .querySelector("#postCommentButton")
    .addEventListener("submit", newCommentFormHandler);
    