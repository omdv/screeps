const config = require('config');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep, sourceId) {
        if(creep.carry.energy < creep.carryCapacity) {
            // TODO: split by sourceID
            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
            if(dropenergy){
                if(creep.pickup(dropenergy) == ERR_NOT_IN_RANGE){
                    creep.moveTo(dropenergy.pos, {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            } else {
                // move to WAITING_ZONE
                creep.say('⌛ waiting');
                creep.moveTo(
                    config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
            // var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
            // if(dropenergy) {
            //     if(creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(dropenergy, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // } else {

            // var sources = creep.room.find(FIND_SOURCES);
            // creep.moveTo(sources[sourceId].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            // if (creep.pos.isNearTo(sources[sourceId].pos)) {
            //     var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
            //     if(dropenergy) {
            //         creep.pickup(dropenergy)
            //     } else {
            //     // move to WAITING_ZONE
            //     creep.say('⌛ waiting');
            //     creep.moveTo(
            //         config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
            //         {visualizePathStyle: {stroke: '#ffaa00'}}
            //     );
            //     }
            // }
        }
        else {
            // TODO: priority of hauling energy
            // for (structure in [Game.spawns['Spawn1']]) {
            //     if (structure.energy < structure.energyCapacity) {
            //         targets = structure
            //     }
            // }
            // if Game.spawns['Spawn1'].energy < Game.spawns['Spawn1']

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.energy < structure.energyCapacity
                        ) || (
                            structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                        )
                        
                        ;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHauler;