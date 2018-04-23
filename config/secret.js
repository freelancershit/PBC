module.exports = {
	database: "mongodb://localhost/pbc",
	port: (process.env.PORT, process.env.IP || 3000),
	secretKey: "143KIM"
}

// "mongodb://nicho:nicho@ds113455.mlab.com:13455/hershoppe"