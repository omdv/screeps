var taskSpawner = {

    run: function(game, request) {
        // // spawner
        // _.forOwn(config['types'], function(props, role) {
        //     var current = _.filter(game.creeps, (creep) => creep.memory.role == role);
        //     if(current.length < props['amount']) {
        //         var newName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
        //         console.log('Spawning new ' + role + ': ' + newName);
        //         game.spawns['Spawn1'].spawnCreep(
        //             props['actions'],
        //             newName,
        //             {memory: {role: role}}
        //         );
        //     }
        // });

        // spawn miners
        for (var i = 0; i < NUMBER_OF_BUILDERS; i++) {
            // spawn builders
            let name = 'builder'+i;
            if (!Memory.creeps.includes(name)) {
            game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: 'builder'}});
            Memory.creeps.append(name);
            }
        }

        // verbose
        if(game.spawns['Spawn1'].spawning) {
            var spawningCreep = game.creeps[game.spawns['Spawn1'].spawning.name];
            game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                game.spawns['Spawn1'].pos.x + 1,
                game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = taskSpawner;