const config={
    // variables
    "BUILDING_CHECK_FREQUENCY": 100,
    "NUMBER_OF_BUILDERS": 4,
    "WAITING_ZONE": [40, 18],
    // WORKER TYPES
    "types": {
        "worker": {
            "actions": [WORK,CARRY,MOVE],
            "amount": 5
        },
        "melee": {
            "actions": [ATTACK,TOUGH,MOVE],
            "amount": 1
        },
        "ranged": {
            "actions": [RANGED_ATTACK,TOUGH,MOVE],
            "amount": 1
        }
    },
    // STRUCTURES
    "structures": {
        "Container01": {
            "x": 29,
            "y": 33,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        },
        "Container02": {
            "x": 35,
            "y": 6,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        },
        "Container03": {
            "x": 25,
            "y": 19,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        },
        "Container04": {
            "x": 37,
            "y": 18,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        },
        "Container05": {
            "x": 33,
            "y": 25,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        }
    }
};

module.exports = config;