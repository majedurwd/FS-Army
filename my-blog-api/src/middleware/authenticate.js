const authenticate = (req, _res, next) => {
	req.user = {
		id: 999,
		name: 'Majedur Rahman',
	};
	next();
};

module.exports = authenticate;
