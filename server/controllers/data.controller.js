import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class DataController {
    async changeConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            await db.run("UPDATE user SET config=?", [ JSON.stringify(req.body) ]);
            await db.close();
            res.send({ success: true });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Changing config error" });
            console.error(err);
        }
    }
    async resetAll(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            await db.run("DELETE FROM user");
            await db.close();
            res.send({ success: true });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Unexpected error" });
            console.error(err);
        }
    }
    async changeLogo(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const { config } = (await db.get("SELECT config FROM user")) || {}; 
            await db.run("UPDATE user SET config=?", [ JSON.stringify({ ...JSON.parse(config), customLogo: true }) ]);
            await db.close();
            res.send({ success: true });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Logo config error" });
            console.error(err);
        }
    }

    async getConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const { config } = (await db.get("SELECT config FROM user")) || {};
            await db.close();
            res.send({ success: true, data: config });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Getting config error" });
            console.error(err);
        }
    }
    async getLogo(req, res) {
        try {
            res.sendFile('/server/assets/logo.png', { root: '.' });
        } catch (error) {}
    }
}

const dataController = new DataController();

export default dataController;