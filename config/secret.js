module.exports = {
  // database: "mongodb://pbc:pbc@ds139072.mlab.com:39072/pbc",
  database: 'mongodb://localhost/pbc',
  port: (process.env.PORT, process.env.IP || 3000),
  secretKey: '143KIM',
};
// "mongodb://localhost/pbc"
// "mongodb://pbc:pbc@ds139072.mlab.com:39072/pbc"
