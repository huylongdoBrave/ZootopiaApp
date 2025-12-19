import React, { memo } from "react";
import Draggable from "react-draggable";


//     ====== UI POPUP IMGRIGHT TRANG Zootopia  ======


interface ImgRightPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dragRef: React.RefObject<HTMLDivElement>;
}

const ImgRightPopup: React.FC<ImgRightPopupProps> = ({
  isOpen,
  onClose,
  dragRef,
}) => {
  if (!isOpen) {
    return null;
  }

  return (

      <Draggable nodeRef={dragRef} cancel=".cancel-drag-right">
        <div className="fixed z-1000 bottom-[15%] cursor-pointer right-2">
        <div ref={dragRef} className="relative w-fit">
          <button
            onClick={onClose}
            className=" cursor-pointer cancel-drag-right absolute -top-5 -right-2.5 z-10 w-6 h-6 bg-red-500 text-white rounded-full 
            flex items-center justify-center text-lg font-bold leading-none hover:bg-red-600 transition-colors"
            aria-label="Đóng popup"
          >
            &times;
          </button>
          <img
            src="/static/adv_1.jpg"
            alt="Khảo sát"
            className="w-[120px] h-[120px] object-contain [-webkit-user-drag:none]"
          />
        </div>
        </div>
      </Draggable>

  );
};

export default memo(ImgRightPopup);
