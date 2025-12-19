import React, { memo } from "react";

//    ====== UI POPUP THÔNG BÁO KHI VÀO TRANG Zootopia  ======

interface AttentionWheelPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AttentionWheelPopup: React.FC<AttentionWheelPopupProps> = ({
  isOpen,
  onClose,
}) => {
  // Ko mở => ko render
  if (isOpen == false) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-1001
    transition-opacity duration-300 ease-in-out"
    >
      <img
        src="/static/fox.png"
        alt="fox"
        className="absolute h-auto z-5 transition-all duration-300 ease-in-out 
                      w-[100px] mt-[120px] left-[calc(50%-var(--wheel-wrapper-size)/2-20px)] 
                      md:w-[120px] md:mt-[180px] md:left-[calc(50%-var(--wheel-wrapper-size)/2-80px)] 
                      lg:w-[140px] lg:mt-[200px] lg:left-[calc(50%-var(--wheel-wrapper-size)/2-90px)]"
      />
      {/* Khung lớn popup */}
      <div
        className=" filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                   w-[340px] h-[360px] bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                  rounded-[15px] border-4 border-white p-10 text-center text-white flex justify-center items-center 
                  shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
      >
        {/* logo */}
        <img
          src="./static/Zootopia.png"
          alt="Oventin Logo"
          className="absolute top-[-190px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="/static/moi-ban-be.png"
          alt="Mời Bạn Bè"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />

        {/* Nội dung popups */}
        <div
          className="flex-col justify-center items-center 
        text-center relative [-webkit-box-align:center] [-webkit-box-pack:center]"
        >
          <p className="m-0 font-normal leading-normal text-white pt-6 text-center text-xl max-w-[350px] lg:px-1 px-6">
            Nhận ngay 20 Ovocoins khi mời thêm 02 bạn mới.
          </p>
          <p
            className="font-normal leading-normal text-[rgb(239,0,18)] text-center text-xl m-0 pb-3;
                        [font-family:var(--font-rowdies)] max-w-[350px] lg:px-1 px-6"
          >
            Đổi thẻ Zing, nạp Robux trong tầm tay.
          </p>
          <div
            className="flex justify-center items-center gap-3 flex-col w-full [box-shadow:rgba(0,0,0,0.25)_0px_4px_4px_0px_inset] bg-[rgba(255,255,255,0.7)] 
            text-center z-10 mb-2.5 mx-auto py-5 rounded-[15px] [-webkit-box-pack:center] [-webkit-box-align:center] 
            lg:max-w-[420px] lg:px-10
            md:max-w-[360px] max-w-60 px-5"
          >
            <img
              src="./static/doi-24-coins.png"
              alt="24coin "
              className="text-transparent w-auto h-[60px] object-contain overflow-clip
                [overflow-clip-margin:content-box] [box-sizing:inherit]"
            />
            <img
              src="./static/doi-60-coins.png"
              alt="60coin"
              className="w-auto h-[60px] object-contain [ocolor:transparent]"
            />
          </div>
        </div>
        {/* Button group */}
        <div className="absolute bottom-[-110px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          {/* Button chính */}
          <button
            className="bg-[#03409b] text-white border-2 border-white 
                            py-2 w-[200px] rounded-[20px] font-bold cursor-pointer text-lg transition-all duration-200 
                            hover:bg-white hover:text-[#03409b]"
            onClick={onClose}
          >
            Tham gia ngay
          </button>
          {/* Nút đóng 'x' */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer
             border-white text-white text-2xl font-light bg-transparent hover:bg-white/20 transition-colors"
            aria-label="Đóng"
          >&times;</button>
        </div>
      </div>
      <img
        src="/static/rabbit.png"
        alt="rabbit"
        className="absolute h-auto z-5 transition-all duration-300 ease-in-out
                    w-[100px] mt-[120px] right-[calc(50%-var(--wheel-wrapper-size)/2-20px)]
                    md:w-[120px] md:mt-[180px] md:right-[calc(50%-var(--wheel-wrapper-size)/2-80px)]
                    lg:w-[140px] lg:mt-[200px] lg:right-[calc(50%-var(--wheel-wrapper-size)/2-90px)]"
      />
    </div>

  );
};

export default memo(AttentionWheelPopup);


    /* DẠNG THÔNG BÁO CŨ */
    // <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1003]">
    //   <div className="relative w-11/12 max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl animate-fade-in-down">
    //     <h2 className="text-2xl font-bold text-[#f85a00] mb-4">
    //       Lưu ý quan trọng!
    //     </h2>
    //     <p className="text-gray-700 mb-6">
    //       Vòng quay may mắn chỉ là một trò chơi mô phỏng. Các phần thưởng không có giá trị quy đổi thành tiền mặt hoặc sản phẩm thật.
    //     </p>
    //     <button
    //       onClick={onClose}
    //       className="bg-[#f85a00] text-white font-bold py-2 px-8 rounded-full transition-transform hover:scale-105"
    //     >
    //       Tôi đã hiểu
    //     </button>
    //   </div>
    // </div>

