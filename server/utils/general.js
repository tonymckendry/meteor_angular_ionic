var moment = require('moment');

App.Utils.General = {};

App.Utils.General.RemoveOldSchedules = () => {
    var whileAgo = moment().subtract(moment.duration(2, 'days'));

    console.log("Removing all scheduled shifts before " + whileAgo.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    var number = SchedShifts.remove({
        start: {$lt: whileAgo.toDate()},
    });

    return number + " shifts removed";
}

App.Utils.General.UserCompanies = (usr, when) => {
    // What companies is this user associated with as of "when".
    return App.Utils.General.findValid(usr.profile.zuus.companyIds, when);
}

App.Utils.General.UnitGroups = (unit, when) => {
    // What management groups is this unit associated with as of "when".
    return App.Utils.General.findValid(unit.groupIds, when);
}

App.Utils.General.UnitBrands = (unit, when) => {
    // What brands is this unit associated with as of "when".
    return App.Utils.General.findValid(unit.brandIds, when);
}

App.Utils.General.findValid = (entityArray, when) => {
    return _(entityArray)
    .filter(entity => App.Utils.General.inRange(entity.valid_period, when))
    .map(entity => entity.id)
    .value()
}

App.Utils.General.inRange = (period, when) => {
    check(period, {
        start: Match.Optional(Date),
        finish: Match.Optional(Date),
    });

    var rangeStart, rangeFinish;

    if (typeof period.start === "undefined") {
        rangeStart = null;
    } else {
        rangeStart = period.start;
    }

    if (typeof period.finish === "undefined") {
        rangeFinish = null;
    } else {
        rangeFinish = period.finish;
    }

    var valid_period = moment.range(rangeStart, rangeFinish);
    return when.within(valid_period);
}

naiveToTimeZone = (dt, timezone) => {
    // Convert the given date time string to a javascript 'Date' with
    // a timezone.
    check(dt, String);
    check(timezone, String);

    return moment.tz(dt, timezone).toDate();
};

add_shift = (shift, timezone) => {
    check(shift, Object);
    check(timezone, String);

    // The App must already have the unit associated with this shift. The
    // timezone of the unit will become the timezone of this shift.
    var existing = SchedShifts.findOne({"zuus.shiftId": shift.id});
    if (!existing) {
        SchedShifts.insert({
            start: naiveToTimeZone(shift.start, timezone),
            finish: naiveToTimeZone(shift.finish, timezone),
            notes: shift.notes,
            cost: shift.cost,
            zuus: {
                shiftId: shift.id,
                personId: shift.pid,
                unitId: shift.uid,
                jobId: shift.jid,
            },
            state: {
                geo_confirmed: false,
                django_has_it: true,
            },
        });
    } else {
        console.log("Shift (" + shift.id + ") already in the system... not adding");
    }
};

check_unit = function(unitId) {
    check(unitId, Number);

    var unit = Units.findOne({zId: unitId});
    if (!unit) {
        var response = App.Utils.Django.getUnit(unitId);
        var newId = add_unit(response[0]);
        return Units.findOne({_id: newId});
    }

    return unit;
};

let validate_lnglat = (lnglat) => {
    var validLong = -90 <= lnglat[0] <= 90;
    var validLat = -180 <= lnglat[1] <= 180;
    if (validLong && validLat) {
        return true;
    }

    return false;
};

add_unit = function(unit) {
    check(unit, {
        id: Match.Integer,
        name: String,
        timezone: String,
        lnglat:  [Number],
    });

    let exist = Units.findOne({zId: unit.id})
    if (!exist) {
        // Ensure we have valid latitude and longitude values or add defaults.
        // Expecting the latlng array to be long and then lat.

        // This was suppost to be in 'SimpleSchema' but I couldn't get it to work,
        // so validating prior to any inserting into Units.
        var validPosition = {
            type: "Point",
            coordinates: [0,0],
        };

        if (unit.lnglat) {
            if (validate_lnglat(unit.lnglat)) {
                validPosition.coordinates = unit.lnglat;
            }
        }

        return Units.insert({
            zId: unit.id,
            name: unit.name,
            timezone: unit.timezone,
            position: validPosition,
        })
    } else {
        console.log("Unit (" + unit.id + ") already in the system... not adding");
    }
};

update_unit = (unit) => {
    check(unit, {
        id: Match.Integer,
        name: String,
        timezone: String,
        lnglat:  [Number],
    });

    var newPosition = {
        type: "Point",
        coordinates: [0, 0],
    };

    // First ensure longitude and latidute are sensible.
    if (validate_lnglat(unit.lnglat)) {
        newPosition.coordinates = unit.lnglat;
    }

    // Should the latitude and longitude be updated?
    if (unit.latlng[0] === 0 && unit.latlng[1] === 0) {
        // Nup
        Units.update({zId: unit.id},
            {
                $set: {
                    name: unit.name,
                    timezone: unit.timezone,
                },
            }
        );
    } else {
        Units.update({zId: unit.id},
            {
                $set: {
                    name: unit.name,
                    timezone: unit.timezone,
                    position: newPosition,
                },
            }
        );
    }
};

check_jobs = function(jobs, unitId) {
    var unknown_jobs = [];
    // console.log('Checking if we have all job information');
    jobs.forEach(function(job_id){
        if (job_id !== '') {
            var job = Jobs.findOne({zId: job_id});
            if (!job) {
                // console.log('Don\'t know about job: ' + job_id);
                unknown_jobs.push(job_id);
            } else {
                // Check if this unit is associated with this job.
                if (_.includes(job.unitIds, unitId) === false) {
                    // Add this unitId to the job unit array.
                    Jobs.update({zId: job_id}, {$push: {unitIds: unitId}});
                }
            }
        }
    });

    if(unknown_jobs.length > 0) {
        var response = App.Utils.Django.getJobs(unknown_jobs);
        for(var i=0; i<response.length; i++) {
            var j = response[i];
            Jobs.insert({zId: j.id, name: j.name, colour: j.colour, unitIds: [unitId]});
            // console.log('Adding the ' + j.name + ' job');
        }
    }
};

find_staff = (unknown_staff) => {
    if (unknown_staff.length > 0) {
      console.log("Finding unknown staff");
        var response = App.Utils.Django.getStaff(unknown_staff);
        response.forEach(function(r) {
            create_staff_user(r);
        });
    }
};

App.Utils.General.CheckForCompanies = () => {
    let noCompStaff = []

    Meteor.users.find({
        "profile.zuus.companyIds": {
            "$exists": false,
        },
    }).map((u) => {
        noCompStaff.push(u.profile.zuus.personId)
    })

    let chunky = _.chunk(noCompStaff, 100)
    _.forEach(chunky,(staff) => {
        add_company_to_staff(staff)
    })

    return noCompStaff.length + " staff had companies added"
}

add_company_to_staff = (staff) => {
    if (staff.length > 0) {
        let response = App.Utils.Django.getStaff(staff)
        response.forEach((s) => {
            update_staff_company(s)
        })
    }
}

update_staff_company = (staff) => {
    let theComp = {
        id: staff.comp_id,
        valid_period: {},
    }

    Meteor.users.update({
        "profile.zuus.personId": staff.rwr_id,
    }, {
        $push: {
            "profile.zuus.companyIds": theComp,
        },
    })

    console.log(staff.first_name + " " + staff.last_name + " should now have a company...");
}

check_staff = (staff, unitId) => {
    var unknown_staff = [];
    let staffWithoutCompany = []
    // console.log('Checking if we have all staff information');
    staff.forEach(function(zId){
        var person = Meteor.users.findOne({'profile.zuus.personId': zId});
        if (!person) {
            // console.log('Don\'t have information on staff: ' + rwr_id);
            unknown_staff.push(zId);
        } else {
            // Check that each user has this unit in their profile.
            var unit = person.profile.zuus.unitIds.indexOf(unitId);
            if (unit === -1) {
                // console.log('Updating a user\'s units');
                Meteor.users.update({'profile.zuus.personId': zId}, {$push: {'profile.zuus.unitIds': unitId}});
            }

            // Check that each user has a company Id
            if (typeof person.profile.zuus.companyIds === "undefined") {
                console.log(person.profile.firstName + " " + person.profile.lastName + " does not have a company Id - fixing...");
                staffWithoutCompany.push(zId)
            }
        }
    });

    // There are shifts that belong to staff the app doesn't
    // have details on.
    find_staff(unknown_staff);
    // Also update staff that are missing a company
    add_company_to_staff(staffWithoutCompany)
};

// remove_completed_swaps = (shiftIds) => {
//   // Remove any swaps that match these shifts.
//     Swaps.remove({
//         'shift.zuus.shiftIid': {$in: shiftIds}
//     });
// };

scheduleToMobile = (title, msg, staffIds) => {
    var users = [];
    var usrCursor = Meteor.users.find({'profile.zuus.personId': {$in: staffIds}});
    usrCursor.forEach(function(usr){
        users.push(usr._id);
    });

    if (users.length > 0) {
        console.log("Pushing out a schedule");
        Push.send({
            from: 'Zuus',
            title: title,
            text: msg,
            query: {
                userId: {$in: users},
            },
        });
    }
};

// swapToMobile = function(users, startDate) {
//     Push.send({
//         from: 'Zuus',
//         title: 'Shift Swap',
//         text: 'Shift available on ' + moment.utc(startDate).format('ddd Do MMM'),
//         query: {
//             userId: {$in: users}
//         }
//     });
// };
//
// remove_swaps_in_progress = (shiftIds) => {
//   // Remove any swaps that are inprogress at a particular unit,
//   // for a date range.
//
//   // Remove any swaps in progress, related to these shifts.
//   Swaps.remove(
//     {
//       'shift.zuus.shiftId': {$in: shiftIds},
//       done: {$eq: false}
//     }
//   );
// };

get_user_details = (loginDetails) => {
    var response = App.Utils.Django.userDetails(loginDetails);

    if (availableAnywhere(response, true) === false) {
        // Nothing more to do, don't allow them to login.
        return false;
    }

    if (response) {
        var user = Meteor.users.findOne({'emails.address': response.email});
        if(user) {
            // Set the username and password.
            Meteor.users.update(user._id, {$set: {username: loginDetails.user}});
            Accounts.setPassword(user._id, loginDetails.pwd);
        } else {
            create_staff_user(response, loginDetails.user, loginDetails.pwd);
        }

        return true;
    }

    // Not expecting to get here.
    return false;
};

create_staff_user = function(details, usr, pwd) {
    var user_profile = make_user_profile(details);

    // Check that there is an email address.
    if (!details.email) {
        details.email = create_staff_email(details);
    }

    try {
        if (usr === undefined) {
            console.log('Creating a meteor user (without pwd)');
            console.log(user_profile);
            // Just create a meteor user, without a username and password.
            Accounts.createUser({
                email: details.email,
                profile: user_profile,
            });
        } else {
            // console.log('creating a full meteor user');
            // Create a full meteor user.
            Accounts.createUser({
                username: usr,
                password: pwd,
                email: details.email,
                profile: user_profile,
            });
        }
    } catch (err) {
        if (err.reason === 'Email already exists.') {
            var old_email = details.email;
            details.email = create_staff_email(details);

            if (old_email === details.email) {
                // Nup. Bail.
                console.log('This staff/user already exists. The email address (' + details.email + ') already exists.');
                // console.log('Staff details:');
                // console.log(details);
            } else {
                // Try again.
                create_staff_user(details, usr, pwd);
            }
        } else {
            console.log('Could not create a new staff/user');
            console.log('Error details:');
            console.log(err);
            console.log('Staff details:');
            console.log(details);
            console.log(usr);
            console.log(pwd);
        }
    }
};

availableAnywhere = (details, adding) => {
    if (details.units.length === 0) {
        // If this staff member isn't available at any units, deactivate them.
        var msg = "Staff member (" + details.first_name + " " + details.last_name + ") is not available at any units - ";
        if (adding === true) {
            msg += "not adding them to the system";
        } else {
            msg += "removing them from the system";
        }
        console.log(msg);
        Meteor.users.remove({"profile.zuus.personId": details.rwr_id});
        return false;
    }

    return true;
}

make_user_profile = (details) => {
    return {
        firstName: details.first_name,
        lastName: details.last_name,
        mobile: details.mobile,
        zuus: {
            personId: details.rwr_id,
            unitIds: details.units,
            isManager: details.Manager,
            companyIds: [{
                id: details.comp_id,
                valid_period: {},
            }],
        },
        scheduleHistory: {
            shifts: 0,
            shifts_worked: 0,
            shifts_swapped: 0,
            swaps_filled: 0,
        },
    };
};

create_staff_email = (details) => {
    return details.rwr_id + '@zuus.io';
};

work_shift = function(shiftId) {
    SchedShifts.update({_id: shiftId}, {$set: {"state.ack": true, "state.will_work": true}});
};

get_staff_name = (staffProfile) => {
    return staffProfile.zuus.firstName + " " + staffProfile.zuus.lastName;
};

// isUnitActive = function(unitId) {
//     var unit = ActiveUnits.findOne({zId:unitId});
//     var response = {
//         activated: false
//     };
//
//     // The unit has been activated and should get shifts.
//     if (unit) {
//         response.activated = true;
//     }
//
//     return response;
// };
//
// userActiveUnits = function(user) {
//     // Make sure we only get the units that have been activated.
//     var activeUnits = [];
//     for (var i = 0; i < user.profile.zuus.unitIds.length; i++) {
//         var r = isUnitActive(user.profile.zuus.unitIds[i]);
//         if (r.activated) {
//             activeUnits.push(user.profile.zuus.unitIds[i]);
//         }
//     }
//
//     return activeUnits;
// };








// toCents = function(dollarAmount) {
//     var cost = parseFloat(dollarAmount);
//     return parseInt(cost*100);
// };
