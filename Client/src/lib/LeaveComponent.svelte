<script lang="ts">
    import type { Leave } from "../types";
    import { slide } from "svelte/transition";

    export let leave: Leave;
    let expanded = false;

    const leaveTypeMap = new Map([
        ["sickleave", "Sick Leave"],
        ["personalleave", "Personal Leave"],
        ["academicleave", "Academic Leave"],
        ["specialcircumstanceleave", "Special Circumstance Leave"],
        ["extracurricularleave", "Extracurricular Activity Leave"],
    ]);

    function replyToLeave() {
        let anchor = document.createElement("a");
        anchor.href = `mailto:${leave.student.email}?subject=${encodeURIComponent(`Re: ${leave.type} Leave`)}`;
        anchor.click();
        anchor.remove();
    }

    async function setLeaveStatus(status: Leave["status"]) {
        leave.status = status;
        await fetch("/api/formstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: leave.id,
                type: "leave",
                status: leave.status,
            }),
        });
    }
</script>

<div class="leave">
    <div class="leave-title" on:click={() => (expanded = !expanded)}>
        <h3>{leaveTypeMap.get(leave.type)}</h3>
    </div>
    {#if expanded}
        <hr />
        <div in:slide out:slide class="leave-content">
            <table>
                <tr>
                    <td>From</td>
                    <td>{leave.student.name} from {leave.student.branch} branch, batch {leave.student.batch}</td>
                </tr>
                <tr>
                    <td>Start Date</td>
                    <td>{leave.startDate}</td>
                </tr>
                <tr>
                    <td>End Date</td>
                    <td>{leave.endDate}</td>
                </tr>
                <tr>
                    <td>Reason</td>
                    <td>{leave.description}</td>
                </tr>
            </table>
            <div class="leave-actions">
                <button on:click={() => replyToLeave()}>Reply</button>
                <button on:click={async () => await setLeaveStatus("approved")}>Approve</button>
                <button on:click={async () => await setLeaveStatus("rejected")}>Reject</button>
            </div>
        </div>
    {/if}
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .leave-content td:nth-child(1) {
        width: 5em;
        vertical-align: top;
    }
    .leave {
        padding: 1em;
    }
    .leave-content {
        margin-top: 2em;
    }
    .leave-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1em;
    }
    .leave-actions button {
        font-size: 0.9rem;
    }
</style>
