// static miner
var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, sourceId) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[sourceId]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[sourceId], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleMiner;