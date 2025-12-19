import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { getCityNameById } from '../../../utils/LocationsHelper';
// import ButtonOrange from '../Button/ButtonCustomA';
import AlertTitle, { type AlertType } from '../../../components/AlertTitle/AlertTitle';

/**
 *    ====== UI InfoProfile ======
 * 
 * Giao diện cho dữ liệu người dùng được lưu trong localStorage.
 * Lấy từ RegisterPopup.tsx không bao gồm password và confirmPassword.
 */
interface StoredUser {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string; 
  email: string; 
  cmnd: string;
  city: number;
  address: string;
}

// Component InfoProfile
const InfoProfile: React.FC = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'recipient'>('personal');
  // const [currentUser, setCurrentUser] = useState<StoredUser | null>();
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(() => {     // Khởi tạo state từ localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) as StoredUser : null;
  });

  // Alert custom
  const [alertState, setAlertState] = useState<{isOpen: boolean; type: AlertType; title: string; description?: string}>({
    isOpen: false,
    type: 'success',
    title: ''
  });

  const getApiInfoProfile = async () => {
    // 1. Lấy token từ localStorage
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found. Please logout and login again"); // Báo lỗi nếu rỗng token
      navigate('/');
    }

    // 2. Gọi API GET kèm theo Header Authorization
    return axios.get('https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/members/me', {
      headers: {
        'Authorization': `Bearer ${token}`, // Cú pháp chuẩn: Bearer + dấu cách + token
        'Content-Type': 'application/json'
      }
    });
  };

   
  useEffect(() => {
      const fetchLatestProfile = async () => {
        try {
          setIsLoading(true);
          // Gọi API
          const response = await getApiInfoProfile();           // Gọi Api
          console.log("DATA PROFILE: ", response.data);         // Kiểm tra data trả về từ API
          const UserData = response.data                        // Lấy loại data json từ response

          const NewStoredUser: StoredUser = {
            fullName: UserData.data.fullName || UserData.data.full_name || UserData.data.name || "Chưa cập nhật",
            phoneNumber: UserData.data.phoneNumber || UserData.data.phone || "Chưa cập nhật",
            email: UserData.data.email || "Chưa cập nhật",
            dateOfBirth: UserData.data.birthday || UserData.data.dateOfBirth || "",
            cmnd: UserData.data.cmnd || "Chưa cập nhật",
            city: UserData.data.cityId || 0,
            address: UserData.data.address || "Chưa cập nhật",
          };
          
          setCurrentUser(NewStoredUser); // Cập nhật State với dữ liệu mới 
          localStorage.setItem('loggedInUser', JSON.stringify(UserData)); // Cập nhật lại LocalStorage với dữ liệu mới

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("Lỗi lấy thông tin mới (đang hiển thị thông tin cũ):", error);
          if (error.response && error.response.status === 401) {
              alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
              localStorage.removeItem('token'); // Xóa token cũ
              localStorage.removeItem('loggedInUser'); // Xóa thông tin người dùng cũ
              navigate('/'); // về trang chủ
            }
        } finally {
          setIsLoading(false);
        }
      };

      fetchLatestProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!currentUser) {
    return <div>Không tìm thấy thông tin người dùng. Vui lòng đăng ký.</div>;
  }


  const renderInput = (id:string, label:string, value?:string | number, disabled:boolean = false) => (
    <div className="relative pb-5">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        defaultValue={value}
        disabled={disabled}
        className="w-full bg-white border rounded-[30px] p-2 focus:ring-2 outline-none transition border-white/30 focus:ring-[#233da3] disabled:bg-gray-200 disabled:cursor-not-allowed"
      />
    </div>
  );


  return (
    <>
      <AlertTitle
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        description={alertState.description}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
      />

      <div className="flex justify-center items-center  w-full h-full relative z-0">
        <img
          src="/static/InfoSelf.png"
          alt="Lucky Draw"
          className="h-auto w-[70%] max-w-[300px] md:w-[80%] md:max-w-[400px] lg:w-[90%]"
        />
      </div>

      {/* Tab container */}
      <div className="flex justify-center items-start gap-2 sm:gap-4 mt-4 mb-8 px-2">
        {/* Tab 1 Wrapper */}
        <div className="relative">
          <div
            onClick={() => setActiveTab('personal')}
            className={`
            w-40 md:w-[250px] lg:w-[250px] py-3 md:py-4 text-white -skew-x-10 relative 
            font-bold uppercase tracking-wider
            drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
            [clip-path:polygon(0_10,100%_0,calc(100%-15px)_100%,-15px_100%)]
            transition-all duration-200
            hover:scale-105 hover:-translate-y-1
            active:translate-x-0.5 active:translate-y-0.5
            active:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
            focus:outline-none cursor-pointer
            ${activeTab === 'personal' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
          >
            <span className="block skew-x-10 text-center">
            Tài khoản cá nhân
            </span>
          </div>
          {/* Đường kẻ cho Tab 1 */}
          <div className={`absolute w-43 md:w-66 lg:w-66 bottom-[-25px] -left-2.5 right-2.5 h-1 transition-colors duration-300 ${activeTab === 'personal' ? 'bg-blue-500 z-10' : 'bg-white/70'}`}></div>
        </div>

        {/* Tab 2 Wrapper */}
        <div className="relative">
          <div
            onClick={() => setActiveTab('recipient')}
            className={`
            w-40 md:w-[250px] lg:w-[250px] py-3 md:py-4 text-white -skew-x-10 relative 
            font-bold uppercase tracking-wider
            drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
            [clip-path:polygon(0_10,100%_0,calc(100%-15px)_100%,-15px_100%)]
            transition-all duration-200
            hover:scale-105 hover:-translate-y-1
            active:translate-x-0.5 active:translate-y-0.5
            active:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
            focus:outline-none cursor-pointer
            ${activeTab === 'recipient' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
          >
            <span className="block skew-x-10 text-center">
            Thông tin người nhận
            </span>
          </div>
          {/* Đường kẻ cho Tab 2 */}
          <div className={`absolute w-43 md:w-66 lg:w-66 bottom-[-25px] -left-2.5 right-2.5 h-1 transition-colors duration-300 ${activeTab === 'recipient' ? 'bg-blue-500 z-10' : 'bg-white/70'}`}></div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'personal' && (
        <div className="p-4 sm:p-6 max-w-lg w-sm lg:w-lg md:w-md mx-auto bg-[url('/static/modal.png')] 
                          bg-center rounded-[20px] border-4 border-white mt-10 mb-10">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Thông tin tài khoản</h2>
          {isLoading && <p>Đang đồng bộ dữ liệu...</p>} 
          {/* Container for user info */}
          <div className="flex flex-col gap-3 text-[#233da3]">
            {renderInput("fullName", "Họ và tên", currentUser.fullName, true)}
            {renderInput("phoneNumber", "Số điện thoại", currentUser.phoneNumber, true)}
            {renderInput("birthday", "Ngày sinh", currentUser.dateOfBirth, true)}
            {renderInput("city", "Thành phố", getCityNameById(currentUser.city), true)}
            {renderInput("email", "Email", currentUser.email || 'Chưa cập nhật', true)}
          </div>
        </div>
      )}

      {activeTab === 'recipient' && (
        // <div className="p-6 max-w-lg mx-auto mt-10 mb-10 text-white text-center">
          <div className="p-4 sm:p-6 max-w-lg w-sm lg:w-lg md:w-md mx-auto bg-[url('/static/modal.png')] 
                  bg-center rounded-[20px] border-4 border-white mt-10 mb-10">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Thông tin người nhận</h2>
          {isLoading && <p>Đang đồng bộ dữ liệu...</p>} 
          {/* Container for user info */}
          <div className="flex flex-col gap-3 text-[#233da3]">
            {renderInput("fullName", "Họ và tên", currentUser.fullName, true)}
            {renderInput("CMND", "CMND", 'Số căn cước công dân', true)}
            {renderInput("phoneNumber", "Số điện thoại", currentUser.phoneNumber, true)}
            {renderInput("city", "Thành phố", getCityNameById(currentUser.city), true)} 
            {renderInput("district", "Quận", 'Quận / Huyện', true)}
            {renderInput("ward", "Phường/Xã", 'Phường/ Xã', true)}
            {renderInput("address", "Địa chỉ", currentUser.address, true)}
          </div>
        </div>
        // </div>
      )}

    </>
  );
};

export default InfoProfile;