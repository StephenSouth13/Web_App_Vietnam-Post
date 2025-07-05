document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');

  const botData = {
    "chào|hi|hello|xin chào": "👋 Xin chào! Tôi là trợ lý ảo Vietnam Post. Bạn cần hỗ trợ điều gì ạ?",
    "giờ làm việc|làm việc từ mấy giờ|bưu cục hoạt động": "⏰ Bưu cục hoạt động từ 7h30 đến 17h30 (Thứ 2 - Thứ 6), một số nơi làm đến 19h hoặc cả cuối tuần.",
    "gửi hàng quốc tế|quốc tế|nước ngoài": "🌏 Vietnam Post hỗ trợ gửi hàng tới hơn 200 quốc gia: Mỹ, Nhật, Hàn, Đức... Nhập tên quốc gia để kiểm tra.",
    "tra cứu|vận đơn|mã đơn|kiểm tra đơn": "🔍 Nhập mã vận đơn có định dạng <b>VNxxxxxxxxx</b> để kiểm tra hành trình. Hoặc tra tại: <a href='https://www.vnpost.vn/tra-cuu' target='_blank'>vnpost.vn/tra-cuu</a>",
    "đóng gói|hướng dẫn đóng|gói hàng": "📦 Bạn nên sử dụng thùng carton, bọc chống sốc, dán kín băng keo. Nhập loại hàng để nhận video hướng dẫn đóng gói phù hợp.",
    "pin|sạc|pin lithium": "⚠️ Chỉ nhận gửi thiết bị có pin lắp sẵn (như điện thoại, laptop). Không gửi pin rời hoặc không rõ nguồn gốc.",
    "thực phẩm|đồ ăn": "🍱 Thực phẩm khô được phép gửi nếu đóng gói kỹ và hạn sử dụng dài. Tươi sống có thể bị hạn chế.",
    "giao hàng hỏa tốc|giao nhanh|trong ngày|2h 4h": "🚀 Dịch vụ giao hàng 2h, 4h hoặc trong ngày có tại TP lớn. Nhập địa chỉ gửi/nhận để kiểm tra hỗ trợ.",
    "cồng kềnh|xe máy|nội thất|hàng lớn": "📐 Vietnam Post nhận hàng cồng kềnh (xe, máy móc...), cần báo rõ kích thước & khối lượng để tư vấn đúng.",
    "chưa giao|chưa nhận|giao trễ|giao chậm": "📦 Xin lỗi bạn. Hàng có thể bị ảnh hưởng bởi thời tiết hoặc quá tải. Gửi mã đơn để kiểm tra chi tiết.",
    "shipper không nghe|không liên hệ được": "☎️ Có thể shipper đang giao hàng. Bạn có thể chọn: <br>• Gửi thông báo lại<br>• Liên hệ tổng đài 1900 545481",
    "hư hỏng|vỡ|bồi thường|lỗi hàng": "💔 Rất tiếc vì sự cố. Gửi ảnh + mã đơn để chúng tôi xử lý khiếu nại/bồi thường nhanh nhất.",
    "bị hoàn|đơn bị trả lại|giao không thành công": "↩️ Đơn có thể bị hoàn do không liên hệ được hoặc sai địa chỉ. Gửi mã để kiểm tra lý do cụ thể.",
    "huỷ đơn|muốn huỷ": "❌ Bạn có thể huỷ miễn phí nếu đơn chưa gửi. Vui lòng nhập mã để kiểm tra tình trạng đơn.",
    "thay đổi thông tin|đổi địa chỉ|số người nhận": "✏️ Nếu đơn chưa giao, bạn có thể đổi thông tin. Vui lòng nhập mã để kiểm tra & hỗ trợ điều chỉnh.",
    "phí|giá|bao nhiêu tiền|ship bao nhiêu": "💰 Phí phụ thuộc vào khối lượng, kích thước, loại dịch vụ (nhanh, thường), và khoảng cách. Gửi thông tin cụ thể để báo giá.",
    "app khó dùng|giao diện app": "📱 Cảm ơn góp ý. Ứng dụng đang cải tiến để dễ dùng hơn. Bạn có thể tạo đơn, tra cứu, và hỗ trợ trực tiếp trong app.",
    "tôi cần chuẩn bị gì|gửi hàng cần gì": "📝 Bạn nên: đóng gói kỹ, ghi rõ thông tin người nhận, đo kích thước, và có thể tạo đơn trước qua app để tiết kiệm thời gian.",
    "đóng gói hộ|có đóng gói không": "📦 Một số bưu cục có hỗ trợ đóng gói. Bạn nên đến sớm nếu vào giờ cao điểm.",
    "từ hà nội vào tphcm|thời gian vận chuyển": "🚚 Từ Hà Nội → TP.HCM:\n- EMS: 1–3 ngày\n- Thường: 3–5 ngày\n*Có thể chậm dịp lễ, thời tiết xấu.",
    "tổng đài|liên hệ|gọi điện": "☎️ Vui lòng gọi <b>1900 545481</b> để gặp tổng đài viên hỗ trợ trực tiếp.",
    "cảm ơn|thank you|thanks": "❤️ Rất vui được hỗ trợ bạn. Nếu cần gì thêm, cứ hỏi tiếp nhé!",
    "fallback": "❗ Xin lỗi, tôi chưa hiểu rõ câu hỏi. Bạn có thể thử lại bằng từ khác, hoặc gọi <b>1900 545481</b> để được hỗ trợ ngay."
  };

  // Auto chào khi mở trang
  setTimeout(() => appendMessage(botData["chào|hi|hello|xin chào"], 'bot'), 400);

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
    setTimeout(() => appendMessage(getBotResponse(message), 'bot'), 700 + Math.random() * 400);
  }

  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', `${sender}-message`);
    msg.innerHTML = text.replace(/\n/g, "<br>");
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userInput) {
    const input = userInput.toLowerCase();
    const trackingCode = input.match(/vn\d{9}/i);
    if (trackingCode) {
      return `📦 Mã đơn <b>${trackingCode[0].toUpperCase()}</b> đang được xử lý...<br>👉 <a href="https://www.vnpost.vn/tra-cuu" target="_blank">Click để tra cứu tại đây</a>`;
    }

    for (const key in botData) {
      if (key !== "fallback" && key.split('|').some(keyword => input.includes(keyword.trim()))) {
        return botData[key];
      }
    }
    return botData["fallback"];
  }
});
