import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import generateString from "../generateString.js";
import sha256 from "sha256";

const __dirname = dirname(fileURLToPath(import.meta.url));

class AuthController {
    async isRegistered(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const data = !!(await db.get("SELECT * FROM user"));
            await db.close();
            res.send({ success: true, data });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false });
            console.error(err);
        }
    }

    async register(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            if (await db.get("SELECT * FROM user")) {
                res.send({ success: false, data: "User already exists" });
            } else {
                const salt = generateString(12);
                const password = sha256(req.body.password + salt);
                const token = generateString(24);
                await db.run("INSERT INTO user (nickname, password, salt, token) VALUES (?, ?, ?, ?)", [
                    req.body.nickname, 
                    password, 
                    salt, 
                    token 
                ]);
                res.send({ success: true, data: token });
            }
            await db.close();
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Registration error" });
            console.error(err);
        }
    }

    async login(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE nickname=?", [req.body.nickname]);
            await db.close();
            if (user && sha256(req.body.password + user.salt) == user.password) {
                res.send({ success: true, token: user.token });
            } else {
                res.send({ success: false, data: "Wrong nickname or password" });
            }
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Login error" });
            console.error(err);
        }
    }

    async changePassword(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE token=?", [req.body.token]);
            const salt = generateString(12);
            const token = generateString(24);
            await db.run("UPDATE user SET password=?, salt=?, token=? WHERE token=?", [ 
                sha256(req.body.password + salt), 
                salt, 
                token, 
                user.token 
            ]);
            await db.close();
            res.send({ success: true });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Password changing error" });
            console.error(err);
        }
    }

    async checkToken(req, res, next) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE token=?", [req.cookies.token]);
            await db.close();
            if (next) {
                if (user) {
                    return next();
                }else {
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

const authController = new AuthController();

export default authController;