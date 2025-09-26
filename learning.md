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

<!-- Multer
🗂 What is Multer?

Multer is a Node.js middleware for handling multipart/form-data.

multipart/form-data is the type of data used when uploading files through an HTML form.

Without Multer, your backend cannot understand file data — it will only read normal text fields from req.body.

⚡ How Multer Works Step by Step

Frontend sends a file

Example: You choose a photo in a form → click “Upload”.

The browser sends the file to your backend API as multipart/form-data.

Multer catches the file

In your backend, Multer runs before your route’s main function.

It looks at the incoming request, finds the file, and processes it.

Multer stores the file (2 ways):

Disk Storage (default) → saves file in your server (like /uploads/ folder).

Memory Storage → keeps the file in memory as a Buffer (useful if you want to send it to Cloudinary, AWS S3, etc.).

Access file details

After processing, Multer adds file info to the request object.

You can get it as req.file (for one file) or req.files (for multiple files).

Example:

{
  "fieldname": "profilePic",
  "originalname": "me.jpg",
  "encoding": "7bit",
  "mimetype": "image/jpeg",
  "destination": "uploads/",
  "filename": "12345-me.jpg",
  "path": "uploads/12345-me.jpg",
  "size": 102400
}


Use it in your app

You can now store the file path or name in your database.

Later, you can fetch and show it in your frontend.

import multer from "multer";

let storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./Public")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

let upload = multer({ storage });   // ✅ small fix (should be { storage })

export default upload;
🔎 Explanation
1. multer.diskStorage({ ... })
This tells Multer how and where to save files on your computer/server.

It has two functions:

destination → Where to store the file.

filename → What name to give the file.

2. destination: (req, file, cd) => { ... }
req → the request object (from frontend).

file → the uploaded file’s info (like name, type, size).

cd (actually should be cb) → a callback function to tell Multer where to save.

👉 In your code:

js
Copy code
cd(null, "./Public")
This means: Save all uploaded files inside the ./Public folder.

3. filename: (req, file, cb) => { ... }
This decides the name of the file when saving it.

file.originalname → the original name of the uploaded file (like photo.jpg).

👉 In your code:

js
Copy code
cb(null, file.originalname)
This means: Save the file with the same name as it was uploaded.
(So if user uploads resume.pdf, it stays as resume.pdf in ./Public).

⚠️ Note: If two users upload a file with the same name, it will overwrite!
Usually, we add something unique like Date.now() to avoid overwriting.

4. let upload = multer({ storage })
This creates the actual upload middleware.

You’ll use it in routes like this:

js
Copy code
app.post("/upload", upload.single("myFile"), (req, res) => {
  res.send("File uploaded!");
});
upload.single("myFile") → upload one file from input field with name myFile.

upload.array("myFiles", 5) → upload multiple files (max 5).

✅ Corrected Version (with unique filename)
js
Copy code
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public"); // save files in Public folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique name
  }
});

let upload = multer({ storage });

export default upload;
🔑 Summary
multer.diskStorage() → defines where & how files are saved.

destination → folder path.

filename → file name rule.

upload → middleware you use in routes.

 -->


<!-- 🗂 What is fs?


fs stands for File System.

It is a built-in module in Node.js (you don’t need to install it).

It allows your Node.js program to interact with files and folders on your computer/server.

Think of it like the "file manager" inside Node.js.

⚡ What can fs do?

Some common tasks:

Read files → Open and get the content of a file.

Write files → Create a new file or replace content inside a file.

Append files → Add new content to the end of an existing file.

Delete files → Remove unwanted files.

Manage folders → Create, read, or delete directories (folders).

✅ Why do we need fs?

Because when building apps, you often need to work with files.

👉 Examples in real life:

📂 A blogging app saves blog content to a .txt or .json file.

📸 When someone uploads a photo, your backend saves it temporarily on the server (using fs).

🗑 After uploading that photo to Cloudinary, you may want to delete the local copy to save storage (fs.unlink).

📝 Logging: You might store error logs in a logs.txt file using fs.

📝 Tiny Example
import fs from "fs";

// write a file
fs.writeFileSync("hello.txt", "Hi Ashutosh!");

// read a file
let data = fs.readFileSync("hello.txt", "utf8");
console.log(data);  // Output: Hi Ashutosh!

// delete a file
fs.unlinkSync("hello.txt");

🔑 In short:

fs = File System module in Node.js.

Needed whenever your app has to read, write, or delete files/folders.

Super useful with things like Multer + Cloudinary, logging, or config management. -->



<!-- 

In **React**, `location` usually comes from **React Router** when you use the hook:

```jsx
import { useLocation } from "react-router-dom";

function MyComponent() {
  let location = useLocation();
  console.log(location);

  return <div>Current path: {location.pathname}</div>;
}
```

### 🔹 What is `location`?

`location` is an object that gives you details about the current URL in your React app.

### 🔹 Properties of `location`

* **`pathname`** → The path of the URL (e.g., `/home`, `/about`)
* **`search`** → The query string (e.g., `?id=10&name=ashu`)
* **`hash`** → The URL fragment after `#` (e.g., `#section1`)
* **`state`** → Data passed when navigating (optional, when using `<Link>` or `navigate`)
* **`key`** → A unique key for that navigation entry

### Example:

If the URL is:

```
http://localhost:3000/profile?id=10#details
```

Then `location` will look like:

```js
{
  pathname: "/profile",
  search: "?id=10",
  hash: "#details",
  state: null,
  key: "abc123"
}
```

👉 In short:
`location` tells you **where you are right now in your React Router app**.

---

Do you want me to also explain **the difference between `location`, `history`, and `params`** in React Router? -->
