import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class DataController {
    async changeConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            
        } catch(err) {
            try {
                await db.close();
            } catch {}

        }
    }

    async getConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {

        } catch(err) {
            try {
                await db.close();
            } catch {}

        }
    }
}

const dataController = new DataController();

export default dataController;