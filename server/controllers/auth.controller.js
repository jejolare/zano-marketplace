import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import generateString from "../generateString.js";
import sha256 from "sha256";
import defaultConfig from "../defaultConfig.json" assert { type: "json" };

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
                const hash = sha256(req.body.password + salt);
                const token = generateString(24);
                await db.run("INSERT INTO user (nickname, hash, salt, token, config) VALUES (?, ?, ?, ?, ?)", [
                    req.body.nickname, 
                    hash, 
                    salt, 
                    sha256(token),
                    JSON.stringify(defaultConfig) 
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
            if (user && sha256(req.body.password + user.salt) == user.hash) {
                const token = generateString(24);
                await db.run("UPDATE user SET token=?", [sha256(token)]);
                
                res.send({ success: true, token: token });
            } else {
                res.send({ success: false, data: "Wrong nickname or password" });
            }
            await db.close();
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
            const salt = generateString(12);
            const token = generateString(24);
            await db.run("UPDATE user SET hash=?, salt=?, token=?", [ 
                sha256(req.body.password + salt), 
                salt, 
                token
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
}

const authController = new AuthController();

export default authController;