var taskUpdateMemory = {
  
  run: function() {
    // clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if (Memory.creeps[name].role == 'miner') {
              console.log('Clearing up miner:', name);
              Memory.sources[Memory.creeps[name].source].assigned_parts -= Memory.creeps[name].work_parts;
              Memory.sources[Memory.creeps[name].source].assigned_miners -= 1;

            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
  }
}
      
module.exports = taskUpdateMemory;