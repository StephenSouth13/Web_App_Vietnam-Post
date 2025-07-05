document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử trên trang ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // --- CƠ SỞ DỮ LIỆU CÂU HỎI & TRẢ LỜI (ĐÃ THÊM ICONS) ---
    const botData = [
        {
            keywords: ["chào", "hello", "hi", "xin chào"],
            response: "👋 Chào bạn, tôi là trợ lý ảo của Vietnam Post. Tôi có thể giúp gì cho bạn về các dịch vụ của chúng tôi?"
        },
        {
            keywords: ["bưu cục", "mấy giờ", "giờ làm việc", "mở cửa"],
            response: "⏰ Các bưu cục thường làm việc từ <b>Thứ 2 - Thứ 6, từ 7h30 - 17h30</b>. Quý khách có thể gửi vị trí để chúng tôi tra bưu cục gần nhất và thời gian hoạt động cụ thể."
        },
        {
            keywords: ["quốc tế", "nước ngoài", "hỗ trợ quốc gia"],
            response: "🌎 Hiện chúng tôi hỗ trợ gửi hàng đến hơn 200 quốc gia và vùng lãnh thổ, bao gồm: 🇺🇸 Mỹ – 🇯🇵 Nhật – 🇰🇷 Hàn – 🇦🇺 Úc – 🇬🇧 Anh – 🇨🇦 Canada – 🇩🇪 Đức – 🇫🇷 Pháp – 🇸🇬 Singapore, v.v. Quý khách có thể nhập tên quốc gia để kiểm tra cụ thể."
        },
        {
            keywords: ["đóng gói", "an toàn", "gói hàng", "bảo vệ"],
            response: "📦 Quý khách nên sử dụng thùng carton chắc chắn, chống sốc bằng xốp hoặc bóng khí, và dán kín các cạnh bằng băng keo chuyên dụng.<br><br>Nếu chưa rõ, quý khách có thể:<br>1. Đến trực tiếp bưu cục để nhân viên hỗ trợ.<br>2. Nhập loại hàng muốn gửi, chúng tôi sẽ cung cấp video hướng dẫn."
        },
        {
            keywords: ["theo dõi", "tra cứu", "kiểm tra hàng", "hành trình đơn"],
            response: "🔍 Quý khách có thể nhập mã vận đơn (ví dụ: <b>VN123456789</b>) để tra cứu hành trình. Hoặc bấm vào <a href='#' onclick='alert(\"Chuyển đến trang tra cứu vận đơn!\")'>Tra cứu vận đơn</a> ngay tại đây."
        },
        {
            keywords: ["thực phẩm", "đồ ăn"],
            response: "🍲 Quý khách có thể gửi thực phẩm khô, đóng gói kỹ và có HSD dài. Thực phẩm tươi sống sẽ bị hạn chế. Vui lòng nhập tên loại thực phẩm để được tư vấn chính sách cụ thể."
        },
        {
            keywords: ["hỏa tốc", "giao nhanh", "trong ngày"],
            response: "🚀 Chúng tôi có dịch vụ giao hàng nhanh trong 2h, 4h hoặc trong ngày tại các thành phố lớn. Quý khách vui lòng nhập địa điểm gửi và nhận để kiểm tra khu vực được hỗ trợ."
        },
        {
            keywords: ["cồng kềnh", "xe máy", "nội thất", "hàng lớn"],
            response: "🛵 Có ạ. Chúng tôi hỗ trợ gửi hàng cồng kềnh như xe đạp, đồ nội thất... Quý khách vui lòng cung cấp kích thước và khối lượng để chúng tôi tư vấn dịch vụ phù hợp."
        },
        {
            keywords: ["chưa giao", "chậm trễ", "lâu nhận được"],
            response: "😥 Rất xin lỗi vì sự chậm trễ! Đơn hàng có thể bị ảnh hưởng bởi thời tiết hoặc quá tải. Quý khách vui lòng cung cấp mã vận đơn, chúng tôi sẽ kiểm tra trạng thái chính xác ngay ạ."
        },
        {
            keywords: ["liên hệ shipper", "gọi tài xế", "không nghe máy"],
            response: "📞 Có thể tài xế đang trong quá trình giao hàng và không tiện nghe máy. Quý khách muốn <a href='#' onclick='alert(\"Đã gửi thông báo tới tài xế!\")'>Gửi thông báo nhắc lại</a> hay muốn <a href='#' onclick='alert(\"Đang kết nối tổng đài...\")'>Kết nối với tổng đài viên</a> ạ?"
        },
        {
            keywords: ["hư hỏng", "bị vỡ", "móp méo"],
            response: "💔 Chúng tôi rất tiếc về sự cố này. Quý khách vui lòng gửi hình ảnh hàng hóa bị hư hỏng kèm mã vận đơn, chúng tôi sẽ lập tức hướng dẫn quy trình khiếu nại và bồi thường."
        },
        {
            keywords: ["hoàn về", "trả hàng"],
            response: "↩️ Rất tiếc về sự bất tiện này. Đơn hàng có thể bị hoàn do không liên hệ được người nhận hoặc địa chỉ sai. Quý khách vui lòng nhập mã đơn để chúng tôi kiểm tra lý do cụ thể."
        },
        {
            keywords: ["hủy đơn", "cancel"],
            response: "❌ Nếu đơn hàng chưa được giao đi, quý khách có thể hủy miễn phí. Vui lòng gửi mã vận đơn để chúng tôi kiểm tra tình trạng và hỗ trợ hủy ngay."
        },
        {
            keywords: ["thay đổi thông tin", "đổi địa chỉ", "đổi số điện thoại"],
            response: "📝 Quý khách có thể thay đổi thông tin nếu đơn hàng chưa được giao đi. Vui lòng nhập mã vận đơn để chúng tôi hỗ trợ điều chỉnh nhanh chóng."
        },
        {
            keywords: ["phàn nàn", "không hài lòng", "thái độ"],
            response: "🙁 Rất tiếc về trải nghiệm không tốt của quý khách. Mong quý khách chia sẻ thêm chi tiết (mã vận đơn, thời gian, địa điểm) để chúng tôi có thể chuyển phản hồi đến bộ phận liên quan và cải thiện dịch vụ."
        },
        {
            keywords: ["tư vấn không kỹ"],
            response: "✍️ Chúng tôi xin lỗi vì trải nghiệm không như mong đợi. Để hỗ trợ tốt hơn, vui lòng cho biết loại hàng quý khách muốn gửi, chúng tôi sẽ cung cấp thông tin chi tiết các bước từ A-Z ngay bây giờ."
        },
        {
            keywords: ["chờ lâu", "bưu cục đông"],
            response: "🕒 Rất tiếc vì quý khách phải chờ đợi. Quý khách có thể sử dụng tính năng <b>Đặt lịch gửi hàng</b> qua app hoặc yêu cầu bưu tá đến lấy tận nơi để tiết kiệm thời gian."
        },
        {
            keywords: ["app khó dùng", "giao diện khó"],
            response: "📱 Cảm ơn quý khách đã góp ý. Ứng dụng của chúng tôi đang trong quá trình cải tiến để thân thiện hơn. Mọi thao tác tạo đơn, tra cứu hay liên hệ hỗ trợ đều có thể thực hiện ngay trong ứng dụng này."
        },
        {
            keywords: ["chuẩn bị gì", "trước khi gửi"],
            response: "✅ Để gửi hàng an toàn, quý khách nên:<br>1. Đóng gói hàng hóa chắc chắn.<br>2. Ghi rõ thông tin người gửi, người nhận.<br>3. Đo kích thước và trọng lượng nếu tạo đơn online.<br>Nếu cần, chúng tôi có thể hướng dẫn chi tiết kèm video minh họa."
        },
        {
            keywords: ["hà nội", "hcm", "hồ chí minh", "bao lâu"],
            response: "⏳ Thời gian gửi hàng từ Hà Nội vào TP.HCM thường dao động từ 2 đến 5 ngày, tùy dịch vụ:<br>• 🚀 <b>Chuyển phát nhanh (EMS):</b> 1–3 ngày.<br>• 🐢 <b>Chuyển phát thường:</b> 3–5 ngày.<br>Lưu ý: Thời gian có thể thay đổi vào dịp lễ Tết."
        },
        {
            keywords: ["pin", "sạc dự phòng"],
            response: "🔋 Vietnam Post có nhận gửi hàng chứa pin, nhưng cần tuân thủ quy định:<br>• Pin lithium chỉ được gửi khi đã lắp sẵn trong thiết bị.<br>• Không nhận gửi pin rời hoặc pin không rõ nguồn gốc."
        },
        {
            keywords: ["cước phí", "phí ship", "giá cước", "bao nhiêu tiền", "2kg"],
            response: "💰 Cước phí phụ thuộc vào trọng lượng, kích thước, khoảng cách và dịch vụ. Ví dụ, gói hàng 2kg từ Hà Nội vào TP.HCM:<br>• 🚀 <b>EMS:</b> khoảng 55.000đ – 65.000đ.<br>• 🐢 <b>Thường:</b> chi phí thấp hơn 15-20%.<br><i>Đây là giá tham khảo và có thể thay đổi.</i>"
        },
        {
            keywords: ["tổng đài", "không bắt máy", "hỗ trợ gấp"],
            response: "🚨 Rất xin lỗi quý khách, tổng đài có thể đang quá tải. Quý khách vui lòng cho biết vấn đề cụ thể cần hỗ trợ (kèm mã vận đơn nếu có), chúng tôi sẽ ưu tiên xử lý ngay lập tức."
        },
        {
            keywords: ["cảm ơn", "thanks"],
            response: "😊 Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngần ngại hỏi nhé."
        }
    ];
    const fallbackResponse = "❓ Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Để được tư vấn chính xác, bạn vui lòng liên hệ tổng đài CSKH qua số <b>1900 545481</b>. Cảm ơn bạn!";

    // --- XỬ LÝ CHÍNH CỦA CHATBOT ---
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

    // --- "BỘ NÃO" CỦA BOT - HÀM LẤY CÂU TRẢ LỜI ---
    async function getBotResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        const trackingCodeMatch = input.match(/vn\d{9}/i);
        if (trackingCodeMatch) {
            const trackingCode = trackingCodeMatch[0].toUpperCase();
            return await fetchTrackingInfo(trackingCode);
        }

        let bestMatch = { score: 0, response: fallbackResponse };
        botData.forEach(item => {
            let currentScore = 0;
            item.keywords.forEach(keyword => {
                if (input.includes(keyword)) currentScore++;
            });
            if (currentScore > bestMatch.score) {
                bestMatch = { score: currentScore, response: item.response };
            }
        });
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
        return bestMatch.response;
    }

    // --- TÍNH NĂNG "SIÊU ĐỈNH": MÔ PHỎNG TRA CỨU VẬN ĐƠN VỚI NHIỀU KỊCH BẢN ---
    async function fetchTrackingInfo(trackingCode) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập thời gian gọi API

        // --- KHO DỮ LIỆU GIẢ LẬP (DATABASE MẪU) CHO MỌI TÌNH HUỐNG ---
        const mockDatabase = {
            "VN123456789": {
                status: "Đang vận chuyển",
                statusIcon: "🚚",
                driver: "Nguyễn Văn An", phone: "090xxxx123",
                history: [
                    { time: "15:30 22/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" },
                    { time: "08:15 22/05/2024", location: "Đã đến Bưu cục phát Cầu Giấy.", status: "Đến bưu cục" },
                    { time: "21:45 21/05/2024", location: "Đã rời khỏi Trung tâm khai thác khu vực Hà Nội.", status: "Rời kho" },
                    { time: "10:00 21/05/2024", location: "Bưu cục Hai Bà Trưng đã nhận hàng.", status: "Đã lấy hàng" }
                ]
            },
            "VN987654321": {
                status: "Đã giao thành công",
                statusIcon: "✅",
                driver: "Trần Thị Bích", phone: "098xxxx456",
                history: [
                    { time: "14:30 21/05/2024", location: "Giao hàng thành công cho người nhận.", status: "Thành công" },
                    { time: "09:00 21/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" },
                    { time: "07:30 21/05/2024", location: "Đã đến Bưu cục phát Quận 1.", status: "Đến bưu cục" },
                    { time: "18:00 20/05/2024", location: "Đã rời kho trung tâm TP.HCM.", status: "Rời kho" }
                ]
            },
            "VN000000000": {
                status: "Giao hàng không thành công",
                statusIcon: "❌",
                driver: "Lê Minh Tuấn", phone: "091xxxx789",
                history: [
                    { time: "11:00 22/05/2024", location: "Giao hàng không thành công. Lý do: Không liên lạc được với người nhận.", status: "Thất bại" },
                    { time: "09:15 22/05/2024", location: "Đang trên đường giao đến bạn.", status: "Đang giao hàng" },
                    { time: "08:00 22/05/2024", location: "Đã đến Bưu cục phát Đống Đa.", status: "Đến bưu cục" },
                ]
            },
            "VN111222333": {
                status: "Đang hoàn về người gửi",
                statusIcon: "↩️",
                driver: "N/A", phone: "N/A",
                history: [
                    { time: "10:00 23/05/2024", location: "Đang trên đường hoàn về người gửi.", status: "Đang hoàn" },
                    { time: "16:00 22/05/2024", location: "Giao hàng không thành công 3 lần. Tiến hành hoàn hàng.", status: "Thất bại" }
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
        
        // Tạo chuỗi HTML cho lịch sử hành trình
        const historyHtml = data.history.map(item => `
            <li>
                <div class="history-time">${item.time}</div>
                <div class="history-details"><b>${item.status}:</b> ${item.location}</div>
            </li>
        `).join('');

        return `
            <div class="tracking-result">
                <h4>${data.statusIcon} Kết quả tra cứu cho mã <b>${trackingCode}</b>:</h4>
                <p><strong>Trạng thái hiện tại:</strong> <span class="status-${data.status.toLowerCase().replace(/\s+/g, '-')}">${data.status}</span></p>
                <p><strong>Tài xế phụ trách:</strong> ${data.driver} ${data.phone !== "N/A" ? `- SĐT: ${data.phone}` : ''}</p>
                <hr>
                <ul class="tracking-history">
                    ${historyHtml}
                </ul>
            </div>
        `;
    }
});
