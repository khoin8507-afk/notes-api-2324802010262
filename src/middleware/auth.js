
const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';

  const token = header.startsWith('Bearer ')
    ? header.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      error: 'Thiếu token'
    });
  }

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    if (
      typeof req.user.sub !== 'string' ||
      !/^[a-f0-9]{24}$/i.test(req.user.sub)
    ) {
      return res.status(401).json({
        error: 'Danh tính trong token không hợp lệ'
      });
    }

    next();
  } catch {
    res.status(401).json({
      error: 'Token không hợp lệ hoặc đã hết hạn'
    });
  }
};
