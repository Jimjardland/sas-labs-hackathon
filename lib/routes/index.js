const { getDestinations, saveDestinations } = require('./lowfare')

function indexHandler({ method }, res, next) {
  if (method !== 'GET') res.send(303)

  res.send({
    data: {
      message: 'SAS API'
    }
  })
  return next()
}

exports.add = (app) => {
  // standard stuff
  app.del('/', indexHandler)
  app.get('/', indexHandler)
  app.get('/destinations', getDestinations)
  app.put('/destinations', saveDestinations) //auth this
  app.patch('/', indexHandler)
  app.post('/', indexHandler)
  app.put('/', indexHandler)
}
