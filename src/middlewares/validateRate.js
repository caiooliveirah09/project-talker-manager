module.exports = function validateRate(req, res, next) {
  const newPeople = req.body;
  const { talk } = newPeople;
  const { rate } = talk;
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!Number.isInteger(rate) || Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
