<script lang="ts">
    import { onMount } from "svelte";
    import type { GeneralForm } from "../types";
    import GeneralFormComponent from "./GeneralFormComponent.svelte";

    let forms: GeneralForm[] | null = null;

    onMount(() => {
        fetch("/api/otherforms")
            .then((x) => x.json())
            .then((jdata) => {
                forms = jdata.forms;
            });
    });
</script>

<div class="gforms-list">
    <h1>Submitted Forms</h1>
    <table>
        <thead>
            <th style="width: 2em;">#</th>
            <th>Title</th>
        </thead>
        <tbody>
            {#if forms !== null}
                {#each forms as form, i}
                    <tr>
                        <td style="text-align:center">{i + 1}</td>
                        <td>
                            <GeneralFormComponent {form} />
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
    .gforms-list {
        width: 100%;
    }
    .gforms-list h1 {
        text-align: center;
    }
    .gforms-list table {
        width: 100%;
    }
    .gforms-list th,
    tr,
    td {
        height: 3em;
    }
    .gforms-list thead {
        background-color: #ccc;
    }
    .gforms-list th {
        font-size: 1rem;
    }
    .gforms-list tr:nth-child(odd) {
        background-color: #dddddd;
    }
    .gforms-list tr:nth-child(even) {
        background-color: #dfdfdf;
    }
    .gforms-list tr:hover {
        background-color: #cdcdcd;
        cursor: pointer;
    }
</style>
