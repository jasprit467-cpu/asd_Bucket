const fs=require('fs/promises');
const path=require('path');

let filePath=path.join(__dirname,"../db.json");

async function readData(){
    let data= await fs.readFile(filePath,"utf-8");
    return JSON.parse(data);
}
async function writeData(data) {
    await fs.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        'utf-8'
    );
}
module.exports={readData,writeData};
