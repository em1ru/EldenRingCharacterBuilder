const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const Item = require('./models/Item');
const connectDB = require('./database');
require('dotenv').config();

const loadData = async () => {
    try {
        await connectDB();

        const results = [];
        const csvFilePath = path.join(__dirname, '../erdb/src/erdb/data/gamedata/1.10.0/EquipParamWeapon.csv');

        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                await Item.deleteMany({});
                await Item.insertMany(results);
                console.log('Data successfully loaded');
                process.exit();
            });
    } catch (error) {
        console.error('Error loading data', error);
        process.exit(1);
    }
};

loadData();
