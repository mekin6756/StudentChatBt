<script lang="ts">
    import ComplaintFormDisplay from "./ComplaintFormDisplay.svelte";
    import DoubtsDisplay from "./DoubtsDisplay.svelte";
    import FeedbackDisplay from "./FeedbackDisplay.svelte";
    import GeneralFormDisplay from "./GeneralFormDisplay.svelte";
    import LeavesDisplay from "./LeavesDisplay.svelte";

    let state: "menu" | "forms" | "attendances" | "doubts" | "feedbacks" | "leaves" | "complaints" = "menu";
    export let viewType: "student" | "faculty" | "admin" | "counsellor" | "none";
</script>

<div class="home-container">
    <div class="home-title">
        <h1>Home</h1>
    </div>
    <div class="home-body">
        {#if state !== "menu"}
            <div class="breadcrumb">
                <button on:click={() => (state = "menu")}>Back</button>
            </div>
        {/if}
        {#if state === "menu"}
            {#if viewType === "counsellor"}
                <div class="home-btn forms-btn" on:click={() => (state = "forms")}>Forms</div>
                <div class="home-btn leaves-btn" on:click={() => (state = "leaves")}>Leaves</div>
                <div class="home-btn complaints-btn" on:click={() => (state = "complaints")}>Complaints</div>
            {/if}

            {#if viewType === "faculty" || viewType === "counsellor"}
                <div class="home-btn doubts-btn" on:click={() => (state = "doubts")}>Doubts</div>
                <div class="home-btn feedbacks-btn" on:click={() => (state = "feedbacks")}>Feedbacks</div>
            {/if}
        {/if}
        {#if state === "doubts"}
            <DoubtsDisplay />
        {/if}
        {#if state === "feedbacks"}
            <FeedbackDisplay />
        {/if}
        {#if state === "leaves"}
            <LeavesDisplay />
        {/if}
        {#if state === "forms"}
            <GeneralFormDisplay />
        {/if}
        {#if state === "complaints"}
            <ComplaintFormDisplay />
        {/if}
    </div>
</div>

<style>
    .breadcrumb button {
        position: absolute;
        top: 3.95em;
    }
    .home-container {
        position: absolute;
        top: 4em;
        left: 20em;
        right: 1em;
        bottom: 1em;
        z-index: 2;
        overflow: hidden;
        box-shadow: 0 0 20px #0000001a;
        background-color: var(--background-color);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        margin: 2%;
    }

    .home-title {
        position: relative;
        z-index: 2;
        background-color: var(--primary-color);
        color: #fff;
        text-transform: uppercase;
        text-align: left;
        padding: 10px;
    }

    .home-title h1 {
        font-weight: 400;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .home-body {
        padding: 2em;
        display: flex;
        flex-direction: row;
        gap: 25px;
        overflow-y: auto;
    }

    .home-btn {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        height: 80px;
        display: flex;
        cursor: default;
        position: relative;
        overflow: hidden;
        margin-bottom: 30px;
        width: 400px;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 23px;
        line-height: 80px;
    }

    .home-btn:hover {
        background: #f7f7f7;
        border-color: #e6e6e6;
    }
</style>
