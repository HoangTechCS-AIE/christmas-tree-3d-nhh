# 🎄 Cây Thông Noel 3D Tương Tác (Interactive 3D Christmas Tree)

Dự án web 3D tương tác mừng Giáng Sinh và Năm Mới, được xây dựng bằng **Three.js** và **MediaPipe**. Ứng dụng mang đến trải nghiệm thị giác ấn tượng với cây thông được cấu tạo từ hàng ngàn hạt particles, hệ thống tuyết rơi vật lý, và khả năng tương tác qua cử chỉ tay AI.

![Three.js](https://img.shields.io/badge/Three.js-v0.160.0-black) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Hand_Tracking-blue) ![JavaScript](https://img.shields.io/badge/ES6+-JavaScript-yellow)

## ✨ Tính Năng Nổi Bật (Dựa trên Source Code)

### 🎵 1. Music Visualizer (Mới)
*   **Phản ứng theo nhạc**: Cây thông sẽ thay đổi kích thước và độ rực rỡ dựa trên giải tần số âm thanh (bass) của bài hát đang phát.
*   **Tải nhạc cá nhân**: Người dùng có thể tải lên file âm thanh (`.mp3`, `.wav`) thông qua nút **"Thêm Nhạc"**.
*   **Công nghệ**: Sử dụng `Web Audio API` (`AudioContext`, `AnalyserNode`) để phân tích dữ liệu âm thanh thời gian thực.

### ⏳ 2. Đồng Hồ Đếm Ngược
*   Hiển thị thời gian thực còn lại đến ngày Giáng Sinh (25/12) theo Ngày : Giờ : Phút : Giây.
*   Giao diện hộp số trong suốt sang trọng.

### 🌟 3. Ngôi Sao Đỉnh Cây (Merkaba Star)
*   Ngôi sao 3D lộng lẫy được tạo thành từ tích hai hình tứ diện (`TetrahedronGeometry`) lồng vào nhau.
*   Hiệu ứng phát sáng (`Emissive Material`) và ánh sáng điểm (`PointLight`) vàng rực rỡ.

### 🎨 4. Hệ Thống 6 Chủ Đề Màu Sắc (Color Themes)
Nhấn phím **'C'** để chuyển đổi giữa các tông màu:
1.  **Midnight Aurora** 🌌 (Mặc định): Xanh Neon & Tím Đen.
2.  **Sakura Dream** 🌸: Hồng Phấn & Tím Violet.
3.  **Ocean Breeze** 🌊: Xanh Ngọc & Xanh Biển.
4.  **Sunset Fire** 🔥: Cam Cháy & Vàng Kim.
5.  **Forest Mystic** 🌲: Xanh Rừng & Vàng Cổ Điển.
6.  **Arctic Frost** ❄️: Trắng Băng Giá & Xanh Dương Nhạt.

### ❄️ 5. Hệ Thống Tuyết Rơi Vật Lý
*   **1200+ bông tuyết** chuyển động tự nhiên.
*   Mô phỏng lực gió, độ nhiễu loạn (turbulence) và trọng lực.
*   Có thể Bật/Tắt bằng phím **'S'**.

### 📸 6. Triển Lãm Ảnh 3D
*   Cho phép người dùng tải lên nhiều ảnh cá nhân.
*   Ảnh được hiển thị trong các khung tranh 3D bay xung quanh cây.
*   Chế độ **FOCUS** cho phép zoom vào từng bức ảnh.

### 🎮 7. Điều Khiển Bằng Cử Chỉ Tay (AI Hand Tracking)
Sử dụng Camera (Webcam) để tương tác không chạm:
*   **Vẫy tay (Wave)**: Tạo gió thổi bay tuyết và các hạt bụi.
*   **Nắm tay (Fist)**: Gom các hạt lại để tạo thành hình cây thông (Chế độ `TREE`).
*   **Xòe tay (Open Palm)**: Phá vỡ cây, các hạt bay lơ lửng (Chế độ `SCATTER`).
*   **Chạm ngón cái & trỏ (Pinch)**: Chọn và phóng to ảnh (trong chế độ `SCATTER`).
*   *Lưu ý: Camera hiển thị nhỏ ở góc trái dưới để bạn dễ theo dõi cử chỉ.*

### 🌀 8. Hiệu Ứng Chuyển Động
*   **Spiral Assembly**: Khi chuyển sang chế độ Cây, các hạt sẽ bay theo đường xoắn ốc từ dưới lên để xếp thành hình cây.
*   **Bloom Effect**: Hiệu ứng phát sáng lấp lánh (Post-processing UnrealBloom).

---

## ⌨️ Bảng Điều Khiển (Phím Tắt)

| Phím | Chức Năng |
| :--- | :--- |
| **H** | Ẩn / Hiện giao diện (Nút bấm, Hướng dẫn) |
| **S** | Bật / Tắt hiệu ứng Tuyết rơi |
| **C** | Đổi chủ đề màu sắc (Theme) |
| **T** | Chuyển về chế độ Cây (Tree Mode) - *Phím tắt nhanh* |
| **X** | Chuyển sang chế độ Bay Lơ Lửng (Scatter Mode) - *Phím tắt nhanh* |

---

## 🛠️ Cài Đặt & Chạy

Dự án này là thuần Frontend, không cần cài đặt phức tạp.

1.  **Tải mã nguồn**: Clone hoặc tải file `.zip` về máy.
2.  **Chạy**: Mở file `index.html` trực tiếp bằng trình duyệt (Chrome, Edge, Firefox, Safari).
3.  **Cấp quyền Camera**: Chọn "Allow" (Cho phép) khi trình duyệt hỏi quyền truy cập Camera để sử dụng tính năng điều khiển bằng tay.

---

## 📊 Thông Số Kỹ Thuật (Dành cho Dev)

*   **Particle Count**: ~3000 hạt cấu thành cây + 2500 hạt bụi nền.
*   **Công nghệ**: WebGL (Three.js), AI (MediaPipe Vision Tasks).
*   **Hiệu năng**: Tối ưu hóa render loop 60 FPS.
*   **Cấu trúc file**: Single-file component (`index.html`) chứa toàn bộ Logic, Style và Markup để dễ dàng chia sẻ và triển khai.

---

**Tác giả**: HoangTechCS-AIE
*Chúc bạn một mùa Giáng Sinh an lành! 🎅🎄*
