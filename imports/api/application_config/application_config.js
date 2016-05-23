var ConfigSchema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        label: "Try and explain what this application config is trying to do",
        optional: true
    },
    personIds: {
        type: [Number],
        label: "Users with access to this config"
    },
    unitIds: {
        type: [Number],
        label: "Units with access to this config"
    },
    groupIds: {
        type: [Object],
        label: "Management Groups with access to this config"
    },
    "groupIds.$.id": {
        type: Number
    },
    "groupIds.$.valid_period.start": {
        type: Date,
        optional: true
    },
    "groupIds.$.valid_period.finish": {
        type: Date,
        optional: true
    },
    brandIds: {
        type: [Object],
        label: "Brands with access to this config"
    },
    "brandIds.$.id": {
        type: Number
    },
    "brandIds.$.valid_period.start": {
        type: Date,
        optional: true
    },
    "brandIds.$.valid_period.finish": {
        type: Date,
        optional: true
    },
    companyIds: {
        type: [Object],
        label: "Companies with access to this config"
    },
    "companyIds.$.id": {
        type: Number
    },
    "companyIds.$.valid_period.start": {
        type: Date,
        optional: true
    },
    "companyIds.$.valid_period.finish": {
        type: Date,
        optional: true
    }
});

export const ApplicationConfig = new Mongo.Collection("app_config");

if (Meteor.isServer) {
    // Ensure that all config names are unique.
    ApplicationConfig._ensureIndex({name: 1}, {unique: true});
}

ApplicationConfig.attachSchema(ConfigSchema);
