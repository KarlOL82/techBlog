// function to delete a comment belonging to logged-in user
function delButtonHandler(event) {
    event.preventDefault();
  console.log("click delete");
  
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    fetch(`/api/comment/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    });
  }
}

function showCommentForm(event) {
  document.querySelector("#addComment").classList.remove("hidden");
}


const updateComHandler = async (event) => {
  
  console.log("click Edit");

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const commentText = document.querySelector(".commentText").value;
    console.log(id);
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        commentText, id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to edit comment");
    }
  }
};

// Event listener for the delete comment button
const deleteBtnArray = document.getElementsByClassName("delComment");
for (i = 0; i < deleteBtnArray.length; i++) {
  deleteBtnArray[i].addEventListener("click", delButtonHandler);
}


// Event listener for the edit comment button
const updateComment = document.getElementsByClassName("editComment");
for (i = 0; i < updateComment.length; i++) {
  updateComment[i].addEventListener("click", updateComHandler);
}
