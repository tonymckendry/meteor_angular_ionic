/*global SchedShifts*/
App.Utils.Shifts = {
    manager: {},
    staff: {},
}

App.Utils.Shifts.find = (user, when, limit) => {
    check(user, Object)
    check(when, Date)
    check(limit, Match.Integer)

    if (user.profile.zuus.isManager) {
        return App.Utils.Shifts.manager.units(when, user.profile.zuus.unitIds, limit)
    } else {
        return App.Utils.Shifts.staff.findAll(when, user.profile.zuus.personId, limit)
    }
}

App.Utils.Shifts.manager.units = (when, unitIds, limit) => {
    check(when, Date)
    check(unitIds, [Match.Integer])
    check(limit, Match.Integer)

    // All shifts at all units that this manager can see.
    return SchedShifts.find({
        "zuus.unitId": {
            $in: unitIds,
        },
        start: {
            $gte: when,
        },
    }, {
        sort: {
            "zuus.unitId": -1,
            start: 1,
        },
        limit: limit,
    })
}

App.Utils.Shifts.staff.findAll = (when, personId, limit) => {
    check(when, Date)
    check(personId, Match.Integer)
    check(limit, Match.Integer)

    // All shifts for this staff member.
    return SchedShifts.find({
        $or: [{
            $and: [{
                "zuus.personId": personId,
            }, {
                "state.swapped_to": {
                    $exists: false,
                },
            }],
        }, {
            "state.swapped_to": personId,
        }, {
            "state.swap_forced.forced_to": personId,
        }],
        start: {
            $gte: when,
        },
    }, {
        sort: {
            start: 1,
        },
        limit: limit,
    });
}

App.Utils.Shifts.staff.findUnits = (when, personId, unitIds, limit) => {
    check(when, Date)
    check(personId, Match.Integer)
    check(unitIds, [Match.Integer])
    check(limit, Match.Integer)

    // All shifts for this staff member at these units.
    return SchedShifts.find({
        $or: [{
            $and: [{
                "zuus.personId": personId,
            }, {
                "state.swapped_to": {
                    $exists: false,
                },
            }],
        }, {
            "state.swapped_to": personId,
        }, {
            "state.swap_forced.forced_to": personId,
        }],
        start: {
            $gte: when,
        },
        "zuus.unitId": unitIds,
    }, {
        sort: {
            start: 1,
        },
        limit: limit,
    })
}
