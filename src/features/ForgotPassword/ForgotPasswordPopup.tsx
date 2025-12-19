import React ,{useState, useEffect, memo} from "react";
// import { useNavigate } from "react-router-dom";
import ButtonOrange from "../../components/Button/ButtonCustomA";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import AlertTitle, { type AlertType } from "../../components/AlertTitle/AlertTitle";

import ConfirmOTP from "./ConfirmOTPPopup";
import ResetPasswordPopup from "./ResetPasswordPopup"; 

//    ====== UI Forgot Password popup ======
interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ForgotPw{
  phoneNumber: string;
}

// Component Forgot Password Popup
const ForgotPasswordPopup: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const [isConfirmOtpPopup, setIsConfirmOtpPopup] = useState(false); // Stae để điều khiển ConfirmOTP popup
  const [isResetPasswordPopup, setisResetPasswordPopup] = useState(false); // State để điều khiển ResetPasswordPopup
  const [phoneForOtp, setPhoneForOtp] = useState(''); // State lưu trữ số cho OTP
  
  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });


  const handleOtpConfirmed = (phone: string) => {
    setIsConfirmOtpPopup(false); // Đóng popup ConfirmOTP
    setPhoneForOtp(phone); // Lưu số dt để truyền cho popup ResetPassword
    setisResetPasswordPopup(true); // Mở popup ResetPassword
  };

  const handleResetSuccess = () => {
    setisResetPasswordPopup(false); // Đóng popup ResetPassword
    onClose(); // Đóng popup ForgotPassword
  };


  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPw>({
    resolver: yupResolver(yup.object().shape({
    phoneNumber: yup
      .string()    
      .required("Vui lòng nhập số điện thoại")
      .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số."),})
    ),
    defaultValues: {
      phoneNumber: "",
    }
  });


  useEffect(() => {
    if (!isOpen) {
      reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsConfirmOtpPopup(false); // Reset OTP popup state
      setisResetPasswordPopup(false); // Reset ResetPasswordPopup state
    }
  }, [isOpen,reset]);


  const handleForgotPwSubmit = (data: ForgotPw) => {
    const { phoneNumber } = data;
    const getDataPhoneNumber = localStorage.getItem('registeredUsers');
    const existingPhoneNumber: ForgotPw[] = getDataPhoneNumber ? JSON.parse(getDataPhoneNumber) : [];
    const phoneNumExist = existingPhoneNumber.find(  (user) => user.phoneNumber === phoneNumber );
    if (phoneNumExist) {
      setPhoneForOtp(phoneNumber); // Save phone number to pass to OTP popup
      setIsConfirmOtpPopup(true);   // Open OTP confirmation popup
    } else {
      setAlertState({
        isOpen: true,
        type: 'error',
        title: 'Số này chưa đăng ký.',
        description: 'Hãy nhập số mặc định đăng ký.'
      });
    }
  };


  if (!isOpen) {
    return null;
  }


  return (
    <>
      {isResetPasswordPopup && (
        <ResetPasswordPopup
          isOpen={isResetPasswordPopup}
          onClose={handleResetSuccess}
          phoneNumber={phoneForOtp}
          // onResetSuccess={handleResetSuccess}
        />
      )}

    <div
      className="fixed inset-0 bg-black/60 z-1003 flex justify-center overflow-y-auto py-20 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center  w-full max-w-[800px] pt-[200px]">

        {/* Show OTP form when triggered and ResetPasswordPopup is not open */}
        {isConfirmOtpPopup && !isResetPasswordPopup && (
          <ConfirmOTP
            isOpen={isConfirmOtpPopup}
            onClose={() => { setIsConfirmOtpPopup(false); }}
            onOtpConfirmed={handleOtpConfirmed} // Truyền callback mới
            phoneNumber={phoneForOtp}
          />
        )}
        
        {/* Đóng phoneNumber khi OTP popup is open */}
        { !isConfirmOtpPopup && !isResetPasswordPopup && ( // Chỉ hiển thị khi cả OTP và ResetPassword đều đóng
          <>
            {/* logo */}
            <img
              src="./static/Zootopia.png"
              alt="Oventin Logo"
              className="absolute top-5 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
            />
            {/* Title */}
            <img
              src="/static/forgot-pass.png"
              alt="Quên mật khẩu"
              className="absolute z-1004 top-[170px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
            />
            {/* Khung lớn popup */}
            <div
              className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                      w-[300px] md:w-[300px] lg:w-[350px]  max-w-[800px] text-center text-black "
            >
              <div
                className="items-center h-[200px] inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                            rounded-[20px] border-4 border-white"
              >
                {/* Nội dung popups */}
                <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-10">

                  <form id="login-form" onSubmit={handleSubmit(handleForgotPwSubmit)} className="flex flex-col gap-3 text-[#233da3]">

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                      Số điện thoại<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span></label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        {...register("phoneNumber")}   // Cách viết khác ref={register("phoneNumber")}
                        placeholder="Số điện thoại"
                        className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none 
                          transition ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                      />
                      {errors.phoneNumber && <p className="absolute bottom-0 text-center text-red-500 text-xs ml-2">{errors.phoneNumber.message}</p>}
                    
                    </div>

                    {/* Button xác thực */}
                    <div className="absolute -bottom-45 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                      {/* Button chính */}
                      <ButtonOrange
                        form="login-form"
                        type="submit"
                        className={`w-[200px] h-12 text-lg transition-colors duration-300`}
                      >
                        Tiếp tục
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
                  </form>

                </div>

                  <div className="text-white text-center left-1/2 px-4 pt-2">
                    Điền số điện thoại dùng để đăng ký tài khoản của bạn
                  </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
    
    <AlertTitle
      isOpen={alertState.isOpen}
      type={alertState.type}
      title={alertState.title}
      description={alertState.description}
      onClose={() => setAlertState({ ...alertState, isOpen: false })}
    />
    
    </>
  );
};

export default memo(ForgotPasswordPopup);
