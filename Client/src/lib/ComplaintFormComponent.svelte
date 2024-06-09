<script lang="ts">
    import type { Complaint } from "../types";
    import { slide } from "svelte/transition";

    export let complaint: Complaint;
    let expanded = false;

    const complaintTypeMap = new Map([
        ["academic", "Academic"],
        ["administrative", "Administrative"],
        ["facilities", "Facilities"],
        ["harassment", "Harassment"],
        ["financial", "Financial"],
        ["other", "Other"],
    ]);

    function replyToForm() {
        let anchor = document.createElement("a");
        anchor.href = `mailto:${complaint.student.email}?subject=${encodeURIComponent(`Re: ${complaint.title}`)}`;
        anchor.click();
        anchor.remove();
    }
</script>

<div class="complaint">
    <div class="complaint-title" on:click={() => (expanded = !expanded)}>
        <h3>{complaint.title}</h3>
    </div>
    {#if expanded}
        <hr />
        <div in:slide out:slide class="complaint-content">
            <table>
                <tr>
                    <td>From</td>
                    <td>{complaint.student.name} from {complaint.student.branch} branch, batch {complaint.student.batch}</td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>{complaint.title}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{complaintTypeMap.get(complaint.category)}</td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>{complaint.content}</td>
                </tr>
            </table>
            <div class="complaint-actions">
                <button on:click={() => replyToForm()}>Reply</button>
            </div>
        </div>
    {/if}
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .complaint-content td:nth-child(1) {
        width: 5em;
        vertical-align: top;
    }
    .complaint {
        padding: 1em;
    }
    .complaint-content {
        margin-top: 2em;
    }
    .complaint-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1em;
    }
    .complaint-actions button {
        font-size: 0.9rem;
    }
</style>
