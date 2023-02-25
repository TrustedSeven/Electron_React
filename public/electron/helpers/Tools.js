// Tools

// Import Modules
const {
    randomUUID,
    randomBytes,
    createCipheriv,
    createDecipheriv
} = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = '7f49474ba3e7383bcf135a6010354aa0';
const iv = randomBytes(16);


function randomID(IDLength) {
    return randomBytes(IDLength).toString("hex");
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function getRandom(tempArray) {
    return tempArray[Math.floor(Math.random() * tempArray.length)];
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

function readAccountList(accountName) {
    global.Accounts[accountName] = [];

    let tempAccountInput = fs.readFileSync(`./config/accounts/${accountName}.txt`, "utf8").split("\n");
    for (let y = 0; y < tempAccountInput.length; y++) {
        tempAccountInput[y] = tempAccountInput[y].replace("\r", "").replace("\n", "").trim();
        if (tempAccountInput[y].split(":").length !== 2) continue;
        global.Accounts[accountName].push(tempAccountInput[y]);
    };
};

function createProxyGroups(proxyGroupFileNames) {
    let proxyGroupFileContent = readMultipleFiles("proxies", proxyGroupFileNames);
    for (let x = 0; x < proxyGroupFileNames.length; x++) {
        let formattedProxyGroupID = proxyGroupFileNames[x].split(".txt")[0];
        global.ProxyGroups[formattedProxyGroupID] = [];
        let tempProxyInput = proxyGroupFileContent[x].split("\n");
        for (let y = 0; y < tempProxyInput.length; y++) {
            tempProxyInput[y] = tempProxyInput[y].replace("\r", "").replace("\n", "");
            if (tempProxyInput[y] != "") {
                let formattedProxy = formatProxy(tempProxyInput[y]);
                if (!formattedProxy) continue;
                global.ProxyGroups[formattedProxyGroupID].push(formattedProxy);
                availableProxies++;
            }
        };
    };
};


function listFileNames(folderName, fileType) {
    const availableFileNames = fs.readdirSync("./config/" + folderName);
    return availableFileNames.filter(tempFileName => tempFileName.includes(`.${fileType}`));
};

function readMultipleFiles(folderName, arrayOfFileNames) {
    let fileContents = [];
    for (let x = 0; x < arrayOfFileNames.length; x++) {
        fileContents.push(fs.readFileSync(`./config/${folderName}/${arrayOfFileNames[x]}`).toString())
    };
    return fileContents;
};

function formatProxy(tempProxy) {
    if (tempProxy === undefined || tempProxy === "" || tempProxy === " ") return false;
    else if (isDev && (tempProxy.includes("127.0.0.1") || tempProxy.includes("localhost") || tempProxy.includes("0.0.0.0"))) return false;
    let tempProxySplit = tempProxy.split(":");
    if (tempProxySplit.length > 2) return `http://${tempProxySplit[2]}:${tempProxySplit[3]}@${tempProxySplit[0]}:${tempProxySplit[1]}`;
    return `http://${tempProxySplit[0]}:${tempProxySplit[1]}`;
};

function getProxy(proxyID) {
    return getRandom(global.ProxyGroups[proxyID]);
};

function encodeBase64(tempString) {
    return Buffer.from(tempString).toString("base64");
};

function decodeBase64(tempString) {
    return Buffer.from(tempString, "base64").toString("utf8");
};

function encryptString(text) {
    const cipher = createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

function decryptString(hash) {
    const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

function printGroups(arrayOfFileNames, userPrompt) {
    updateStatus(userPrompt, 4);
    for (let x = 0; x < arrayOfFileNames.length; x++) {
        updateStatus(`\t${x + 1}. ${arrayOfFileNames[x]}`);
    };
};

function updateStatus(status, statusColour = 1) {
    if (global.applicationTerminated) return;
    switch (statusColour) {
        case 1: // Normal
            console.log(status);
            break;
        case 2: // Warning
            console.log(chalk.rgb(252, 211, 105)(status)); // FCD369
            break;
        case 3: // Error
            console.log(chalk.rgb(224, 70, 60)(status)); // F86057
            break;
        case 4: // Processing
            console.log(chalk.rgb(83, 151, 204)(status)); // 5397CC
            break;
        case 5: // Success
            console.log(chalk.rgb(74, 210, 37)(status)); // 8CDA76
            break;
    };
    global.taskLogs.push(status);
};

async function exitApplication() { // Implement a Global Stop
    try {
        /*for (let taskID in global.Tasks) {
            if (!global.Tasks[taskID]) continue;
            global.Tasks[taskID].terminate();
        };*/
    } catch (e) {
        console.log(e);
    }
    updateStatus(`Process Exiting in 5 Seconds`, 3);
    global.applicationTerminated = true;
    await sleep(5000);
    process.exit();
};

function updateApplicationTitle(websocketConnection = false) {
    process.title = `${global.licenseInfo.username}'s Arc AIO - Version: ${global.serverVersion} | Instance ID: ${global.instanceID} | Carts: ${global.currentCarts} / Checkouts: ${global.currentCheckouts} / Declines: ${global.currentDeclines} - Websocket Connection: ${websocketConnection ? "Active": "Inactive"} - Port ID: ${global.SMSPort}`;
    return;
    if (global.clientConfig) process.title = `${global.licenseInfo.username}'s Arc AIO - Version: ${global.applicationVersion} | Task Group: ${global.clientConfig.taskGroup} | Instance ID: ${instanceID} | Carts: ${global.currentCarts} / Checkouts: ${global.currentCheckouts} / Declines: ${global.currentDeclines}`;
    else process.title = `${global.licenseInfo.username}'s Arc AIO - Version: ${global.applicationVersion} | Instance ID: ${instanceID} | Carts: ${global.currentCarts} / Checkouts: ${global.currentCheckouts} / Declines: ${global.currentDeclines}`;
};

function createTaskLogger() {
    setInterval(() => {
        if (global.taskLogs.length !== 0) {
            fs.appendFileSync(global.logPath, global.taskLogs.join("\n") + "\n");
            global.taskLogs = [];
        };
    }, 250);
};

function printLogo() {
    console.log(`                                                  
                        ..                        
                       :oo-                       
                      :+ooo-                      
                     /++ooos:                     
                    /+++ooooy:                    
                   /++++ooooyy/                   
                  /+++++oooosyy/                  
                \`:/+++++ooooyyyy/                 
               \`://+++++ooosyyyyy/                
              \`:///+++++oooyyyyyys/               
             \`:////+++++.-yyyyyysss/              
            \`://///++++\`  -yyyssssss+             
           \`:://///++/\`    -sssssssss+            
          \`::://///+/\`      -ssssssssy+           
         \`-::://////         .sssssssyy+          
        \`-::::////:           .osssssyyyo         
       \`--:--.\`\`                 \`.:/osyyo\`       
       ..\`                             .:+:       
`);
};

function formatFootlockerAccounts(unformattedFootlockerAccounts) {
    global.Accounts["Footlocker CA"] = [];
    for (let x = 0; x < unformattedFootlockerAccounts.length; x++) {
        global.Accounts["Footlocker CA"].push({
            account: unformattedFootlockerAccounts[x]["Email"] + ":" + unformattedFootlockerAccounts[x]["Password"],
            customerID: unformattedFootlockerAccounts[x]["CustomerID"]
        });
    }
};

function checkMissingFolder() {
    if (!fs.existsSync("./config")) {
        console.log(`Invalid Client Configuration - Missing Folders Config`);
        return exitApplication();
    } else if (!fs.existsSync("./config/Proxies")) {
        console.log("Invalid Client Configuration - Missing Proxies Folder in Config");
        return exitApplication();
    } else if (!fs.existsSync("./config/Tasks")) {
        console.log("Invalid Client Configuration - Missing Tasks Folder in Config");
        return exitApplication();
    } else if (!fs.existsSync("./config/Profiles")) {
        console.log("Invalid Client Configuration - Missing Profiles Folder in Config");
        return exitApplication();
    };
};

function deleteAllOldApplications() {
    try {
        const availableFiles = fs.readdirSync("./");
        for (let x = 0; x < availableFiles.length; x++) {
            if (availableFiles[x].includes("Arc_AIO_0.0.") &&
                availableFiles[x] !== `Arc_AIO_0.0.${global.applicationVersion.split(".")[2]}.exe`) {
                fs.unlinkSync(availableFiles[x]);
            }
        };
    } catch (e) {};
};

function checkoutSound() {
    try {
        sound.play(global.AudioPath);
    } catch (e) {};
};

function saveSuccess(taskInfo) {
    try {
        if (!fs.existsSync("./successful_checkouts.csv")) fs.writeFileSync("./successful_checkouts.csv", "Site, Product, Size, Price, Quantity, Profile Name, Email, Order Number\n");
        fs.appendFileSync("./successful_checkouts.csv",
            `${taskInfo.site},${taskInfo.title},${taskInfo.size || "N/A"},${taskInfo.price ? taskInfo.price.toString() : "N/A"},${taskInfo.taskQuantity},${taskInfo.profileName}, ${taskInfo.email}. ${taskInfo.orderNum}\n`);
    } catch (e) {
        updateStatus(`Failed to Save Success ${e.message}`, 4);
    }
};

async function readAmazonSessions() {
    try {
        if (!fs.existsSync(path.join(global.appDataPathFolder, "Account Sessions"))) fs.mkdirSync(path.join(global.appDataPathFolder, "Account Sessions"));
        if (!fs.existsSync(path.join(global.appDataPathFolder, "Account Sessions", "AmazonCA"))) fs.mkdirSync(path.join(global.appDataPathFolder, "Account Sessions", "AmazonCA"));
        let availableSessions = fs.readdirSync(path.join(global.appDataPathFolder, "Account Sessions", "AmazonCA"));
        for (let x = 0; x < availableSessions.length; x++) {
            global.AmazonSessions[availableSessions[x]] = JSON.parse(decryptString(JSON.parse(fs.readFileSync(path.join(global.appDataPathFolder, "Account Sessions", "AmazonCA", availableSessions[x])))));
        };
    } catch (e) {
        console.log(e)
        updateStatus(`Error Reading Amazon Sessions`);
    }
}

module.exports = {
    randomID,
    getRandomInt,
    getRandom,
    sleep,
    readAccountList,
    createProxyGroups,
    listFileNames,
    readMultipleFiles,
    formatProxy,
    getProxy,
    encodeBase64,
    decodeBase64,
    encryptString,
    decryptString,
    printGroups,
    updateStatus,
    exitApplication,
    updateApplicationTitle,
    createTaskLogger,
    printLogo,
    formatFootlockerAccounts,
    checkMissingFolder,
    deleteAllOldApplications, 
    checkoutSound,
    saveSuccess,
    readAmazonSessions
};