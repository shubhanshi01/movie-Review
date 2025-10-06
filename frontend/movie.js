const url = new URL(location.href);
const movieId = url.searchParams.get("id")
const movieTitle = url. searchParams.get("title")


const Apilink =" http://localhost:8000/api/v1/reviews/";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFmMDc4MzQyYmJjZWQ2N2QzZWM3MzM0YWI5ZmIzZCIsIm5iZiI6MTc1OTYwMDIzMC43MzksInN1YiI6IjY4ZTE1ZTY2MTlmMjYzMTNmMjljYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8vhPSs5qFLMZwW9hPx3Ge5wYgXIsSISzfGq4dIk81g",
  },
};

const main = document.getElementById("section");
const title = document.getElementById("title");
title.innerHTML=movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML =`
<div class="row">
<div class="column">
<div class="card">
New Review
<p><strong>Review: </strong>
<input type="text" id="new_review" value="">
</p>
<p><strong>User: </strong>
<input type="text" id="new_user" value="">
</p>
<p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
</p>
</div>
</div>
</div>
`
main.appendChild(div_new)
returnMovie(Apilink, options);

function returnMovie(url, options) {
  fetch(url + movieId, options)
  .then(res => res.json())
  .then(data => {
    console.log("API Response:", data);


    if (!data || data.length === 0) {
      main.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    data.forEach(element => {
      const div_card = document.createElement("div");
      div_card.innerHTML = `
        <div class="row">
          <div class="column">
            <div class="card" id="${element._id}">
              <p><strong>Review:</strong> ${element.review}</p>
              <p><strong>User:</strong> ${element.user}</p>
              <p>
                <a href="#" onclick="editReview('${element._id}', '${element.review}', '${element.user}')">✏️ Edit</a>
                <a href="#" onclick="deleteReview('${element._id}')">🗑️ Delete</a>
              </p>
            </div>
          </div>
        </div>
      `;
      main.appendChild(div_card);
    });
  })
  .catch(err => console.error("Error fetching reviews:", err))};
function editReview(id, review, user) {
    console. log(review)
    const element= document.getElementById(id);
    console. log(element)
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element. innerHTML = `
    <p><strong>Review: </strong>
        <input type="text" id="${reviewInputId}" value="${review}">
    </p>
    <p><strong>User: </strong>
        <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">✏️</a
    </p>`
    }

    function saveReview( reviewInputId, userInputId, id="") {
const review = document.getElementById(reviewInputId).value;
const user = document.getElementById(userInputId).value;
if (id){
    fetch(Apilink + id, {
method: 'PUT',
headers: {
'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/json'
},
body: JSON.stringify({"user": user, "review": review})
}).then(res => res.json())
.then(res => {
console.log(res)
location.reload();
});

}else{
    fetch(Apilink + "new", {
        method: 'POST',
        headers: {
'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/json'
        },
body: JSON. stringify({"user": user, "review": review, "movieId": movieId} )
}).then(res => res.json( ))
.then(res => {
console. log(res)
location.reload();
});
       
}


}

function deleteReview(id) {
  if (!confirm("Are you sure you want to delete this review?")) return;

  fetch(Apilink + id, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Authorization': options.headers.Authorization
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Deleted:", data);
      const element = document.getElementById(id);
      if (element) element.remove();
    })
    .catch(err => console.error("Error deleting review:", err));
}