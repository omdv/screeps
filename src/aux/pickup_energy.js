const config = require('config');

var pickupEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // check for full containers OR storages
        var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
        var energy_sources = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((
                        structure.structureType == STRUCTURE_CONTAINER || 
                        structure.structureType == STRUCTURE_STORAGE
                        ) && structure.store[RESOURCE_ENERGY] > 100
                    );
            }
        });
        // TODO: CHECK WHAT IS CLOSER
        // console.log(dropenergy);
        // console.log(dropenergy.pos.x);
        // console.log(energy_sources);

        // // check distances
        // if (energy_sources.length > 0 && dropenergy) {

        // }


        if (energy_sources.length > 0) {
            if(creep.withdraw(energy_sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy_sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else if (dropenergy) {
            if(creep.pickup(dropenergy) == ERR_NOT_IN_RANGE){
                creep.moveTo(dropenergy.pos, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        } else {
            creep.say('⌛ waiting');
            creep.moveTo(
                config['WAITING_ZONE'][0], config['WAITING_ZONE'][1],
                {visualizePathStyle: {stroke: '#ffaa00'}}
            );
        }
    }
};

module.exports = pickupEnergy;