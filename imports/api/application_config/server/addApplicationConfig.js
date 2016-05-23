import {ApplicationConfig} from '../application_config.js'

appendToUpdate = (name, nameArray, addSet) => {
    if (nameArray.length > 0) {
        addSet[name] = {
            $each: nameArray,
        }
    }
}

ValidPeriod = Match.Where(function(e) {
    check(e, {start: Match.Optional(Date), finish: Match.Optional(Date)})

    return true
})

ValidDjangoEntity = Match.Where(function(e) {
    // check(e, {id: Match.Integer,
    //     valid_period: Match.Optional({
    //         start: Match.Optional(Date),
    //         finish: Match.Optional(Date),
    //     }),
    // });

    check(e, {id: Match.Integer, valid_period: Match.Optional(ValidPeriod)})

    return true;
});


export const add_application_config = (option, personIds, unitIds, groupIds, brandIds, companyIds) => {
    check(personIds, [Number]);
    check(unitIds, Match.Optional([Number]));
    check(groupIds, Match.Optional([ValidDjangoEntity]));
    check(brandIds, Match.Optional([ValidDjangoEntity]));
    check(companyIds, Match.Optional([ValidDjangoEntity]));
    check(option, {
        name: String,
        description: Match.Optional(String),
    });

    if (typeof groupIds === "undefined") {
        groupIds = [];
    }

    if (typeof brandIds === "undefined") {
        brandIds = [];
    }

    if (typeof companyIds === "undefined") {
        companyIds = [];
    }

    var existing = ApplicationConfig.findOne({name: option.name});
    if (!existing) {
        option.personIds = personIds;
        option.unitIds = unitIds;
        option.groupIds = groupIds;
        option.brandIds = brandIds;
        option.companyIds = companyIds;
        ApplicationConfig.insert(option);
    } else {
        var updateList = {};
        appendToUpdate("personIds", personIds, updateList);
        appendToUpdate("unitIds", unitIds, updateList);
        appendToUpdate("groupIds", groupIds, updateList);
        appendToUpdate("brandIds", brandIds, updateList);
        appendToUpdate("companyIds", companyIds, updateList);

        // Update the ids.
        ApplicationConfig.update(
            {name: option.name},
            {
                $addToSet: updateList,
            }
        );
    }
};
