App.Utils.Django = {};

App.Utils.Django.upload = (shiftData, meteorShiftId) => {
    var django = Meteor.settings.zuus.django;
    // don't send the mongo Id.
    delete shiftData._id;
    HTTP.post(
        django.url + django.tanda,
        {
            headers: django.header_auth,
            data: shiftData
        },
        function(err, response) {
            console.log("Response from attempting to upload tanda");
            console.log(response);
            if (!err && response.statusCode === 201) {
                TandaShifts.update({_id: meteorShiftId}, {$set: {"state.django_has_it": true}});
                return 1;
            }

            console.log("err... gonna have to try that again");
            return 0;
        }
    );
};

App.Utils.Django.getUnit = (unitId) => {
    var django = Meteor.settings.zuus.django;
    var response = HTTP.get(
        django.url + django.unit,
        {
            headers: django.header_auth,
            data: unitId
        }
    );

    return response.data;
};

App.Utils.Django.getJobs = (jobIds) => {
    var django = Meteor.settings.zuus.django;
    var response = HTTP.get(
        django.url + django.jobs,
        {
            headers: django.header_auth,
            data: jobIds
        }
    );

    return response.data;
};

App.Utils.Django.getStaff = (staffIds) => {
    var django = Meteor.settings.zuus.django;
    var response = HTTP.get(
        django.url + django.staff,
        {
            headers: django.header_auth,
            data: staffIds,
        }
    );

    return response.data;
};

App.Utils.Django.userDetails = (loginDetails) => {
    var django = Meteor.settings.zuus.django;
    var response = HTTP.get(
        django.url + django.userdetails,
        {
            headers: django.header_auth,
            data: loginDetails
        }
    );

    return response.data;
}

App.Utils.Django.refresh_shifts = (personId, unitIds) => {
    console.log("Refreshing shifts");
    var django = Meteor.settings.zuus.django;
    var response = HTTP.get(
        django.url + django.refresh,
        {
            headers: django.header_auth,
            data: {
                staff: personId,
                uids: unitIds,
            },
        }
    );

    console.log("refresh_shifts: " + response);
    return response.data;
}
