# Scanner Pro v0.3 — Scan Engine

## Nâng cấp chính
- Camera live bằng getUserMedia, không còn phụ thuộc hoàn toàn vào camera picker.
- Overlay nhận diện vùng giấy theo thời gian thực và trạng thái giữ yên.
- Auto Capture khi phát hiện vùng giấy ổn định; có thể chuyển AUTO/TAY.
- Cảnh báo ảnh quá tối/quá sáng/có thể bị mờ.
- Điều chỉnh 4 góc thủ công.
- Perspective correction/homography thực sự khi bấm “Nắn thẳng”.
- Bộ lọc Gốc/Tự động/Tài liệu/Trắng đen/Xám.
- Quét nhiều trang liên tục.
- Chuyển kho tài liệu từ localStorage sang IndexedDB để chịu dữ liệu lớn hơn.
- PDF nhiều trang + iOS Share Sheet/Save to Files.
- PWA cache v0.3.

## Lưu ý kỹ thuật
Nhận diện biên ở v0.3 là thuật toán client-side nhẹ dựa trên vùng giấy sáng và độ ổn định khung hình để phù hợp Safari/iPhone. Nó chưa mạnh bằng VisionKit native/OpenCV contour detector trong các cảnh nền phức tạp. Perspective correction sau khi có 4 góc là phép biến đổi homography thật.

GitHub Pages: main /(root).