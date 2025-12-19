import React, { memo } from "react";
import Draggable from "react-draggable";


//     ====== UI POPUP IMGLEFT TRANG Zootopia  ======

interface ImgLeftPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dragRef: React.RefObject<HTMLDivElement>;
}

const ImgLeftPopup: React.FC<ImgLeftPopupProps> = ({
  isOpen,
  onClose,
  dragRef,
}) => {
  if (!isOpen) {
    return null;
  }

  return (

      <Draggable nodeRef={dragRef} cancel=".cancel-drag-left">
        <div className="fixed z-1000 bottom-[15%] cursor-pointer left-2">
        <div ref={dragRef} className="relative w-fit">
          <button
            onClick={onClose}
            className="cursor-pointer cancel-drag-left absolute -top-2.5 -right-5 z-10 w-6 h-6 bg-red-500 text-white rounded-full 
            flex items-center justify-center text-lg font-bold leading-none hover:bg-red-600 transition-colors"
            aria-label="Đóng popup"
          >
            &times;
          </button>
          <img
            src="/static/adv_2.png"
            alt="Mời bạn bè nhận Ovocoins"
            className="w-[120px] h-[120px] object-contain [-webkit-user-drag:none]"
          />
        </div>
        </div>
      </Draggable>

  );
};

export default memo(ImgLeftPopup);
