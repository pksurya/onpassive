const myLoggers = require('log4js');

myLoggers.configure({
    appenders: { employee: { type:"file", filename: "employee.log" } },
    categories: { default: { appenders:["employee"], level:"ALL" } }
});
module.exports = logger = myLoggers.getLogger("employee");