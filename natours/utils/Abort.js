class Abort extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'feil' : 'error';
    this.isOpertional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Abort;
