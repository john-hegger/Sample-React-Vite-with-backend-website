import dotenv from 'dotenv'

dotenv.config()

interface Config {
    port: number
    nodeEnv: String
    connectionString: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    connectionString: process.env.CONNECTION_STRING || ''
}

export default config