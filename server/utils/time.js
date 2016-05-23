var moment = require('moment');

/*global SimpleSchema moment Time*/
var TimeSchema = new SimpleSchema({
    name: {
        type: String,
    },
    time: {
        type: Date,
    },
})

Time = new Mongo.Collection("time")
Time.attachSchema(TimeSchema)

// Ensure that all time names are unique.
Time._ensureIndex({
    name: 1,
}, {
    unique: true,
})

App.Utils.platform_time = "platform"

App.Utils.Time = {
    set: function() {
        let now = moment()
        Time.update({
            name: App.Utils.platform_time,
        }, {
            $set: {
                time: now.toISOString(),
            },
        })

        return "Platform time has been updated to " + now.format()
    },
}

// Ensure that there is a "platform" time
if (Time.find().count() === 0) {
    let now = moment()
    Time.insert({
        name: App.Utils.platform_time,
        time: now.toISOString(),
    })
} else {
    // Update the platform time to now.
    App.Utils.Time.set()
}
