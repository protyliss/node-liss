#!/usr/bin/env node

const cwdFileExists = require('./utils/cwd-file-exists.js');
const getParameter = require('./utils/get-parameter');
const packageJson = require('./package.json');
const fetch = require('./fetch.js');

const {version} = packageJson;
console.log(`node-liss@${version}`);

function run(platform) {
    const detectFiles = {
        ng: 'angular.json',
        ts: 'tsconfig.json',
        node: 'package.json'
    }
    const detectedFiles = {};

    Object.keys(detectFiles).some(platform_ => {
        const file = detectFiles[platform_];
        if (cwdFileExists(file)) {
            detectedFiles[platform_] = true;
            if (!platform) {
                platform = platform_;
            }
        }
    });

    if (platform) {
        if (detectedFiles[platform]) {
            switch (platform) {
                case 'ng':
                    return require('./ng/liss.js');
                case 'ts':
                    return require('./ts/liss.js');
                case 'node':
                    return require('./node/liss.js');
            }
        } else {
            console.warn(`'${detectFiles[platform]}' file is required.`);
            return;
        }
    }

    console.warn('Cannot Found Supported Platform');
}

fetch('https://registry.npmjs.org/-/package/node-liss/dist-tags')
    .then(response => response.json())
    .then((distTags) => {
        const {latest} = distTags;
        if (latest !== version) {
            if (parseFloat(latest) < parseFloat(version)) {
                console.warn('\tNext Version');
            } else {
                console.info(`\tFound New Version`)
                console.info(`\tnpm i node-liss@${latest}`);
            }
        }
    })
    .catch(reason => {
        // console.log(reason);
    })
    .finally(() => {
        run(
            getParameter({
                matches: ['node', 'ts', 'ng'],
            })
        )
    });
