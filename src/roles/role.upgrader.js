var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 pickup');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // // first see if there is a close container
            // var energy_sources = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return ((
            //                 structure.structureType == STRUCTURE_CONTAINER || 
            //                 structure.structureType == STRUCTURE_STORAGE
            //                 ) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
            //             );
            //     }
            // });
            // console.log(energy_sources);

            var dropenergy = creep.pos.findClosestByPath([FIND_DROPPED_RESOURCES])
            if(dropenergy){
                if(creep.pickup(dropenergy) == ERR_NOT_IN_RANGE){
                    creep.moveTo(dropenergy.pos, {visualizePathStyle: {stroke: '#ffaa00'}})
                }
            }
        }
    }
};

module.exports = roleUpgrader;