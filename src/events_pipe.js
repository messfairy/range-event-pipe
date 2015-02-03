define(['./range_tree'], function(RangeTree){
    var EventsPipe = function(){
        this.rangeTree = new RangeTree();
    };
    var createTopic = function(type, handler, context, priority){
        return {
            type: type, handler: handler,
            context: context, priority: priority||10
        };
    };
    EventsPipe.prototype.subscribe = function(range, type, handler, context, priority){
        var topic = createTopic(type, handler, context, priority);
        this.rangeTree.save(range, topic);
    };
    EventsPipe.prototype.unsubscribe = function(range, type, handler, context, priority){
        var topic = createTopic(type, handler, context, priority);
        this.rangeTree.delete(range, topic);
    };
    EventsPipe.prototype.one = function(range, type, handler, context, priority){
    };
    EventsPipe.prototype.publish = function(range, type, data){
        try{
            var topicRange = this.rangeTree.find(range, createTopic(type, null, null));
        }catch(error){
            console.error(error.message);
            return;
        }
        var topics = topicRange['TOPICS'];
        var callbacks = topics[type];
        Array.isArray(callbacks)&&callbacks.forEach(function(callback){
            var priority = callback['priority'];
            var context = callback['context'];
            var handler = callback['handler'];
            handler&&handler.call(context||null, data);
        });
    };
    return new EventsPipe();
});