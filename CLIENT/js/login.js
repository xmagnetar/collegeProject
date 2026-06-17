document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {
  
    e.preventDefault();

    const userName =
    document.getElementById("userName").value;

    const password =
    document.getElementById("password").value;

    try {

        const response = await fetch(
            `${API_BASE_URL}/auth/login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName,
                    password
                })
            }
        );

        console.log(response.status);

for (const [key, value] of response.headers.entries()) {
    console.log(key, value);
}
 
        const data = await response.json();

        console.log(data)

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

    window.location.href = "./dashboard.html";

    } catch (error) {

        console.error(error);
        alert("Something went wrong");

    }

});