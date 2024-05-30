
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: Path2D.resolve(__dirname, 'src', 'database', database.db)
    },
    useNullAsDefault: true
  }
};