function showCommentForm (event) {
    // const commentForm = document.querySelector("#comment-element");
    // const showCommentButton = document.querySelector("#comment");
    document.querySelector("#"+event.target.dataset.id).classList.remove("hidden");
    event.target.classList.add("hidden");
    console.log(event.target.dataset.id);

};


const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    
    // const title = document.querySelector("#post-form").value.trim();
    const commentContent = document.querySelector("#commentContent").value.trim();
  
    
    if (commentContent) {
      const response = await fetch("/api/comment/new", {
        method: "POST",
        
        body: JSON.stringify({ title, postText }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
       
        document.location.replace("/profile");
      } else {
        alert("Failed to post new comment.");
      }
    }
  };
  
  const commentEvents = document.querySelectorAll(".comment")
  for (i =0; i < commentEvents.length; i++) {
    commentEvents[i].addEventListener("click", showCommentForm);
  }
    
    
  
  document
    .querySelector("#postCommentButton")
    .addEventListener("submit", newCommentFormHandler);
    