<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Typewriter from "svelte-typewriter";
    import { concurrent } from "svelte-typewriter";
    import type { FormDefinition } from "../form";
    import type { Schedule } from "../schedule";
    import ChatScheduleTable from "./ChatScheduleTable.svelte";
    export let author: "user" | "bot";
    export let last = false;
    let animated = false;

    const dispatch = createEventDispatcher();
    export let interval = 30;
    export let schedule: Schedule | null = null;
</script>

{#if author === "bot" && last}
    <div class="message">
        <Typewriter
            showCursorOnDelay={false}
            cursor={false}
            {interval}
            on:done={() => {
                dispatch("done");
                animated = true;
            }}
        >
            <slot />
        </Typewriter>
        {#if schedule !== null}
            <ChatScheduleTable {schedule} />
        {/if}
    </div>
{:else}
    <div class="message {author === 'bot' ? (animated ? '' : 'new') : 'message-personal new'}">
        <slot />
        {#if schedule !== null}
            <ChatScheduleTable {schedule} />
        {/if}
    </div>
{/if}
