// This file should be called automatically by "npm run <...>"-command (adjusts environment files based on hosts environment or given args)

const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const saveFile = (filepath, versionData) => {
    const data = `export const version = '${versionData.version}';
                  export const branch = '${versionData.branch}'
                  export const commit = '${versionData.commit}';`
    fs.writeFile(filepath, data.replace(/(\n)\s+/g, '$1'), 'utf8', (err) => err && console.log(err));
}

fs.readFile('.git/HEAD', (err, head) => {
    const filepath = path.join(__dirname, 'src', 'environments', 'build.ts');
    const versionData = {
        version: packageJson.version,
        branch: '',
        commit: ''
    }
    if (!err) {
        const rev = head.toString();
        if (rev.indexOf(':') > -1) {
            fs.readFile('.git/' + rev.substring(5).replace(/\n/g, ''), (err, hash) => {
                if (!err) {
                    versionData.branch = rev.substring(5).replace(/\n/g, '').split('/').pop();
                    versionData.commit = hash.toString().substr(0, 7);
                }
                saveFile(filepath, versionData);
            });
        }
    }
});