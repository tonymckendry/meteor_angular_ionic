var MetricSchema = new SimpleSchema({
    name: {
        type: String
    },
    value: {
        type: Number,
        decimal: true
    }
});

var PeriodSchema = new SimpleSchema({
    start: {
        type: Date
    },
    finish: {
        type: Date
    }
});

var ZuusSchema = new SimpleSchema({
    shiftId: {
        type: Number,
        label: "Shift Id",
        optional: true
    },
    unitId: {
        type: Number,
        label: "Unit Id"
    },
    jobId: {
        type: Number,
        label: "Job Id",
        optional: true
    },
    personId: {
        type: Number,
        label: "Person Id"
    }
});

var ForceSchema = new SimpleSchema({
    forced_to: {
        type: Number,
        label: "Zuus Id of person forced",
        optional: true
    },
    forced_ack: {
        type: Boolean,
        defaultValue: false
    },
    forced_by: {
        type: String,
        label: "Mongo Id of person doing the force",
        optional: true
    },
    forcedAt: {
        type: Date,
        optional: true
    }
});

var StateSchema = new SimpleSchema({
    geo_confirmed: {
        type: Boolean,
        label: "The user was confirmed as being at the unit",
        defaultValue: false
    },
    django_has_it: {
        type: Boolean,
        label: "Is this shift stored on django",
        defaultValue: false
    },
    ack: {
        type: Boolean,
        label: "Staff seen shift",
        defaultValue: false
    },
    will_work: {
        type: Boolean,
        label: "Staff will work shift",
        defaultValue: false
    },
    swapped_to: {
        type: Number,
        label: "Staff that will fill in",
        optional: true
    },
    swappedAt: {
        type: Date,
        label: "When swapped",
        optional: true
    },
    swap_forced: {
        type: ForceSchema,
        optional: true
    }
});

var ShiftSchema = new SimpleSchema({
    start: {
        type: Date
    },
    finish: {
        type: Date
    },
    breaks: {
        type: [PeriodSchema],
        optional: true
    },
    zuus: {
        type: ZuusSchema
    },
    cost: {
        type: Number,
        decimal: true,
        optional: true
    },
    tips: {
        type: Number,
        decimal: true,
        optional: true
    },
    notes: {
        type: String,
        optional: true
    },
    metrics: {
        type: [MetricSchema],
        optional: true
    },
    state: {
        type: StateSchema,
        optional: true
    }
});

TandaShifts = new Mongo.Collection("tanda_shifts");
TandaShifts.attachSchema(ShiftSchema);

SchedShifts = new Mongo.Collection("scheduled_shifts");
SchedShifts.attachSchema(ShiftSchema);

if (Meteor.isServer) {
    // Ensure that all shift metric type names are unique.
    SchedShifts._ensureIndex({"zuus.shiftId": 1}, {unique: true});
    // A lot of searching is done on the start time of a shift
    SchedShifts._ensureIndex({"start":1})
}
