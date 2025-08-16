document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("header-placeholder").innerHTML = `
        <header class="header-container">

            <a href="home.html" class="no-underline">
                <h1 class="title-text">
                    <span aria-label="Search" class='chess_logo'>
                        &#9816;
                    </span>
                    
                    Portfolio
                </h1>
            </a>

           
    
            <div class="LogoContainer">

                <a href="tools.html">
                    <div class="tools_title">
                        <i class="fa fa-wrench" aria-hidden="true"></i>
                    </div> 
                </a>

                <a href="https://www.linkedin.com/in/kofi-barton-byfield-b7b83a293/" target="_blank">
                    <div class="tools_title">
                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                    </div> 
                </a>

                <a href="https://github.com/KofiBartonByfield" target="_blank">
                    <div class="tools_title">
                        <i class="fa fa-github" aria-hidden="true"></i>
                    </div> 
                </a>
               
            </div>
        </header>
    `;
});



