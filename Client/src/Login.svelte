<script lang="ts">
    import studentImage from "./assets/student.png";
    import facultyImage from "./assets/teacher.png";
    let isSigningUp = false;

    let signUpName: string = "";
    let signUpId: string = "";
    let signUpPwd: string = "";
    let signUpBranch: string = "";
    let signUpBatch = "";
    let signUpEmail = "";
    let signUpContact = "";

    let focusField: string = "";

    const registerFn = () => {
        fetch("api/register", {
            body: JSON.stringify({
                name: signUpName,
                id: signUpId,
                password: signUpPwd,
                branch: signUpBranch,
                batch: signUpBatch,
                email: signUpEmail,
                contact: signUpContact,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.success) {
                        alert("User created successfully");
                    } else {
                        alert("User creation failed");
                    }
                });
            } else {
                alert("User creation failed");
            }
        });
    };

    const loginFn = () => {
        fetch("api/login", {
            body: JSON.stringify({
                id: signUpId,
                password: signUpPwd,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.success) {
                        localStorage.setItem("sessionToken", data.sessionToken);
                        window.location.href = "/dashboard";
                    } else {
                        alert("Invalid credentials");
                    }
                });
            }
        });
    };
    let activeSignIn: "faculty" | "student" | "guest" | "" = "";
</script>

<div class="login-container">
    <div class="header">
        <div class="inner_header">
            <div class="logo_container">
                <h1>STUDENT CHATBOT</h1>
            </div>
        </div>
    </div>
    <div class="form-div">
        <div class="form" style="margin-top: 95px;">
            <h2>Choose Your User</h2>
            <div class="users">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="user-box" on:click={() => (activeSignIn = "student")}>
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img id="student-logo" src={studentImage} alt="Student Image" />
                    <h3>STUDENTS</h3>

                    <div id="student-icon" class="selected-user" style={activeSignIn == "student" ? "opacity: 1; transform: none;" : "display: none;"}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 16 16"
                            color="#faf9f6"
                            height="40"
                            width="40"
                            xmlns="http://www.w3.org/2000/svg"
                            style="color: rgb(250, 249, 246);"
                        >
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                            >
                            </path>
                        </svg>
                    </div>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="user-box"
                    on:click={() => {
                        activeSignIn = "faculty";
                    }}
                >
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img src={facultyImage} alt="Faculty Image" />
                    <h3>FACULTY</h3>
                    <div id="faculty-icon" class="selected-user" style={activeSignIn == "faculty" ? "opacity: 1; transform: none;" : "display: none;"}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 16 16"
                            color="#faf9f6"
                            height="40"
                            width="40"
                            xmlns="http://www.w3.org/2000/svg"
                            style="color: rgb(250, 249, 246);"
                        >
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                            >
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            {#if activeSignIn !== ""}
                <h3 class="desc" id="userTypeDesc">
                    {#if activeSignIn === "student"}
                        Hello Students! Please login to get started
                    {/if}
                    {#if activeSignIn === "faculty"}
                        Hello Faculty! Please login to get started
                    {/if}
                </h3>

                <div class={focusField === "idno" ? "input-box focused" : "input-box"}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H4V8h16v12zm-6-5h-4v-1h4v1zm0-3h-4V9h4v3z" />
                    </svg>
                    <input type="text" required={true} bind:value={signUpId} on:focus={() => (focusField = "idno")} />
                    <span>
                        {#if signUpId === ""}
                            ID NO
                        {/if}
                    </span>
                </div>
                <div class={focusField === "password" ? "passInput-box focused" : "passInput-box"}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 1024 1024"
                        color="rgba(0, 0, 0, 0.75)"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: rgba(0, 0, 0, 0.75);"
                    >
                        <path
                            d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1 1 56 0zm152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224z"
                        >
                        </path>
                    </svg><input type="password" required={true} bind:value={signUpPwd} on:focus={() => (focusField = "password")} />
                    <span>
                        {#if signUpPwd === ""}
                            Password
                        {/if}
                    </span>
                </div>
            {/if}

            <div class=" links">
                {#if activeSignIn !== ""}
                    <div class="button-container">
                        <button class="btn" on:click={() => loginFn()}>Login</button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        line-height: normal;
        font-size: initial;
    }

    .login-container {
        background-image: linear-gradient(to bottom, #1e5db0, #6f9bd6);
        min-height: 100vh;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .login-container::-webkit-scrollbar {
        display: none;
    }

    a,
    button,
    div {
        -webkit-tap-highlight-color: transparent;
    }

    .nav-bar {
        align-items: center;
        background-color: #e1e1e1;
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        user-select: none;
        width: 100%;
        height: 3em;
    }

    .form,
    .form-div {
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .form-div {
        margin: 30vh 0;
    }
    .form {
        background-color: rgb(224, 221, 221);
        border-radius: 15px;
        flex-direction: column;
        padding: 15px;
        width: 400px;
    }

    h2 {
        margin-bottom: 25px;
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }
    .desc,
    .h2 {
        text-align: center;
    }
    .a,
    .button,
    div {
        -webkit-tap-highlight-color: transparent;
    }

    .users {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 30px;
    }

    .desc {
        margin-bottom: 40px;
        width: 80%;
    }

    .input-box {
        align-items: center;
        display: flex;
        margin-bottom: 20px;
        position: relative;
        width: 85%;
    }

    .passInput-box {
        align-items: center;
        border: rgb(39, 105, 192);
        display: flex;
        margin-bottom: 20px;
        position: relative;
        width: 85%;
    }
    .button-container,
    .links {
        align-items: center;
        display: flex;
        margin-bottom: 20px;
    }

    .btn {
        background: #1e5db0;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        color: white;
        margin-left: 10px;
        padding: 6px 26px;
    }

    .user-box {
        align-items: center;
        background-image: linear-gradient(180deg, #1e5db0, #4782e1);
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0px 14px;
        padding: 15px 30px;
        position: relative;
        user-select: none;
        width: 160px;
    }

    .selected-user {
        bottom: 2px;
        right: 2px;
        position: absolute;
    }

    .input-box input,
    .input-box span {
        font-size: 18px;
        padding: 10px;
        transition: 0.2s;
    }

    .input-box input {
        background-color: rgb(251, 251, 251);
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 5px;

        outline: none;
        width: 100%;
    }

    .passInput-box input,
    .passInput-box span {
        font-size: 18px;
        padding: 10px;
        transition: 0.2s;
    }
    .passInput-box input {
        background: #faf9f6;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-bottom-left-radius: 5px;
        border-right: none;
        border-top-left-radius: 5px;
        margin-left: 3px;
        outline: none;
        width: 100%;
    }
    .pass-icon {
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-bottom-right-radius: 5px;
        border-left: none;
        border-top-right-radius: 5px;
        color: rgba(0, 0, 0, 0.75);
        display: grid;
        font-size: 22px;
        padding: 12.8px;
        place-items: center;
        transition: 0.2s;
    }
    .pass-icon svg {
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
    }

    .input-box span {
        color: rgba(0, 0, 0, 0.75);
        left: 15px;
        pointer-events: none;
        position: absolute;
        top: 0;
    }

    .passInput-box span {
        color: rgba(0, 0, 0, 0.75);
        left: 15px;
        pointer-events: none;
        position: absolute;
        top: 0;
    }

    .button-container,
    .links {
        align-items: center;
        display: flex;
        margin-bottom: 20px;
    }

    .links {
        flex-direction: column;
        width: 85%;
    }

    .user-box img {
        width: 80px;
        height: auto;
        margin-bottom: 10px;
    }

    .input-box,
    .passInput-box {
        position: relative;
        margin-bottom: 20px;
    }

    .input-box input[type="text"],
    .passInput-box input[type="password"] {
        width: calc(100% - 10px);
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        padding-left: 30px;
        outline: none;
    }

    .input-box input[type="text"]:focus,
    .passInput-box input[type="password"]:focus {
        border-bottom-color: #007bff;
    }

    .input-box span,
    .passInput-box span {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #777;
        pointer-events: none;
        transition:
            top 0.3s,
            font-size 0.3s;
    }

    .input-box.focused span,
    .passInput-box.focused span {
        top: 5px;
        font-size: 12px;
        color: #007bff;
    }

    .passInput-box input[type="password"] {
        padding-left: 30px;
    }

    .passInput-box span {
        left: 10px;
    }

    .header {
        width: 100%;
        height: 80px;
        display: block;
        background-color: rgb(14, 125, 236);
    }
    .inner_header {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .logo_container {
        height: 100%;
        display: table;
    }

    .logo_container h1 {
        color: white;
        font-family: monospace;
        font-size: 32px;
        margin-top: 20px;
    }

    .logo_container h1,
    #hea-text {
        font-weight: 800;
    }

    .logo_container:hover h1 {
        color: #c5eeee;
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
</style>
