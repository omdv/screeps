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
            var to_repair = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.hits < (structure.hitsMax * config['REPAIR_THRESHOLD']));
                }
            })
            var to_build = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (to_repair.length) {
                creep.say('⚒ repair');
                if(creep.repair(to_repair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_repair[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (to_build.length) {
                if(creep.build(to_build[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to_build[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.say('⌛ waiting');
                creep.moveTo(
                    config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
        else {
            auxPickupEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;