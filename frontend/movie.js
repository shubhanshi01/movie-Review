const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const Apilink = "http://localhost:8000/api/v1/reviews/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.e8vhPSs5qFLMZwW9hPx3Ge5wYgXIsSISzfGq4dIk81g",
  },
};

const main = document.getElementById("section");
const title = document.getElementById("title");
title.innerText = movieTitle;

// Create New Review card
const div_new = document.createElement("div");
div_new.innerHTML = `
<div class="row">
  <div class="column">
    <div class="card">
      <h3>New Review</h3>
      <p><strong>Review: </strong><input type="text" id="new_review"></p>
      <p><strong>User: </strong><input type="text" id="new_user"></p>
      <p><a onclick="saveReview('new_review','new_user')">💾 Save</a></p>
    </div>
  </div>
</div>
`;
main.appendChild(div_new);

// Fetch and display reviews
function returnMovie(url, options) {
  fetch(url + movieId, options)
    .then(res => res.json())
    .then(data => {
      console.log("API Response:", data);

      // Remove all existing review cards except new review
      main.querySelectorAll(".review-card")?.forEach(el => el.remove());

      if (!data || data.length === 0) {
        const noReviews = document.createElement("p");
        noReviews.innerText = "No reviews yet.";
        noReviews.className = "review-card";
        main.insertBefore(noReviews, div_new);
        return;
      }

      data.forEach(element => {
        const div_card = document.createElement("div");
        div_card.className = "review-card";
        div_card.id = element._id;
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card">
                <p><strong>Review:</strong> <span class="text">${element.review}</span></p>
                <p><strong>User:</strong> <span class="text">${element.user}</span></p>
                <p>
                  <a onclick="editReview('${element._id}', '${element.review}', '${element.user}')">✏️ Edit</a>
                  <a onclick="deleteReview('${element._id}')">🗑️ Delete</a>
                </p>
              </div>
            </div>
          </div>
        `;
        main.insertBefore(div_card, div_new); // insert above new review card
      });
    })
    .catch(err => console.error("Error fetching reviews:", err));
}

returnMovie(Apilink, options);

// Edit review
function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
    <div class="row">
      <div class="column">
        <div class="card">
          <p><strong>Review: </strong><input type="text" id="${reviewInputId}" value="${review}"></p>
          <p><strong>User: </strong><input type="text" id="${userInputId}" value="${user}"></p>
          <p><a onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">💾 Save</a></p>
        </div>
      </div>
    </div>
  `;
}

// Save review (new or edit)
function saveReview(reviewInputId, userInputId, id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (!review || !user) { alert("Please enter review and user"); return; }

  if (id) {
    fetch(Apilink + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': options.headers.Authorization
      },
      body: JSON.stringify({ user, review })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      returnMovie(Apilink, options); // refresh list
    });
  } else {
    fetch(Apilink + "new", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': options.headers.Authorization
      },
      body: JSON.stringify({ user, review, movieId })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      document.getElementById("new_review").value = "";
      document.getElementById("new_user").value = "";
      returnMovie(Apilink, options); // refresh list
    });
  }
}

// Delete review
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
