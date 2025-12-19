import React, { useState, useEffect } from "react";

import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonOrange from "../../components/Button/ButtonCustomA";
import AlertTitle, { type AlertType } from "../../components/AlertTitle/AlertTitle";
import { Link } from "react-router-dom";

//    ====== UI Register ======

export interface User { //file TS
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Vui lòng nhập họ và tên")
    .matches(/^[^0-9]+$/, "Họ và tên không được chứa số.")
    .min(4, "Họ và tên phải có nhiều hơn 3 ký tự."),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số, không nhập chữ."),
  dateOfBirth: yup
    .string()
    .required("Vui lòng nhập ngày sinh")
    .test("is-over-four", "Bạn phải lớn hơn 4 tuổi.", (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 4;
    }),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp.")
    .required("Vui lòng xác nhận mật khẩu"),
});


// === COMPONENT ===
const RegisterPopup: React.FC<RegisterPopupProps> = ({
  isOpen,
  onClose,
}) => {
  // === STATE FORM ===
  const { register, handleSubmit: handleRegisterSubmit, formState: { errors }, reset } = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    }
  });
  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });
  const [isConfirmRegister, setIsConfirmRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // === FUNCTION ===
  const getMaxDate = () => { // tính ngày tối đa được cho chọn (cách 4 năm) để disable trên datepicker
    const today = new Date();
    today.setFullYear(today.getFullYear() - 4);
    return today.toISOString().split("T")[0]; 
  };

   
  useEffect(() => {
    if (!isOpen) {
      reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsConfirmRegister(false);
    }
  }, [isOpen, reset]);

  const onSubmit = (data: User) => {   // Xử lý submit
      const existingUsersRaw = localStorage.getItem("registeredUsers");
      const existingUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
      const userExists = existingUsers.some(user => user.phoneNumber === data.phoneNumber);
      if (userExists) {
        setAlertState({
          isOpen: true,
          type: 'error',
          title: 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số khác.',
          description: 'Hãy nhập lại số điện thoại khác.'
        });
        return;
      }
      
      const newUser: Omit<User, 'confirmPassword'> = { // Tạo user mới và lưu vào localStorage
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      setAlertState({
        isOpen: true,
        type: 'success',
        title: 'Đăng ký thành công!',
        description: 'Hãy đăng nhập lại để tiếp tục.'
      });
      // onClose();
  };

  if (!isOpen) {
    return null;
  }

  // === UI RENDER ===
  return (
    <>

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
    <div
      className="fixed inset-0 bg-black/60 z-1003 flex justify-center overflow-y-auto py-10 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center w-full max-w-[800px] pt-[200px]">
        {/* logo */}
        <img
          src="./static/Zootopia.png"
          alt="Oventin Logo"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="/static/register.png"
          alt="Đăng ký"
          className="absolute z-1004 top-40 left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-full md:w-full lg:w-[550px] max-w-[800px] text-center text-white "
        >
          <div
            className="items-center inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-5">

              <form id="register-form" onSubmit={handleRegisterSubmit(onSubmit)} className="flex flex-col gap-3 text-[#233da3]">
                
                {/* Họ và tên */}
                <div className=" relative pb-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
                  Họ và tên<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    // value={formData.fullName}
                    // onChange={handleChangeInput}
                    {...register("fullName")}
                    placeholder="Họ và tên"
                    // CSS hover viền vàng className="w-full bg-white border border-white/30 rounded-[20px] p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                    className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none 
                    transition ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  {/* Check */} {errors.fullName && <p className="absolute bottom-0 left-0 text-red-500 text-xs ml-2">{errors.fullName.message}</p>}
                </div>

                {/* Số điện thoại */}
                <div className="relative pb-5">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                  Số điện thoại<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    // value={formData.phoneNumber}
                    // onChange={handleChangeInput}
                    {...register("phoneNumber")}
                    placeholder="Số điện thoại"
                    className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none 
                    transition ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  {errors.phoneNumber && <p className="absolute bottom-0 left-0 text-red-500 text-xs ml-2">{errors.phoneNumber.message}</p>}
                </div>

                {/* Ngày sinh */}
                <div className=" relative pb-5">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white mb-1">
                  Ngày sinh<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    max ={getMaxDate()}
                    // value={formData.dateOfBirth}
                    // onChange={handleChangeInput}
                    {...register("dateOfBirth")}
                    className={`w-full bg-white text-gray-500/70 border rounded-[30px] p-2 focus:ring-2 outline-none 
                    transition ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  {errors.dateOfBirth && <p className="absolute bottom-0 left-0 text-red-500 text-xs ml-2">{errors.dateOfBirth.message}</p>}
                </div>

                {/* Mật khẩu */}
                <div className=" relative pb-5">
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    // value={formData.password}
                    // onChange={handleChangeInput}
                    {...register("password")}
                    placeholder="Mật Khẩu"
                    className={`w-full bg-white  border rounded-[30px] p-2 focus:ring-2 outline-none 
                    transition ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-black/40 hover:text-black"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
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

                {/* Xác nhận mật khẩu */}
                <div className=" relative pb-5">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                  Xác nhận mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    // value={formData.confirmPassword}
                    // onChange={handleChangeInput}
                    {...register("confirmPassword")}
                    placeholder="Xác nhận mật khẩu"
                    className={`w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none 
                    transition ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/30 focus:ring-[#233da3]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-black/40 hover:text-black"
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPassword ? (
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
              </form>

              {/* Checkbox Đồng ý? */}
              <label
                className="mt-4 text-[rgb(35,61,163)] inline-flex items-center cursor-pointer 
              align-middle mr-4"
              >
                <span
                  className="inline-flex items-center justify-center relative box-border bg-transparent outline-none border-none m-0 cursor-pointer
                              select-none align-middle appearance-none no-underline p-[9px] rounded-full [-webkit-tap-highlight-color:transparent]"
                >
                  <input
                    type="checkbox"
                    checked={isConfirmRegister}
                    onChange={() => setIsConfirmRegister(!isConfirmRegister)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </span>
                <span className=" text-(--normal-blue) font-normal text-base leading-normal m-0 text-left">
                  Tôi đồng ý với <Link to='/RuleEvent'
                   target="_blank" rel="noopener noreferrer" className="underline cursor-pointer"> thể lệ </Link> 
                  chương trình khuyến mãi này
                </span>
              </label>

              {/* Button xác thực */}
              <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                {/* Button chính */}
                <ButtonOrange
                  type="submit"
                  form="register-form"
                  disabled={!isConfirmRegister}
                  className={`w-[200px] h-12 text-lg transition-colors duration-300 ${
                    !isConfirmRegister
                      ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                      : ""
                  }`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterPopup;
