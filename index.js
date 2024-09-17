let data
const map = L.map('map', { center: [0, 0], zoom: 13, zoomControl: false })
const icon = L.icon({ iconUrl: './images/icon-location.svg' })
const marker = L.marker([0, 0], { icon }).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const getData = async (query = '') => {
  const fields = 33612788
  const IP_API = `https://geo.ipify.org/api/v2/country,city?apiKey=at_JJFz5kDkHoe1vA0GwlhuOIzYENDXD${query !== '' ? `&ipAddress=${query}` : ''}`
  const response = await fetch(IP_API)
  if (!response.ok) return Promise.reject('cascscas')
  const data = await response.json()
  return data
}

const setData = ({ ip, location, isp }) => {
  const { city, region, postalCode, timezone, lat, lng } = location
  const latLng = [lat, lng]

  u('#ip-address').text(ip)
  u('#location').text(`${city}, ${region} ${postalCode}`)
  u('#timezone').text(`UTC ${timezone}`)
  u('#isp').text(isp)
  map.setView(latLng)
  marker.setLatLng(latLng)
}

const changeData = (ip = '') => getData(ip)
  .then(data => setData(data))
  .catch(reason => console.error(reason))

u('#ip-address-tracker-form').handle('submit', function ({ target }) {
  const formData = new FormData(target)
  const ip = formData.get('ip')
  changeData(ip)
}) 

changeData()
