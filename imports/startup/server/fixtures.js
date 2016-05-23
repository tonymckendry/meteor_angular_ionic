import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import {ApplicationConfig} from '../../api/application_config/application_config.js'
import {add_application_config} from '../../api/application_config/server/addApplicationConfig.js'

import moment from 'moment-timezone'
// import tz from 'moment/moment'

// import {Jobs} from '../../api/jobs/jobs.js'

if(Meteor.users.find().count() == 0){
  Accounts.createUser({
    username: 'bob',
      password: 'bob',
      profile: {
        createdOn: new Date()
      }
  })
}

if (Meteor.settings.zuus.debug) {
    let rebuild = true;
    let random = false;
    if (rebuild) {
        if (!random) {
            console.log("Rebuild with expected data");
            // App Config options.
            ApplicationConfig.remove({});
            add_application_config(
                {
                    name: App.Constants.Config.tanda,
                    description: "Time and attendance on a personal device",
                },
                [],
                [42,22]
            );
            Jobs.remove({});
            Jobs.insert({
                name: "Cashier",
                zId: 3,
                colour: "#AB47BC",
                unitIds: [43, 42],
            });
            Jobs.insert({
                name: "Driver",
                zId: 67,
                colour: "#FFEE58",
                unitIds: [43],
            });
            Jobs.insert({
                name: "Walker",
                zId: 8,
                unitIds: [22],
            });
            Jobs.insert({
                name: "Never to see",
                zId: 666,
                unitIds: [666],
            });

            Units.remove({});
            add_unit({
                name: "Great Spot",
                id: 43,
                timezone: "Australia/Sydney",
                lnglat: [151.2,-34.99],
            });
            add_unit({
                name: "Corner Shop",
                id: 42,
                timezone: moment.tz.guess(),
                lnglat: [0, 0],
                // timezone: "Australia/Adelaide",
                // lnglat: [138.521951,-34.998711]
            });
            add_unit({
                name: "Down the Road",
                id: 22,
                timezone: "Australia/Adelaide",
                lnglat: [138.520868,-34.996189],
            });
            add_unit({
                name: "Should not appear",
                id: 666,
                timezone: "Australia/Sydney",
                lnglat: [150.4,-32],
            });

            ShiftMetricType.remove({});
            ShiftMetricType.insert({
                name: "Tips",
                unit_type: "$",
                value_type: "decimal",
                accumulator: "sum",
            });
            ShiftMetricType.insert({
                name: "Cars",
                unit_type: "ea",
                value_type: "integer",
                accumulator: "increment",
            });
            ShiftMetricType.insert({
                name: "Deaths",
                unit_type: "bodies",
                value_type: "integer",
                accumulator: "increment",
            });

            ShiftMetric.remove({});
            ShiftMetric.insert({
                unitId: 43,
                metric_types: ["Tips", "Cars"],
                mandatory: ["Tips"],
            });

            ShiftMetric.insert({
                unitId: 42,
                metric_types: ["Tips"],
                mandatory: ["Tips"],
            });

            // To simulate the naive date time string that we currently have stored
            // on the server for scheduled shifts.
            let zt = function(aMoment) {
                return aMoment.format("YYYY-MM-DD HH:mm:ss");
            };

            SchedShifts.remove({});
            let start = moment().add(10, 'minutes');
            let finish = moment(start);
            finish.add(5, 'hours');
            // Add a scheduled shift for today.
            add_shift({
                start: zt(start),
                finish: zt(finish),
                // Zuus Ids
                id: 567,
                uid: 42,
                pid: 1,
                jid: 3,
            }, moment.tz.guess());

            start.add(7, 'hours');
            finish.add(7, 'hours');
            add_shift({
                start: zt(start),
                finish: zt(finish),
                notes: "Damn it - gotta do it again",
                // Zuus Ids
                id: 568,
                uid: 42,
                pid: 1,
                jid: 3,
            }, moment.tz.guess());

            start.subtract(1, 'days');
            finish.subtract(1, 'days');
            // Put in a scheduled shift for yesterday.
            // This is to ensure that filtering is working.
            add_shift({
                start: zt(start),
                finish: zt(finish),
                // Zuus Ids
                id: 4,
                uid: 43,
                pid: 1,
            }, "Australia/Sydney");

            start.add(2, 'days');
            finish.add(2, 'days');
            add_shift({
                start: zt(start),
                finish: zt(finish),
                notes: "This is a really riverting note that is for sure. Just unsure if it could ever be better",
                // Zuus Ids
                id: 45,
                uid: 43,
                pid: 1,
                jid: 67,
            }, "Australia/Sydney");

            Meteor.users.remove({});
            var id = Accounts.createUser({
                username: "jake",
                password: "jake",
                profile: {
                    firstName: "Jake",
                    lastName: "Skinner",
                    zuus: {
                        personId: 1,
                        unitIds: [43, 22, 42],
                        jobIds: [8, 3, 67],
                        isManager: true,
                        companyIds: [{id: 1, valid_period: {}}],
                    },
                },
            });
        } else {
            winston = Meteor.npmRequire("winston")

            let logger = new(winston.Logger)({
                transports: [
                    // new (winston.transports.Console) (),
                    new(winston.transports.File)({
                        filename: './../../../../../test.log',
                    }),
                ],
            });

            console.log("In development mode");

            // Everything is going to be from one company.
            let companyId = 56

            let numberOfUnits = 3
            let numberOfJobs = 10
            let numberOfShifts = 400
            let userCount = 4

            // App Config options.
            ApplicationConfig.remove({});
            add_application_config({
                name: App.Constants.Config.tanda,
                description: "Time and attendance on a personal device",
            }, [], [42, 22], [], [], [{id:companyId, valid_period:{}}]);

            let randomElement = function(array) {
                let idx = Math.floor(Math.random() * (array.length - 1)) + 1
                return array[idx]
            }

            // Get all timezones
            let tz = moment.tz.names()

            // To simulate the naive date time string that we currently have stored
            // on the server for scheduled shifts.
            let zt = function(aMoment) {
                return aMoment.format("YYYY-MM-DD HH:mm:ss");
            };

            let idArray = function(howMany, JOBS = false) {
                let idNum = Math.floor(Math.random() * (howMany - 1)) + 1
                let ids = []
                for (let i = 0; i < idNum; i++) {
                    let id = 0;
                    if (JOBS) {
                        id = randomElement(jobs).zId
                    } else {
                        id = randomElement(units).id
                    }
                    ids.push(id)
                }

                // Duplicates will muck me up.
                ids = _.uniq(ids)
                return ids
            }

            let fakeTime = function(day) {
                let gap = Math.floor(Math.random() * 2) + 1
                let start = day.add(gap, 'd')

                let shiftLength = Math.floor(Math.random() * 9) + 1
                let startHr = Math.floor(Math.random() * 6) + 1
                let startMin = Math.floor(Math.random() * 59) + 1
                if (faker.random.boolean()) {
                    // Morning shift (starts sometime after 5am)
                    start.hour(5)
                } else {
                    // Afternoon shift (starts sometime after 1pm)
                    start.hour(13)
                }

                start.minute(startMin)
                start.add(startHr, 'h')
                let finish = moment(start)
                finish.add(shiftLength, 'h')
                finish.add(moment().minutes(), 'm')

                return {
                    start: start,
                    finish: finish,
                }
            }

            // Get faking

            // Make some units.
            console.log("Creating units...");
            let units = []
            for (let i = 0; i < numberOfUnits; i++) {
                let u = {
                    name: faker.address.city(),
                    id: faker.random.number(),
                    timezone: randomElement(tz),
                    lnglat: [Number(faker.address.longitude()), Number(faker.address.latitude())],
                }
                units.push(u)
            }

            Units.remove({})
            units.forEach((u) => {
                add_unit(u)
            })

            // Now make some jobs and associate with units
            console.log("Creating jobs...");
            let jobs = []
            for (let i = 0; i < numberOfJobs; i++) {
                let j = {
                    name: faker.name.jobType(),
                    zId: faker.random.number(),
                    colour: faker.internet.color(),
                    unitIds: idArray(50),
                }
                jobs.push(j)
            }

            Jobs.remove({})
            jobs.forEach((j) => {
                Jobs.insert(j)
            })

            // Jobs must be added to mongodb before this is run!
            let fakeUnitJob = function(unitChoices, jobChoices) {
                let unitId = randomElement(unitChoices)
                let unit = _.find(units, (u) => {
                    return u.id === unitId
                })

                if (!unit) {
                    console.log(unitId + ": seems to be bogus");
                }

                let result = {
                    unit: unit,
                }

                if (faker.random.boolean()) {
                    let unitJobs = Jobs.find({
                        unitIds: {
                            $in: [result.unit.id],
                        },
                    }, {
                        zId: 1,
                    })

                    let availableJobs = _.union(jobChoices, unitJobs)
                    result.job = randomElement(availableJobs)
                }

                return result
            }

            // Add some metric types and unit metrics
            console.log("Creating metrics...");
            ShiftMetricType.remove({});
            ShiftMetricType.insert({
                name: "Tips",
                unit_type: "$",
                value_type: "decimal",
                accumulator: "sum",
            });
            ShiftMetricType.insert({
                name: "Cars",
                unit_type: "ea",
                value_type: "integer",
                accumulator: "increment",
            });
            ShiftMetricType.insert({
                name: "Deaths",
                unit_type: "bodies",
                value_type: "integer",
                accumulator: "increment",
            });

            ShiftMetric.remove({});
            // let metricCount = Math.floor(Math.random() * (units.length - 1)) + 1
            // for (let i = 0; i < metricCount; i++) {
            //     ShiftMetric.insert({
            //         unitId: randomElement(units).id,
            //         metric_types: ["Tips", "Cars"],
            //         mandatory: ["Tips"],
            //     })
            // }

            CompanyMetric.remove({})
            App.Utils.Metrics.company.add(companyId, [{}], ["Tips", "Cars"], ["Tips"])

            // Now make some users.
            console.log("Creating users...");
            let users = []

            for (let i = 0; i < userCount; i++) {
                let u = {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    email: faker.internet.email(),
                    profile: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        zuus: {
                            personId: faker.random.number(),
                            unitIds: idArray(400),
                            jobIds: idArray(50, true),
                            isManager: faker.random.boolean(),
                            companyIds: [{id: companyId, valid_period: {}}]
                        },
                    },
                }

                users.push(u)
            }

            console.log("Creating shifts...");
            let start = moment()
            start.subtract(5, 'd')

            Meteor.users.remove({})
            SchedShifts.remove({})
            users.forEach((u) => {
                Accounts.createUser(u)

                logger.info('User', {
                    username: u.username,
                    password: u.password,
                    manager: u.profile.zuus.isManager,
                    unitNumber: u.profile.zuus.unitIds.length,
                    jobNumber: u.profile.zuus.jobIds.length,
                });

                // Create some shifts for this user
                let day = moment(start)
                let shiftCount = Math.floor(Math.random() * (numberOfShifts)) + 1
                for (let i = 0; i < shiftCount; i++) {
                    let shiftId = faker.random.number() + parseInt(moment().millisecond() / 2)
                        // Choose a user unit
                    let unitJob = fakeUnitJob(u.profile.zuus.unitIds, u.profile.zuus.jobIds)
                    let time = fakeTime(day)
                    day = time.start

                    let s = {
                        start: zt(time.start),
                        finish: zt(time.finish),
                        id: shiftId,
                        uid: unitJob.unit.id,
                        pid: u.profile.zuus.personId,
                    }

                    if (unitJob.job) {
                        s.jid = unitJob.job
                    }

                    add_shift(s, unitJob.unit.timezone)
                }
            })
        }
    }
} else {
    console.log("In production mode");
    // We know we need tanda from the begining.
    var existAlready = ApplicationConfig.findOne({
        name: App.Constants.Config.tanda,
    });
    if (!existAlready) {
        add_application_config({
            name: App.Constants.Config.tanda,
            description: "Time and attendance on a personal device",
        }, [], []);
        console.log("Added the tanda application configuration option");
    }

    var confirmAlready = ApplicationConfig.findOne({
        name: App.Constants.Config.confirm,
    });
    if (!confirmAlready) {
        add_application_config({
            name: App.Constants.Config.confirm,
            description: "Staff can confirm shifts",
        }, [], []);
        console.log("Added the shift confirmation application configuration option");
    }

    // Check for duplicates.
    var jobPipeline = [{
        $group: {
            _id: {
                name: "$name",
            },
            uniqueIds: {
                $addToSet: "$_id",
            },
            cout: {
                $sum: 1,
            },
        },
    }, {
        $match: {
            count: {
                $gte: 2,
            },
        },
    }, {
        $sort: {
            count: -1,
        },
    }];
    var jobDups = Jobs.aggregate(jobPipeline);
    console.log(jobDups);

    var shiftPipeline = [{
        $group: {
            _id: {
                "zuus.shiftId": "$zuus.shiftId",
            },
            uniqueIds: {
                $addToSet: "$_id",
            },
            cout: {
                $sum: 1,
            },
        },
    }, {
        $match: {
            count: {
                $gte: 2,
            },
        },
    }, {
        $sort: {
            count: -1,
        },
    }];
    var shiftDups = SchedShifts.aggregate(shiftPipeline);
    console.log(shiftDups);

    if (ShiftMetricType.find({
            name: "Tips",
        }).count() === 0) {
        console.log("Looks like a fresh database");
        // Also gonna always need tips.
        ShiftMetricType.insert({
            name: "Tips",
            unit_type: "$",
            value_type: "decimal",
            accumulator: "sum",
        });
        console.log("'Tips' added");
        // Cars are also required.
        ShiftMetricType.insert({
            name: "Cars",
            unit_type: "ea",
            value_type: "integer",
            accumulator: "increment",
        });
        console.log("'Cars' added");
    }

    // "Restaurant A" @ PMC
    if (ShiftMetric.find({
            unitId: 4496,
        }).count() === 0) {
        ShiftMetric.insert({
            unitId: 4496,
            metric_types: ["Tips", "Cars"],
            mandatory: ["Tips"],
        });
    }

    // US Demo company
    App.Utils.Metrics.company.add(850, [{}], ["Tips", "Cars"], ["Tips"])
    // PMC
    App.Utils.Metrics.company.add(985, [{}], ["Tips", "Cars"], ["Tips"])

    // Keep the db clean
    App.Utils.General.RemoveOldSchedules();
    console.log("Remove old scheduled shifts");

    // Remove any process locks.
    Locks.remove({})
}
