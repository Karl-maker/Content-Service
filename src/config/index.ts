import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
    service: {
        content: {
            port: env.CONTENT_SERVICE_PORT,
            test_db: {
                url: env.CONTENT_SERVICE_PORT_TEST_DB_URL
            },
            db: {
                url: env.CONTENT_SERVICE_PORT_DB_URL
            }
        }
    }
}