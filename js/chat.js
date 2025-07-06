// =================================================================================
// HÀM TIỆN ÍCH TOÀN CỤC (Để có thể gọi từ onclick trong chuỗi HTML)
// =================================================================================

/**
 * Hiển thị lời nhắc nhập mã vận đơn và gợi ý các mã mẫu.
 * @param {Event} event - Sự kiện click.
 */
function promptForTrackingCode(event) {
    // Ngăn hành vi mặc định của thẻ <a> (không tải lại trang)
    event.preventDefault(); 
    
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    
    // Tạo một tin nhắn mới từ bot với các gợi ý mã vận đơn
    const msgElement = document.createElement('div');
    msgElement.className = 'message bot-message';
    msgElement.innerHTML = `Vui lòng nhập mã vận đơn của bạn. 👇<br>
        Hoặc bạn có thể thử tra cứu với các mã mẫu sau:
        <br>
        <button class="suggestion-btn-inline" onclick="trySampleCode('VN_IN_TRANSIT')">VN_IN_TRANSIT</button> (Đang giao)
        <br>
        <button class="suggestion-btn-inline" onclick="trySampleCode('VN_DELIVERED')">VN_DELIVERED</button> (Đã giao)
        <br>
        <button class="suggestion-btn-inline" onclick="trySampleCode('VN_FAILED')">VN_FAILED</button> (Giao thất bại)
    `;
    chatMessages.appendChild(msgElement);

    // Tự động cuộn xuống tin nhắn mới nhất
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Tự động focus vào ô nhập liệu
    chatInput.focus();
}

/**
 * Tự động điền và gửi một mã vận đơn mẫu.
 * @param {string} sampleCode - Mã vận đơn mẫu để thử.
 */
function trySampleCode(sampleCode) {
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');
    chatInput.value = sampleCode;
    // Giả lập sự kiện submit form
    chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
}


// =================================================================================
// LOGIC CHÍNH CỦA CHATBOT
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Mở rộng bộ dữ liệu của bot với các câu hỏi và trả lời mới
    const botData = [
        // --- CHÀO HỎI & CÂU HỎI CHUNG ---
        {
            keywords: ["chào", "hello", "hi", "xin chào"],
            response: "👋 Chào bạn, tôi là trợ lý ảo của Vietnam Post. Tôi có thể giúp gì cho bạn về các dịch vụ của chúng tôi?"
        },
        {
            keywords: ["bưu cục", "giờ làm", "thời gian làm việc", "giờ hoạt động", "làm việc mấy giờ"],
            response: "⏰ Các bưu cục thường làm việc từ <b>Thứ 2 - Thứ 7, từ 7h30 - 19h00</b> (một số bưu cục lớn có thể mở cửa cả Chủ nhật).<br>👉 Bạn có thể gửi vị trí (ví dụ: 'Bưu cục gần Hồ Gươm') để chatbot tra cứu địa chỉ và thời gian hoạt động cụ thể."
        },
        {
            keywords: ["tổng đài", "số điện thoại", "liên hệ", "cskh"],
            response: "📞 Bạn có thể liên hệ tổng đài Chăm sóc khách hàng của chúng tôi qua số <b>1900 545481</b> (cước phí 1.000đ/phút).<br>Nếu tổng đài bận, bạn có thể để lại câu hỏi tại đây, tôi sẽ cố gắng hỗ trợ."
        },
        {
            keywords: ["cảm ơn", "thanks", "thank you", "ok"],
            response: "😊 Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngần ngại hỏi nhé."
        },

        // --- TRA CỨU & VẬN ĐƠN ---
        {
            keywords: ["vận đơn", "mã vận đơn", "tra mã", "tra cứu mã", "kiểm tra đơn", "kiểm tra hành trình", "theo dõi đơn"],
            response: "🔍 Chắc chắn rồi! Bạn có thể nhập mã vận đơn để tôi tra cứu hành trình theo thời gian thực.<br>👉 Hoặc bấm vào <a href='#' onclick='promptForTrackingCode(event)'>Tra cứu vận đơn ngay tại đây</a>."
        },
        
        // --- DỊCH VỤ & GIÁ CƯỚC ---
        {
            keywords: ["dịch vụ", "các loại dịch vụ"],
            response: `Chúng tôi cung cấp đa dạng dịch vụ để đáp ứng mọi nhu cầu của bạn:
            <ul>
                <li><b>Chuyển phát nhanh (EMS):</b> Giao hàng nhanh, ưu tiên.</li>
                <li><b>Chuyển phát thường:</b> Tiết kiệm chi phí cho hàng không gấp.</li>
                <li><b>COD (Thu hộ):</b> Giao hàng và thu tiền hộ an toàn.</li>
                <li><b>Gửi hàng quốc tế:</b> Vận chuyển đến hơn 200 quốc gia.</li>
            </ul>
            Bạn quan tâm đến dịch vụ nào nhất ạ?`
        },
        {
            keywords: ["cước phí", "giá cước", "phí vận chuyển", "hết bao nhiêu tiền", "tính giá"],
            response: "💰 Cước phí phụ thuộc vào <b>trọng lượng, kích thước, khoảng cách</b> và <b>loại dịch vụ</b> bạn chọn.<br>👉 Để nhận báo giá chính xác, bạn vui lòng cung cấp thông tin theo cú pháp: <br><em>'Giá cước từ [Điểm gửi] đến [Điểm nhận], [Trọng lượng]kg'</em> (ví dụ: Giá cước từ Hà Nội đến TP.HCM, 2kg)"
        },
        {
            keywords: ["hỏa tốc", "giao nhanh", "2h", "4h", "trong ngày"],
            response: "🚀 Hiện tại, chúng tôi có dịch vụ giao hàng hỏa tốc trong vài giờ tại các thành phố lớn như Hà Nội, TP.HCM, Đà Nẵng.<br>👉 Bạn có thể nhập địa chỉ gửi và nhận để tôi kiểm tra khu vực có hỗ trợ dịch vụ này không nhé."
        },
        {
            keywords: ["cod", "thu hộ", "tiền thu hộ"],
            response: "💰 Dịch vụ COD (thu hộ) cho phép bạn nhận tiền hàng sau khi chúng tôi giao thành công. Tiền sẽ được hoàn lại cho bạn qua tài khoản ngân hàng hoặc bạn có thể nhận tiền mặt tại bưu cục. Thời gian hoàn tiền thường từ 1-3 ngày làm việc."
        },
         {
            keywords: ["Hà Nội vào TP.HCM", "hà nội sài gòn", "HN vào HCM", "bao lâu"],
            response: `✈️ Thời gian gửi hàng từ Hà Nội vào TP.HCM thường như sau:
            <ul>
                <li><b>Chuyển phát nhanh (EMS):</b> khoảng 1–2 ngày làm việc.</li>
                <li><b>Chuyển phát thường:</b> khoảng 3–5 ngày làm việc.</li>
            </ul>
            ⚠️ <b>Lưu ý:</b> Thời gian có thể thay đổi vào dịp lễ Tết hoặc do các yếu tố khách quan.`
        },

        // --- QUY ĐỊNH HÀNG HÓA & ĐÓNG GÓI ---
        {
            keywords: ["cấm gửi", "hàng cấm", "không được gửi"],
            response: `❌ Theo quy định, một số mặt hàng bị cấm gửi bao gồm:
            <ul>
                <li>Chất cháy nổ, vũ khí, chất kích thích.</li>
                <li>Tiền mặt, kim loại quý, sinh vật sống.</li>
                <li>Hàng hóa bị cấm lưu thông theo luật pháp Việt Nam.</li>
            </ul>
            👉 Nếu bạn không chắc chắn về mặt hàng của mình, hãy cho tôi biết đó là gì để tôi kiểm tra giúp bạn.`
        },
        {
            keywords: ["thực phẩm", "đồ ăn", "gửi đồ ăn"],
            response: "📦 Bạn có thể gửi thực phẩm khô, được đóng gói hút chân không, có nhãn mác và hạn sử dụng rõ ràng. Chúng tôi hạn chế vận chuyển thực phẩm tươi sống, dễ hư hỏng hoặc có mùi."
        },
        {
            keywords: ["pin", "sạc dự phòng", "pin lithium", "gửi pin"],
            response: `🔋 Hàng điện tử có pin cần tuân thủ quy định an toàn hàng không:
            <ul>
                <li>Pin lithium chỉ được gửi khi <b>đã lắp trong thiết bị</b> (điện thoại, laptop).</li>
                <li><b>Không nhận gửi pin rời</b> hoặc sạc dự phòng qua đường hàng không. Một số tuyến bộ vẫn có thể chấp nhận, vui lòng liên hệ bưu cục để được tư vấn.</li>
            </ul>`
        },
        {
            keywords: ["đóng gói", "gói hàng", "hướng dẫn gói", "hỗ trợ đóng gói"],
            response: "📦 Tại các bưu cục lớn, chúng tôi có cung cấp thùng carton và vật liệu đóng gói. Nhân viên cũng sẽ hỗ trợ bạn đóng gói đúng quy cách để đảm bảo an toàn cho hàng hóa.<br>👉 Bạn đang muốn gửi mặt hàng gì để tôi tư vấn cách đóng gói phù hợp nhất?"
        },
        {
            keywords: ["cồng kềnh", "hàng to", "xe máy", "xe đạp"],
            response: "🚚 Chúng tôi có dịch vụ vận chuyển hàng cồng kềnh. Cước phí sẽ được tính dựa trên trọng lượng quy đổi (Dài x Rộng x Cao / 5000) nếu lớn hơn trọng lượng thực tế.<br>👉 Vui lòng cung cấp kích thước và trọng lượng để tôi tư vấn dịch vụ phù hợp."
        },
        {
            keywords: ["quốc tế", "nước ngoài", "gửi đi mỹ", "gửi đi úc"],
            response: `🌎 Chúng tôi hỗ trợ gửi hàng đến hơn 200 quốc gia! Để gửi hàng quốc tế, bạn cần:
            <ul>
                <li>Chuẩn bị giấy tờ tùy thân (CMND/CCCD).</li>
                <li>Cung cấp đầy đủ thông tin người nhận (địa chỉ, mã ZIP/Postcode, số điện thoại).</li>
                <li>Khai báo nội dung hàng hóa và giá trị để làm thủ tục hải quan.</li>
            </ul>
            Nhân viên tại bưu cục sẽ hướng dẫn bạn chi tiết.`
        },

        // --- KHIẾU NẠI & SỰ CỐ ---
        {
            keywords: ["chậm trễ", "chưa được giao", "lâu giao", "trạng thái không cập nhật"],
            response: "😥 Rất xin lỗi vì sự chậm trễ này! Đôi khi đơn hàng có thể bị ảnh hưởng bởi thời tiết, giao thông hoặc quá tải vào các đợt cao điểm.<br>👉 Vui lòng cung cấp mã vận đơn, tôi sẽ kiểm tra tình hình cụ thể và thúc đẩy quá trình giao hàng."
        },
        {
            keywords: ["hư hỏng", "bị vỡ", "móp méo", "hỏng", "thất lạc", "mất hàng"],
            response: "🔧 Chúng tôi rất tiếc về sự cố này. Vietnam Post có chính sách bồi thường cho các trường hợp hàng hóa bị hư hỏng hoặc thất lạc do lỗi vận chuyển.<br>👉 Vui lòng cung cấp <b>mã vận đơn</b> và <b>hình ảnh/video</b> về tình trạng hàng hóa để chúng tôi bắt đầu quy trình khiếu nại."
        },
        {
            keywords: ["hoàn về", "bị hoàn", "trả hàng"],
            response: "↩️ Rất tiếc về sự bất tiện này. Đơn hàng có thể bị hoàn về do các lý do như: không liên hệ được người nhận nhiều lần, người nhận từ chối nhận hàng, hoặc sai địa chỉ.<br>👉 Hãy cung cấp mã vận đơn để tôi kiểm tra lý do cụ thể."
        },
        {
            keywords: ["huỷ đơn", "hủy hàng", "không gửi nữa"],
            response: "🚫 Bạn có thể hủy đơn nếu bưu tá chưa đến lấy hàng hoặc hàng vẫn còn ở bưu cục gửi. Nếu hàng đã được chuyển đi, sẽ phát sinh chi phí hoàn hàng.<br>👉 Vui lòng cung cấp mã vận đơn để tôi kiểm tra trạng thái và hỗ trợ bạn."
        },
        {
            keywords: ["thay đổi thông tin", "đổi địa chỉ", "đổi số điện thoại"],
            response: "✏️ Việc thay đổi thông tin người nhận là có thể nếu đơn hàng chưa được phát. Tuy nhiên, việc này có thể làm phát sinh chi phí và kéo dài thời gian giao hàng.<br>👉 Hãy cung cấp mã vận đơn và thông tin mới cần thay đổi, tôi sẽ kiểm tra khả năng hỗ trợ."
        },
        {
            keywords: ["không hài lòng", "thái độ nhân viên", "thái độ shipper", "bưu tá khó chịu"],
            response: "😔 Rất tiếc về trải nghiệm không tốt của bạn. Mọi phản hồi đều quý giá để chúng tôi cải thiện dịch vụ.<br>👉 Mong bạn chia sẻ thêm chi tiết về thời gian, địa điểm hoặc mã vận đơn liên quan. Chúng tôi cam kết sẽ xác minh và xử lý nghiêm túc."
        },
        {
            keywords: ["chờ lâu", "bưu cục đông"],
            response: "⏱️ Rất tiếc vì đã để bạn phải chờ đợi. Để tiết kiệm thời gian, bạn có thể sử dụng ứng dụng My Vietnam Post để <b>tạo đơn hàng trước tại nhà</b> hoặc sử dụng dịch vụ <b>yêu cầu bưu tá đến lấy hàng tận nơi</b>."
        }
    ];

    const fallbackResponse = "❓ Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Để được tư vấn chính xác, bạn có thể liên hệ tổng đài CSKH qua số <b>1900 545481</b> hoặc thử diễn đạt câu hỏi theo cách khác. Cảm ơn bạn!";

    // --- KHỞI TẠO CHATBOT ---
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

    // --- CÁC HÀM XỬ LÝ CHÍNH ---
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
            // Dùng DOMPurify để làm sạch HTML trước khi chèn, tránh XSS
            // Nếu không có thư viện này, tạm thời chấp nhận rủi ro trong môi trường demo
            // msgElement.innerHTML = DOMPurify.sanitize(text);
            msgElement.innerHTML = text;
        }
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgElement;
    }

   async function getBotResponse(userInput) {
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const input = normalize(userInput);
        // Ưu tiên kiểm tra mã vận đơn trước
        const trackingCodeMatch = userInput.trim().match(/VN_[A-Z_]+/i);
        if (trackingCodeMatch) {
            const trackingCode = trackingCodeMatch[0].toUpperCase();
            return await fetchTrackingInfo(trackingCode);
        }

        let bestMatch = { score: -1, response: fallbackResponse };
        botData.forEach(item => {
            let currentScore = 0;
            item.keywords.forEach(keyword => {
                // Tăng điểm nếu từ khóa xuất hiện
                if (input.includes(normalize(keyword))) {
                    currentScore += 1;
                    // Thưởng điểm cho từ khóa dài hơn (khớp chính xác hơn)
                    currentScore += normalize(keyword).length / 10.0; 
                }
            });
            if (currentScore > bestMatch.score) {
                bestMatch = { score: currentScore, response: item.response };
            }
        });

        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));
        return bestMatch.score > 0 ? bestMatch.response : fallbackResponse;
    }

    // --- "SIÊU CHUẨN" TRA CỨU ĐƠN HÀNG ---
    // =================================================================================
// "SIÊU CHUẨN" TRA CỨU ĐƠN HÀNG - PHIÊN BẢN NÂNG CẤP
// Thay thế toàn bộ hàm cũ bằng hàm này.
// =================================================================================
async function fetchTrackingInfo(trackingCode) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập độ trễ mạng

    const mockDatabase = {
        // --- Kịch bản 1: Đang trên đường giao ---
        "VN_IN_TRANSIT": {
            status: "Đang vận chuyển", statusIcon: "🚚", statusClass: "status-transit",
            senderInfo: { name: "Công ty Sách Alpha", address: "123 Đường Sách, Ba Đình, Hà Nội" },
            recipientInfo: { name: "Nguyễn Văn An", address: "456 Đường Hoa, Quận 1, TP.HCM" },
            packageInfo: { description: "Sách kỹ năng sống (x3)", weight: "1.2 kg", dimensions: "30x20x15 cm", declaredValue: "450,000đ" },
            serviceInfo: { type: "Chuyển phát nhanh (EMS)", notes: "Hàng dễ vỡ" },
            paymentInfo: { codAmount: "485,000đ", status: "Chưa thanh toán" },
            deliveryEstimate: "dự kiến giao vào Thứ Sáu, 24/05/2024",
            currentLocation: "Đang được vận chuyển từ Đà Nẵng đến TP.HCM.",
            nextAction: "Đơn hàng đang di chuyển đúng tiến độ. Bưu tá sẽ gọi cho bạn trước khi giao.",
            history: [
                { time: "11:25 23/05/2024", location: "Rời khỏi Trung tâm khai thác khu vực Đà Nẵng.", status: "Đang vận chuyển" },
                { time: "08:10 23/05/2024", location: "Đã đến Trung tâm khai thác khu vực Đà Nẵng.", status: "Đến kho" },
                { time: "22:45 22/05/2024", location: "Rời khỏi Trung tâm khai thác khu vực Hà Nội.", status: "Rời kho" },
                { time: "15:00 22/05/2024", location: "Bưu cục Cầu Giấy đã nhận hàng từ người gửi.", status: "Đã lấy hàng" }
            ]
        },
        // --- Kịch bản 2: Đã giao thành công ---
        "VN_DELIVERED": {
            status: "Đã giao thành công", statusIcon: "✅", statusClass: "status-success",
            senderInfo: { name: "Trần Thị Bích", address: "789 Đường Vải, Hoàn Kiếm, Hà Nội" },
            recipientInfo: { name: "Lê Thị Lan", address: "101 Đường Cây, Phú Nhuận, TP.HCM" },
            packageInfo: { description: "Quần áo thời trang", weight: "0.8 kg", dimensions: "25x20x10 cm", declaredValue: "800,000đ" },
            serviceInfo: { type: "Chuyển phát thường", notes: "Không có" },
            paymentInfo: { codAmount: "0đ", status: "Đã thanh toán trước" },
            deliveryEstimate: "đã giao lúc 14:30 21/05/2024",
            currentLocation: "Đã giao thành công cho người nhận.",
            nextAction: "Cảm ơn bạn đã tin dùng Vietnam Post! <a href='#' onclick='alert(\"Mở form đánh giá!\")'>Đánh giá trải nghiệm</a> của bạn tại đây.",
            history: [
                { time: "14:30 21/05/2024", location: "Giao hàng thành công. Người nhận: Lê Thị Lan (đã ký nhận).", status: "Thành công" },
                { time: "09:00 21/05/2024", location: "Bưu tá Trần Văn Hùng (SĐT: 098xxxx456) đang giao hàng.", status: "Đang giao hàng" },
                { time: "07:30 21/05/2024", location: "Đã đến Bưu cục phát Phú Nhuận.", status: "Đến bưu cục phát" }
            ]
        },
        // --- Kịch bản 3: Giao thất bại, cần hành động ---
        "VN_FAILED": {
            status: "Giao hàng không thành công", statusIcon: "❌", statusClass: "status-failed",
            senderInfo: { name: "Shop Điện Tử Minh Phát", address: "246 Phố Huế, Hà Nội" },
            recipientInfo: { name: "Phạm Văn Tuấn", address: "357 Ngõ Hẹp, Đống Đa, Hà Nội" },
            packageInfo: { description: "Tai nghe không dây", weight: "0.5 kg", dimensions: "15x10x5 cm", declaredValue: "1,200,000đ" },
            serviceInfo: { type: "Giao hàng hỏa tốc", notes: "Giao trong giờ hành chính" },
            paymentInfo: { codAmount: "1,200,000đ", status: "Chưa thanh toán" },
            deliveryEstimate: "sẽ giao lại vào ngày làm việc tiếp theo",
            currentLocation: "Bưu tá không liên lạc được với người nhận.",
            nextAction: "Chúng tôi sẽ thử giao lại. Bạn có muốn <a href='#' onclick='alert(\"Mở form cập nhật SĐT!\")'>cập nhật số điện thoại</a> hoặc <a href='#' onclick='alert(\"Mở form chọn ngày!\")'>chọn ngày giao khác</a> không?",
            history: [
                { time: "11:00 22/05/2024", location: "Không liên lạc được với người nhận qua SĐT. Sẽ thử lại vào ngày mai.", status: "Thất bại" },
                { time: "09:15 22/05/2024", location: "Bưu tá Lê Minh Tuấn (SĐT: 091xxxx789) đang giao hàng.", status: "Đang giao hàng" },
                { time: "08:00 22/05/2024", location: "Hàng đã đến bưu cục phát Đống Đa.", status: "Đến bưu cục phát" }
            ]
        },
        // --- Kịch bản 4: Đang hoàn hàng ---
        "VN_RETURNING": {
            status: "Đang hoàn về người gửi", statusIcon: "↩️", statusClass: "status-returning",
            senderInfo: { name: "Cửa hàng Gốm Sứ Bát Tràng", address: "Làng gốm Bát Tràng, Gia Lâm, Hà Nội" },
            recipientInfo: { name: "Ngô Bảo Châu", address: "999 Đường Khoa Học, Quận 10, TP.HCM" },
            packageInfo: { description: "Bộ ấm chén gốm sứ", weight: "2.5 kg", dimensions: "40x30x20 cm", declaredValue: "750,000đ" },
            serviceInfo: { type: "Chuyển phát thường", notes: "Hàng dễ vỡ" },
            paymentInfo: { codAmount: "750,000đ", status: "Chưa thanh toán" },
            deliveryEstimate: "dự kiến về đến bưu cục gửi trong 3-4 ngày",
            currentLocation: "Đang trên đường quay về trung tâm khai thác tại Hà Nội.",
            nextAction: "Đơn hàng đang được hoàn về người gửi. Vui lòng liên hệ người gửi để biết thêm chi tiết.",
            history: [
                { time: "16:00 23/05/2024", location: "Bắt đầu quy trình hoàn hàng.", status: "Đang hoàn hàng" },
                { time: "11:05 23/05/2024", location: "Giao lại thất bại. Người nhận từ chối nhận hàng (lý do: Đặt nhầm sản phẩm).", status: "Từ chối nhận" }
            ]
        },
        // --- Kịch bản 5: Hàng quốc tế ---
         "VN_INTERNATIONAL": {
            status: "Đang thông quan", statusIcon: "🌍", statusClass: "status-info",
            senderInfo: { name: "Mai Anh Boutique", address: "12 Hàng Bông, Hà Nội, Việt Nam" },
            recipientInfo: { name: "John Smith", address: "123 Main St, Los Angeles, CA 90001, USA" },
            packageInfo: { description: "Áo dài lụa truyền thống", weight: "0.7 kg", dimensions: "30x20x5 cm", declaredValue: "$150 USD" },
            serviceInfo: { type: "Chuyển phát quốc tế (EMS)", notes: "Quà tặng" },
            paymentInfo: { codAmount: "0đ", status: "Đã thanh toán cước" },
            deliveryEstimate: "dự kiến giao trong 5-7 ngày tới",
            currentLocation: "Đã hoàn tất thủ tục hải quan tại Los Angeles, Hoa Kỳ.",
            nextAction: "Đơn hàng đang được xử lý bởi đối tác USPS. Bạn có thể theo dõi trên website USPS với cùng mã vận đơn.",
            history: [
                { time: "05:30 23/05/2024", location: "Hoàn tất thủ tục hải quan, đang được chuyển đến trung tâm chia chọn của USPS.", status: "Thông quan thành công" },
                { time: "21:00 22/05/2024", location: "Đã đến trung tâm khai thác quốc tế tại Los Angeles, USA.", status: "Đến nước nhận" },
                { time: "14:15 20/05/2024", location: "Đã rời khỏi Việt Nam.", status: "Rời Việt Nam" }
            ]
        }
    };

    const data = mockDatabase[trackingCode];

    if (!data) {
        return `
            <div class="tracking-result">
                <h4>🔍 Kết quả tra cứu cho mã <b>${trackingCode}</b></h4>
                <div class="tracking-summary">
                    <p><strong>Trạng thái:</strong> <span class="status-highlight status-not-found">Không tìm thấy</span></p>
                    <p>Mã vận đơn này không tồn tại hoặc đã bị hủy. Vui lòng kiểm tra lại mã hoặc liên hệ tổng đài <b>1900 545481</b> để được hỗ trợ.</p>
                </div>
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
            <h4>${data.statusIcon} Kết quả tra cứu: <b>${trackingCode}</b></h4>
            <div class="tracking-summary">
                <p><strong>Trạng thái:</strong> <span class="status-highlight ${data.statusClass}">${data.status}</span></p>
                <p><strong>Vị trí hiện tại:</strong> ${data.currentLocation}</p>
                <p><strong>Thời gian dự kiến:</strong> ${data.deliveryEstimate}</p>
            </div>

            <hr>
            
            <div class="tracking-section">
                <h5>Thông tin đơn hàng</h5>
                <div class="info-grid">
                    <div><strong>Từ:</strong><p>${data.senderInfo.name}<br><small>${data.senderInfo.address}</small></p></div>
                    <div><strong>Đến:</strong><p>${data.recipientInfo.name}<br><small>${data.recipientInfo.address}</small></p></div>
                </div>
                <div class="info-grid">
                     <div><strong>Gói hàng:</strong><p>${data.packageInfo.description} (${data.packageInfo.weight})</p></div>
                     <div><strong>Dịch vụ:</strong><p>${data.serviceInfo.type}</p></div>
                </div>
                 <div class="info-grid">
                     <div><strong>Thanh toán:</strong><p>${data.paymentInfo.codAmount === "0đ" ? "Đã trả trước" : `Thu hộ (COD): ${data.paymentInfo.codAmount}`}</p></div>
                     <div><strong>Ghi chú:</strong><p>${data.serviceInfo.notes}</p></div>
                </div>
            </div>

            <hr>

            <div class="tracking-section">
                <h5>Lịch sử hành trình chi tiết</h5>
                <ul class="tracking-history">${historyHtml}</ul>
            </div>
            
            <div class="next-action-tip">
                <strong>💡 Gợi ý:</strong> ${data.nextAction}
            </div>
        </div>
    `;
}

        const historyHtml = data.history.map(item => `
            <li class="${item.class}">
                <div class="history-time">${item.time}</div>
                <div class="history-details"><b>${item.status}:</b> ${item.location}</div>
            </li>
        `).join('');

        return `
            <div class="tracking-result">
                <h4>${data.statusIcon} Kết quả tra cứu cho mã <b>${trackingCode}</b></h4>
                <div class="tracking-summary">
                    <p><strong>Trạng thái:</strong> <span class="${data.statusClass}">${data.status}</span></p>
                    <p><strong>Vị trí hiện tại:</strong> ${data.currentLocation}</p>
                    <p><strong>Thời gian dự kiến:</strong> ${data.deliveryEstimate}</p>
                    <p><strong>Phụ trách:</strong> ${data.driver} ${data.phone !== "N/A" ? `(${data.phone})` : ''}</p>
                </div>
                <hr>
                <h5>Lịch sử hành trình chi tiết:</h5>
                <ul class="tracking-history">${historyHtml}</ul>
            </div>
        `;
    }
    );