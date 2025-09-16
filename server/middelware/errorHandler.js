export default function errorHandler(err, req, res, next) {
  const status = Number(err.status || err.statusCode) || 500;
  const code = err.code || 'INTERNAL_ERROR';

  const payload = {
    error: {
      code,
      message: err.publicMessage || err.message || 'Unexpected server error',
    },
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.error.stack = err.stack;
  }

  res.status(status).json(payload);
}
