<script lang="ts">
    import type { GeneralForm } from "../types";
    import { slide } from "svelte/transition";

    export let form: GeneralForm;
    let expanded = false;

    function replyToForm() {
        let anchor = document.createElement("a");
        anchor.href = `mailto:${form.student.email}?subject=${encodeURIComponent(`Re: ${form.topic} Leave`)}`;
        anchor.click();
        anchor.remove();
    }
</script>

<div class="gform">
    <div class="gform-title" on:click={() => (expanded = !expanded)}>
        <h3>{form.topic}</h3>
    </div>
    {#if expanded}
        <hr />
        <div in:slide out:slide class="gform-content">
            <table>
                <tr>
                    <td>From</td>
                    <td>{form.student.name} from {form.student.branch} branch, batch {form.student.batch}</td>
                </tr>
                <tr>
                    <td>Topic</td>
                    <td>{form.topic}</td>
                </tr>
                <tr>
                    <td>Content</td>
                    <td>{form.description}</td>
                </tr>
            </table>
            <div class="gform-actions">
                <button on:click={() => replyToForm()}>Reply</button>
            </div>
        </div>
    {/if}
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .gform-content td:nth-child(1) {
        width: 5em;
        vertical-align: top;
    }
    .gform {
        padding: 1em;
    }
    .gform-content {
        margin-top: 2em;
    }
    .gform-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1em;
    }
    .gform-actions button {
        font-size: 0.9rem;
    }
</style>
