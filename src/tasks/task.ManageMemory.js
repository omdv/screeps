var taskUpdateMemory = {
  
  run: function() {
    // clear memory
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'miner') {
              console.log(Game.time, ": removing miner ", name);
              Memory.sources[Memory.creeps[name].source].assigned_parts -= Memory.creeps[name].work_parts;
              Memory.sources[Memory.creeps[name].source].assigned_miners -= 1;
            }
            delete Memory.creeps[name];
            console.log(Game.time, ": removing creep memory ", name);
        }
    }

    // update miners for each source
    if (Game.time % 101 == 0) {
      console.log(Game.time + ": updating sources memory");
      const sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
      _.forEach(sources, function(s, idx){
        const miners = Game.spawns.Spawn1.room.find(FIND_CREEPS,
          {filter: function(o) {return o.memory.role == 'miner' && o.memory.source==idx}}
        );
        const body_parts = _.reduce(miners, function (acc, cur) {
          return acc + cur.memory.work_parts;
        }, 0);
        Memory.sources[idx].assigned_parts = body_parts;
        Memory.sources[idx].assigned_miners = miners.length;
      });
    }
  }
}
      
module.exports = taskUpdateMemory;