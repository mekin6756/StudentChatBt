<script lang="ts">
    import { onMount } from "svelte";
    import type { Complaint } from "../types";
    import ComplaintFormComponent from "./ComplaintFormComponent.svelte";

    let forms: Complaint[] | null = null;

    onMount(() => {
        fetch("/api/complaints")
            .then((x) => x.json())
            .then((jdata) => {
                forms = jdata.forms;
            });
    });
</script>

<div class="complaints-list">
    <h1>Complaints</h1>
    <table>
        <thead>
            <th style="width: 2em;">#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
        </thead>
        <tbody>
            {#if forms !== null}
                {#each forms as complaint, i}
                    <tr>
                        <td style="text-align:center">{i + 1}</td>
                        <td>
                            <ComplaintFormComponent {complaint} />
                        </td>
                        <td style="text-align:center">
                            {complaint.category}
                        </td>
                        <td style="text-align:center">
                            {new Date(complaint.date).toLocaleDateString()}
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
    .complaints-list {
        width: 100%;
    }
    .complaints-list h1 {
        text-align: center;
    }
    .complaints-list table {
        width: 100%;
    }
    .complaints-list th,
    tr,
    td {
        height: 3em;
    }
    .complaints-list thead {
        background-color: #ccc;
    }
    .complaints-list th {
        font-size: 1rem;
    }
    .complaints-list tr:nth-child(odd) {
        background-color: #dddddd;
    }
    .complaints-list tr:nth-child(even) {
        background-color: #dfdfdf;
    }
    .complaints-list tr:hover {
        background-color: #cdcdcd;
        cursor: pointer;
    }
</style>
