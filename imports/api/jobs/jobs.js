var JobSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    zId: {
        type: Number,
        label: "Zuus Id"
    },
    colour: {
        type: String,
        optional: true
    },
    unitIds: {
        type: [Number],
        min: 1
    }
});

Jobs = new Mongo.Collection("jobs");
Jobs.attachSchema(JobSchema);

if (Meteor.isServer) {
    // Ensure that all shift metric type names are unique.
    Jobs._ensureIndex({name: 1, zId: 1}, {unique: true});
}
