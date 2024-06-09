<script lang="ts">
    import { onMount } from "svelte";
    let feedbacks: Record<string, Record<string, Record<string, number> | string[]>> | null = null;
    let selectedSubject: string | null = null;

    onMount(async () => {
        let resp = await fetch("/api/feedbacks");
        let json = await resp.json();
        feedbacks = json.feedbacks;
    });
</script>

<div class="feedback-display">
    <h1>Feedbacks</h1>
    <div class="feedbacks-selector">
        <label for="feedback-subject">Subject</label>
        <select id="feedback-subject" bind:value={selectedSubject}>
            {#if feedbacks !== null}
                {#each Object.keys(feedbacks) as subject}
                    <option value={subject}>{subject}</option>
                {/each}
            {/if}
        </select>
    </div>
    <div class="feedback-container">
        {#if feedbacks !== null && selectedSubject !== null}
            {#each Object.keys(feedbacks[selectedSubject]).filter((x) => x !== "otherinputs") as feedbackQuestion}
                <div class="feedback-question">
                    <h2>{feedbackQuestion}</h2>
                    <div class="feedback-answers">
                        {#each Object.keys(feedbacks[selectedSubject][feedbackQuestion]) as feedbackAnswer}
                            <p>
                                <label>{feedbackAnswer}</label>
                                <progress value={parseFloat(feedbacks[selectedSubject][feedbackQuestion][feedbackAnswer])}> </progress>
                                {parseFloat(feedbacks[selectedSubject][feedbackQuestion][feedbackAnswer]).toFixed(2) * 100}%
                            </p>
                        {/each}
                    </div>
                </div>
            {/each}
            <div class="feedback-others">
                <h2>Other Inputs</h2>
                <ul>
                    {#each feedbacks[selectedSubject]["otherinputs"] as otherInput}
                        <li>{otherInput}</li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>

<style>
    * {
        font-size: 1.2rem;
    }
    .feedback-display {
        width: 100%;
    }
    .feedback-display h1 {
        text-align: center;
    }
    .feedbacks-selector select {
        width: 10em;
        margin-left: 1.5em;
    }
    .feedbacks-selector {
        margin-top: 1em;
    }
    .feedback-question {
        padding: 1em;
    }
    .feedback-answers p label {
        width: 15em;
        margin-left: 1em;
        display: inline-block;
    }
    .feedback-answers,
    .feedback-others {
        margin-top: 1em;
    }
    .feedback-others {
        margin-left: 1em;
    }
    .feedback-others ul {
        margin-left: 1em;
    }
</style>
