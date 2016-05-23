/*global SimpleSchema ShiftMetricType ShiftMetric CompanyMetric CompanyMetricSchema*/

var ShiftMetricTypeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
    },
    unit_type: {
        type: String,
        label: "Unit Type",
    },
    value_type: {
        type: String,
        label: "Value",
        allowedValues: ["integer", "decimal"],
    },
    accumulator: {
        type: String,
        label: "Accumulator",
        allowedValues: ["increment", "sum"],
    },
});

ShiftMetricType = new Mongo.Collection("shift_metric_types")
ShiftMetricType.attachSchema(ShiftMetricTypeSchema);
if (Meteor.isServer) {
    // Ensure that all shift metric type names are unique.
    ShiftMetricType._ensureIndex({name: 1}, {unique: true});
}

var ShiftMetricSchema = new SimpleSchema({
    unitId: {
        type: Number,
        label: "Zuus Unit Id",
    },
    metric_types: {
        type: [String],
        label: "Metric name",
    },
    mandatory: {
        type: [String],
        label: "Metrics that must be entered",
        optional: true,
    },
})

ShiftMetric = new Mongo.Collection("shift_metrics")
ShiftMetric.attachSchema(ShiftMetricSchema)

if (Meteor.isServer) {
    // Ensure that each unit only has one entry
    ShiftMetric._ensureIndex({unitId: 1}, {unique: true})
}

let CompanyMetricSchema = new SimpleSchema({
    companyId: {
        type: Number,
        label: "Zuus Company Id",
    },
    "valid_periods": {
        type: [Object],
    },
    "valid_periods.$.start": {
        type: Date,
        optional: true,
    },
    "valid_periods.$.finish": {
        type: Date,
        optional: true,
    },
    metric_types: {
        type: [String],
        label: "Metric name",
    },
    mandatory: {
        type: [String],
        label: "Metrics that must be entered",
        optional: true,
    },
});

CompanyMetric = new Mongo.Collection("company_shift_metrics")
CompanyMetric.attachSchema(CompanyMetricSchema)

if (Meteor.isServer) {
    // Ensure that each unit only has one entry
    CompanyMetric._ensureIndex({companyId: 1}, {unique: true})
}
