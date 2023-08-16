const notFound = (message = 'Resource not found') => {
	const error = new Error(message);
	error.status = 404;
	return error;
};

module.exports = {
	notFound,
};
