import locationData from '../data/locations.json'; 

export const getCityNameById = (cityId: number | string) => {
  // Tìm trong list cứng
  const city = locationData.find(item => item.id == cityId);
  return city?.name ;
};