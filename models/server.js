
const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config');
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST Server',
            version: '1.0.0',
            description: ''
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ],
    },
    apis: ['../routes/*.js'],
    paths: {
        '/api/user': {
            get: {
                summary: 'Returns a list of users',
                description: 'Description',
                responses: {
                    '200': {
                        description: 'OK'
                    }
                }
            }
        }
    }
}

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello world');
        });

        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

        this.app.use('/api/user', require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;