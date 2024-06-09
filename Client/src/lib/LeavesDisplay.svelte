<script lang="ts">
    import { onMount } from "svelte";
    import type { Leave } from "../types";
    import LeaveComponent from "./LeaveComponent.svelte";

    let leaves: Leave[] | null = null;

    onMount(() => {
        fetch("/api/leaves")
            .then((x) => x.json())
            .then((jdata) => {
                leaves = jdata.leaves;
            });
    });
</script>

<div class="leaves-list">
    <h1>Leave Applications</h1>
    <table>
        <thead>
            <th style="width: 2em;">#</th>
            <th>Title</th>
            <th style="width: 10em;">Date</th>
            <th style="width: 10em;">Status</th>
        </thead>
        <tbody>
            {#if leaves !== null}
                {#each leaves as leave, i}
                    <tr>
                        <td style="text-align:center">{i + 1}</td>
                        <td>
                            <LeaveComponent bind:leave />
                        </td>
                        <td style="text-align:center">
                            {new Date(leave.startDate).toLocaleDateString()}
                        </td>
                        <td style="text-align:center">
                            {leave.status === "pending" ? "Pending" : leave.status === "approved" ? "Approved" : "Rejected"}
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .leaves-list {
        width: 100%;
    }
    .leaves-list h1 {
        text-align: center;
    }
    .leaves-list table {
        width: 100%;
    }
    .leaves-list th,
    tr,
    td {
        height: 3em;
    }
    .leaves-list thead {
        background-color: #ccc;
    }
    .leaves-list th {
        font-size: 1rem;
    }
    .leaves-list tr:nth-child(odd) {
        background-color: #dddddd;
    }
    .leaves-list tr:nth-child(even) {
        background-color: #dfdfdf;
    }
    .leaves-list tr:hover {
        background-color: #cdcdcd;
        cursor: pointer;
    }
</style>
