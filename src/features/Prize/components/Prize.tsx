import {useState, useEffect}  from 'react'
import PrizeDetailPopup from './PrizeDetailPopup';
import {type Prize as PrizeType } from '../../WheelGame/WheelGames'; // Import Prize type

const Prize = () => {

  const [prizes, setPrizes] = useState<PrizeType[]>([]);
  
  const [selectedPrize, setSelectedPrize] = useState<PrizeType | null>(null);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {// Đọc danh sách quà từ localStorage
    const savedPrizes = localStorage.getItem('oventinPrizes');
    if (savedPrizes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrizes(JSON.parse(savedPrizes) as PrizeType[]);
    }
  }, []);


  // sự kiện chống scroll
  const handleRowClick = (prize: PrizeType) => {
    setSelectedPrize(prize);
    // setIsPopupOpen(true);
    document.body.classList.add('body-no-scroll');
  };
  const handleClosePopup = () => {
    setSelectedPrize(null);
    // setIsPopupOpen(false);
    document.body.classList.remove('body-no-scroll');
  };

  // Hàm xử lý sự kiện cập nhật quà popup
  const handleUpdatePrize = (updatedPrize: PrizeType) => {
    // Cập nhật mảng prizes trong state
    const updatedPrizes = prizes.map(p => 
      p.id === updatedPrize.id ? updatedPrize : p
    );
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));  // Lưu vào localStorage
    handleClosePopup(); // Đóng popup và thông báo cho người dùng
    alert(`Đã cập nhật quà "${updatedPrize.name}" thành công!`);
    console.log('updated prize: ' + updatedPrizes);
  };

  // Hàm xử lý sự kiện xóa quà từ popup
  const handleDeletePrize = (prizeId: number) => {
    // Lọc ra các quà không bị xóa
    const updatedPrizes = prizes.filter(p => p.id !== prizeId);
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes)); // Lưu vào local

    handleClosePopup(); // Đóng popup
    alert('Đã xóa quà thành công!');
  };

  

  return (
        <div className="w-full">
      <div className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-yellow-300 mb-10 text-3xl md:text-4xl font-bold uppercase tracking-wider">
          Bộ Sưu Tập Quà Tặng
        </h1>

        {prizes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prizes.map(prize => (
              <div
                key={prize.id}
                onClick={() => handleRowClick(prize)}
                className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-yellow-300/20 cursor-pointer group"
              >
                {/* Prize Image / Value */}
                <div className="h-48 flex items-center justify-center bg-black/20 p-4 overflow-hidden">
                  {prize.type === 'image' ? (
                    <img src={prize.value} alt={prize.name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <span className="text-2xl font-bold text-white italic px-4 text-center">{prize.value}</span>
                  )}
                </div>
                {/* Prize Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white truncate" title={prize.name}>{prize.name}</h3>
                  <p className="text-sm text-yellow-300/80 mt-2">Tỉ lệ: <span className="font-semibold">{(prize.probability * 100).toFixed(4)}%</span></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/70 text-lg">Chưa có quà nào trong bộ sưu tập. Hãy thêm quà ở trang vòng quay!</p>
        )}
      </div>

      <PrizeDetailPopup 
        prize={selectedPrize}
        onClose={handleClosePopup}
        onUpdate={handleUpdatePrize}
        onDelete={handleDeletePrize}
      />

    </div>
  )
}

export default Prize
