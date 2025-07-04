document.addEventListener('DOMContentLoaded', function () {
    // ---- PHẦN 1: KHỞI TẠO VÀ CẤU HÌNH ----

    const map = L.map('map').setView([16.047079, 108.206230], 6); // Set view trung tâm Việt Nam
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const mapInstruction = document.getElementById('map-instruction');
    let userMarker = null; // Lưu marker vị trí người dùng
    let routingControl = null; // Lưu control chỉ đường để có thể xóa

    // Tạo các loại icon
    const createIcon = (color) => new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });
    const icons = {
        green: createIcon('green'),
        yellow: createIcon('gold'),
        red: createIcon('red'),
        blue: createIcon('blue')
    };
    
    // ---- PHẦN 2: CÁC HÀM CHỨC NĂNG ----
    
    // Hàm vẽ đường đi từ điểm A đến điểm B
    function drawRoute(startLatLng, endLatLng, branchName) {
        if (routingControl) {
            map.removeControl(routingControl); // Xóa đường đi cũ
        }
        
        routingControl = L.Routing.control({
            waypoints: [ L.latLng(startLatLng), L.latLng(endLatLng) ],
            routeWhileDragging: false,
            show: true, // Hiển thị bảng chỉ dẫn chi tiết
            addWaypoints: false,
            lineOptions: { styles: [{ color: '#004680', opacity: 0.9, weight: 7 }] },
            // Tùy chỉnh ngôn ngữ
            router: new L.Routing.OSRMv1({
                language: 'vi'
            }),
            // Ẩn marker mặc định A, B vì chúng ta đã có marker riêng
            createMarker: function() { return null; } 
        }).addTo(map);

        mapInstruction.innerHTML = `Đang chỉ đường tới: <b>${branchName}</b>.`;
    }

    // Hàm hiển thị các bưu cục lên bản đồ
    async function displayBranches() {
        try {
            const response = await fetch('branches.json');
            const branches = await response.json();
            
            branches.forEach(branch => {
                let icon;
                if (branch.status.includes("Vắng")) icon = icons.green;
                else if (branch.status.includes("Trung bình")) icon = icons.yellow;
                else icon = icons.red;

                const marker = L.marker([branch.lat, branch.lng], { icon: icon }).addTo(map);
                
                // Tạo nội dung cho popup
                const popupContent = `
                    <b>${branch.name}</b><br>
                    ${branch.address}<br>
                    Tình trạng: ${branch.status}<br>
                    <button class="route-button" data-lat="${branch.lat}" data-lng="${branch.lng}" data-name="${branch.name}">Chỉ đường tới đây</button>
                `;
                marker.bindPopup(popupContent);
            });
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu bưu cục:", error);
            mapInstruction.innerText = "Không thể tải được danh sách bưu cục.";
        }
    }

    // ---- PHẦN 3: XỬ LÝ SỰ KIỆN VÀ LOGIC CHÍNH ----

    // Lấy vị trí người dùng
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                map.setView(userLatLng, 14); // Zoom vào vị trí người dùng
                userMarker = L.marker(userLatLng, { icon: icons.blue }).addTo(map)
                    .bindPopup("<b>Vị trí của bạn</b>").openPopup();
                
                mapInstruction.innerText = "Bấm vào một bưu cục hoặc nút 'Chỉ đường' để xem tuyến đường.";
            },
            (error) => {
                mapInstruction.innerText = "Không thể lấy vị trí của bạn. Vui lòng cấp quyền và tải lại trang.";
                console.error("Geolocation error:", error.message);
            }
        );
    } else {
        mapInstruction.innerText = "Trình duyệt của bạn không hỗ trợ định vị GPS.";
    }
    
    // Thêm sự kiện click cho các nút "Chỉ đường" (sử dụng event delegation)
    map.on('popupopen', function(e) {
        const routeBtn = e.popup._container.querySelector('.route-button');
        if (routeBtn) {
            routeBtn.addEventListener('click', function() {
                if (userMarker) {
                    const start = userMarker.getLatLng();
                    const end = {
                        lat: this.dataset.lat,
                        lng: this.dataset.lng
                    };
                    const name = this.dataset.name;
                    drawRoute(start, end, name);
                    e.popup._closeButton.click(); // Đóng popup sau khi bấm nút
                } else {
                    alert("Vui lòng cho phép truy cập vị trí để sử dụng tính năng này.");
                }
            });
        }
    });

    // Bắt đầu chạy: hiển thị các bưu cục
    displayBranches();
});