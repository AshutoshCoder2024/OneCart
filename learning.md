<!-- npm install axios
why:

Axios  is a popular HTTP client library for JavaScript.
🔹 Why do we use axios?

To make API calls (send requests to a server and get responses).
Works in both browser and Node.js.
Easier and cleaner than the built-in fetch().
Supports GET, POST, PUT, DELETE etc.
Handles JSON data automatically.
Has built-in error handling.
Allows us to set headers, tokens (like JWT), and timeouts easily.
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    console.log(response.data); // data from API
  })
  .catch(error => {
    console.error(error);
  }); -->

<!-- cors
CORS (Cross-Origin Resource Sharing) is a security feature built into browsers.
It controls whether a web page can request data from another domain (different server).

For example:

Your frontend → http://localhost:3000
Your backend API → http://localhost:5000
By default, browsers block such requests (for security reasons).

🔹 Why we use CORS?

We enable CORS so that our frontend (React, Angular, etc.) can talk to backend (Node.js, Express, etc.). -->


