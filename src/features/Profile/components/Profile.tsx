import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type User } from '../../RegisterPopup/RegisterPopup'; // Import User type
import ChangePasswordProfilePopup from './ChangePasswordProfilePopup'; // Import popup

//    ====== UI Profile ======

interface ProfileProps {
  onLogout: () => void;
  currentUser: User | null; // Thêm prop để nhận thông tin user đang đăng nhập
}


// Component Profile
const Profile: React.FC<ProfileProps> = ({ onLogout, currentUser }) => {
  const navigate = useNavigate();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  // const [isFormProfile, setIsFormProfile] = useState(false);

    // === Thông tin cá nhân ===
  const handleFormInfoProfile = () => {
    // Gọi hàm onLogout được truyền từ App.tsx để cập nhật state isLoggedIn
    // onLogout();
    // navigate('/', { state: { fromLogout: true } }); 
    navigate('/InfoProfile', { state: { user: currentUser } });   // Điều hướng về trang info-profile với thông tin user
  };
  
  // === Đổi mật khẩu ===
  const handleOpenChangePassword = () => {
    if (currentUser) 
      setIsChangePasswordOpen(true);
    else
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
  };

  // === Đăng xuất ===
  const handleLogout = async () => {
    // Lấy token đã lưu từ localStorage
    const token = localStorage.getItem('token');

    try {

      // const response = await fetch('https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/auth/logout', {
      //   method: 'POST',

        // Sử dụng axios.post để gọi API. Tham số thứ 3 là object cấu hình, chứa headers
      await axios.post('https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/auth/logout', null, // Không có body data, truyền null
        {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Gửi token để server xác thực
        },
      });

      // if (!response.ok) {
      //   // Nếu API trả về lỗi, vẫn có thể tiếp tục đăng xuất ở phía client
      //   console.error('API logout không thành công, tiếp tục đăng xuất ở client.');
      // }
      console.log('API logout thành công.');
 
    } catch (error) {
      console.error('Lỗi khi gọi API đăng xuất:', error);
    } finally {
        // Api done or fail thì phải thực hiện bước đăng xuất ở client
      localStorage.removeItem('token'); 
        // có thể xóa các thông tin người dùng khác nếu có, Gọi hàm onLogout được truyền từ App.tsx để cập nhật state isLoggedIn
        // localStorage.removeItem('currentUser');
      onLogout(); // Cập nhật trạng thái đăng nhập toàn cục
      navigate('/', { state: { fromLogout: true } }); // Điều hướng về trang chủ và gửi kèm state để báo hiệu là từ logout
    }
  };


  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] pb-8 px-2'>
      <div className='flex flex-col items-center gap-8'>
        <h2 className='text-4xl font-bold text-white [-webkit-text-stroke:1px_#f6972c]'>
         Xin chào {currentUser?.fullName || 'bạn'}!
        </h2>
        
          <button
            onClick={handleFormInfoProfile}
            className="
            w-[300px] py-4
            bg-blue-600 text-white -skew-x-10 relative 
            font-bold uppercase tracking-wider
            drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
            [clip-path:polygon(0_10,100%_0,calc(100%-15px)_100%,-15px_100%)]
            transition-all duration-200
            hover:bg-blue-700 hover:scale-105 hover:-translate-y-1
            active:translate-x-0.5 active:translate-y-0.5
            active:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
            focus:outline-none cursor-pointer "
          >
            <span className="block skew-x-10">
              Thông tin cá nhân
            </span>
          </button>

          <button
            onClick={handleOpenChangePassword}
            className="
            w-[300px] py-4
            bg-blue-600 text-white -skew-x-10 relative 
            font-bold uppercase tracking-wider
            drop-shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
            [clip-path:polygon(0_10,100%_0,calc(100%-15px)_100%,-15px_100%)]
            transition-all duration-200
            hover:bg-blue-700 hover:scale-105 hover:-translate-y-1
            active:translate-x-0.5 active:translate-y-0.5
            active:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
            focus:outline-none cursor-pointer "
          >
            <span className="block skew-x-10">
              Đổi mật khẩu
            </span>
          </button>

          {/* Nút Đăng xuất */}
          <img onClick={handleLogout} className='text-transparent cursor-pointer w-[270px] 
              h-16 hover:scale-105 transition-transform' src="./static/logout.png" alt="Đăng xuất" />
      </div>
    </div>

    {currentUser && (
      <ChangePasswordProfilePopup
        isOpen={isChangePasswordOpen}
        onClose={ () => setIsChangePasswordOpen(false) }
        phoneNumber={currentUser.phoneNumber}
      />
    )}

    </>
  )
}

export default Profile
