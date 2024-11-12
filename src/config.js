import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Sebas:..S.3.b.a.s.1.4.1.6..@gfteste.pknao.mongodb.net/RSE_GF?retryWrites=true&w=majority&appName=GFTeste";
export const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_jwt_aqui";