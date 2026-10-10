// Posts live in blogs/ as Title_Words_DDMMYYYY.txt; blogs/posts.json lists them newest first.
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(name) {
    const [, title, dd, mm, yyyy] = name.match(/^(.+)_(\d{2})(\d{2})(\d{4})\.txt$/);
    return { name, title: title.replace(/_/g, " "), date: `${+dd} ${months[mm - 1]} ${yyyy}` };
}

const text = name => fetch(`blogs/${name}`).then(r => r.text());

async function load() {
    const names = await (await fetch("blogs/posts.json")).json();
    const latest = document.getElementById("latest-post");
    const list = document.getElementById("blog-list");

    if (latest) {
        const p = parse(names[0]);
        const body = await text(names[0]);
        latest.innerHTML = `<h3>${p.title}</h3><p class="blog-date">${p.date}</p><p></p>
            <a class="text-link" href="blogs.html">Read all posts &rarr;</a>`;
        latest.querySelector("p:not(.blog-date)").textContent = body.split("\n\n")[0];
    }

    if (list) {
        list.textContent = "";
        for (const name of names) {
            const p = parse(name);
            const article = document.createElement("article");
            article.className = "post";
            article.innerHTML = `<h3>${p.title}</h3><p class="blog-date">${p.date}</p><div class="post-body"></div>`;
            article.querySelector(".post-body").innerText = await text(name);
            list.append(article);
        }
    }
}

load().catch(() => {
    document.querySelectorAll("#latest-post, #blog-list").forEach(el => el.textContent = "Posts could not be loaded.");
});
