import React ,{useState, useEffect, memo} from "react";
// import { useNavigate } from "react-router-dom";
import ButtonOrange from "../../components/Button/ButtonCustomA";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import AlertTitle, { type AlertType } from "../../components/AlertTitle/AlertTitle";
import { type User } from "../RegisterPopup/RegisterPopup"; 

//    ====== UI Forgot Password popup ======
interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string; 
  // onResetSuccess: () => void; // Callback khi đặt lại mật khẩu thành công
}

interface ResetPW{
  password: string;
  confirmPassword: string;
}

// Schema validation password
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp.")
    .required("Vui lòng xác nhận mật khẩu"),
});

// Component reset password
const ResetPasswordPopup: React.FC<ResetPasswordProps> = ({ isOpen, onClose, phoneNumber, /* onResetSuccess */ }) => {
  const [isShowPassword, setIsShowPassword] = useState(false); // state show pass
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false); // State cho xác nhận mật khẩu

  // Yup validation state alert
  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
    });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResetPW>({
    resolver: yupResolver(validationSchema), 
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });


   
  useEffect(() => {
    if (!isOpen) {
      reset(); // Reset form field
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsShowPassword(false); // Ẩn mật khẩu
      setIsShowConfirmPassword(false); // Ẩn xác nhận mật khẩu
    }
  }, [isOpen,reset]);


  // Submit thay đổi mật khẩu
  const onSubmitChangePass = (data: ResetPW) => {
      const existingUsersLocal = localStorage.getItem("registeredUsers");
      const existingUsers: User[] = existingUsersLocal ? JSON.parse(existingUsersLocal) : [];
      // Tìm user theo số điện thoại
      const userIndex = existingUsers.findIndex(user => user.phoneNumber === phoneNumber);
      if (userIndex === -1) {
          setAlertState({
              isOpen: true,
              type: 'error',
              title: 'Lỗi!',
              description: 'Không tìm thấy số này.'
          });
          // return;
      }
      else{
          const updatedUsers = [...existingUsers]; // Tạo clone tránh thay đổi trực tiếp state
          updatedUsers[userIndex] = {
          ...updatedUsers[userIndex], // Giữ lại các thông tin khác
          password: data.password, // Cập nhật mật khẩu mới
          };
          localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
          setAlertState({
              isOpen: true,
              type: 'success',
              title: 'Đặt lại mật khẩu thành công!',
              description: 'Bạn có thể đăng nhập với mật khẩu mới.'
          });
          // onResetSuccess();  // đóng popup instant
      }
  };


    if (!isOpen) {
    return null;
    }

  return (
    <>

    <div
      className="fixed inset-0 bg-black/60 z-1005 flex justify-center overflow-y-auto py-20 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center  w-full max-w-[800px] pt-[200px]">

        {/* Hide the phone number form when the OTP popup is open */}
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
                className="items-center h-[250px] inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                            rounded-[20px] border-4 border-white"
              >
                {/* Nội dung popups */}
                <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-10">

                <form id="reset-password-form" onSubmit={handleSubmit(onSubmitChangePass)} className="flex flex-col gap-3 text-[#233da3]">

                    {/* Password */}
                    <div className="relative pb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                    Mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span></label>
                    <input
                        id="password"
                        type={isShowPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Mật Khẩu"
                        className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 
                        outline-none transition ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-blue-500'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-black/40 hover:text-black"
                        aria-label={isShowPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                        {isShowPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        )}
                    </button>
                        {errors.password && <p className="absolute bottom-0 left-0 text-red-500 text-xs ml-2">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative pb-5">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                    Xác nhận mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span></label>
                    <input
                        id="confirmPassword"
                        type={isShowConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Xác nhận mật khẩu"
                        className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 
                        outline-none transition ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-blue-500'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-black/40 hover:text-black"
                        aria-label={isShowConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                        {isShowConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        ) : (                      
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        )}
                    </button>
                        {errors.confirmPassword && <p className="absolute bottom-0 left-0 text-red-500 text-xs ml-2">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Button xác thực */}
                    <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                    {/* Button chính */}
                    <ButtonOrange
                        type="submit"
                        form="reset-password-form" 
                        className={`w-[200px] h-12 text-lg transition-colors duration-300`}
                    >
                        Đặt lại mật khẩu
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

              </div>
            </div>
          </>

      </div>
    </div>
    
    <AlertTitle
      isOpen={alertState.isOpen}
      type={alertState.type}
      title={alertState.title}
      description={alertState.description}
      onClose={() => {
        setAlertState({ ...alertState, isOpen: true });
        if (alertState.type === 'success') {
            // onResetSuccess(); // Đóng hết popup khi xong
            onClose();
        }
      }}
    />
    </>
  );
};

export default memo(ResetPasswordPopup);
