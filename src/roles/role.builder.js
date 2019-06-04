var auxPickupEnergy = require('aux_pickup_energy');
const config = require('config');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 pickup');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            // repair section
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.hits < (structure.hitsMax * config['REPAIR_THRESHOLD']));
                }
            })
            if(targets.length) {
                creep.say('⚒ repair');
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // build section
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            auxPickupEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;