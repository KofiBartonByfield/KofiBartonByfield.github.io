const imageData = [
    {
        src: '../Images/Project Preview/kmeans.png',
        title: 'Negative Binomial Analysis of Terrorist Attack Lethality in Europe',
        description: 'Analysis of factors influencing the lethality of terrorist attacks in Europe using data from the Global Terrorism Database and statistical modelling.',
        link: 'european_terror.html'
    },
    {
        src: '../Images/Project Preview/kmeans.png',
        title: 'K-Means Clustering on Airbnb Listings',
        description: 'This project applies K-Means clustering to Airbnb listings in Hawaii, uncovering patterns and segmenting properties based on features like price, location, and availability to gain insights into the rental market.',
        link: 'k_means.html'
    },
    {
        src: '../Images/Project Preview/descision_tree.png',
        title: 'Comparing Machine Learning Models',
        description: 'A machine learning project comparing classification models for handwritten digit recognition, evaluating performance using scikit-learn and cross-validation',
        link: 'digits_classifier.html'
    },
    {
        src: '../Images/Project Preview/Data blog on HIV.png',
        title: 'Data Driven Blog on HIV',
        description: 'A data driven blog post analysing data trends of HIV prevalence and AIDS occurrence in Sub-Saharan Africa, completed using web scraping through Python',
        link: 'Data_Blog_on_HIV.html'
    },
    {
        src: '../Images/Project Preview/Employee Retention Analytics.png',
        title: 'Employee Retention Analytics',
        description: 'A comprehensive analysis of employee retention strategies utilising R, data analytics, and LaTeX for documentation.',
        link: 'business_analytic_exe.html'
    },
    {
        src: '../Images/Project Preview/SIR.png',
        title: 'SIR Model in MATLAB',
        description: 'Modelling infectious diseases using the SIR model in MATLAB, demonstrating the impact of various parameters.',
        link: 'CDN_Exeter.html'
    },
    {
        src: '../Images/Project Preview/Graphs.png',
        title: 'Ontology Report',
        description: 'A detailed report on ontological structures created using Mathematica and documented in LaTeX.',
        link: 'Graphs_cw.html'
    },
    {
        src: '../Images/Project Preview/Exeter Dissertation.png',
        title: 'Exeter University Dissertation',
        description: 'An academic dissertation completed at Exeter University, investigating: "Improving feedback for student proofs with Lean and AI"',
        link: 'Exeter_Diss.html'
    },
    {
        src: '../Images/Project Preview/chaos.png',
        title: 'Chaos in a controlled population model',
        description: 'Exploring chaotic dynamics in a predator-prey population model using bifurcation diagrams and Lyapunov exponents, using MATLAB. ',
        link: 'CDN_Exeter_2.html'
    },
    {
        src: '../Images/Project Preview/No Image.png',
        title: 'More Content coming soon!',
        description: 'Description tbc...',
        link: 'home.html'
    },
];

let currentPage = 0;
let imagesPerPage = 6; // Default value

// Function to adjust the number of images per page based on screen width
function adjustImagesPerPage() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 400) {
        imagesPerPage = 1; // For very small screens
    } else if (screenWidth <= 600) {
        imagesPerPage = 2; // For smaller screens
    } else if (screenWidth <= 900) {
        imagesPerPage = 4; // For smaller screens
    } else {
        imagesPerPage = 6; // For larger screens
    }
}

// Function to render the images
function renderImages() {
    adjustImagesPerPage(); // Adjust the number of images per page based on the screen size

    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = ''; // Clear previous images

    const start = currentPage * imagesPerPage;
    const end = start + imagesPerPage;
    const currentImages = imageData.slice(start, end);

    currentImages.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        // Create the clickable link
        const linkElement = document.createElement('a');
        linkElement.href = image.link;

        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;

        // Create title and description
        const titleElement = document.createElement('h3');
        titleElement.textContent = image.title;

        const descElement = document.createElement('p');
        descElement.textContent = image.description;

        // Append image, title, and description to the link
        linkElement.appendChild(imgElement);
        linkElement.appendChild(titleElement);
        linkElement.appendChild(descElement);

        // Append the clickable link to the image item
        imageItem.appendChild(linkElement);

        // Append the image item to the grid
        imageGrid.appendChild(imageItem);
    });

    updateButtons();
}

// Function to update the buttons (previous/next)
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = (currentPage + 1) * imagesPerPage >= imageData.length;
}

// Function to show the next page of images
function showNextPage() {
    currentPage++;
    renderImages();
}

// Function to show the previous page of images
function showPrevPage() {
    currentPage--;
    renderImages();
}

// Adjust images per page and render initially
window.addEventListener('resize', renderImages);
renderImages();
