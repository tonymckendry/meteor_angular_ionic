var PositionSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ["Point"],
        defaultValue: "Point"
    },
    coordinates: {
        type: [Number],
        decimal: true,
        minCount: 2,
        maxCount: 2,
        // custom: () => {
        //     console.log(this.value);
        //     var validLong = -90 <= this.value[0] <= 90;
        //     var validLat = -180 <= this.value[1] <= 180;
        //     if (!validLong) {
        //         return "lonOutOfRange";
        //     }
        //     if (!validLat) {
        //         return "latOutOfRange";
        //     }
        // }
    }
});

PositionSchema.messages = {
    "lonOutOfRange": "Longitude must be between -90 and 90 degrees",
    "latOutOfRange": "Latitude must be between -180 and 180 degrees"
};

var UnitSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    zId: {
        type: Number,
        label: "Zuus Id"
    },
    timezone: {
        type: String,
        label: "Unit Timezone"
    },
    position: {
        type: PositionSchema,
        index: "2dsphere",
        optional: true
    },
    groupIds: {
        type: [Object],
        optional: true,
        label: "Groups that this unit belongs to (and when)"
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
    brandsIds: {
        type: [Object],
        optional: true,
        label: "Brands that this unit belongs to (and when)"
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
    }
});

Units = new Mongo.Collection("units");
Units.attachSchema(UnitSchema);

if (Meteor.isServer) {
    // Ensure that all shift metric type names are unique.
    Units._ensureIndex({name: 1, zId: 1}, {unique: true});
}
