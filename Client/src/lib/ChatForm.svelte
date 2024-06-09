<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { FormDefinition } from "../form";

    export let form: FormDefinition;
    export let long: boolean = false;

    let formModelData = form.fields.map((x) => [x.id, null]);
    let formModel = Object.fromEntries(formModelData);

    const decideDateConstraint = (cStr: string | undefined) => {
        if (cStr === undefined) return "";
        if (cStr === "now") return new Date().toISOString().split("T")[0];
        let constraintVal = formModel[cStr];
        return constraintVal;
    };

    const dispatch = createEventDispatcher();
</script>

<div class="chat-form">
    <dl>
        {#each form.fields as input}
            <dt class="chat-{input.inputType.type} {long ? 'long' : ''}">
                <label for={input.id}>{input.name}</label>
            </dt>
            <dd class="chat-{input.inputType.type} {long ? 'long' : ''}">
                {#if input.inputType.type === "text"}
                    <input
                        id={input.id}
                        name={input.id}
                        class="chat-form-field"
                        type="text"
                        minlength={input.inputType.min}
                        maxlength={input.inputType.max}
                        bind:value={formModel[input.id]}
                    />
                {/if}
                {#if input.inputType.type === "number"}
                    <input
                        id={input.id}
                        name={input.id}
                        class="chat-form-field"
                        type="number"
                        min={input.inputType.min}
                        max={input.inputType.max}
                        bind:value={formModel[input.id]}
                    />
                {/if}
                {#if input.inputType.type === "date"}
                    <input
                        id={input.id}
                        name={input.id}
                        class="chat-form-field"
                        type="date"
                        bind:value={formModel[input.id]}
                        min={decideDateConstraint(input.inputType.min)}
                        max={decideDateConstraint(input.inputType.max)}
                    />
                {/if}
                {#if input.inputType.type === "textarea"}
                    <textarea id={input.id} name={input.id} class="chat-form-field" bind:value={formModel[input.id]}></textarea>
                {/if}
                {#if input.inputType.type === "dropdown"}
                    <select id={input.id} name={input.id} class="chat-form-field" bind:value={formModel[input.id]}>
                        {#each input.inputType.options as option}
                            <option id={option.id} value={option.value}>{option.display}</option>
                        {/each}
                    </select>
                {/if}
            </dd>
        {/each}
    </dl>
    <div class="form-buttons">
        <button id="chat-form-submit" on:click={() => dispatch("submit", formModel)}>Submit</button>
        <button id="chat-form-cancel" on:click={() => dispatch("cancel")}>Cancel</button>
    </div>
</div>
