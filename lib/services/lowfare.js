const got = require('got')
const NodeGeocoder = require('node-geocoder')
const { here: { appId, appCode } } = require('../config')
const pMap = require('p-map')
const fs = require('fs')

const geocoder = NodeGeocoder({
  provider: 'here',
  appId,
  appCode
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

  const dataToSave = await setGeocodes(destinations)

  return writeFile('destinations', dataToSave)
}

async function getLowFares (from = 'arn', startDate = '201810190000', endDate = '201910190000', to = ['ams', 'txl', 'fra', 'ham', 'hel', 'krk', 'cph', 'lhr', 'muc', 'osl', 'tll', 'tmp', 'vno', 'tku']) {
  const url = `https://api.flysas.com/offers/flightproduct/lowestFare?from=${from}&to=${to.join(',')}&startDate=${startDate}&endDate=${endDate}&paxType=ADT&displayType=MONTHLY&pos=SE&tripType=O`
  const { body } = await got(url)
  const { searchResponse: data } = JSON.parse(body)
  return data
}

async function getDestinations () {
  // return getLowFares()
  return JSON.parse(await readFile(getFilePath('destinations')))
}

async function setGeocodes (destinations) {
  return pMap(destinations, getGeocodesCountry, { concurrency: 2 })
}

async function getGeocodesCountry (destination) {
  return Object.assign({},
   destination,
  { location: await geocoder.geocode({ country: destination.countryName, address: destination.countryName }) },
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
