document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    const botData = {
        "pin sạc dự phòng": "Hàng hóa chứa pin/sạc dự phòng là hàng không vận chuyển qua đường hàng không. Bạn cần đóng gói cẩn thận, dán nhãn cảnh báo và chỉ có thể gửi qua đường bộ.",
        "chất lỏng nước hoa": "Chất lỏng cần được bọc trong nhiều lớp nilon, bịt kín miệng chai để chống rò rỉ. Nên đặt chai thẳng đứng trong hộp và chèn vật liệu chống sốc xung quanh.",
        "dễ vỡ thủy tinh gốm sứ": "Với hàng dễ vỡ, bạn phải sử dụng xốp hơi, mút, hoặc giấy vụn để chèn kín các khoảng trống. Dán nhãn 'HÀNG DỄ VỠ - XIN NHẸ TAY' bên ngoài thùng hàng.",
        "thời gian giờ làm việc": "Các bưu cục thường làm việc từ 7:30 đến 19:00 từ Thứ Hai đến Thứ Bảy. Một số bưu cục trung tâm có thể làm việc cả Chủ Nhật. Để chắc chắn, bạn hãy kiểm tra trên trang 'Bản đồ chi nhánh'.",
        "tra cứu vận đơn kiểm tra hàng": "Để tra cứu mã vận đơn, bạn vui lòng cung cấp mã có định dạng VNxxxxxxxxx. Ví dụ: VN123456789.",
        "kích thước khối lượng": "Cước phí được tính dựa trên trọng lượng thực tế hoặc trọng lượng quy đổi từ kích thước (dài x rộng x cao / 5000), tùy theo giá trị nào lớn hơn. Bạn nên đóng gói gọn gàng nhất có thể.",
        "gửi quốc tế": "Vietnam Post có dịch vụ chuyển phát quốc tế. Bạn cần điền đầy đủ thông tin người nhận, tờ khai hải quan và tuân thủ quy định hàng hóa của nước nhận. Vui lòng liên hệ bưu cục để được tư vấn chi tiết.",
        "khiếu nại bồi thường": "Nếu có vấn đề về đơn hàng, bạn có thể gọi tổng đài 1900 545481 hoặc đến bưu cục gửi hàng để làm thủ tục khiếu nại. Hãy giữ lại hóa đơn để quá trình xử lý nhanh hơn.",
        "phí ship cước phí": "Cước phí phụ thuộc vào trọng lượng, kích thước, khoảng cách và dịch vụ bạn chọn (nhanh, thường). Bạn có thể yêu cầu nhân viên bưu cục ước tính chi phí trước khi gửi.",
        "cấm gửi": "Các vật phẩm cấm gửi bao gồm chất cháy nổ, ma túy, vũ khí, sinh vật sống, tiền mặt và các ấn phẩm đồi trụy. Gửi các vật phẩm này là vi phạm pháp luật.",
        "chào hello hi": "Chào bạn, tôi là trợ lý ảo của Vietnam Post. Tôi có thể giúp gì cho bạn về các dịch vụ của chúng tôi?",
        "cảm ơn thanks": "Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngần ngại hỏi nhé.",
        "fallback": "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Để được tư vấn chính xác và nhanh chóng nhất, bạn vui lòng liên hệ trực tiếp tổng đài CSKH của Vietnam Post qua số điện thoại <b>1900 545481</b>. Các chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn. Cảm ơn bạn!"
    };

    setTimeout(() => appendMessage(botData["chào hello hi"], 'bot'), 500);

    chatForm.addEventListener('submit', (e) => { e.preventDefault(); const msg = chatInput.value.trim(); if (msg) handleUserMessage(msg); });
    suggestionBtns.forEach(btn => btn.addEventListener('click', () => handleUserMessage(btn.innerText)));

    function handleUserMessage(message) {
        appendMessage(message, 'user');
        chatInput.value = '';
        setTimeout(() => appendMessage(getBotResponse(message), 'bot'), 800 + Math.random() * 500);
    }

    function appendMessage(text, sender) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('message', `${sender}-message`);
        msgElement.innerHTML = text;
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const input = userInput.toLowerCase();
        const trackingCode = input.match(/vn\d{9}/i);
        if (trackingCode) {
            return `Tính năng tra cứu tự động đang được phát triển. Bạn có thể tra cứu mã vận đơn <b>${trackingCode[0].toUpperCase()}</b> trên trang chủ chính thức của Vietnam Post nhé.`;
        }
        for (const key in botData) {
            if (key.split(' ').some(keyword => input.includes(keyword) && key !== "fallback")) {
                return botData[key];
            }
        }
        return botData.fallback;
    }
});