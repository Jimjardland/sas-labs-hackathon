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
  app.patch('/', indexHandler)
  app.post('/', indexHandler)
  app.put('/', indexHandler)
}
