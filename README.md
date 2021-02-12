# Woffu Autosign

## Installation

Requires having **Node** installed.

```bash
git clone https://github.com/Sirikon/Woffu-Autosign.git
npm install
npm link
```

Now, you should be able to use the command `woffu-autosign` anywhere in your system.

## Usage

```bash
woffu-autosign
```

This command will ask your username and password. After that, you'll toggle your sign status.

You can also use an .env file with environment variables (dotenv) to avoid being asked everytime. Ex:

```bash
WOFFU_USER=your@domain.com
WOFFU_PASSWORD=1234
```
