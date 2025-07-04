# 🇻🇳 Vietnam Post - Hệ Thống Hỗ Trợ Khách Hàng

Đây là một dự án ứng dụng web front-end nhằm mô phỏng một hệ thống hỗ trợ khách hàng cho Vietnam Post. Ứng dụng cung cấp các công cụ tương tác giúp người dùng dễ dàng tìm kiếm thông tin, định vị bưu cục, xem hướng dẫn và nhận giải đáp thắc mắc.

**🔗 Link Demo trực tiếp:**https://stephensouth13.github.io/Web_App_Vietnam-Post/  _(Lưu ý: Tính năng GPS yêu cầu cấp quyền vị trí trên trình duyệt)_

![image](https://github.com/user-attachments/assets/df7c4512-a253-4be6-9249-94a7a1422578)


## ✨ Các Tính Năng Nổi Bật

Dự án được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript "thuần" (Vanilla JS)**, không sử dụng bất kỳ framework nào để tối ưu hóa hiệu năng và tốc độ tải trang.

### 1. 🗺️ Bản Đồ Chi Nhánh Tương Tác
- **Định vị GPS:** Tự động xác định vị trí của người dùng (yêu cầu quyền truy cập).
- **Chỉ đường thời gian thực:** Vẽ tuyến đường từ vị trí người dùng đến bất kỳ bưu cục nào trên bản đồ, kèm theo bảng hướng dẫn chi tiết (khoảng cách, thời gian, các ngã rẽ).
- **Hiển thị trực quan:** Sử dụng các marker màu sắc để thể hiện tình trạng hoạt động của bưu cục (🟢 Vắng, 🟡 Trung bình, 🔴 Đông).
- **Công nghệ:** Tích hợp **Leaflet.js** và **Leaflet Routing Machine** với bộ não tìm đường OSRM.
>![image](https://github.com/user-attachments/assets/ec7db737-c137-42d4-a329-b05439519184)



### 2. 💬 Chatbot Hỏi Đáp Thông Minh
- **Giải đáp tự động:** Trả lời các câu hỏi thường gặp về quy trình gửi hàng, hàng hóa cấm, cước phí, giờ làm việc...
- **Kho dữ liệu phong phú:** Được xây dựng với một kho kiến thức đa dạng để xử lý nhiều loại câu hỏi.
- **Cơ chế Fallback:** Khi không nhận diện được câu hỏi, bot sẽ tự động cung cấp hotline hỗ trợ trực tiếp.
- **Hoạt động offline:** Không cần kết nối tới API của bên thứ ba, xử lý hoàn toàn phía client.
>![image](https://github.com/user-attachments/assets/c6757049-6f28-48a8-958c-7c281cf9c825)



### 3. 🎬 Thư Viện Video Hướng Dẫn
- **Phân loại rõ ràng:** Các video hướng dẫn đóng gói được chia theo từng tab chuyên biệt (Hàng dễ vỡ, Chất lỏng/Pin, Hàng giá trị cao).
- **Giao diện Tab hiện đại:** Giúp người dùng dễ dàng chuyển đổi giữa các loại hướng dẫn.
- **Nhúng video từ YouTube:** Tích hợp `iframe` một cách responsive.
>![image](https://github.com/user-attachments/assets/5c76700a-85ed-401e-90f8-38e64c37cb64)



### 4. 🎨 Giao Diện Người Dùng (UI/UX)
- **Thiết kế Responsive:** Giao diện được tối ưu hóa hoàn hảo trên mọi thiết bị, từ điện thoại di động đến máy tính để bàn.
- **Menu Hamburger:** Tự động chuyển sang menu ẩn trên thiết bị di động với hiệu ứng mượt mà.
- **Hiệu ứng động:** Các hiệu ứng `hover`, `transition`, và `animation` được thêm vào một cách tinh tế để tăng trải nghiệm người dùng.
- **Tái sử dụng Component:** Header và Footer được tải động bằng `fetch()` để giảm lặp code và dễ dàng bảo trì.
>![image](https://github.com/user-attachments/assets/0385464b-f66d-4586-ac6f-04bd2d66a0b1)

## 🛠️ Công Nghệ Sử Dụng

-   **Ngôn ngữ:**
    -   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
    -   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    -   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
-   **Thư viện JavaScript:**
    -   [Leaflet.js](https://leafletjs.com/): Thư viện bản đồ mã nguồn mở.
    -   [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/): Plugin chỉ đường cho Leaflet.
-   **Font & Icons:**
    -   [Google Fonts (Be Vietnam Pro)](https://fonts.google.com/specimen/Be+Vietnam+Pro): Font chữ chính của dự án.
    -   [Font Awesome](https://fontawesome.com/): Thư viện biểu tượng.

## 🚀 Cài Đặt và Chạy Dự Án

Dự án này là một ứng dụng web tĩnh và không yêu cầu quá trình build phức tạp.

1.  **Clone a repository:**
    ```bash
    git clone https://github.com/StephenSouth13/Web_App_Vietnam-Post.git
    ```
2.  **Di chuyển vào thư mục dự án:**
    ```bash
    cd Web_App_Vietnam-Post
    ```
3.  **Chạy với Live Server:**
    -   Dự án sử dụng `fetch()` để tải các components, vì vậy bạn **không thể** mở file `index.html` trực tiếp trên trình duyệt.
    -   Cách đơn giản nhất là sử dụng extension **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** trên Visual Studio Code.
    -   Sau khi cài đặt, chuột phải vào file `index.html` và chọn `Open with Live Server`.

## 📁 Cấu Trúc Thư Mục
/vietnam-post/
├── index.html # Trang chủ
├── map.html # Bản đồ chi nhánh
├── video.html # Thư viện video hướng dẫn
├── chat.html # Chat AI hỏi đáp
├── contact.html # Trang liên hệ
├── branches.json # Dữ liệu các bưu cục
│
├── css/ # Chứa các file CSS
│ ├── global.css # CSS chung (variables, header, footer)
│ └── ... # CSS riêng cho từng trang
│
├── js/ # Chứa các file JavaScript
│ ├── main.js # JS chung (tải component, menu)
│ ├── map.js # Logic cho bản đồ
│ └── chat.js # Logic cho chatbot
│
├── assets/ # Chứa hình ảnh, logo
│
└── components/ # Chứa các thành phần HTML tái sử dụng
├── header.html
└── footer.html
Generated code
## 🌟 Lời Cảm Ơn

Cảm ơn bạn đã ghé thăm dự án này. Mọi ý kiến đóng góp để cải thiện sản phẩm đều được hoan nghênh!
