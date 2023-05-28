import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
    service: {
        content: {
            port: env.CONTENT_SERVICE_PORT,
            db: {
                url: env.CONTENT_SERVICE_PORT_DB_URL
            }
        }
    }
}