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
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Error while register" });
            console.error(err);
        }
    }

    async login(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE nickname=?", [req.body.nickname]);
            if (user && sha256(req.body.password + user.salt) == user.password) {
                res.send({ success: true, token: user.token });
            } else {
                res.send({ success: false, data: "Wrong nickname or password" });
            }
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Error while login" });
            console.error(err);
        }
    }

    async changePassword(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE token=?", [req.body.token]);
            const salt = generateString(12);
            await db.run("UPDATE user SET password=?, salt=? WHERE token=?", [ sha256(req.body.password + salt), salt, user.token ]);
            res.send({ success: true });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Error while changing password" });
            console.error(err);
        }
    }

    async checkToken(req, res, next) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const user = await db.get("SELECT * FROM user WHERE token=?", [req.body.token]);
            if (user) {
                next();
            } else {
                res.send({ success: false, data: "Invalid token" });
            }
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Error while token check middleware" });
            console.error(err);
        }
    }
}

const authController = new AuthController();

export default authController;