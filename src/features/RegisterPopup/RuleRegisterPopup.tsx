import React, { memo, useState } from "react";
import ButtonOrange from "../../components/Button/ButtonCustomA";

//    ====== UI POPUP ĐIỀU KHOẢN KHI ĐĂNG KÝ ======

interface RuleRegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const RuleRegisterPopup: React.FC<RuleRegisterPopupProps> = ({
  isOpen,
  onClose,
  onAgree,
}) => {
  const [isExpandedRuleText, setIsExpandedRuleText] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);


  if (!isOpen) {
    if(isAgeConfirmed) setIsAgeConfirmed(!isAgeConfirmed); // reset trạng thái checkbox
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-1003 flex justify-center overflow-y-auto py-10 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      {/* =>Bỏ items-center, thêm pt-[250px] tạo không gian cho logo và title ở trên */}
      <div className="relative flex justify-center w-full max-w-[800px] pt-[250px]">
        {/* logo */}
        <img
          src="./static/Zootopia.png"
          alt="Oventin Logo"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="./static/term.png"
          alt="Chính sách quyền riêng tư"
          className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-full md:w-full lg:w-[550px] max-w-[800px] text-center text-white 
             "
        >
          <div
            className="items-center inset-0  bg-[#35D3B8]  bg-top bg-no-repeat
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-5">
              <h6 className="text-[20px] mb-2 text-xl leading-[1.6] font-bold">
                ĐIỀU 1. PHẠM VI ÁP DỤNG
              </h6>
              <div
                // Scroll Animate className={`transition-all duration-800 ease-in-out overflow-hidden 
                //   ${isExpandedRuleText ? "max-h-[2000px]" : "max-h-[400px]"}  `}
                className={`overflow-hidden 
                  ${isExpandedRuleText ? "max-h-[2000px]" : "max-h-[400px]"}`}
              >
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  Công ty TNHH XYZ Việt Nam (“Công Ty” hoặc “Chúng Tôi”) là
                  một công ty được thành lập và hoạt động tại Việt Nam với số
                  đăng ký doanh nghiệp 9090909090 tại địa chỉ Phòng số 21, 100
                  đường Nguyễn ZZZZ , Phường Võ Thị Sáu, Quận 3, Thành
                  phố Hồ Chí Minh, Việt Nam.
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  Chính Sách Quyền Riêng Tư này (“Chính Sách”) áp dụng đối với
                  dữ liệu cá nhân do Công Ty xử lý hoặc kiểm soát, bao gồm nhưng
                  không giới hạn dữ liệu cá nhân của người lao động của Chúng
                  Tôi, khách hàng của Chúng Tôi hoặc của những chủ thể dữ liệu
                  khác (gọi chung là “Bạn”) trên các trang web của Công Ty, liên
                  quan đến các sản phẩm, dịch vụ của Công Ty và trong khuôn khổ
                  các hoạt động kinh doanh và các hoạt động khác của Công Ty tại
                  Việt Nam.
                </p>
                <p className="text-[16px] font-normal leading-normal mb-2 text-white pt-2 text-left text-xl lg:px-1 px-4">
                  Chính Sách này được điều chỉnh và diễn giải theo pháp luật
                  Việt Nam. Công Ty có thể sửa đổi Chính Sách này vào từng thời
                  điểm để cập nhật các quy định phù hợp với thay đổi của pháp
                  luật Việt Nam và/hoặc với các thay đổi trong hoạt động của
                  Công Ty. Vui lòng liên hệ với cán bộ phụ trách bảo vệ dữ liệu
                  với thông tin liên lạc dưới đây.
                </p>
                <h6 className="text-[20px] mb-2 text-xl leading-[1.6] font-bold">
                  ĐIỀU 2. DỮ LIỆU CÁ NHÂN MÀ CÔNG TY THU THẬP
                </h6>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  Các nhóm dữ liệu cá nhân mà Công Ty thu thập với tư cách là
                  một bên kiểm soát dữ liệu phụ thuộc vào việc bạn tương tác với
                  hệ thống của chúng tôi và/hoặc với các sản phẩm và/hoặc dịch
                  vụ của chúng tôi và phụ thuộc vào yêu cầu của luật áp dụng.
                  Công ty thu thập các dữ liệu mà bạn cung cấp, dữ liệu mà Công
                  Ty thu thập một cách tự động khi bạn sử dụng các sản phẩm và
                  dịch vụ của chúng tôi và dữ liệu từ các nguồn khác như là các
                  dịch vụ của bên thứ ba hoặc các tổ chức khác, như được mô tả
                  dưới đây:
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  A. Dữ Liệu Bạn Cung Cấp Trực Tiếp Cho Chúng Tôi:
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>• Giao Dịch Mua.</strong>
                  Chúng tôi có thể thu thập thông tin cá nhân và các thông tin
                  liên quan đến giao dịch mua của bạn. Thanh toán của bạn được
                  xử lý bởi các bên xử lý thanh toán thứ ba. Chúng tôi không
                  trực tiếp thu thập hoặc lưu trữ thông tin thẻ thanh toán được
                  nhập vào hệ thống của chúng tôi nhưng chúng tôi có thể nhận
                  được các thông tin liên quan đến thông tin thẻ thanh toán của
                  bạn (ví dụ như địa chỉ xuất hóa đơn);
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>• Liên Lạc Của Bạn Với Chúng Tôi.</strong>
                  Khi bạn yêu cầu thông tin về sản phẩm và dịch vụ của chúng
                  tôi, đăng ký nhận thư tin tức, yêu cầu hỗ trợ khách hàng hoặc
                  hỗ trợ kỹ thuật, hoặc liên lạc với chúng tôi theo một cách
                  khác, chúng tôi có thể thu thập thông tin cá nhân của bạn, ví
                  dụ như tên đầy đủ, địa chỉ thư điện tử, địa chỉ gửi thư
                  và/hoặc số điện thoại;
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>• Các Hội Nghị, Hội Chợ, và Các Sự Kiện Khác.</strong>
                  Chúng tôi có thể thu thập dữ liệu cá nhân từ các chủ thể dữ
                  liệu khi chúng tôi tham gia, tài trợ, hoặc tổ chức các hội
                  nghị, hội chợ, và các sự kiện khác.
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  B. Dữ Liệu Được Thu Thập Tự Động
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>
                    • Thông Tin về việc bạn sử dụng hệ thống của chúng tôi.
                  </strong>
                  Chúng tôi có thể thu thập các thông tin tự động khi bạn sử
                  dụng hệ thống hoặc các dịch vụ của chúng tôi, ví dụ như địa
                  chỉ IP, cài đặt người dùng, địa chỉ MAC, nhận dạng
                  <a href="/cookie">cookies</a>, nhà mạng di động, các nhận dạng
                  quảng cáo di động và các nhận dạng duy nhất khác, thông tin về
                  thiết bị hoặc trình duyệt và thông tin về vị trí (bao gồm vị
                  trí đại khái được trích xuất từ địa chỉ IP);
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>
                    • Cookies, Pixel Tags/Web Beacons, và các Công Nghệ Khác.
                  </strong>
                  Chúng tôi, cũng như các bên thứ ba cung cấp nội dung, quảng
                  cáo hoặc các tính năng khác trên hệ thống của chúng tôi có thẻ
                  sử dụng cookies, pixel tags, bộ nhớ cục bộ, và các công nghệ
                  khác để thu thập thông tin tự động khi bạn sử dụng các hệ
                  thống của chúng tôi, ví dụ như tần suất người dùng truy cập
                  vào trang web, trang mà người dùng truy cập vào và các trang
                  web mà người dùng sử dụng trước khi đến trang này. Để biết
                  thêm thông tin, bao gồm cách thức thay đổi tùy chọn cookie,
                  vui lòng tham khảo Chính Sách Cookie của Chúng Tôi.
                </p>
                <p className="text-[16px] font-normal leading-normal text-white pt-2 text-left text-xl lg:px-1 px-4">
                  <strong>• Nền Tảng Bên Thứ Ba.</strong>
                  Các hệ thống của chúng tôi có thể có đường dẫn đến các nền
                  tảng của các bên thứ ba, ví dụ như các nền tảng mạng xã hội.
                  Các dịch vụ bên thứ ba này không do chúng tôi kiểm soát. Chúng
                  tôi khuyến khích bạn đọc các chính sách quyền riêng tư của mỗi
                  dịch vụ mà bạn tương tác. Chúng tôi không xác nhận, xem xét
                  trước, hoặc chấp thuận, và không chịu trách nhiệm đối với các
                  hoạt động quyền riêng tư hoặc nội dung của các dịch vụ đó.
                </p>

              </div>

              {/* Span rút ngắn nội dung */}
              <span 
                onClick={() => setIsExpandedRuleText(!isExpandedRuleText)}
                className="font-bold text-sm leading-[1.66] text-(--normal-blue) cursor-pointer
               m-0 mt-2 ml-2 flex text-left gap-1 hover:underline"
              >
                {isExpandedRuleText ? "Rút gọn" : "Xem thêm"}
                {/* Icon mũi tên trỏ xuống */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-6 transition-transform duration-300 ${
                    isExpandedRuleText ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </span>

              {/* Checkbox Đồng ý? */}
              <label className="mt-4 text-[rgb(35,61,163)] inline-flex items-center cursor-pointer 
              align-middle mr-4">
                <div className="bg-white rounded">
                <span className="inline-flex items-center justify-center relative box-border bg-transparent outline-none border-none m-0 cursor-pointer
                              select-none align-middle appearance-none no-underline p-[3px]  rounded-full [-webkit-tap-highlight-color:transparent]">
                  <input
                    type="checkbox"
                    checked={isAgeConfirmed}
                    onChange={() => setIsAgeConfirmed(!isAgeConfirmed)}
                    className="w-5 h-5 cursor-pointer border-2"
                  />
                </span>
                </div>
                <span className="text-(--normal-blue) font-normal text-base leading-normal m-2 text-left cursor-pointer">
                 Tôi xác nhận tôi đủ 18 tuổi trở lên
                </span>
              </label>
            </div>
                          
                {/* Button xác thực */}
                <div className="absolute mt-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                  {/* Button chính */}
                  <ButtonOrange
                    onClick={onAgree}
                    disabled={!isAgeConfirmed}
                    className={`w-[300px] h-12 text-lg transition-colors duration-300 ${
                      !isAgeConfirmed
                        ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                        : ""
                    }`}
                  >
                    Đồng ý
                  </ButtonOrange>
                  <ButtonOrange
                    onClick={onClose}
                    className={`w-[300px] h-12 text-lg transition-colors duration-300    
                    bg-(--normal-blue) text-white font-black tracking-wider border-[3px] border-white 
                      cursor-pointer shadow-lg rounded-full inline-block
                      hover:bg-white hover:text-(--normal-blue)
                      disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  >
                    Trở lại
                  </ButtonOrange>

                  {/* Nút đóng 'x' */}
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer
                  border-white text-white text-2xl font-light bg-transparent hover:bg-white/20 transition-colors"
                    aria-label="Đóng"
                  >
                    &times;
                  </button>
                </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RuleRegisterPopup);
