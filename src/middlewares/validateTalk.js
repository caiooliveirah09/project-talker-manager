module.exports = function validateTalk(req, res, next) {
  const newPeople = req.body;
  const { talk } = newPeople;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
};