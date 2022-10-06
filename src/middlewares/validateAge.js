module.exports = function validateAge(req, res, next) {
  const newPeople = req.body;
  const { age } = newPeople;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
