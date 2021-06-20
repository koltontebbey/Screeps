var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //let repTarget = creep.room.find(FIND_STRUCTU)

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }

        // if(!creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0 && creep.room.find(FIND_STRUCTU, { filter: (i) => {return (i.structureType == str)}} )  {
        //     creep.memory.repairing = true;
        //     creep.say('repair');

        // }

        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }


        if(creep.memory.repairing) {

            //repair
        }
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;