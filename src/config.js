const config={
    // variables
    "BUILDING_CHECK_FREQUENCY": 100,
    "NUMBER_OF_BUILDERS": 2,
    "NUMBER_OF_UPGRADERS": 4,
    "WAITING_ZONE": [40, 18],
    "REPAIR_THRESHOLD": 0.4,
    "PRIORITY_OF_ENERGY_FILLING": [
        STRUCTURE_EXTENSION,
        STRUCTURE_TOWER,
        STRUCTURE_CONTAINER,
        STRUCTURE_STORAGE
    ],
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
            "x": 36,
            "y": 23,
            "type": STRUCTURE_CONTAINER,
            "minRCL": 0
        },
        "Extension01": {
            "x": 33,
            "y": 22,
            "type": STRUCTURE_EXTENSION,
            "minRCL": 2
        },
        "Extension02": {
            "x": 33,
            "y": 23,
            "type": STRUCTURE_EXTENSION,
            "minRCL": 2
        },
        "Extension03": {
            "x": 33,
            "y": 24,
            "type": STRUCTURE_EXTENSION,
            "minRCL": 2
        },
        "Extension04": {
            "x": 35,
            "y": 23,
            "type": STRUCTURE_EXTENSION,
            "minRCL": 2
        },
        "Extension05": {
            "x": 35,
            "y": 24,
            "type": STRUCTURE_EXTENSION,
            "minRCL": 2
        },
        "Tower01": {
            "x": 43,
            "y": 24,
            "type": STRUCTURE_TOWER,
            "minRCL": 3
        }
    }
};

module.exports = config;