var taskUpdateMemory = {
  
  run: function() {
    // clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'miner') {
              console.log('Clearing up miner:', name);
              console.log(Memory.creeps[name].source, Memory.sources[Memory.creeps[name].source].assigned_parts,  Memory.sources[Memory.creeps[name].source].assigned_miners, Memory.creeps[name].work_parts);
              Memory.sources[Memory.creeps[name].source].assigned_parts -= Memory.creeps[name].work_parts;
              Memory.sources[Memory.creeps[name].source].assigned_miners -= 1;
              console.log(Memory.sources[Memory.creeps[name].source].assigned_parts,  Memory.sources[Memory.creeps[name].source].assigned_miners);
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
  }
}
      
module.exports = taskUpdateMemory;