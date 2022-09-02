const CronJob = require("cron").CronJob
const mail = require("./index")
const job = new CronJob({
    cronTime : "* * * * * *",
    onTick : mail.send

})
job.start()