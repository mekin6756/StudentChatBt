<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import ChatMessage from "./ChatMessage.svelte";
    import ChatForm from "./ChatForm.svelte";
    import { TextElement, type FormDefinition, TextAreaElement, DateElement, DropdownElement } from "../form";
    import type { Schedule } from "../schedule";
    import ChatScheduleTable from "./ChatScheduleTable.svelte";

    interface ChatMessageInstance {
        author: "user" | "bot";
        contents: string;
        data?: any;
    }

    interface DialogueOption {
        display: string;
        nextStateId: string;
        data?: any;
    }

    interface TransitionResult {
        state: string;
        success: boolean;
        type: "user" | "database" | "databaseEval" | "form" | "input";
        display: string[];
        options: DialogueOption[];
        form: FormDefinition;
        data: any;
    }

    interface RecognizeResult {
        success: boolean;
        option?: string;
    }

    let chatMessages: ChatMessageInstance[] = [];
    let chatOptions: DialogueOption[] = [];
    let chatForm: FormDefinition | null = null;
    let chatData: any = null;
    let doneAnimation = false;

    let currentState: string = "root";
    let currentStateType: TransitionResult["type"] = "user";

    let queuedMessages: ChatMessageInstance[] = [];

    onMount(async () => {
        let rootMessageResponse = await fetch("/api/dialogue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chosenState: "root",
            }),
        });
        let json = (await rootMessageResponse.json()) as TransitionResult;
        for (let msg of json.display) {
            chatMessages = chatMessages.concat([
                {
                    author: "bot",
                    contents: msg,
                },
            ]);
        }
        currentState = json.state;
        chatOptions = json.options;
    });

    const selectOption = async (option: DialogueOption) => {
        chatMessages = chatMessages.concat([
            {
                author: "user",
                contents: option.display,
            },
        ]);
        let prevChatMessages = chatMessages;
        chatMessages = chatMessages.concat([
            {
                author: "bot",
                contents: "...",
            },
        ]);
        doneAnimation = false;
        chatOptions = [];
        setTimeout(async () => {
            let newMsgs = await performTransition(option.nextStateId, option.data);
            if (newMsgs.length !== 0) {
                chatMessages = prevChatMessages.concat([newMsgs[0]]);
                queuedMessages = queuedMessages.concat([...newMsgs.slice(1)]);
            }
        }, 500);
    };

    let gettingNLPRecog = false;

    const onInputType = async (ev: KeyboardEvent) => {
        if (gettingNLPRecog) return;
        if (ev.key === "Enter") {
            await submitUserInput();
        }
    };

    const submitUserInput = async () => {
        if (gettingNLPRecog) return;
        let el = document.querySelector(".message-input") as HTMLTextAreaElement;
        let input = el.value;
        if (input.trim() === "") return;
        el.value = "";
        chatMessages = chatMessages.concat([
            {
                author: "user",
                contents: input,
            },
        ]);
        let prevChatMessages = chatMessages;
        chatMessages = chatMessages.concat([
            {
                author: "bot",
                contents: "...",
            },
        ]);
        doneAnimation = false;
        let prevChatOptions = chatOptions;
        chatOptions = [];
        setTimeout(async () => {
            if (currentStateType !== "input") {
                gettingNLPRecog = false;
                let messageResponse = await fetch("/api/dialogue/choose", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userInput: input,
                        chatOptions: prevChatOptions,
                    }),
                });
                let json = (await messageResponse.json()) as RecognizeResult;
                switch (json.success) {
                    case false:
                        chatMessages = prevChatMessages.concat([
                            {
                                author: "bot",
                                contents: "Sorry I could not understand your request. Can you try again?",
                            },
                        ]);
                        chatOptions = prevChatOptions;
                        break;

                    case true:
                        let chosenOption = prevChatOptions.find((x) => x.display === json.option) as DialogueOption;

                        let newMsgs = await performTransition(chosenOption.nextStateId, chosenOption.data);
                        if (newMsgs.length !== 0) {
                            chatMessages = prevChatMessages.concat([newMsgs[0]]);
                            queuedMessages = queuedMessages.concat([...newMsgs.slice(1)]);
                        }
                }
            } else {
                let newMsgs = await performTransition(currentState, { input: input, data: chatData });
                if (newMsgs.length !== 0) {
                    chatMessages = prevChatMessages.concat([newMsgs[0]]);
                    queuedMessages = queuedMessages.concat([...newMsgs.slice(1)]);
                }
            }
        }, 100);
    };

    const performTransition = async (chosenState: string, params: any) => {
        // Transition
        let messageResponse = await fetch("/api/dialogue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chosenState: chosenState,
                params: params,
            }),
        });
        // Get response
        let json = (await messageResponse.json()) as TransitionResult;
        let newMsgs: ChatMessageInstance[] = [];
        for (let msg of json.display) {
            newMsgs.push({
                author: "bot",
                contents: msg,
                data: json.data,
            });
        }
        currentState = json.state;
        currentStateType = json.type;
        chatOptions = json.options ?? null;
        chatForm = json.form ?? null;
        chatData = json.data;
        return newMsgs;
    };

    const onMessageAnimationDone = () => {
        if (queuedMessages.length === 0) {
            doneAnimation = true;
        } else {
            chatMessages = chatMessages.concat([queuedMessages[0]]);
            queuedMessages = queuedMessages.slice(1);
        }
    };

    const cancelForm = async () => {
        await selectOption(chatOptions[0]);
    };

    const submitForm = async (formData: any) => {
        let messageResponse = await fetch("/api/forms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                state: currentState,
                formData: formData,
            }),
        });
        let json = (await messageResponse.json()) as TransitionResult;
        let newMsgs: ChatMessageInstance[] = [
            {
                author: "bot",
                contents: "Submitting form. Please wait.",
            },
        ];
        for (let msg of json.display) {
            newMsgs.push({
                author: "bot",
                contents: msg,
            });
        }
        currentState = json.state;
        chatOptions = json.options ?? null;
        chatForm = json.form ?? null;
        if (newMsgs.length !== 0) {
            chatMessages = chatMessages.slice(0, -1).concat([newMsgs[0]]);
            queuedMessages = queuedMessages.concat([...newMsgs.slice(1)]);
        }
        doneAnimation = false;
    };

    afterUpdate(() => {
        const messagesContainer = document.querySelector(".messages-content");
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
</script>

<div class="chat">
    <div class="chat-title">
        <h1>Chatbot</h1>
    </div>
    <div class="messages">
        <div class="messages-content">
            {#each chatMessages as msg, index}
                <ChatMessage
                    interval={Math.min(30, 1000 / msg.contents.length)}
                    author={msg.author}
                    last={index === chatMessages.length - 1 && msg.contents !== "..."}
                    schedule={msg.data !== undefined && msg.data.type === "schedule" ? msg.data.schedule : null}
                    on:done={onMessageAnimationDone}
                >
                    {msg.contents}
                </ChatMessage>
            {/each}
            {#if doneAnimation && chatForm !== null}
                <ChatMessage author="bot" last={false}>
                    <ChatForm form={chatForm} long={chatForm.long} on:cancel={cancelForm} on:submit={async (e) => await submitForm(e.detail)} />
                </ChatMessage>
            {/if}
            {#if doneAnimation && chatForm === null}
                <div class="message-options">
                    {#each chatOptions as option}
                        <div class="message-option" on:click={async () => await selectOption(option)}>
                            {option.display}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class="message-box">
        <textarea class="message-input" placeholder="Type your message here..." on:keypress={async (ev) => await onInputType(ev)}></textarea>
        <button type="submit" class="message-submit" on:click={async () => await submitUserInput()}>Send</button>
    </div>
</div>
