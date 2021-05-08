import dotenv from "dotenv";
dotenv.config();

const PORT: number = parseInt(process.env.PORT!) || 5000;
const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS!);
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!;

export { PORT, SALT_ROUNDS, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };
