const isLocal = window.location.hostname === "localhost";  //this line checks if the application is running in a local development environment by comparing the current hostname to "localhost". If the hostname matches "localhost", it sets the isLocal variable to true, indicating that the application is running locally. This variable can then be used to determine which backend URL to use for API requests, allowing for seamless switching between local and production environments without manual code changes.

const BASE_URL = isLocal
  ? "http://localhost:3001"
  : "https://veyora-backend-1.onrender.com";

export default BASE_URL;