/*global processId SQSClient JobQueue JobProcessor*/
App.Utils.AWS = {}

App.Utils.AWS.processJobs = () => {
    var jobs = JobQueue.find({}, {sort: {seq: 1}})
    var jobProcessor = new JobProcessor()
    var jobCount = 0
    jobs.forEach((j) => {
        jobProcessor.route(j)
        jobCount++
    });

    if (jobCount === 0) {
        return "No AWS jobs"
    }

    return jobCount + " AWS jobs processed"
}

App.Utils.AWS.querySQS = () => {
    var SQSlock = "SQS"
    var lock = App.Services.Lock.Enabled(SQSlock, processId)

    if (lock === true) {
        var jobsReceived = 0
        do {
            jobsReceived = App.Services.SQSClient.getJobs();
            App.Services.Lock.Extend(SQSlock, processId)
        } while (jobsReceived > 0)

        App.Services.Lock.Release(SQSlock)
    }
}
