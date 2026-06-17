document
.getElementById("registerForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const email =
    document.getElementById("email").value;

    const userName =
    document.getElementById("userName").value;

    const fullName =
    document.getElementById("fullName").value;

    const password =
    document.getElementById("password").value;

    await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
     
                email,
                password,
                userName,
                fullName
            })
        }
    );

    window.location.href =
    "./login.html";

});