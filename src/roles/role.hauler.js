const config = require('config');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep, sourceId) {
        if(_.sum(creep.carry) < creep.carryCapacity) {
            // TODO: split by sourceID
            // TODO: add rare minerals from invaders
            const drop_energy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            const drop_resources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(drop_energy){
                console.log(creep, ": picking up energy");
                if(creep.pickup(drop_energy) == ERR_NOT_IN_RANGE){
                    creep.moveTo(drop_energy.pos, {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            } else {
                // move to WAITING_ZONE
                creep.say('⌛ waiting');
                creep.moveTo(
                    config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
            // var drop_energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
            // if(drop_energy) {
            //     if(creep.pickup(drop_energy) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(drop_energy, {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // } else {

            // var sources = creep.room.find(FIND_SOURCES);
            // creep.moveTo(sources[sourceId].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            // if (creep.pos.isNearTo(sources[sourceId].pos)) {
            //     var drop_energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
            //     if(drop_energy) {
            //         creep.pickup(drop_energy)
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
            console.log(creep, ": hauling energy");
            if (Game.spawns['Spawn1'].energy < (Game.spawns['Spawn1'].energyCapacity - 20)) {
                targets = [Game.spawns['Spawn1']]
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.energy < structure.energyCapacity) || 
                            ((structure.structureType == STRUCTURE_CONTAINER || 
                                structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity
                            )
                    }
                })
            }
            if(targets.length > 0) {
                console.log(creep, ": moving to target");
                // sort by priority of filling
                targets = _.sortBy(targets, function(item){
                    return config['PRIORITY_OF_ENERGY_FILLING'].indexOf(item.structureType)
                });
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // move to WAITING_ZONE
                creep.say('⌛ waiting');
                creep.moveTo(
                    config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
                    {visualizePathStyle: {stroke: '#ffaa00'}}
                );
            }
        }
    }
};

module.exports = roleHauler;