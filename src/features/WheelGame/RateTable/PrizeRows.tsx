import React, { memo } from "react";
import type { Prize } from "../WheelGames";


// Component 1 hàng quà đang sửa trong bảng tỉ lệ


interface PrizeRowProps {
  prize: Prize;
  onPrizeChange: (id: number, field: keyof Prize, value: string) => void;
  onDeletePrize: (id: number, name: string) => void;
}

const PrizeRows: React.FC<PrizeRowProps> = ({
  prize,
  onPrizeChange,
  onDeletePrize,
}) => {
  // Components này chỉ render một hàng và chỉ re-render nếu props của nó (prize, onPrizeChange, onDeletePrize) thay đổi.
  return (
    <div
      className="flex items-center gap-2 p-2 mb-2 bg-white/10 rounded"
      data-prize-id={prize.id}
    >
      <div className="w-8 text-center shrink-0 font-mono">{prize.id}</div>
      <div
        className="prize-name-cell basis-[25%] flex-1 font-semibold truncate"
        style={{ cursor: "grab" }}
      >
        <i
          className="fa-solid fa-grip-vertical"
          style={{ marginRight: "8px", cursor: "grab" }}
        ></i>
        {prize.name}
      </div>
      <div
        className=" w-16 flex justify-center items-center"
        title={prize.value}
      >
        {prize.type === "image" ? (
          <img
            src={prize.value}
            className="w-10 h-10 object-contain"
            alt="Preview"
          />
        ) : (
          <span className="text-xs truncate">{prize.value}</span>
        )}
      </div>
      <div className="w-10">
        <input
          type="color"
          className="w-full h-8 p-0 border-none rounded cursor-pointer bg-transparent"
          value={prize.color}
          onChange={(e) => onPrizeChange(prize.id, "color", e.target.value)}
        />
      </div>
      <div className="w-24 relative flex items-center">
        <input
          type="number"
          className="w-full bg-white/20 text-white text-center rounded p-1 pr-5 appearance-none"
          value={(prize.probability * 100).toFixed(2)}
          onChange={(e) => onPrizeChange(prize.id, "probability", e.target.value)}
          min="0"
          max="100"
          step="0.01"
        />
        <span className="absolute right-1 text-white pointer-events-none">
          %
        </span>
      </div>
      <div style={{ marginLeft: "10px" }} className="w-8 shrink-0">
        <button
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold leading-none hover:bg-red-700 transition-colors"
          title="Xóa"
          onClick={() => onDeletePrize(prize.id, prize.name)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const PrizeRow = memo(PrizeRows);
