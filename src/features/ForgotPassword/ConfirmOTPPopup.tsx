import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonOrange from '../../components/Button/ButtonCustomA';

interface ConfirmOTPProps {
  isOpen: boolean;
  onClose: () => void;
  onOtpConfirmed: (phoneNumber: string) => void;
  phoneNumber: string;
}

interface OTPForm {
  otp: string;
}


// Schema validation
const validationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .matches(/^\d{6}$/, "Mã OTP phải gồm 6 chữ số."),
});


//Component Confirm OTP Popup
const ConfirmOTP: React.FC<ConfirmOTPProps> = ({ isOpen, onClose, phoneNumber, onOtpConfirmed }) => {
  const [countdown, setCountdown] = useState<number>(60);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<OTPForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: { otp: '' }
  });

  // Đếm ngược và reset khi popup mở/đóng
  useEffect(() => {
    if (countdown <= 0) return;
    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [countdown]);

  // Cách đếm ngược khác
   
  // useEffect(() => {
  //   let timer: NodeJs.Timeout;
  //   if (isOpen) {
  //     setCountdown(60); // Reset thời gian đếm ngược
  //     reset(); // Reset lại form và lỗi khi mở popup
  //     timer = setInterval(() => {
  //       setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
  //     }, 1000);
  //   }
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [isOpen, reset]); 

  const handleConfirmOTP = (data: OTPForm) => {
    const CORRECT_OTP = "000000";
    if (data.otp === CORRECT_OTP) {
      setError('');
      console.log("Xác nhận đúng OTP");
      onOtpConfirmed(phoneNumber); // Gọi callback khi OTP đúng
      onClose(); // Đóng popup khi nhập đúng
    } else {
      setError("Mã OTP không chính xác. Vui lòng thử lại.");
    }
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-1003 flex justify-center overflow-y-auto py-20 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center  w-full max-w-[800px] pt-[200px]">
        {/* logo */}
        <img
          src="./static/Zootopia.png"
          alt="Oventin Logo"
          className="absolute top-5 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 
          filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)] z-1005"
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
                  w-[300px] md:w-[300px] lg:w-[350px] max-w-[800px] text-center text-black "
        >
          <div
            className="items-center min-h-[220px] inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-10">
              <form id="otp-form" onSubmit={handleSubmit(handleConfirmOTP)} className="flex flex-col gap-3 text-[#233da3]">
                <div className="relative pb-5">
                  <label htmlFor="otp" className="block text-sm font-medium text-white mb-1">
                    Mã xác nhận OTP<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    {...register("otp")}
                    placeholder="Nhập mã OTP"
                    className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none 
                      transition text-center tracking-[0.5em] ${errors.otp || error ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  {(errors.otp || error) && (
                    <p className="absolute bottom-0 left-0 right-0 text-center text-red-500 text-xs">
                      {errors.otp?.message || error}
                    </p>
                  )}
                </div>
              </form>

              <div className="text-white text-center left-1/2 px-4 pt-2">
                Nhập 000000 để mô phỏng xác nhận OTP thành công
              </div>
              
              {/* Buttons */}
              <div className="absolute -bottom-45 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                {/* Submit Button */}
                <ButtonOrange
                  form="otp-form"
                  type="submit"
                  className={`w-[200px] h-12 text-lg transition-colors duration-300`}
                >
                  Tiếp tục
                </ButtonOrange>
                {/* Close Button 'x' */}
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

            <div className="text-white text-center left-1/2 px-4 pb-4">
              {countdown > 0 ? ( 
                <p>Mã OTP sẽ hết hạn sau <span className="font-bold">{countdown}</span> giây</p>
              ) : (
                <p> Mã OTP đã hết hạn.{" "}
                  <button onClick={ ()=> setCountdown(60)} className="underline text-yellow-300 hover:text-yellow-400">
                    Gửi lại mã
                  </button>
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;
