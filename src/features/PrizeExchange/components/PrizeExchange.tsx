import React ,{useState, useEffect, useRef, useCallback} from "react";
import axios from "axios";
import ImgLeftPopup from "../../StickyDragPopup/ImgLeftPopups";

interface PrizeExchange {
  id: number;
  name: string;
  price: number;
  quantity: number;
  prizeImage?: string;
}


const PrizeExchange: React.FC = () => {

  // const [prizes] = useState<Prize[]>([
  //   { id: 1, name: "Gấu bông khổng lồ", points: 500, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 2, name: "Bình giữ nhiệt", points: 300, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 3, name: "Tai nghe Bluetooth", points: 1200, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 4, name: "Voucher 100k", points: 100, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 5, name: "Móc khóa Cute", points: 50, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 6, name: "Balo thời trang", points: 800, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 7, name: "Sạc dự phòng", points: 600, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  //   { id: 8, name: "Áo thun Limited", points: 450, mainImage: "/static/fox.png", subImage: "https://via.placeholder.com/30" },
  // ]);
  const BASE_PRIZE_IMG_URL = 'https://s3dev.estuary.solutions/ovaltine2024dev/';
  
  const [prizes, setPrizes] = useState<PrizeExchange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dragRefLeft = useRef<HTMLDivElement>(null!);
  const [isStickyPopupLeft, setIsStickyPopupLeft] = useState(true);
  const closeStickyPopupLeft = useCallback(() => setIsStickyPopupLeft(false), []);


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api-dev.estuary.solutions:8443/ovaltine-web-api-dev/v1/store-products`);          
        const PrizeData = response.data?.data|| [];
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedDataPrize: PrizeExchange[] = PrizeData.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          prizeImage: item.avatarId ? `${BASE_PRIZE_IMG_URL}${item.avatarId}`  : `/static/fox.png`
        }));

        setPrizes(mappedDataPrize);
      } catch (error) {
        setError("Không thể tải danh sách quà tặng. Vui lòng thử lại sau.");
        console.error("Lỗi tải danh sách quà tặng:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Tải dữ liệu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">
          Đang tải danh sách quà...
        </div>
      </div>
    );
  }

  // Hiển thị lỗi 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-medium">{error}</div>
      </div>
    );
  }

  return (

  <div className="top-5 w-full h-full relative z-0">
      {/* Title */}
      <div className="flex justify-center items-center top-5 w-full h-full relative z-0">
        <img
          src="/static/PrizeExchange.png"
          alt="Lucky Draw"
          className="h-auto w-[70%] max-w-[300px] md:w-[80%] md:max-w-[400px] lg:w-[90%]"
        />
      </div>

      {/* Nội Dung Danh Sách */}
      <div className="min-h-screen py-10 px-4">
        
        <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-900">
          Đổi Quà Thưởng
        </h1>
        <div className="flex flex-wrap justify-center gap-6 max-w-[844px] mx-auto">
          
          {prizes.map((prize) => (

            <div key={prize.id} className="flex flex-col items-center w-[232px] pr-6 mb-5 shrink-0 ">
              <div className="
                w-full h-[332px] bg-white 
                border-2 border-yellow-400 
                rounded-2xl 
                flex flex-col items-center justify-center 
                shadow-sm hover:shadow-md transition-shadow
                p-4
                relative
              ">
                <img 
                  src={prize.prizeImage} 
                  alt={prize.name} 
                  className="w-4/4 h-auto object-contain mb-4" 
                />
                
                <div className="mt-2 flex flex-row gap-1 items-center
                                [-webkit-box-align:center]">
                   <img 
                    src='/static/Zootopia.png' 
                    alt="icon" 
                    className="w-8 h-8 rounded-full "
                  /><span className="leading-normal text-[rgb(239,0,18)] text-3xl font-bold m-0">x{prize.price}</span>
                </div>
              </div>

              <div className="w-full text-center mt-4 px-1">
                <h3 className="min-h-16 line-clamp-2 flex  justify-center leading-normal text-[rgb(35,61,163)] text-center text-xl
                 [text-shadow:0_0_3px_rgb(255,255,255)] drop-shadow-[0_0_2px_rgb(255,255,255)]"> {/* che chữ: dùng truncate ? */}
                  {prize.name}
                </h3>
                <p className="text-sm text-gray-900 mb-3 mt-2">
                 <span className="font-normal leading-normal text-[rgb(35,61,163)] text-base text-center max-w-[232px] mt-auto mb-0 mx-0
                  ">Còn</span>  {prize.quantity} phần quà
                </p>
              </div>
                <button 
                  disabled 
                  className=" 
                    w-[60%] py-2.5 rounded-full 
                    bg-gray-300 text-gray-500 font-medium
                    cursor-not-allowed
                    border border-gray-200 mt-auto mb-4
                  "
                >
                  Đổi quà
                </button>

            </div>
          ))}
          
        </div>
        </div>
      </div>
      {/* End Danh Sách */}

          <img
            src="/static/fox.png"
            alt="fox"
            className="absolute z-5 h-auto transition-all duration-300 ease-in-out hidden
                lg:block lg:w-[150px] lg:bottom-10 lg:left-0"
          />
          <img
            src="/static/rabbit.png"
            alt="rabbit"
            className="absolute z-5 h-auto transition-all duration-300 ease-in-out hidden
                lg:block lg:w-[150px] lg:bottom-10 lg:right-0"
          />
          <ImgLeftPopup
            isOpen={isStickyPopupLeft}
            onClose={closeStickyPopupLeft}
            dragRef={dragRefLeft}
          />

  </div>

  )
}

export default PrizeExchange
