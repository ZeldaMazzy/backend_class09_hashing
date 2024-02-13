const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if(!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
			throw new Error("Request must contain an access token.");
		};

		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY);

		next();
	} catch(e) {
		res.status(401).send(e.message)
	}
}

module.exports = authenticationMiddleware;