const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./swagger.yaml');
const authenticate = require('./authenticate');

const applyMiddleware = (app, express) => {
	app.use(morgan('dev'));
	app.use(express.json());
	const swaggerOptions = {
		customCss: '.swagger-ui .topbar { display: none }',
	};
	app.use(
		'/docs',
		swaggerUI.serve,
		swaggerUI.setup(swaggerDoc, swaggerOptions)
	);

	// TODO: remove later
	app.use(authenticate);
};

module.exports = applyMiddleware;
