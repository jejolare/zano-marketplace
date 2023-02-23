import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import defaultConfig from "../defaultConfig.json" assert { type: "json" };
import fetch from "node-fetch";
import { create  } from "ipfs-http-client";
import sha256 from "sha256";

const __dirname = dirname(fileURLToPath(import.meta.url));
class DataController {
    async changeConfig(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            const newConfig = req.body.updateOnly ? {...config, ...req.body.config} : req.body.config;

            await db.run("UPDATE user SET config=?", [ JSON.stringify(newConfig) ]);
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
            await db.run("DELETE FROM hiddenOffers");
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

    async resetStyles(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');

            await db.run(
                "UPDATE user SET config=?", 
                [ 
                    JSON.stringify({ ...config, styles: defaultConfig.styles, offerConfig: defaultConfig.offerConfig }) 
                ]
            );
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

    async uploadIPFS(req, res) {
        let ipfs;
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            await db.close();   
            const projectId = config.projectId;
            const projectSecret = config.projectSecret;
            const authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');
            ipfs = create({
                url: "https://ipfs.infura.io:5001/api/v0",
                headers:{
                    authorization
                }
            });
            const result = await ipfs.add(req.file.buffer);

            ipfs.stop().catch(() => {});
            ipfs = undefined;
            res.send({ success: true, hash: result.path })

        } catch (error) {
            try {
                await ipfs.stop();
            } catch (error) {}
            try {
                await db.close();
            } catch {}
            res.send({ success: false });
        }
    }

    async hideOffer(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            await db.run("INSERT INTO hiddenOffers (hash) VALUES (?)", [req.body.hash]);
            const hiddenOffers = (await db.all("SELECT hash FROM hiddenOffers") || []).map(e => e.hash);
            await db.close();

            res.send({ success: true, data: hiddenOffers });
        } catch(err) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false, data: "Unexpected error" });
            console.error(err);
        }
    }

    async showOffer(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            await db.run("DELETE FROM hiddenOffers WHERE hash = ?", [req.body.hash]);
            const hiddenOffers = (await db.all("SELECT hash FROM hiddenOffers") || []).map(e => e.hash);
            await db.close();

            res.send({ success: true, data: hiddenOffers });
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
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            await db.run("UPDATE user SET config=?", [ JSON.stringify({ ...config, customLogo: true }) ]);
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
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            const user = await db.get("SELECT * FROM user WHERE token=?", [sha256(req.cookies.token || '')]);
            const hiddenOffers = (await db.all("SELECT hash FROM hiddenOffers") || []).map(e => e.hash);

            config.hiddenOffers = hiddenOffers;

            if (!user) {
                delete config.projectSecret;
            }

            await db.close();
            if (!config.styles) {
                res.send({ success: true, data: JSON.stringify(defaultConfig) });
                return;
            }
            res.send({ success: true, data: JSON.stringify(config) });
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

    async rpcCall(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            await db.close();

            const offersData = await fetch(`${config.walletPort}/json_rpc`, {
                method: "POST",
                body: JSON.stringify(req.body),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(r => r.json());

            res.send(offersData);

        } catch (error) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false });
        }
    }

    async export(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const config = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            await db.close();
            res.set({
              'Content-Type': 'text/plain',
              'Content-Disposition': `attachment; filename="zanoConfig.json"`,
            });
    
            res.send(JSON.stringify(config));

        } catch (error) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false });
            console.log(error);
        }
    }

    async getOffers(req, res) {
        const db = await open({ filename: __dirname + '/../database.db', driver: sqlite3.Database });
        try {
            const ownerConfig = JSON.parse((await db.get("SELECT config FROM user"))?.config || '{}');
            await db.close();

            const config = req.body.config;  

            async function getOffers(port, amount, offset) {
                try {
                    const offersData = await fetch(`${port.replace(/.$/,"/")}json_rpc`, {
                        method: "POST",
                        body: JSON.stringify({
                            jsonrpc: "2.0",
                            id: "0",
                            method: "marketplace_get_offers_ex",
                            params: {
                                filter: {
                                    amount_low_limit: config.minPrice, 
                                    amount_up_limit: config.maxPrice,
                                    bonus: false,
                                    category: config.category,
                                    fake: false, 
                                    keyword: config.search,
                                    limit: amount, 
                                    location_city: config.locationCity,
                                    location_country: config.locationCountry,
                                    offer_type_mask: 0,
                                    offset: offset, 
                                    order_by: config.order_by,
                                    primary: "",
                                    rate_low_limit: "0.000000",
                                    rate_up_limit: "0.000000", 
                                    reverse: config.reverse || false,
                                    target: "",
                                    timestamp_start: +new Date(config.minDate) || 0, 
                                    timestamp_stop: +new Date(config.maxDate) || 0,
                                  },
                            },
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(r => r.json());

                    return offersData.result.offers || [];
                } catch (error) {
                    return [];
                }
            }

            const allOffers = []

            for (let index = 0; index < ownerConfig.ports.length; index++) {
                allOffers.push(...(
                    await getOffers(
                        ownerConfig.ports[index], 
                        Math.ceil(config.offersPerPage/3),
                        config.offset + Math.ceil(config.offersPerPage/3)*index
                    )
                ))
            }

            const uniqueArray = [...new Map(allOffers.map(item => [item['tx_hash'], item])).values()];

            res.send(uniqueArray);

        } catch (error) {
            try {
                await db.close();
            } catch {}
            res.send({ success: false });
            console.log(error);
        }
    }
}

const dataController = new DataController();

export default dataController;