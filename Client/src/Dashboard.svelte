<script lang="ts">
    import "./css/Dashboard.css";
    import ChatBox from "./lib/ChatBox.svelte";
    import HomeBox from "./lib/HomeBox.svelte";

    let studentData = {
        idNo: "Loading",
        name: "loading",
        branch: "loading",
        email: "loading",
        batch: "loading",
        type: "none" as "student" | "faculty" | "admin" | "counsellor" | "none",
    };

    fetch("/api/info")
        .then((res) => res.json())
        .then((jdata) => {
            studentData = jdata;
            if (studentData.type === "student") activeTab = "chatbot";
        });

    let activeTab: "home" | "chatbot" = "home";
</script>

<div class="layout">
    <a class="header" href="#0">
        <i class="fa fa-bars"></i>

        <div class="header-user">
            <i class="fas fa-user-circle icon"> </i>Hello {studentData.name}
        </div>
    </a>

    <div class="sidebar">
        <ul>
            <li>
                <div class="stuinfo">
                    Name: {studentData.name}<br />ID: {studentData.idNo}<br />Branch: {studentData.branch}
                    {studentData.batch}
                </div>
            </li>
            <li>
                {#if studentData.type === "student"}
                    <a class="sidebar-list-item disabled" href="#0"> <i class="fas fa-home icon"></i><em>Home</em></a>
                {:else}
                    <a class="sidebar-list-item {activeTab === 'home' ? 'active' : ''}" on:click={() => (activeTab = "home")} href="#0">
                        <i class="fas fa-home icon"></i><em>Home</em></a
                    >
                {/if}
            </li>
            <li>
                <a class="sidebar-list-item disabled" href="#0"> <i class="fas fa-user icon"></i><em>Profile</em></a>
            </li>

            <li>
                <a class="sidebar-list-item {activeTab === 'chatbot' ? 'active' : ''}" on:click={() => (activeTab = "chatbot")} href="#0">
                    <i class="fas fa-calendar icon"></i><em>Chatbot</em></a
                >
            </li>

            <li>
                <a class="sidebar-list-item disabled" href="#0"> <i class="fas fa-user icon"></i><em>About Us</em></a>
            </li>

            <li>
                <a class="sidebar-list-item" on:click={() => (window.location.href = "/login")}> <i class="fas fa-toolbox icon"></i><em>Log Out</em></a>
            </li>
        </ul>
    </div>
    <div></div>
    <div class="content">
        {#if activeTab === "home"}
            <HomeBox viewType={studentData.type} />
        {/if}
        {#if activeTab === "chatbot"}
            <ChatBox />
        {/if}
    </div>
    <div class="bg"></div>
</div>

<style></style>
