import React, { memo } from "react";


//    ====== UI POPUP KẾT QUẢ PRIZES KHI QUAY TRANG Zootopia  ======


interface Prize {
  id: string | number;
  name: string;
  type: "text" | "image";
  value: string;
}

interface ResultPopupProps {
  isOpen: boolean;
  prize: Prize | null;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  isOpen,
  prize,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-1001
      transition-opacity duration-300 ease-in-out"
      >
        <img
          src="/static/fox.png"
          alt="fox"
          className="absolute h-auto z-5 transition-all duration-300 ease-in-out 
                        w-[100px] mt-[120px] left-[calc(50%-var(--wheel-wrapper-size)/2-10px)] 
                        md:w-[120px] md:mt-[90px] md:left-[calc(50%-var(--wheel-wrapper-size)/2-80px)] 
                        lg:w-[180px] lg:mt-[50px] lg:left-[calc(50%-var(--wheel-wrapper-size)/2-110px)]"
        />
        <div
          className=" filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                    relative w-[350px] h-[230px] bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                    rounded-[15px] border-4 border-white p-10 text-center text-white flex justify-center items-center 
                    shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
        >
          <img
            src="./static/Zootopia.png"
            alt="Oventin Logo"
            className="absolute top-[-190px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
          />
          <img
            src="./static/noti.png"
            alt="Thông báo"
            className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
          />
          {/* <p className="text-lg md:text-[1.5rem] font-black m-0 min-h-[50px] text-[#233da3]">
            {prize?.name}
          </p> */}
          <div className=" w-auto h-auto flex flex-col justify-center items-center">
            <div className="text-lg md:text-[1.5rem] font-black m-0 min-h-[50px] text-[#233da3]">
              {prize?.name}
            </div>
            {prize?.type === "image" ? (
              <img
                src={prize?.value}
                className="w-50 h-20 object-contain"
                alt="Preview"
              />
            ) : (
              <span className="text-lg truncate">{prize?.value}</span>
            )}
          </div>
          {/* <small className="text-lg md:text-[1.5rem] font-black m-0 min-h-[50px] text-[#233da3]">
            {prize?.name}
          </small> */}
          <button
            className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 bg-[#f85a00] text-white border-2 border-white 
                            py-2.5 w-[200px] rounded-[20px] font-bold cursor-pointer text-lg transition-all duration-200 
                            hover:bg-white hover:text-[#f85a00]"
            onClick={onClose}
          >
            Tiếp tục quay
          </button>
        </div>
        <img
          src="/static/rabbit.png"
          alt="rabbit"
          className="absolute h-auto z-5 transition-all duration-300 ease-in-out
                        w-[100px] mt-[120px] right-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                        md:w-[120px] md:mt-[90px] md:right-[calc(50%-var(--wheel-wrapper-size)/2-80px)]
                        lg:w-40 lg:mt-[50px] lg:right-[calc(50%-var(--wheel-wrapper-size)/2-100px)]"
        />
      </div>
    );
};

export default memo(ResultPopup);
