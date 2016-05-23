/*global Units ApplicationConfig*/
App.Utils.Config = {};

App.Utils.Config.find = (user, when) => {
    var confFields = {
        fields: {
            "name": 1,
        },
    };

    var validUserCompanies = App.Utils.General.UserCompanies(user, when);

    var units = Units.find({
        zId: {$in: user.profile.zuus.unitIds},
    });

    var allValidGroups = [];
    var allValidBrands = [];
    units.forEach((u) => {
        var unitGroups = App.Utils.General.UnitGroups(u, when);
        allValidGroups.push.apply(allValidGroups, unitGroups);

        var unitBrands = App.Utils.General.UnitBrands(u, when);
        allValidBrands.push.apply(allValidBrands, unitBrands);
    });

    return ApplicationConfig.find({
        $or: [
            {
                personIds: {$in: [user.profile.zuus.personId]},
            },
            {
                unitIds: {$in: user.profile.zuus.unitIds},
            },
            {
                $and: [
                    {groupIds: {$elemMatch: {id: {$in: allValidGroups}}}},
                    {
                        $or: [
                            { groupIds: {$elemMatch: { "valid_period.start": {$nin: []}}}},
                            { "groupIds.$.valid_period.start": {$lt: when}},
                        ],
                    },
                    {
                        $or: [
                            { groupIds: {$elemMatch: { "valid_period.finish": {$nin: []}}}},
                            { "groupIds.$.valid_period.finish": {$gt: when}},
                        ],
                    },
                ],
            },
            {
                $and: [
                    {brandIds: {$elemMatch: {id: {$in: allValidBrands}}}},
                    {
                        $or: [
                            { brandIds: {$elemMatch: { "valid_period.start": {$nin: []}}}},
                            { "brandIds.$.valid_period.start": {$lt: when}},
                        ],
                    },
                    {
                        $or: [
                            { brandIds: {$elemMatch: { "valid_period.finish": {$nin: []}}}},
                            { "brandIds.$.valid_period.finish": {$gt: when}},
                        ],
                    },
                ],
            },
            {
                $and: [
                    {companyIds: {$elemMatch: { id: {$in: validUserCompanies}}}},
                    {
                        $or: [
                            { companyIds: {$elemMatch: { "valid_period.start": {$nin: []}}}},
                            { "companyIds.$.valid_period.start": {$lt: when}},
                        ],
                    },
                    {
                        $or: [
                            { companyIds: {$elemMatch: { "valid_period.finish": {$nin: []}}}},
                            { "companyIds.$.valid_period.finish": {$gt: when}},
                        ],
                    },
                ],
            },
        ],
    }, confFields);
}
