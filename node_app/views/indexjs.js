document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherDetails();
});

function fetchWeatherDetails() {
    // Example endpoint - adjust according to your server setup
    const weatherId = 'your_weather_id'; // Set this dynamically as needed
    fetch(`/weather/${weatherId}`) // Adjust this endpoint to where you're serving weather data
        .then(response => response.json())
        .then(data => {
            // Assuming the response includes a 'weatherImageUrl' field
            document.getElementById('weatherImage').src = data.weatherImageUrl;
            // Plus, any additional logic to display weather details
        })
        .catch(error => console.error('Error fetching weather details:', error));
}


document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Implement comment submission logic here
    console.log('Comment submitted:', document.getElementById('commentBox').value);
    // Reset the comment box after submission
    document.getElementById('commentBox').value = '';
});
