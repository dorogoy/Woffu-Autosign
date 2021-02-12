const readline = require('readline');
const c = require('ansi-colors');

const woffu = require('./woffu');

function formatSignedIn(signedIn) {
    if (signedIn) return c.greenBright('STARTED');
    return c.redBright('STOPPED');
}

function ask(message, secure) {
    return new Promise((resolve, _) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.stdoutMuted = secure;

        rl.question(`${message}: `, (answer) => {
            resolve(answer);
            rl.close();
        });

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.stdoutMuted && (stringToWrite !== '\n' && stringToWrite !== '\r\n')) {
                return rl.output.write('*');
            }
            else rl.output.write(stringToWrite);
        };
    });
}

const askForUsername = async () => await ask('Username', false);
const askForPassword = async () => await ask('Password', true);

async function getCredentials() {
    let user, password
    if (!process.env.WOFFU_USER && !process.env.WOFFU_PASSWORD) {
        user = await askForUsername();
        password = await askForPassword();
    } else {
        user = process.env.WOFFU_USER;
        password = process.env.WOFFU_PASSWORD;
    }
    const token = await woffu.login(user, password);
    const domain = await woffu.getDomain(token);
    return { token, domain };
}

async function toggleSign() {
    const credentials = await getCredentials();
    const result = await woffu.toggleSign(credentials.domain, credentials.token);
    console.log(`You just ${formatSignedIn(result.signedIn)} working.`);
}

async function checkSign() {
    const credentials = await getCredentials();
    console.log(await woffu.getSigns(credentials.domain, credentials.token));
}

module.exports = async () => {
    await toggleSign();
    // await checkSign();
}
