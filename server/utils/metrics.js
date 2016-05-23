/*global ShiftMetric ValidDjangoEntity appendToUpdate CompanyMetric ValidPeriod*/
App.Utils.Metrics = {
    unit: {},
    company: {},
}

App.Utils.Metrics.unit.add = (unitId, types, mandatory_types) => {
    check(unitId, Number)
    check(types, Match.Optional([String]))
    check(mandatory_types, Match.Optional([String]))

    if (typeof types === "undefined") {
        types = [];
    }

    if (typeof mandatory_types === "undefined") {
        mandatory_types = [];
    }

    let exists = ShiftMetric.findOne({unitId: unitId})
    if (!exists) {
        ShiftMetric.insert({
            unitId: unitId,
            metric_types: types,
            mandatory: mandatory_types,
        })
    } else {
        var updateList = {}
        appendToUpdate("metric_types", types, updateList)
        appendToUpdate("mandatory", mandatory_types, updateList)

        ShiftMetric.update({
            unitId: unitId,
        }, {
            $addToSet: updateList,
        })
    }
}

App.Utils.Metrics.company.add = (companyId, valid_periods, types, mandatory_types) => {
    check(companyId, Number)
    check(valid_periods, [ValidPeriod])
    check(types, Match.Optional([String]))
    check(mandatory_types, Match.Optional([String]))

    if (typeof types === "undefined") {
        types = [];
    }

    if (typeof mandatory_types === "undefined") {
        mandatory_types = [];
    }

    let exists = CompanyMetric.findOne({companyId: companyId})
    if (!exists) {
        CompanyMetric.insert({
            companyId: companyId,
            valid_periods: valid_periods,
            metric_types: types,
            mandatory: mandatory_types,
        })
    } else {
        var updateList = {}
        appendToUpdate("valid_periods", valid_periods, updateList)
        appendToUpdate("metric_types", types, updateList)
        appendToUpdate("mandatory", mandatory_types, updateList)

        CompanyMetric.update({
            companyId: companyId,
        }, {
            $addToSet: updateList,
        })
    }
}

App.Utils.Metrics.unit.find = (user) => {
    return ShiftMetric.find({
        unitId: {$in: user.profile.zuus.unitIds},
    })
}

App.Utils.Metrics.company.find = (user, when) => {
    let validUserCompanies = App.Utils.General.UserCompanies(user, when)

    return CompanyMetric.find({
        companyId: {$in: validUserCompanies},
    })

    // TODO: query is ignoring company valid period atm. query below is not
    // performing as expected.
    // return CompanyMetric.find({
    //     $and: [
    //         {companyId: {$in: validUserCompanies}},
    //         {
    //             $or: [
    //                 { valid_period: {$elemMatch: { start: {$nin: []}}}},
    //                 { "valid_period.$.start": {$lt: when}},
    //             ],
    //         },
    //         {
    //             $or: [
    //                 { valid_period: {$elemMatch: { finish: {$nin: []}}}},
    //                 { "valid_period.$.finish": {$gt: when}},
    //             ],
    //         },
    //     ],
    // });
}
