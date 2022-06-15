const getConfigure = require('../core/get-configure.js');
const ngProjects = require("./utils/ng-projects");
const cwdRequire = require("../utils/cwd-require");
const cwdWriteJson = require("../utils/cwd-write-json");

const angularJson = cwdRequire('angular.json');

const {ng: {optimizeAngular: {styles: optimizeStyles, assets: optimizeAssets}}} = getConfigure({
    ng: {
        optimizeAngular: {
            styles: [],
            assets: []
        }
    }
});

Object.entries(ngProjects('application')).forEach(
    ([key, project]) => {
        const build = project['architect']['build'];
        /**
         *
         * @type {string[]}
         */
        const styles = build['styles'] || (build['styles'] = []);
        const assets = build['assets'] || (build['assets'] = []);

        optimizeStyles.forEach(optimizeStyle => {
            if (!styles.includes(optimizeStyle)) {
                console.info(`[${key}] Add Style ${optimizeStyle}`);
                styles[styles.length] = optimizeStyle;
            }
        })

        optimizeAssets.forEach(optimizeAsset => {
            if (typeof optimizeAsset === 'string') {
                if (!assets.includes(optimizeAsset)) {
                    console.info(`[${key}] Add Asset ${optimizeAsset}`);
                    assets[assets.length] = optimizeAsset;
                }
            } else {
                const {input, output} = optimizeAsset;
                const hasOuterAsset = assets.some(asset => {
                    if (typeof asset !== 'string' && asset['input'] === input) {
                        return true;
                    }
                });

                if (!hasOuterAsset) {
                    console.info(`[${key}] Add Asset ${input} to ${output}`);
                    assets[assets.length] = optimizeAsset;
                }
            }
        });

        angularJson['projects'][key] = project;
    }
);

cwdWriteJson('angular.json', angularJson);