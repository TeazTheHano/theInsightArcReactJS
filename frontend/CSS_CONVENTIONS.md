# Quy ước CSS cho dự án The insightArc

Tài liệu này định nghĩa các quy ước và thực hành tốt nhất khi viết CSS cho dự án, nhằm đảm bảo sự nhất quán, dễ bảo trì và khả năng mở rộng.

## 1. Quản lý Z-index

### Vấn đề: "Cuộc chiến Z-index" (Z-index War)

Khi dự án phát triển, việc sử dụng các giá trị `z-index` ngẫu nhiên (ví dụ: `z-index: 2;`, `z-index: 99;`, `z-index: 9999;`) mà không có một hệ thống rõ ràng sẽ dẫn đến các xung đột hiển thị khó lường. Việc gỡ lỗi sẽ trở nên phức tạp khi không biết tại sao một phần tử lại bị che khuất bởi một phần tử khác.

### Giải pháp: Thang Z-index (Z-index Scale)

Để giải quyết vấn đề này, chúng ta sẽ áp dụng một "thang z-index" được định nghĩa trước. Mỗi "lớp" (layer) của giao diện người dùng sẽ được gán một khoảng giá trị `z-index` cụ thể.

Chúng ta sẽ định nghĩa thang này bằng cách sử dụng CSS Custom Properties (biến CSS) trong một file CSS toàn cục (ví dụ: `src/styles/variables.css` hoặc `src/index.css`) để dễ dàng quản lý và tái sử dụng.

#### Định nghĩa thang Z-index

```css
/* Trong file CSS toàn cục */
:root {
  --z-index-component: 1;         /* Lớp cho các hiệu ứng nhỏ trên component (vd: hover shadow) */
  --z-index-sticky: 100;          /* Lớp cho các phần tử cố định (vd: Navigation, Header) */
  --z-index-dropdown: 1000;       /* Lớp cho Dropdown, Popover, Tooltip */
  --z-index-modal-backdrop: 2000; /* Lớp cho nền mờ của Modal */
  --z-index-modal-content: 2001;  /* Lớp cho nội dung Modal */
  --z-index-toast: 9999;          /* Lớp cho thông báo (Toast/Notification), luôn ở trên cùng */
}
```

#### Cách sử dụng

Khi cần đặt `z-index` cho một component, hãy sử dụng các biến đã được định nghĩa.

**Ví dụ trong `NavigationUnit.module.css`:**

```css
nav {
    position: sticky;
    top: 0;
    /* Sử dụng biến thay vì một giá trị "magic number" */
    z-index: var(--z-index-sticky); 
}
```

**Ví dụ trong `Button.module.css`:**

```css
.layoutButtonWrapper:hover {
    box-shadow: var(--shadow-1);
    /* Nâng button lên một chút so với các phần tử ngang hàng */
    z-index: var(--z-index-component);
}
```

**Lợi ích:**
- **Dễ đoán:** Luôn biết được phần tử nào sẽ nằm trên phần tử nào.
- **Dễ bảo trì:** Chỉ cần thay đổi giá trị ở một nơi duy nhất nếu cần điều chỉnh lại các lớp.
- **Tránh xung đột:** Giảm thiểu rủi ro các component khác nhau "tranh giành" `z-index`.

## 2. Quy ước đặt tên Class

Dự án sử dụng **CSS Modules**, giúp tự động đóng gói (scope) các class name để tránh xung đột toàn cục. Để tăng tính dễ đọc, chúng ta tuân theo quy ước đặt tên mô tả.

**Cấu trúc:** `[category][Value]` hoặc `[block]__[element]--[modifier]` (tương tự BEM).

**Ví dụ từ `Button.module.css`:**

- `colorModePrimary`:
  - `category`: `colorMode`
  - `Value`: `Primary`
- `styleModeText`:
  - `category`: `styleMode`
  - `Value`: `Text`
- `layoutButtonWrapper`:
  - `category`: `layout`
  - `Value`: `ButtonWrapper`

Cách đặt tên này giúp chúng ta hiểu ngay chức năng của class mà không cần xem chi tiết mã CSS.

## 3. Sử dụng `currentColor` cho Icon

Để màu của icon tự động đồng bộ với màu chữ của component cha (ví dụ: Button), hãy đặt thuộc tính `fill` hoặc `stroke` của SVG là `currentColor`. Điều này giúp loại bỏ việc phải dùng JavaScript để tính toán và truyền màu, giúp code sạch hơn và hiệu năng cao hơn.

**Ví dụ trong `IconGen.tsx`:**

```tsx
export const IconGen = ({ ... }) => {
    const currentFill = fillColor || 'currentColor'; // Mặc định là 'currentColor'
    
    const data = {
        phone: <svg fill={currentFill}>...</svg>
    };
    // ...
}
```