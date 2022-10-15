
window.onload = function() {

  function showCommentForm(event) {
    event.preventDefault();
    
    
      document
        .querySelector("#addComment" + this.getAttribute("data-id"))
        .classList.remove("hidden");
      event.target.classList.add("hidden");
      
    
  }

  const CommentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute("data-id");
    const commentText = document.querySelector("#commentContent"+post_id).value.trim();

    
    if (commentText && post_id) {
      const response = await fetch("/api/comment/new", {
        method: "POST",

        body: JSON.stringify({ commentText, post_id }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to post new comment.");
      }
    }
  };

  

  const commentEvents = document.getElementsByClassName("commentArr");
  for (i = 0; i < commentEvents.length; i++) {
    commentEvents[i].addEventListener("click", showCommentForm);
  }

  
  const submitCommentEvents = document.getElementsByClassName("postNewComment");
  for (j = 0; j < submitCommentEvents.length; j++) {
    submitCommentEvents[j].addEventListener("submit", CommentFormHandler);
  }

}

