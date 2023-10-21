// Initialize reviews array with data from local storage or an empty array if no data is available
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Function to save reviews to local storage
function saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
} 

// Function to add a review
function addReview(name, review) {
    const reviewItem = {
        name: name,
        review: review
    };
    reviews.push(reviewItem);
    displayReviews();
}

// new
// Load and display reviews when the page loads
window.addEventListener('load', () => {
    displayReviews();
});
// un-comment to clear local storage
// localStorage.clear();

// Function to display reviews
function displayReviews() {
    const reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = "";

    reviews.forEach((review, index) => {
        const randomImageNumber = Math.floor(Math.random() * 3) + 1;
        const card = document.createElement("div");
        card.classList.add("col-md-6", "mb-3");

        card.innerHTML = `
            <div class="card border border-4 border-warning">                
                <img src="/assets/images/${randomImageNumber}.jpg" class="card-img-top" alt="User Image">
                <div class="card-body">
                    <h5 class="card-title">${review.name}</h5>
                    <p class="card-text">${review.review}</p>
                </div>
            </div>
        `;

        reviewList.appendChild(card);
    });
}

// Submit review form
const reviewForm = document.getElementById("reviewForm");
reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const review = document.getElementById("review").value;

    addReview(name, review);
     // Save the reviews to local storage
     saveReviews();

    // Reset the form
    reviewForm.reset();
});
