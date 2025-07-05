document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    const botData = [
        {
            keywords: ["chào", "hello", "hi", "xin chào"],
            response: "👋 Chào bạn, tôi là trợ lý ảo của Vietnam Post. Tôi có thể giúp gì cho bạn về các dịch vụ của chúng tôi?"
        },
        {
            keywords: ["bưu cục", "giờ làm", "thời gian làm việc", "giờ hoạt động", "làm việc mấy giờ", "thời gian mở cửa", "giờ mở cửa"],
            response: "⏰ Các bưu cục thường làm việc từ <b>Thứ 2 - Thứ 6, từ 7h30 - 17h30</b>.<br>👉 Bạn có thể gửi vị trí để chatbot tra bưu cục gần nhất và thời gian hoạt động cụ thể."
        },
        {
            keywords: ["vận đơn", "mã vận đơn", "tra mã", "tra cứu mã", "kiểm tra mã", "kiểm tra đơn", "kiểm tra vận đơn", "kiểm tra hành trình"],
            response: "🔍 Bạn có thể nhập mã vận đơn (ví dụ: <b>VN123456789</b>) để chatbot tra cứu hành trình theo thời gian thực.<br>👉 Hoặc bấm vào <a href='#' onclick='alert(\"Chuyển đến trang tra cứu vận đơn!\")'>Tra cứu vận đơn</a> ngay tại đây."
        },
        {
            keywords: ["quốc tế", "nước ngoài", "quốc gia", "gửi quốc tế"],
            response: "🌎 Chúng tôi hỗ trợ gửi hàng đến hơn 200 quốc gia và vùng lãnh thổ như: 🇺🇸 Mỹ – 🇯🇵 Nhật – 🇰🇷 Hàn – 🇦🇺 Úc – 🇬🇧 Anh…<br>👉 Bạn có thể nhập tên quốc gia để kiểm tra cụ thể."
        },
        {
            keywords: ["đóng gói", "gói hàng", "an toàn", "hướng dẫn gói", "cách gói"],
            response: "📦 Bạn nên dùng hộp carton chắc chắn, chống sốc bằng xốp hoặc bóng khí, và dán kín gói hàng.<br>👉 Chatbot có thể gợi ý vật liệu và video hướng dẫn đóng gói phù hợp."
        },
        {
            keywords: ["tra cứu", "theo dõi đơn", "kiểm tra đơn", "tra hành trình", "xem trạng thái", "hành trình đơn"],
            response: "🔍 Vui lòng nhập mã vận đơn như <b>VN123456789</b> để chatbot kiểm tra trạng thái đơn hàng.<br>👉 Hoặc click vào <a href='#' onclick='alert(\"Chuyển đến trang tra cứu vận đơn!\")'>Tra cứu tại đây</a>."
        },
        {
            keywords: ["pin", "sạc dự phòng", "pin lithium", "gửi pin"],
            response: "🔋 Pin lithium chỉ được gửi khi <b>đã lắp sẵn trong thiết bị</b> như điện thoại, laptop…<br>❌ Không chấp nhận gửi pin rời hoặc không rõ nguồn gốc."
        },
        {
            keywords: ["cảm ơn", "thanks", "thank you", "ok"],
            response: "😊 Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngần ngại hỏi nhé."
        }
    ];

    const fallbackResponse = "❓ Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Để được tư vấn chính xác, bạn vui lòng liên hệ tổng đài CSKH qua số <b>1900 545481</b>. Cảm ơn bạn!";

    setTimeout(() => {
        appendMessage(botData.find(item => item.keywords.includes("chào")).response, 'bot');
    }, 500);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) handleUserMessage(msg);
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => handleUserMessage(btn.innerText));
    });

    async function handleUserMessage(message) {
        appendMessage(message, 'user');
        chatInput.value = '';
        const typingIndicator = appendMessage("...", 'bot', true);
        const botResponse = await getBotResponse(message);
        typingIndicator.remove();
        appendMessage(botResponse, 'bot');
    }

    function appendMessage(text, sender, isTyping = false) {
        const msgElement = document.createElement('div');
        msgElement.className = `message ${sender}-message`;
        if (isTyping) {
            msgElement.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        } else {
            msgElement.innerHTML = text;
        }
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgElement;
    }

   async function getBotResponse(userInput) {
    const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const input = normalize(userInput);
    const trackingCodeMatch = input.match(/vn\d{9}/i);
    if (trackingCodeMatch) {
        const trackingCode = trackingCodeMatch[0].toUpperCase();
        return await fetchTrackingInfo(trackingCode);
    }

    let bestMatch = { score: 0, response: fallbackResponse };
    botData.forEach(item => {
        let currentScore = 0;
        item.keywords.forEach(keyword => {
            if (input.includes(normalize(keyword))) currentScore++;
        });
        if (currentScore > bestMatch.score) {
            bestMatch = { score: currentScore, response: item.response };
        }
    });

    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
    return bestMatch.score > 0 ? bestMatch.response : fallbackResponse;
}


    async function fetchTrackingInfo(trackingCode) {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockDatabase = {
            "VN123456789": {
                status: "Đang vận chuyển",
                statusIcon: "🚚",
                driver: "Nguyễn Văn An", phone: "090xxxx123",
                history: [
                    { time: "15:30 22/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" },
                    { time: "08:15 22/05/2024", location: "Đã đến Bưu cục phát Cầu Giấy.", status: "Đến bưu cục" },
                    { time: "21:45 21/05/2024", location: "Rời khỏi Trung tâm khai thác khu vực Hà Nội.", status: "Rời kho" },
                    { time: "10:00 21/05/2024", location: "Bưu cục Hai Bà Trưng đã nhận hàng.", status: "Đã lấy hàng" }
                ]
            },
            "VN987654321": {
                status: "Đã giao thành công",
                statusIcon: "✅",
                driver: "Trần Thị Bích", phone: "098xxxx456",
                history: [
                    { time: "14:30 21/05/2024", location: "Giao hàng thành công.", status: "Thành công" },
                    { time: "09:00 21/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" },
                    { time: "07:30 21/05/2024", location: "Đã đến Bưu cục phát Quận 1.", status: "Đến bưu cục" }
                ]
            },
            "VN000000000": {
                status: "Giao hàng không thành công",
                statusIcon: "❌",
                driver: "Lê Minh Tuấn", phone: "091xxxx789",
                history: [
                    { time: "11:00 22/05/2024", location: "Không liên lạc được với người nhận.", status: "Thất bại" },
                    { time: "09:15 22/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" }
                ]
            }
        };

        const data = mockDatabase[trackingCode];

        if (!data) {
            return `
                <div class="tracking-result">
                    <h4>🔍 Kết quả tra cứu cho mã <b>${trackingCode}</b>:</h4>
                    <p><strong>Trạng thái:</strong> <span class="status-not-found">Không tìm thấy</span></p>
                    <p>Đơn hàng với mã vận đơn này không tồn tại hoặc đã bị hủy. Vui lòng kiểm tra lại mã.</p>
                </div>`;
        }

        const historyHtml = data.history.map(item => `
            <li>
                <div class="history-time">${item.time}</div>
                <div class="history-details"><b>${item.status}:</b> ${item.location}</div>
            </li>
        `).join('');

        return `
            <div class="tracking-result">
                <h4>${data.statusIcon} Kết quả tra cứu cho mã <b>${trackingCode}</b>:</h4>
                <p><strong>Trạng thái hiện tại:</strong> ${data.status}</p>
                <p><strong>Tài xế phụ trách:</strong> ${data.driver}${data.phone !== "N/A" ? ` - SĐT: ${data.phone}` : ''}</p>
                <hr>
                <ul class="tracking-history">${historyHtml}</ul>
            </div>
        `;
    }
});
