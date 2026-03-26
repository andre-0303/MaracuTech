const dsModule = require('../infra/database/data-source');
const ds = dsModule && dsModule.default ? dsModule.default : dsModule;
console.log('exported:', !!ds);
if (ds) console.log('has initialize:', typeof ds.initialize === 'function');
console.log('entities:', ds && ds.options && ds.options.entities);
