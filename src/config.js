const isLocal = window.location.hostname === "localhost";

const BASE_URL = isLocal
  ? "http://localhost:3001"
  : "https://veyora-backend-1.onrender.com";

export default BASE_URL;