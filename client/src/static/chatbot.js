const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage = "";

// Tạo một tin nhắn <li> với nội dung và class tương ứng (incoming/outgoing)
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = "";

    if (className === "outgoing") {
        // Tin nhắn người dùng (phải)
        chatContent = `<p>${message}</p>`;
    } else {
        // Tin nhắn AI (trái)
        chatContent = `
            <span class="material-symbols-outlined">smart_toy</span>
            <p>${message}</p>
        `;
    }

    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Gửi request đến Flask API và chèn phản hồi AI vào giao diện
const generateResponse = (incomingChatLi) => {
    const API_ENDPOINT = "http://localhost:5000/chat";
    const messageEle = incomingChatLi.querySelector("p");

    fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
    })
        .then(res => res.json())
        .then(data => {
            messageEle.textContent = data.answer || "No response from AI.";
        })
        .catch(error => {
            console.error("API error:", error);
            messageEle.classList.add("error");
            messageEle.textContent = "Error occurred. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

// Xử lý khi người dùng gửi tin nhắn
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Hiển thị tin nhắn người dùng
    const outgoingLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingLi);
    chatInput.value = "";
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Tạm thời hiển thị "Đang trả lời..." từ AI
    setTimeout(() => {
        const incomingLi = createChatLi("Typing...", "incoming");
        chatbox.appendChild(incomingLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingLi);
    }, 500);
};

// Tự động điều chỉnh chiều cao textarea khi gõ
chatInput.addEventListener("input", () => {
    chatInput.style.height = "auto";
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Gửi khi nhấn nút
sendChatBtn.addEventListener("click", handleChat);

// Gửi khi nhấn Enter + không có Shift
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});