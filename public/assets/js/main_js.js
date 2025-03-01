// JavaScript Document

function createChatLi(message, date, time, type, chatInitial = "") {
    const chatLi = document.createElement("li");
    chatLi.classList.add("mb-3", "d-flex", "align-item-end");

    let chatContent = ``;
    if (type != 'Me') {
        chatLi.classList.add("flex-row")
        chatContent = `<div class="max-width-70"><div class="user-info mb-2"><span class="avatar sm rounded-circle me-1 p-2" style="background-color:rgba(72, 76, 127,0.15);">
                                    ${chatInitial}
                                </span><span class="text-muted small">
                                    ${date} , ${time}
                                </span></div><div class="card border-0 p-3" style="border-radius:13px 0px 13px 13px;"><div class="message">
                                    ${message}
                                </div></div></div>`
    } else {
        chatLi.classList.add("flex-row-reverse")
        chatContent = `<div class="max-width-70 text-right"><div class="user-info mb-1"><span class="text-muted small">
                                ${date} , ${time}
                                </span></div><div class="card border-0 p-3 bg-primary text-light" style="border-radius:13px 13px 0px 13px;"><div class="message">
                                ${message}
                                </div></div></div>`
    }
    chatLi.innerHTML = chatContent;
    return chatLi;
};
function handleChat() {
    const chatInput = document.querySelector(".chat-message textarea");
    userMessage = chatInput.value.trim();
    chatInput.value = null;
    chatInput.placeholder = "Enter a message"
    const messageType = 'Me'
    const { utcDate, utcTime } = getUTCDateTime()
    if (!userMessage) return;
    appendMessage(userMessage, utcDate, utcTime, messageType)
};
function appendMessage(message, date, time, type, chatInitial = "") {
    console.log(`Appending message ${message} with ${date} , ${time} , ${chatInitial} with type ${type}`);
    const chatbox = document.querySelector("#ulChatList");
    chatbox.appendChild(createChatLi(message, date, time, type, chatInitial));
    chatbox.scrollTo(0, chatbox.scrollHeight);
}
function scrollToBottom() {
    const chatbox = document.querySelector("#ulChatList");
    chatbox.scrollTo(0, chatbox.scrollHeight);
}
function getUTCDateTime() {
    const currentDate = new Date();
    const utcDate = currentDate.toISOString().split('T')[0];
    const utcTime = currentDate.toISOString().split('T')[1].split('.')[0];
    return { utcDate, utcTime };
}
function handleServerMessage(message, type) {
    console.log("called")
    const { utcDate, utcTime } = getUTCDateTime()
    const messageType = 'Server'
    const path_on = dmx.parse('browser_main.location.href')
    const endurl = path_on.split('/').pop();
    const chatInitial = 'FG'
    if (type == 'array') {
        message.map(mes => {
            const pageNumber = mes.metadata.loc.pageNumber;
            const textContent = mes.text.replace(/\n/g, ', ');
            const fileName = mes.metadata.filename;
            const displayText = `Page ${pageNumber}: ${textContent} (Source: ${fileName})`;
            appendMessage(displayText, utcDate, utcTime, messageType, chatInitial)
        })
    } else {
        appendMessage(message, utcDate, utcTime, messageType, chatInitial);
    }

}
function removeAllUL() {
    console.log("removing");
    const chatbox = document.querySelector("#ulChatList");
    if (chatbox) {
        chatbox.querySelectorAll(":scope > li").forEach(li => li.remove());
    }
}
function runJsFunc() {
    console.log("hello")
}
function playSound() {
    const notificationSound = new Audio('assets/sounds/sound_one.wav');
    notificationSound.play();
}
function playSoundSupport() {
    console.log("Called me")
    const notificationSound = new Audio('assets/sounds/dorebell.wav');
    notificationSound.play();
}