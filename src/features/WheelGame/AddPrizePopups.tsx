import React, { useState, useEffect, useMemo, memo } from "react";
import type { Prize } from "./WheelGames"; // Import kiểu Prize
import AlertTitle, { type AlertType } from "../../components/AlertTitle/AlertTitle";

//     ====== UI POPUP BẢNG THÊM 1 MÓN PRIZE TRANG Zootopia  ======


interface AddPrizePopupProps {
  isOpen: boolean;
  prizes: Prize[];
  onClose: () => void;
  onAddPrize: (newPrize: Prize) => void;
}

// Định nghĩa cấu trúc state cho forms
interface FormDataState {
  name: string;
  value: string;
  probability: number;
  color: string;
}

const INITIAL_FORM_STATE: FormDataState = {
  name: "",
  value: "",
  probability: 0,
  color: "#ffffff",
};

const AddPrizePopup: React.FC<AddPrizePopupProps> = ({
  isOpen,
  prizes,
  onClose,
  onAddPrize,
}) => {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);

  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });

  // Reset form khi popup đóng
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);


  //Tính tổng tỉ lệ
  const totalProbability = useMemo(() => {
      return (
        prizes.reduce(
          (sum, prize) => sum + (Number(prize.probability) || 0),
          0 
        ) * 100
      );
    }, [prizes]);

  
  // Xử lý thay đổi trong form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Hàm xác định loại quà dựa trên giá trị nhập vào
  const detectPrizeType = (value: string): "image" | "text" => {
    const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
    return imageRegex.test(value) ? "image" : "text";
  };


  // Xử lý submit 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.name.trim();
    const value = formData.value.trim();
    const probability = Number(formData.probability);
    if (!name || !value) {
      alert("Vui lòng điền đầy đủ thông tin quà!");
      return;
    }
    if (isNaN(probability) || probability < 0) {
      alert("Tỉ lệ không hợp lệ!");
      return;
    }
    const currentTotalProbability = prizes.reduce((sum, prize) => sum + prize.probability * 100, 0);
    const newTotalProbability = currentTotalProbability + probability;
    if (newTotalProbability > 100.01) {
      alert(
        `Không thể thêm. Tổng tỉ lệ hiện tại là ${newTotalProbability.toFixed(
          2
        )}% đã vượt mức 100%. Vui lòng điều chỉnh lại.`
      );
      return;
    }

    // Tìm ID nhỏ nhất còn trống để tái sử dụng
    const existingIds = new Set(prizes.map((p) => p.id));
    let newId = 1;
    // Bắt đầu từ 1, tìm số nguyên đầu tiên không có trong danh sách ID hiện có
    // Nếu không có chỗ trống nào, ID mới sẽ là `prizes.length + 1`..
    // Ví dụ: prizes có id [1, 2, 3], existingIds.size là 3. Vòng lặp sẽ chạy đến khi newId = 4.
    while (existingIds.has(newId)) {
      newId++;
    }

    const newPrize: Prize = {
      id: newId,
      name: name,
      type: detectPrizeType(value),
      value: value,
      probability: probability / 100, // Chuyển từ % (0-100) sang dạng thập phân (0-1)s
      color: formData.color,
    };

    onAddPrize(newPrize); // Gửi quà mới về cho component cha
    onClose(); // Đóng popup

    setAlertState({
      isOpen: true,
      type: 'success',
      title: 'Đã thêm quà mới!',

    });

  };


  return (
    // Cũ
    // <div className="fixed inset-0 z-[1002] flex items-center justify-center bg-[black]/60 opacity-100">

  <>
    <AlertTitle
      isOpen={alertState.isOpen}
      type={alertState.type}
      title={alertState.title}
      description={alertState.description}
      onClose={() => {
        setAlertState({ ...alertState, isOpen: false });
        if (alertState.type === 'success') {
          onClose(); 
        }
      }}
    />

    <div className={`fixed inset-0 z-1002 flex items-center justify-center bg-black/60 transition-opacity duration-300 
      ${ isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div className="relative w-11/12 max-w-lg rounded-2xl border-4 border-white
       bg-[rgb(45,189,153)] p-5 pt-10 text-white shadow-lg">
        <button
          className="absolute top-1 right-4 cursor-pointer border-none bg-transparent text-5xl font-light leading-none text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="mb-5 text-center text-2xl font-bold">Thêm Quà Mới</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-name">Tên quà:</label>
            <input
              type="text"
              id="prize-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="box-border  bg-white/20 text-white  w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-value">
              Giá trị (Văn bản hoặc URL hình ảnh):
            </label>
            <input
              type="text"
              id="prize-value"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              required
              placeholder="Nhập văn bản hoặc dán URL hình ảnh..."
              className="box-border  bg-white/20 text-white  w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-probability">Tỉ lệ (%):</label>
            <input
              type="number"
              id="prize-probability"
              name="probability"
              value={formData.probability}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="any"
              placeholder="Nhập số thực"
              required
              className="box-border  bg-white/20 text-white  w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-color">Màu nền:</label>
            <input
              type="color"
              id="prize-color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="h-10 w-full cursor-pointer appearance-none border-none bg-transparent p-0"
            />
          </div>
            <p
              id="probabilities-total"
              style={{
              color:
              Math.abs(totalProbability - 100) > 0.01 ? "#ffeb3b" : "white",
              }}
              className="w-full text-left font-bold mt-3 mb-3"
              >
              Tổng tỉ lệ: {totalProbability.toFixed(2)}%
            </p>
          <button
            type="submit"
            className="mt-4 w-full rounded-full border-2 border-white bg-[#ff6702] py-3 px-6 font-bold text-white shadow-md transition-all hover:bg-gray-200 hover:text-[#ff6702]"
          >
            Lưu Quà
          </button>
        </form>
      </div>
    </div>

  </>
    
  );
};

export default memo(AddPrizePopup);
