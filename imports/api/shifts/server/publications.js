/*global moment Time*/

Meteor.publish("scheduled_shifts", function() {
    return SchedShifts.find({})
    // let self = this
    // self.autorun(function(computation) {
    //     // Must be logged in.
    //     // if (!this.userId) {
    //         self.ready()
    //         return
    //     // }
    //
    //     let user = Meteor.users.findOne({
    //         _id: this.userId,
    //     })
    //     let storedTime = Time.findOne({
    //         name: App.Utils.platform_time,
    //     })
    //     let yesterday = moment(storedTime).subtract(moment.duration(12, 'hours'))
    //     let limit = self.data("limit") || 15
    //     return App.Utils.Shifts.find(user, yesterday.toDate(), limit)
    // })
})

Meteor.publish("unit_shifts", function() {
    let self = this
    self.autorun(function(computation) {
        // Must be logged in.
        if (!this.userId) {
            self.ready()
            return
        }

        let unitIds = self.data("unitIds") || []

        if (unitIds.length === 0) {
            // Shortcut if nothing is being asked for.
            self.ready()
            return
        }

        let user = Meteor.users.findOne({
            _id: this.userId,
        })
        let storedTime = Time.findOne({
            name: App.Utils.platform_time,
        })
        let yesterday = moment(storedTime).subtract(moment.duration(12, 'hours'))
        let perUnitLimit = self.data("limit") || 15
        let limit = perUnitLimit * unitIds.length

        if (user.profile.zuus.isManager) {
            return App.Utils.Shifts.manager.units(yesterday.toDate(), unitIds, limit)
        } else {
            return App.Utils.Shifts.staff.findUnits(yesterday.toDate(), user.profile.zuus.personId, unitIds, limit)
        }
    })
})
