import { useMemo, memo } from "react";
import type { Prize } from "./WheelGames"; 


//    ====== UI MẢNH TỰ TẠO CỦA VÒNG XOAY TRANG Zootopia  ======

interface WheelProps {
  prizes: Prize[];
}

const WheelComponent: React.FC<WheelProps> = ({ 
  prizes
 }) => {
  const sliceCount = prizes.length > 0 ? prizes.length : 1;
  const sliceAngle = 360 / sliceCount;
  const cssOffsetAngle = -(sliceAngle / 2);

  // Lấy kích thước của vòng quay từ biến CSS --container-wheel-sizes
  // và tính toán chiều rộng động cho mỗi ô quà.
  // useMemo để chỉ tính toán lại khi sliceAngle thay đổi.
  const dynamicWidth = useMemo(() => {

    // Công thức cũ  
    // const containerWheelSize = 360; // Giả sử kích thước vòng quay là 360px như trong CSS
    // // Công thức: đường kính * sin(góc ở tâm / 2).
    // // Nhân với 1.05 để bù vào lỗi làm tròn của trình duyệt, giúp các ô khít vào nhau.
    // return (
    //   containerWheelSize * Math.sin((sliceAngle / 2) * (Math.PI / 180)) * 1.4
    // );

    const containerWheelSize = 330; // Đặt theo --container-wheel-size trong CSS
    const radius = containerWheelSize / 2;

    // Xử lý trường hợp đặc biệt khi có 1 hoặc 2 quà
    // Khi có 2 quà, tan(90) = Infinity -> lỗi
    // Khi có 1 quà, tan(180) = 0 -> lỗi
    if (sliceCount <= 2) {
      // Đặt chiều rộng bằng đường kính để div tam giác đủ lớn để che phủ khu vực
      return containerWheelSize;
    }

    const angleInRadians = (sliceAngle / 2) * (Math.PI / 180);
    // Công thức lượng giác: width = 2 * radius * tan(angle/2)
    // Để các cạnh của các ô tam giác sẽ sát vào nhau.
    return 2 * radius * Math.tan(angleInRadians);
  }, [sliceAngle, sliceCount]);

  
  // Tính toán kích thước động cho hình ảnh bên trong ô quà
  const imageSize = useMemo(() => {
    const containerWheelSize = 360;
    const radius = containerWheelSize / 2;
    // Chiều cao có sẵn cho ảnh là khoảng 40% bán kính
    const availableHeight = radius * 0.4;
    return Math.min(availableHeight, 60); // Giới hạn kích thước tối đa là 60px
  }, []); // Chỉ phụ thuộc vào kích thước, không cần sliceAngle

  return (
    <div
      className="relative h-(--container-wheel-size) w-(--container-wheel-size) bg-transparent 
                  rounded-full overflow-hidden shadow-[0_0_10px_gray] transition-all duration-3000"
    >
      {prizes.map((prize, index) => {
        const rotation = cssOffsetAngle + index * sliceAngle;
        return (
          <div
            key={prize.id}
            className="absolute left-1/2 h-[calc(50%+1px)] box-border pt-5 flex flex-col items-center justify-start 
                       font-black text-red-600 origin-bottom [clip-path:polygon(100%_0,50%_100%,0_0)]"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              background: prize.color,
              width: `${dynamicWidth}px`, // Áp dụng chiều rộng động s
            }}
            data-id={prize.id}
            data-name={prize.name}
          >
            {prize.type === "image" ? (
              <>
                <img
                  src={prize.value}
                  alt={prize.name}
                  style={{
                    maxWidth: `${imageSize}px`,
                    maxHeight: `${imageSize}px`,
                  }}
                />
                <span className="w-[80%] pt-1 box-border text-center text-[#020202] text-[9px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {prize.name}
                </span>
              </>
            ) : (
              <p className="m-0 text-center text-[#050505] text-[0.9em] max-w-[70%]">
                {prize.value}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Bọc component bằng React.memo để ngăn re-render 
export default memo(WheelComponent);
