const notFound = (message = 'Resource not found') => {
	const error = new Error(message);
	error.status = 404;
	return error;
};

const badRequest = (message = 'Bad Request') => {
	const error = new Error(message);
	error.status = 403;
	return error;
};

module.exports = {
	notFound,
	badRequest,
};
