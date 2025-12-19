import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";
import AlertTitle, { type AlertType } from "../../../components/AlertTitle/AlertTitle.js";
import type { Prize } from "../WheelGames.tsx";
import {PrizeRow} from "./PrizeRows.tsx";


//    ====== UI POPUPS BẢNG TỈ LỆ TRANG Zootopia  ======


interface RateTablePopupProps {
  isOpen: boolean;
  prizes: Prize[];
  onClose: () => void;
  onApplyChanges: (updatedPrizes: Prize[]) => void;
}

const RateTablePopup: React.FC<RateTablePopupProps> = ({
  isOpen,
  prizes,
  onClose,
  onApplyChanges,
}) => {
  const [tempPrizes, setTempPrizes] = useState<Prize[]>(prizes);

  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });

  
   
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTempPrizes(JSON.parse(JSON.stringify(prizes)));
    }
  }, [isOpen, prizes]);


  // Tính tổng tỉ lệ mỗi khi tempPrizes thay đổi
  const totalProbability = useMemo(() => {
    return (
      tempPrizes.reduce(
        (sum, prize) => sum + (Number(prize.probability) || 0),
        0
      ) * 100
    );
  }, [tempPrizes]);


  // Cập nhật tỉ lệ của quà
  const handlePrizeChange = useCallback(
    (id: number, field: keyof Prize, value: string) => {
    setTempPrizes((currentPrizes) =>
      currentPrizes.map((p) => {
        if (p.id === id) {
          // Nếu là probability, chuyển đổi về dạng thập phân (0-1)
          const newValue =
            field === "probability" ? parseFloat(value) / 100 : value;
          return { ...p, [field]: newValue };
        }
        return p;
      })
      );
    }, []);


  // Xóa quà
  const handleDeletePrize = useCallback((id: number, name: string) => {
    if (window.confirm(`Xóa quà "${name}" ?`)) {
      setTempPrizes((currentPrizes) =>
        currentPrizes.filter((p) => p.id !== id)
      );
      }
  }, []);


  // Cảnh báo sửa bị tràn tỉ lệ
  const handleApply = useCallback(() => {
        if (totalProbability > 100.01) {
          // alert(
          //   `Cảnh báo tỉ lệ đang ${totalProbability.toFixed(2)}% . Vui lòng chỉnh tổng dưới 100%`
          // );

          setAlertState({
            isOpen: true,
            type: 'error',
            title: 'Lỗi tỉ lệ đang vượt quá 100%!',
            description: 'Nhập dưới 100% để áp dụng thay đổi.'
          });

          return;
        } else if (totalProbability == 0) {
          // alert("Tổng tỉ lệ không thể bằng 0%. Hãy nhập lớn 0.");
            setAlertState({
              isOpen: true,
              type: 'error',
              title: 'Tổng tỉ lệ không thể bằng 0%!',
              description: 'Hãy nhập lớn hơn 0.'
            });
          return;
        }
        setAlertState({
          isOpen: true,
          type: 'success',
          title: 'Đã cập nhật tỉ lệ!'
        });

        onApplyChanges(tempPrizes); // Gửi dữ liệu đã thay đổi ra component cha
    }, [totalProbability, tempPrizes, onApplyChanges]);


  return (
    <div className={`fixed inset-0 flex items-center justify-center
       bg-black/60 z-1002 transition-opacity 
       duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div
        className="flex justify-center items-center flex-col 
                relative w-[90%] max-w-[500px] bg-[rgb(45,189,153)] border-4 border-white border-solid rounded-[15px] p-5 text-white
                shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
      > 
        {/* Nút đóng */}
        <button
          id="probabilities-close-btn"
          className="absolute top-[5px] right-[15px] bg-none border-none 
        text-[2.5rem] text-white cursor-pointer leading-none"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Bảng tỉ lệ */}
        <h3 className="text-center text-2xl font-bold mb-4">Bảng Tỉ Lệ Trúng Thưởng</h3>
        <div className="w-full">
          <div id="max-h-[50vh] overflow-y-auto pr-2">
            {/* Dùng ReactSortables để bọc các item để kéo thả */}
            <ReactSortable
              list={tempPrizes}
              setList={setTempPrizes}
              handle=".prize-name-cell"
              animation={150}
              ghostClass="dragging"
            >
              {tempPrizes.map((prize) => (
                <PrizeRow
                  key={prize.id}
                  prize={prize}
                  onPrizeChange={handlePrizeChange}
                  onDeletePrize={handleDeletePrize}
                />
              ))}
            </ReactSortable>
          </div>
        </div>
        {/* Tổng tỉ lệ */}
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
        {/* Nút cập nhật */}
        <center>
          <button
            id="apply-probabilities-btn"
            type="button"
            style={{ width: "300px" }}
            onClick={handleApply}
            className="btn-action"
          >
            Cập nhật
          </button>
        </center>
      </div>

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

    </div>
  );
};

export default memo(RateTablePopup);