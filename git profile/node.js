const input = document.getElementById("username");
const button = document.getElementById("searchBtn");
const profile = document.getElementById("profile");
const loading = document.getElementById("loading");

async function loadUser() {

    const username = input.value.trim();

    if (username === "") {
        profile.style.display = "block";
        profile.innerHTML = `
            <h2>Please enter a GitHub username.</h2>
        `;
        return;
    }

    loading.innerHTML = "🔄 Loading...";
    profile.style.display = "none";

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User Not Found");
        }

        const data = await response.json();

        loading.innerHTML = "";

        profile.style.display = "block";

        profile.innerHTML = `
            <div class="top">

                <img src="${data.avatar_url}" alt="${data.login}">

                <div class="info">

                    <h2>${data.name || data.login}</h2>

                    <p><strong>@${data.login}</strong></p>

                    ${
                        data.bio
                        ? `<p class="bio">${data.bio}</p>`
                        : ""
                    }

                    ${
                        data.location
                        ? `<p>📍 ${data.location}</p>`
                        : ""
                    }

                    ${
                        data.company
                        ? `<p>🏢 ${data.company}</p>`
                        : ""
                    }

                    ${
                        data.blog
                        ? `<p>🌐 <a href="${data.blog}" target="_blank">${data.blog}</a></p>`
                        : ""
                    }

                    <p>📅 Joined: ${new Date(data.created_at).toLocaleDateString()}</p>

                    <a class="github-btn"
                       href="${data.html_url}"
                       target="_blank">
                       Visit GitHub Profile
                    </a>

                </div>

            </div>

            <div class="stats">

                <div class="card">
                    <h2>${data.followers}</h2>
                    <p>Followers</p>
                </div>

                <div class="card">
                    <h2>${data.following}</h2>
                    <p>Following</p>
                </div>

                <div class="card">
                    <h2>${data.public_repos}</h2>
                    <p>Repositories</p>
                </div>

            </div>
        `;

    } catch (error) {

        loading.innerHTML = "";

        profile.style.display = "block";

        profile.innerHTML = `
            <h2>❌ User Not Found</h2>
            <p>Please enter a valid GitHub username.</p>
        `;
    }

}

button.addEventListener("click", loadUser);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadUser();
    }
});