const got = require('got')
const NodeGeocoder = require('node-geocoder')
const { here: { appid, appcode } } = require('../config')
const pMap = require('p-map')
const fs = require('fs')
const flatten = require('array-flatten')

const geocoder = NodeGeocoder({
  provider: 'here',
  appId: appid,
  appCode: appcode
})

// doing this since we use heroku, MVP. Yes I hate myself for this
const getFilePath = file => `./tmp/${file}.json`
const writeFile = (file, items) => fs.writeFile(getFilePath(file), JSON.stringify(items), 'utf8', () => console.log('DONE'))
const readFile = (path, opts = 'utf8') => {
  return new Promise((res, rej) => {
       fs.readFile(path, opts, (err, data) => {
           if (err) rej(err)
           else res(data)
       })
   })
}

async function saveDestinations () {
  const { body: data  } = await got('https://www.sas.se/appdata/marketselector/countryinfo.json')
  const destinations = JSON.parse(data).sites.map(({ countryName, origins }) => ({ countryName, origins }))
  const dataWithGeocodes = await setGeocodes(destinations)
  const airportCodes = dataWithGeocodes.map(( { location: { airportCode } }) => airportCode)
  const lowFares = await getLowFares(airportCodes)

  const dataToSave = dataWithGeocodes.map(itm => ({ ...lowFares.find((item) => (item.id === itm.id) && item), ...itm }))

  return writeFile('destinations', dataToSave)
}

async function getLowFares (to, from = 'arn', startDate = '201810190000', endDate = '201910190000') {
  const url = `https://api.flysas.com/offers/flightproduct/lowestFare?from=${from}&to=${to.join(',')}&startDate=${startDate}&endDate=${endDate}&paxType=ADT&displayType=MONTHLY&pos=SE&tripType=O`
  const { body } = await got(url)
  const { searchResponse: data } = JSON.parse(body)
  return data
}

async function getDestinations () {
  const data = JSON.parse(await readFile(getFilePath('destinations')))

  return data
}

async function setGeocodes (destinations) {
  const data = await pMap(destinations, getGeocodesCountry, { concurrency: 2 })
  const origins = data.map(({ origins }) => origins)

  return flatten(origins)
}

async function getGeocodesCountry (destination) {
  return Object.assign({},
   destination,
  { origins: await getGeocodesCity(destination.origins, destination.countryName) })
}

async function getGeocodesCity (origins, country) {
  const cities = origins.map(city => Object.assign({}, city, { country, address: city.cityName }))

  return pMap(cities, getGeocodes, { concurrency: 2 })
}

async function getGeocodes (item) {
  const [ firstHit ] = await geocoder.geocode(item)
  return {
    location: item,
    coordinates: firstHit
  }
}

module.exports = {
  getDestinations,
  saveDestinations
}
