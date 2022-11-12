const processModules = ['vouchers', 'payments', 'transactions', 'branches', 'users', 'vendors']

let models = {};

for (const module of processModules) {
    const isExist = moduleIsAvailable(`./process/${module}`);
    if (isExist) {
        models[module] = require(`./process/${module}`)
    }
}

module.exports = models;

function moduleIsAvailable (path) {
    try {
        require.resolve(path);
        return true;
    } catch (e) {
        return false;
    }
}