// all tasks
var taskSpawner = require('tasks_task.Spawner');
var taskBuildBase = require('tasks_task.BuildBase');
var taskBuildRoads = require('tasks_task.BuildRoads');
var taskManageMemory = require('tasks_task.ManageMemory');
var taskManageTowers = require('tasks_task.ManageTowers');


// all roles
var roleMiner = require('roles_role.miner');
var roleHauler = require('roles_role.hauler');
var roleUpgrader = require('roles_role.upgrader');
var roleBuilder = require('roles_role.builder');

// config
const config = require('config');

module.exports.loop = function () {

    // Managing tasks
    taskManageMemory.run();
    taskManageTowers.run(Game);

    // Spawner loop
    // TODO: make room specific
    taskSpawner.run(Game);

    // Construction loops
    if (Game.time % config['BUILDING_CHECK_FREQUENCY'] == 0) {
      console.log('Checking structures');
      taskBuildBase.run(Game);
      taskBuildRoads.run(Game);
    }
    
    // assign roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
          roleMiner.run(creep, creep.memory.source);
        }
        if(creep.memory.role == 'hauler') {
          roleHauler.run(creep, creep.memory.source);
        }
        if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
          roleBuilder.run(creep);
        }
      }
}