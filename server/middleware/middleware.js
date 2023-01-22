import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class Middleware {
    async checkToken(req, res, next) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE token=?", [req.cookies.token]);
            await db.close();
            if (next) {
                if (user) {
                    return next();
                } else {
                    return res.send({ success: false, data: "Invalid token" });
                }
            } else {
                if (user) {
                    res.send({ success: true, data: true });
                } else {
                    res.send({ success: true, data: false });
                }
            }
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Token checking error" });
            console.error(err);
        }
    }
}

const middleware = new Middleware();

export default middleware;