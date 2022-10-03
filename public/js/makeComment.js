function showCommentForm (event) {
    document.querySelector("#"+event.target.dataset.id).classList.remove("hidden");
    event.target.classList.add("hidden");
    console.log(event.target.dataset.id);

};


const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    
    const post_id = event.target.getAttribute('data-id');
    const commentText = document.querySelector("#commentContent").value.trim();
  
    console.log(post_id,commentText, "FORM COMMENT")
    if (commentText && post_id) {
      const response = await fetch("/api/comment/new", {
        method: "POST",
        
        body: JSON.stringify({commentText, post_id}),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
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
    .querySelector(".postNewComment")
    .addEventListener("submit", newCommentFormHandler);
    