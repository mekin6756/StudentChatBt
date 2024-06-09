<script lang="ts">
    import { json } from "stream/consumers";
    import type { Doubt } from "../types";
    import { slide } from "svelte/transition";

    export let doubt: Doubt;
    let expanded = false;

    async function markAsButton() {
        if (doubt.status === "pending") {
            await fetch("/api/formstatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: doubt.id,
                    type: "doubt",
                    status: "resolved",
                }),
            });
            doubt.status = "resolved";
            return;
        }
        if (doubt.status === "resolved") {
            await fetch("/api/formstatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: doubt.id,
                    type: "doubt",
                    status: "pending",
                }),
            });
            doubt.status = "pending";
            return;
        }
    }

    function replyToDoubt() {
        let anchor = document.createElement("a");
        anchor.href = `mailto:${doubt.student.email}?subject=${encodeURIComponent("Re: " + doubt.topic)}`;
        anchor.click();
        anchor.remove();
    }
</script>

<div class="doubt">
    <div class="doubt-title" on:click={() => (expanded = !expanded)}>
        <h3>{doubt.topic}</h3>
    </div>
    {#if expanded}
        <hr />
        <div in:slide out:slide class="doubt-content">
            <table>
                <tr>
                    <td>From</td>
                    <td>{doubt.student.name} from {doubt.student.branch} branch in Semester {doubt.semester}, batch {doubt.student.batch}</td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>{doubt.subject.subjectCode} - {doubt.subject.subjectTitle}</td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>{doubt.content}</td>
                </tr>
            </table>
            <div class="doubts-actions">
                <button on:click={() => replyToDoubt()}>Reply</button>
                <button on:click={async () => await markAsButton()}>Mark as {doubt.status === "pending" ? "resolved" : "pending"}</button>
            </div>
        </div>
    {/if}
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .doubt-content td:nth-child(1) {
        width: 5em;
        vertical-align: top;
    }
    .doubt {
        padding: 1em;
    }
    .doubt-content {
        margin-top: 2em;
    }
    .doubts-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1em;
    }
    .doubts-actions button {
        font-size: 0.9rem;
    }
</style>
