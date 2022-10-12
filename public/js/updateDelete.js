function delButtonHandler(event) {
  //   event.preventDefault();
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

const deleteBtnArray = document.getElementsByClassName("delComment");
for (i = 0; i < commentEvents.length; i++) {
  deleteBtnArray[i].addEventListener("click", delButtonHandler);
}

const updateComHandler = async (event) => {
  //   event.preventDefault();
  console.log("click update");

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // What happens if the response is ok?
    // If the response is ok, that means that the dish was updated successfully.
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to edit comment");
    }
  }
};

const updateComment = document.getElementsByClassName("delComment");
for (i = 0; i < commentEvents.length; i++) {
  updateComment[i].addEventListener("click", updateComHandler);
}
