// Initialize reviews array with data from local storage or an empty array if no data is available
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
// Function to save reviews to local storage
function saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}    

let enterButton = document.getElementsByClassName('submit');
enterButton[0].addEventListener('click', submitReview);

function submitReview() {
    // Get user inputs
    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;

    if (name && reviewText) {
        // Create a new review object
        const review = { name, reviewText };

        // Add the review to the array
        reviews.push(review);

        // new
          // Save the reviews to local storage
          saveReviews();

        // Clear the input fields
        document.getElementById('name').value = '';
        document.getElementById('review').value = '';

        // Display the reviews
        displayReviews();
    } else {
        alert('Please fill out both fields before submitting a review.');
    }
}
// new
// Load and display reviews when the page loads
window.addEventListener('load', () => {
    displayReviews();
});

function displayReviews() {
    const reviewsContainer = document.querySelector('.reviews');
    reviewsContainer.innerHTML = '';

    // Loop through the reviews and display them
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `<strong>${review.name}:</strong><br>${review.reviewText}`;
        reviewsContainer.appendChild(reviewElement);
    });
}