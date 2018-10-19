const got = require('got')
const NodeGeocoder = require('node-geocoder')
const { here: { appId, appCode } } = require('../config')
const pMap = require('p-map')
const fs = require('fs')
const util = require('util')

console.log(appId, appCode)
const geocoder = NodeGeocoder({
  provider: 'here',
  appId,
  appCode
})

// doing this since we use heroku, MVP. Yes I hate myself for this
const getFilePath = file => `./tmp/${file}.json`
const writeFile = (file, items) => fs.writeFile(getFilePath(file), JSON.stringify(items), 'utf8', () => console.log('DONE'))

async function saveDestinations () {
  const { body: data  } = await got('https://www.sas.se/appdata/marketselector/countryinfo.json')
  const destinations = JSON.parse(data).sites.map(({ countryName, origins }) => ({ countryName, origins }))

  const dataToSave = await setGeocodes(destinations)

  console.log(dataToSave)
  return writeFile('destinations', dataToSave)
}

async function getDestinations () {
  return JSON.parse(await readFile(getFilePath('destinations')))
}

const readFile = (path, opts = 'utf8') => {
   return new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) rej(err)
            else res(data)
        })
    })
}


async function setGeocodes (destinations) {
  return pMap(destinations, getGeocodesCountry, { concurrency: 2 })
}

async function getGeocodesCountry (destination) {
  return Object.assign({}, destination, { location: await getGeocodes({ country: destination.countryName, address: destination.countryName }) }, { origins: await getGeocodesCity(destination.origins, destination.countryName) })
}

async function getGeocodesCity (origins, country) {
  const cities = origins.map(city => Object.assign({}, { country, address: city.cityName }))

  return pMap(cities, getGeocodes, { concurrency: 2 })
}

async function getGeocodes (item) {
  return geocoder.geocode(item)
}

module.exports = {
  getDestinations,
  saveDestinations
}
