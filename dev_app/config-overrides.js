const moduleName = "react-editable-json-tree";

// `node_modules/.cache` makes it difficult to use yalc to update local
// libraries and use create-react-app's hotloading. This override fixes that
// issue.
//
// Source: https://github.com/wclr/yalc/issues/195
module.exports = function override(config) {
    const managedPaths = config.snapshot?.managedPaths ?? [];
    managedPaths.push(
        new RegExp(`^(.+?[\\\\/]node_modules[\\\\/])(?!${moduleName})`)
    );
    config.snapshot = { ...(config.snapshot ?? {}), managedPaths };

    const ignored = config.watchOptions?.ignored ?? [];
    ignored.push(`**/node_modules/!(${moduleName})**`);
    config.watchOptions = { ...(config.watchOptions ?? {}), ignored };

    return config;
};
