<script>
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    const botData = {
        "giờ làm việc|làm việc từ mấy giờ|bưu cục làm việc": "Các bưu cục thường làm việc từ Thứ 2 - Thứ 6 từ 7h30 - 17h30. Một số bưu cục trung tâm làm đến 19h hoặc mở cả Thứ 7/Chủ Nhật. Vui lòng gửi vị trí để chúng tôi tra thời gian cụ thể.",
        "gửi hàng quốc tế|gửi quốc tế|quốc gia nào hỗ trợ": "Chúng tôi hỗ trợ gửi hàng đến hơn 200 quốc gia như 🇺🇸 Mỹ, 🇯🇵 Nhật, 🇰🇷 Hàn, 🇩🇪 Đức, 🇦🇺 Úc,... Bạn có thể nhập tên quốc gia để tra cứu.",
        "đóng gói|hướng dẫn đóng gói|cách đóng gói": "Bạn nên dùng thùng carton chắc chắn, chống sốc bằng xốp, mút hoặc bóng khí. Nếu cần video hướng dẫn, hãy nhập loại hàng (vd: 'nước hoa', 'thủy tinh') để xem clip minh họa.",
        "tra cứu vận đơn|mã vận đơn|kiểm tra đơn": "Bạn có thể tra mã vận đơn tại: <a href='https://www.vnpost.vn/tra-cuu' target='_blank'>Tra cứu đơn hàng</a> hoặc nhập mã định dạng VNxxxxxxxxx để tra cứu.",
        "thực phẩm|gửi thực phẩm|đồ ăn": "Bạn có thể gửi thực phẩm khô nếu được đóng gói kỹ, có hạn dùng dài. Thực phẩm tươi sống bị hạn chế. Hãy nhập tên loại thực phẩm để kiểm tra thêm.",
        "hỏa tốc|giao nhanh|giao trong ngày": "Vietnam Post có dịch vụ giao nhanh trong 2h, 4h, hoặc trong ngày tại các thành phố lớn. Vui lòng nhập địa chỉ gửi/nhận để kiểm tra khu vực hỗ trợ.",
        "cồng kềnh|gửi xe|máy móc": "Chúng tôi nhận hàng cồng kềnh như xe đạp, đồ nội thất, máy móc,... Bạn hãy nhập kích thước + khối lượng để được tư vấn.",
        "chưa giao|chưa nhận|giao chậm": "Xin lỗi vì sự chậm trễ. Đơn hàng có thể bị ảnh hưởng bởi thời tiết hoặc quá tải. Vui lòng cung cấp mã đơn để tra cứu.",
        "không liên lạc được|shipper không nghe máy": "Có thể shipper đang bận giao hàng. Bạn có thể:\n- Gửi thông báo nhắc tới shipper\n- Kết nối với tổng đài viên hỗ trợ.",
        "hư hỏng|hàng lỗi|hàng bể": "Rất tiếc vì sự cố. Vui lòng gửi ảnh hàng + mã vận đơn để chúng tôi hỗ trợ khiếu nại/bồi thường.",
        "bị hoàn hàng|đơn hàng bị trả lại": "Đơn hàng có thể bị hoàn do không liên hệ được người nhận hoặc địa chỉ chưa rõ. Nhập mã đơn để kiểm tra lý do.",
        "huỷ đơn|muốn huỷ đơn": "Nếu đơn chưa giao đi, bạn có thể huỷ miễn phí. Vui lòng nhập mã đơn để kiểm tra tình trạng.",
        "đổi địa chỉ|đổi số điện thoại|thay đổi thông tin người nhận": "Bạn có thể đổi thông tin nếu đơn chưa rời bưu cục. Nhập mã đơn để hỗ trợ cập nhật.",
        "nhân viên giao hàng|thái độ shipper|phản ánh shipper": "Rất tiếc vì trải nghiệm chưa tốt. Hãy chia sẻ chi tiết để chúng tôi cải thiện dịch vụ.",
        "giao diện app|app khó dùng": "Cảm ơn góp ý! App Vietnam Post đang được cải tiến. Bạn có thể chat trực tiếp để được hỗ trợ.",
        "chuẩn bị gì trước khi gửi|cần chuẩn bị gì": "Bạn nên:\n- Đóng gói đúng quy cách\n- Ghi rõ người gửi/nhận\n- Đo khối lượng/kích thước\n- Có thể đến bưu cục hoặc tạo đơn online.",
        "hỗ trợ đóng gói không": "Vietnam Post có hỗ trợ đóng gói tại một số bưu cục. Hãy đến sớm nếu vào giờ cao điểm.",
        "thời gian gửi từ hà nội vào hcm": "Gửi từ Hà Nội vào TP.HCM:\n- EMS: 1–3 ngày\n- Thường: 3–5 ngày\n(*) Dịp lễ/Tết có thể lâu hơn.",
        "pin|sạc|pin lithium": "Vietnam Post chỉ nhận pin khi đã lắp trong thiết bị (điện thoại, laptop...). Không gửi pin rời, pin không rõ nguồn gốc.",
        "phí ship|cước phí|giá gửi": "Cước tính theo trọng lượng hoặc khối lượng quy đổi (DxRxC / 5000), và khoảng cách, dịch vụ. Bạn có thể nhập thông tin để ước tính.",
        "gửi từ tphcm ra hà nội": "Phí gửi phụ thuộc dịch vụ, khối lượng, kích thước. Vui lòng nhập thêm thông tin để được báo giá.",
        "tôi là ai|tên tôi là gì": "Tôi không biết tên bạn nhưng rất sẵn sàng hỗ trợ bạn!",
        "hello|hi|chào": "Chào bạn, tôi là trợ lý ảo Vietnam Post. Bạn muốn hỏi gì hôm nay?",
        "cảm ơn|thank you|thanks": "Rất vui được hỗ trợ! Nếu cần thêm gì, đừng ngần ngại hỏi nhé.",
        "fallback": "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Vui lòng gọi tổng đài <b>1900 545481</b> để được hỗ trợ nhanh nhất!"
    };

    setTimeout(() => appendMessage(botData["hello"], 'bot'), 500);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) handleUserMessage(msg);
    });

    suggestionBtns.forEach(btn =>
        btn.addEventListener('click', () => handleUserMessage(btn.innerText))
    );

    function handleUserMessage(message) {
        appendMessage(message, 'user');
        chatInput.value = '';
        setTimeout(() => appendMessage(getBotResponse(message), 'bot'), 800 + Math.random() * 500);
    }

    function appendMessage(text, sender) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('message', `${sender}-message`);
        msgElement.innerHTML = text.replace(/\n/g, "<br>");
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const input = userInput.toLowerCase();
        const trackingCode = input.match(/vn\d{9}/i);
        if (trackingCode) {
            return `🚚 Mã vận đơn <b>${trackingCode[0].toUpperCase()}</b> đang được xử lý...<br>
            <a href='https://www.vnpost.vn/tra-cuu' target='_blank'>Bấm vào đây để kiểm tra nhanh</a>`;
        }
        for (const key in botData) {
            if (key !== "fallback" && key.split('|').some(k => input.includes(k.trim()))) {
                return botData[key];
            }
        }
        return botData["fallback"];
    }
});
</script>
