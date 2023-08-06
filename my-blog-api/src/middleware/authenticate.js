const authenticate = (req, _res, next) => {
	req.user = {
		id: '64ccc5be5868179aa1c04894',
		name: 'Majedur Rahman',
		email: 'majedur@gmail.com',
	};
	next();
};

module.exports = authenticate;
