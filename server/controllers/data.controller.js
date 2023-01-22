import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class DataController {
    async changeConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            await db.run("UPDATE user SET config=?", [ req.body.config ]);
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

    async getConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const { config } = await db.get("SELECT config FROM user");
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
}

const dataController = new DataController();

export default dataController;