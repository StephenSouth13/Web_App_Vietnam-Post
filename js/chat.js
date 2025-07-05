document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử trên trang ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // --- CƠ SỞ DỮ LIỆU CÂU HỎI & TRẢ LỜI ĐÃ ĐƯỢC NÂNG CẤP ---
    // Cấu trúc mới: Mỗi mục có `keywords` để nhận diện và `response` để trả lời.
    // Điều này giúp bot thông minh hơn khi tìm câu trả lời phù hợp nhất.
    const botData = [
        {
            keywords: ["chào", "hello", "hi", "xin chào"],
            response: "Chào bạn, tôi là trợ lý ảo của Vietnam Post. Tôi có thể giúp gì cho bạn về các dịch vụ của chúng tôi?"
        },
        {
            keywords: ["bưu cục", "mấy giờ", "giờ làm việc", "thời gian làm việc", "mở cửa"],
            response: "Các bưu cục thường làm việc từ thứ 2 - thứ 6, từ 7h30 - 17h30. Quý khách có thể gửi vị trí để chúng tôi tra bưu cục gần nhất và thời gian hoạt động cụ thể."
        },
        {
            keywords: ["quốc tế", "nước ngoài", "hỗ trợ quốc gia"],
            response: "Hiện chúng tôi hỗ trợ gửi hàng đến hơn 200 quốc gia và vùng lãnh thổ, bao gồm: 🇺🇸 Mỹ – 🇯🇵 Nhật – 🇰🇷 Hàn – 🇦🇺 Úc – 🇬🇧 Anh – 🇨🇦 Canada – 🇩🇪 Đức – 🇫🇷 Pháp – 🇸🇬 Singapore, v.v. Quý khách có thể nhập tên quốc gia để kiểm tra cụ thể."
        },
        {
            keywords: ["đóng gói", "an toàn", "gói hàng", "bảo vệ"],
            response: "Quý khách nên sử dụng thùng carton chắc chắn, chống sốc bằng xốp, mút hoặc bóng khí, và dán kín các cạnh bằng băng keo chuyên dụng để tránh hư hỏng. <br><br>Nếu chưa rõ, quý khách có thể:<br>1. Đến trực tiếp bưu cục để nhân viên hỗ trợ.<br>2. Nhập loại hàng muốn gửi, chúng tôi sẽ cung cấp video hướng dẫn chi tiết."
        },
        {
            keywords: ["theo dõi", "tra cứu", "kiểm tra hàng", "hành trình đơn"],
            response: "Quý khách có thể nhập mã vận đơn (ví dụ: VN123456789) để chúng tôi tra cứu hành trình. Hoặc bấm vào <a href='#' onclick='alert(\"Chuyển đến trang tra cứu vận đơn!\")'>Tra cứu vận đơn</a> ngay tại đây."
        },
        {
            keywords: ["thực phẩm", "đồ ăn", "gửi đồ ăn"],
            response: "Quý khách có thể gửi thực phẩm khô, đóng gói kỹ và có hạn sử dụng dài. Thực phẩm tươi sống sẽ bị hạn chế. Vui lòng nhập tên loại thực phẩm để được tư vấn chính sách cụ thể."
        },
        {
            keywords: ["hỏa tốc", "giao nhanh", "trong ngày", "2h", "4h"],
            response: "Chúng tôi có dịch vụ giao hàng nhanh trong 2h, 4h hoặc trong ngày tại các thành phố lớn. Quý khách vui lòng nhập địa điểm gửi và nhận để kiểm tra khu vực được hỗ trợ."
        },
        {
            keywords: ["cồng kềnh", "xe máy", "nội thất", "hàng lớn"],
            response: "Có ạ. Chúng tôi hỗ trợ gửi hàng cồng kềnh như xe đạp, đồ nội thất, máy móc... với chính sách riêng. Quý khách vui lòng cung cấp kích thước và khối lượng để chúng tôi tư vấn dịch vụ phù hợp."
        },
        {
            keywords: ["chưa giao", "chậm trễ", "lâu nhận được hàng"],
            response: "Rất xin lỗi vì sự chậm trễ! Đơn hàng có thể bị ảnh hưởng bởi thời tiết, giao thông hoặc quá tải. Quý khách vui lòng cung cấp mã vận đơn, chúng tôi sẽ kiểm tra trạng thái chính xác ngay ạ."
        },
        {
            keywords: ["liên hệ shipper", "gọi shipper", "tài xế không nghe máy"],
            response: "Có thể shipper đang trong quá trình giao hàng và không tiện nghe máy. Quý khách muốn <a href='#' onclick='alert(\"Đã gửi thông báo tới shipper!\")'>Gửi thông báo nhắc lại cho shipper</a> hay muốn <a href='#' onclick='alert(\"Đang kết nối tổng đài...\")'>Kết nối với tổng đài viên</a> ạ?"
        },
        {
            keywords: ["hư hỏng", "bị vỡ", "móp méo", "hỏng hàng"],
            response: "Chúng tôi rất tiếc về sự cố này. Quý khách vui lòng gửi hình ảnh hàng hóa bị hư hỏng kèm mã vận đơn, chúng tôi sẽ lập tức hướng dẫn quy trình khiếu nại và bồi thường."
        },
        {
            keywords: ["hoàn về", "trả hàng", "không báo trước"],
            response: "Rất tiếc về sự bất tiện này. Đơn hàng có thể bị hoàn do không liên hệ được người nhận hoặc địa chỉ chưa chính xác. Quý khách vui lòng nhập mã đơn để chúng tôi kiểm tra lý do cụ thể và hỗ trợ phương án xử lý."
        },
        {
            keywords: ["hủy đơn", "không gửi nữa", "cancel"],
            response: "Nếu đơn hàng chưa được giao đi, quý khách có thể hủy miễn phí. Vui lòng gửi mã vận đơn để chúng tôi kiểm tra tình trạng và hỗ trợ hủy đơn ngay lập tức."
        },
        {
            keywords: ["thay đổi thông tin", "đổi địa chỉ", "đổi số điện thoại"],
            response: "Quý khách có thể thay đổi địa chỉ hoặc số điện thoại nếu đơn hàng chưa được giao đi. Vui lòng nhập mã vận đơn để chúng tôi hỗ trợ điều chỉnh nhanh chóng."
        },
        {
            keywords: ["thái độ nhân viên", "phàn nàn", "không hài lòng", "shipper"],
            response: "Rất tiếc về trải nghiệm không tốt của quý khách. Mong quý khách chia sẻ thêm chi tiết về thời gian, địa điểm hoặc mã vận đơn, để chúng tôi có thể chuyển phản hồi đến bộ phận liên quan và cải thiện dịch vụ tốt hơn."
        },
        {
            keywords: ["tư vấn không kỹ", "nhân viên không tư vấn"],
            response: "Chúng tôi xin lỗi vì trải nghiệm không như mong đợi. Để hỗ trợ tốt hơn, vui lòng cho biết loại hàng quý khách muốn gửi, chúng tôi sẽ cung cấp thông tin chi tiết các bước từ đóng gói đến theo dõi ngay bây giờ."
        },
        {
            keywords: ["chờ lâu", "bưu cục đông", "đợi lâu", "nhanh hơn"],
            response: "Rất tiếc vì quý khách phải chờ đợi lâu. Quý khách có thể sử dụng tính năng đặt lịch gửi hàng qua ứng dụng hoặc yêu cầu bưu tá đến lấy tận nơi để tiết kiệm thời gian."
        },
        {
            keywords: ["app khó dùng", "giao diện khó", "ứng dụng"],
            response: "Cảm ơn quý khách đã góp ý. Ứng dụng của chúng tôi đang trong quá trình cải tiến. Mọi thao tác tạo đơn, tra cứu hay liên hệ hỗ trợ đều có thể thực hiện ngay trong ứng dụng này ạ."
        },
        {
            keywords: ["chuẩn bị gì", "trước khi gửi", "cần làm gì"],
            response: "Để gửi hàng an toàn, quý khách nên:<br>1. Đóng gói hàng hóa chắc chắn.<br>2. Ghi rõ thông tin người gửi, người nhận.<br>3. Đo kích thước và trọng lượng nếu tạo đơn online.<br>Nếu cần, chúng tôi có thể hướng dẫn chi tiết kèm video minh họa ạ."
        },
        {
            keywords: ["hỗ trợ đóng gói", "có đóng gói không"],
            response: "Vietnam Post có hỗ trợ đóng gói tại một số bưu cục. Quý khách có thể yêu cầu nhân viên hỗ trợ khi đến gửi hàng. Tuy nhiên, vào giờ cao điểm, quý khách nên đến sớm để được phục vụ tốt nhất."
        },
        {
            keywords: ["hà nội", "hcm", "sài gòn", "hồ chí minh", "bao lâu"],
            response: "Thời gian gửi hàng từ Hà Nội vào TP.HCM thường dao động từ 2 đến 5 ngày làm việc, tùy dịch vụ:<br>• <b>Chuyển phát nhanh (EMS):</b> 1–3 ngày.<br>• <b>Chuyển phát thường:</b> 3–5 ngày.<br>Lưu ý: Thời gian có thể thay đổi vào dịp lễ Tết hoặc do thời tiết."
        },
        {
            keywords: ["pin", "sạc dự phòng", "gửi pin"],
            response: "Vietnam Post có nhận gửi hàng chứa pin, nhưng cần tuân thủ quy định an toàn:<br>• Pin lithium chỉ được gửi khi đã lắp sẵn trong thiết bị (điện thoại, laptop...).<br>• Không nhận gửi pin rời hoặc pin không rõ nguồn gốc."
        },
        {
            keywords: ["cước phí", "phí ship", "giá cước", "bao nhiêu tiền"],
            response: "Cước phí phụ thuộc vào trọng lượng, kích thước, khoảng cách và dịch vụ bạn chọn (nhanh/thường). Để có giá chính xác, bạn vui lòng cung cấp thông tin chi tiết hơn nhé. Ví dụ: 'Gói hàng 2kg từ Hà Nội vào TP.HCM giá bao nhiêu?'"
        },
        {
            keywords: ["2kg", "30x20x15cm", "giá cước", "cước phí"],
            response: "Với gói hàng 2kg (kích thước 30x20x15cm) từ Hà Nội vào TP.HCM:<br>• Dịch vụ <b>Chuyển phát nhanh (EMS)</b>: khoảng 55.000đ – 65.000đ.<br>• Dịch vụ <b>Chuyển phát thường</b>: chi phí có thể thấp hơn 15-20%.<br><i>Lưu ý: Đây là giá tham khảo và có thể thay đổi.</i>"
        },
        {
            keywords: ["tổng đài", "không bắt máy", "hỗ trợ gấp", "gọi không được"],
            response: "Rất xin lỗi quý khách vì sự bất tiện này, tổng đài có thể đang quá tải. Quý khách vui lòng cho biết vấn đề cụ thể cần hỗ trợ (kèm mã vận đơn nếu có), chúng tôi sẽ ưu tiên xử lý ngay lập tức."
        },
        {
            keywords: ["cảm ơn", "thanks", "thank you"],
            response: "Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngần ngại hỏi nhé."
        }
    ];

    const fallbackResponse = "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Để được tư vấn chính xác và nhanh chóng nhất, bạn vui lòng liên hệ trực tiếp tổng đài CSKH của Vietnam Post qua số điện thoại <b>1900 545481</b>. Các chuyên viên của chúng tôi luôn sẵn sàng hỗ trợ bạn. Cảm ơn bạn!";

    // --- XỬ LÝ CHÍNH CỦA CHATBOT ---

    // Chào mừng người dùng khi mới vào trang
    setTimeout(() => {
        appendMessage(botData.find(item => item.keywords.includes("chào")).response, 'bot');
    }, 500);

    // Bắt sự kiện người dùng gửi tin nhắn (enter hoặc click nút)
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) {
            handleUserMessage(msg);
        }
    });

    // Bắt sự kiện người dùng click vào các gợi ý
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserMessage(btn.innerText);
        });
    });

    // Hàm xử lý tin nhắn từ người dùng
    async function handleUserMessage(message) {
        appendMessage(message, 'user');
        chatInput.value = '';

        // Hiển thị "Bot đang trả lời..."
        const typingIndicator = appendMessage("...", 'bot', true);

        // Lấy câu trả lời từ bot (có thể mất thời gian nếu phải tra cứu)
        const botResponse = await getBotResponse(message);
        
        // Xóa "..." và hiển thị câu trả lời thật
        typingIndicator.remove();
        appendMessage(botResponse, 'bot');
    }

    // Hàm thêm tin nhắn vào khung chat
    function appendMessage(text, sender, isTyping = false) {
        const msgElement = document.createElement('div');
        // Sửa lỗi cú pháp ở đây, dùng `` thay vì ''
        msgElement.className = `message ${sender}-message`;
        
        if (isTyping) {
            msgElement.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        } else {
            msgElement.innerHTML = text;
        }

        chatMessages.appendChild(msgElement);
        // Tự động cuộn xuống tin nhắn mới nhất
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgElement;
    }

    // --- "BỘ NÃO" CỦA BOT - HÀM LẤY CÂU TRẢ LỜI ---
    async function getBotResponse(userInput) {
        const input = userInput.toLowerCase().trim();

        // 1. ƯU TIÊN HÀNG ĐẦU: KIỂM TRA MÃ VẬN ĐƠN (TÍNH NĂNG NÂNG CAO)
        const trackingCodeMatch = input.match(/vn\d{9}/i);
        if (trackingCodeMatch) {
            const trackingCode = trackingCodeMatch[0].toUpperCase();
            return await fetchTrackingInfo(trackingCode);
        }

        // 2. HỆ THỐNG TÌM KIẾM KEYWORD THÔNG MINH
        let bestMatch = { score: 0, response: fallbackResponse };
        
        botData.forEach(item => {
            let currentScore = 0;
            item.keywords.forEach(keyword => {
                // Nếu từ khóa xuất hiện trong câu của người dùng, tăng điểm
                if (input.includes(keyword)) {
                    currentScore++;
                }
            });

            // Nếu câu trả lời này có điểm cao hơn, chọn nó
            if (currentScore > bestMatch.score) {
                bestMatch = { score: currentScore, response: item.response };
            }
        });

        // Thêm một chút độ trễ để bot có vẻ "suy nghĩ"
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
        return bestMatch.response;
    }
    
    // --- TÍNH NĂNG "SIÊU ĐỈNH": MÔ PHỎNG TRA CỨU VẬN ĐƠN ---
    // Hàm này giả lập việc gọi đến một API để lấy thông tin đơn hàng
    async function fetchTrackingInfo(trackingCode) {
        // Giả lập thời gian chờ khi gọi API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // --- PHẦN MÔ PHỎNG DỮ LIỆU ---
        // Trong thực tế, bạn sẽ gọi API của Vietnam Post ở đây và nhận về dữ liệu thật.
        // Ví dụ: const data = await fetch(`https://api.vietnampost.vn/v1/tracking?id=${trackingCode}`);
        // Ở đây, chúng ta tạo dữ liệu giả để minh họa.
        const mockData = {
            code: trackingCode,
            driver: "Nguyễn Văn An",
            phone: "090xxxx123",
            status: "Đang vận chuyển",
            currentLocation: "Bưu cục khai thác Cầu Giấy, Hà Nội",
            estimatedDelivery: "Thứ Sáu, trong giờ hành chính"
        };
        // --- KẾT THÚC PHẦN MÔ PHỎNG ---

        // Trả về chuỗi HTML được định dạng đẹp mắt
        return `
            <div class="tracking-result">
                <h4>Kết quả tra cứu cho mã <b>${mockData.code}</b>:</h4>
                <p><strong>Trạng thái:</strong> <span class="status-${mockData.status.toLowerCase().replace(' ', '-')}">${mockData.status}</span></p>
                <p><strong>Vị trí hiện tại:</strong> ${mockData.currentLocation}</p>
                <p><strong>Thời gian dự kiến giao:</strong> ${mockData.estimatedDelivery}</p>
                <p><strong>Tài xế giao hàng:</strong> ${mockData.driver} - SĐT: ${mockData.phone}</p>
            </div>
        `;
    }
});
