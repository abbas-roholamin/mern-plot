const mongoose = require('mongoose');

class DB {
  constructor(DSN) {
    this.DSN = DSN;
    this._connection();
  }

  _connection() {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(this.DSN)
      .then(() => console.info('connected to database successfully!'))
      .catch(() => console.error('failed to connect to database'));
  }
}

exports.modules = new DB(process.env.MONGODB_URI);
