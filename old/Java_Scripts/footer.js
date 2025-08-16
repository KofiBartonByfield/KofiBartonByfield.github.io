document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("footer-placeholder").innerHTML = `
        <footer>
            <p>&copy; 2025 Kofi Barton-Byfield.</p>
            <p>
                | 
                <a href="Suggestions.html">Suggestions</a> 
                | 
                <a href="#" id="copy-email">kbartonbyfield@gmail.com</a>
                |
            </p>
            <input type="text" value="kbartonbyfield@gmail.com" id="emailInput" style="position:absolute; left:-9999px;">
        </footer>
    `;

    // Add event listener for copy functionality
    document.getElementById("copy-email").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the link from navigating
        copyEmail();
    });
});

// Copy to clipboard function
function copyEmail() {
    var copyText = document.getElementById("emailInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Mobile compatibility

    // Copy text to clipboard
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("Email copied to clipboard: " + copyText.value);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}
