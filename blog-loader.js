const repoOwner = "KofiBartonByfield";
const repoName = "KofiBartonByfield.github.io";
const folderPath = "blogs";

const blogTitle = document.getElementById("blog-title");
const blogDate = document.getElementById("blog-date");
const blogContent = document.getElementById("blog-content");
const prevBtn = document.getElementById("prev-blog");
const nextBtn = document.getElementById("next-blog");

let blogs = [];
let currentIndex = 0;

// Convert string into Title Case → e.g. "deep_learning_basics" → "Deep Learning Basics"
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
}

// Format date nicely → e.g. 05092025 → 5 Sep 2025
function formatDate(dd, mm, yyyy) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${parseInt(dd)} ${months[parseInt(mm) - 1]} ${yyyy}`;
}

// Fetch blog file list from GitHub API
async function fetchBlogs() {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
    const response = await fetch(url);
    const data = await response.json();

    // Get only .txt files and sort by date (newest first)
    blogs = data
        .filter(file => file.name.endsWith(".txt"))
        .sort((a, b) => {
            const dateA = a.name.match(/_(\d{2})(\d{2})(\d{4})/);
            const dateB = b.name.match(/_(\d{2})(\d{2})(\d{4})/);
            const dA = new Date(`${dateA[3]}-${dateA[2]}-${dateA[1]}`);
            const dB = new Date(`${dateB[3]}-${dateB[2]}-${dateB[1]}`);
            return dB - dA; // Newest first
        });

    displayBlog(currentIndex);
}

// Display a single blog
async function displayBlog(index) {
    if (blogs.length === 0) {
        blogTitle.textContent = "No blogs yet";
        blogDate.textContent = "";
        blogContent.textContent = "";
        return;
    }

    const blog = blogs[index];

    // Get raw content from GitHub
    const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${folderPath}/${blog.name}`;
    const response = await fetch(rawUrl);
    const content = await response.text();

    // Extract title & make it pretty
    const title = toTitleCase(
        blog.name
            .replace(/_\d{8}\.txt$/, "") // Remove _DDMMYYYY.txt
            .replace(/_/g, " ")          // Replace underscores with spaces
    );

    // Format date properly
    const dateMatch = blog.name.match(/_(\d{2})(\d{2})(\d{4})/);
    const date = formatDate(dateMatch[1], dateMatch[2], dateMatch[3]);

    // Update UI
    blogTitle.textContent = title;
    blogDate.textContent = `Published on ${date}`;
    blogContent.textContent = content;
}

// Button events
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + blogs.length) % blogs.length;
    displayBlog(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % blogs.length;
    displayBlog(currentIndex);
});

// Load blogs on start
fetchBlogs();
