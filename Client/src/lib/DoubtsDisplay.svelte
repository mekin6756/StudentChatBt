<script lang="ts">
    import { onMount } from "svelte";
    import type { Doubt } from "../types";
    import DoubtComponent from "./DoubtComponent.svelte";

    let doubts: Doubt[] | null = null;

    onMount(() => {
        fetch("/api/doubts")
            .then((x) => x.json())
            .then((jdata) => {
                doubts = jdata.doubts;
            });
    });
</script>

<div class="doubts-list">
    <h1>Doubts</h1>
    <table>
        <thead>
            <th style="width: 2em;">#</th>
            <th>Title</th>
            <th style="width: 10em;">Date</th>
            <th style="width: 10em;">Status</th>
        </thead>
        <tbody>
            {#if doubts !== null}
                {#each doubts as doubt, i}
                    <tr>
                        <td style="text-align:center">{i + 1}</td>
                        <td>
                            <DoubtComponent bind:doubt />
                        </td>
                        <td style="text-align:center">
                            {new Date(doubt.date).toLocaleDateString()}
                        </td>
                        <td style="text-align:center">
                            {doubt.status === "pending" ? "Pending" : "Resolved"}
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
    .doubts-list {
        width: 100%;
    }
    .doubts-list h1 {
        text-align: center;
    }
    .doubts-list table {
        width: 100%;
    }
    .doubts-list th,
    tr,
    td {
        height: 3em;
    }
    .doubts-list thead {
        background-color: #ccc;
    }
    .doubts-list th {
        font-size: 1rem;
    }
    .doubts-list tr:nth-child(odd) {
        background-color: #dddddd;
    }
    .doubts-list tr:nth-child(even) {
        background-color: #dfdfdf;
    }
    .doubts-list tr:hover {
        background-color: #cdcdcd;
        cursor: pointer;
    }
</style>
