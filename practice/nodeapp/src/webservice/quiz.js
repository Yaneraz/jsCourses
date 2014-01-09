module.exports = function(app){
  app.get('/api/quize', getMe);
}

function getMe(req, res, next){
  //res.json(req.user);
  console.log(res)
}
