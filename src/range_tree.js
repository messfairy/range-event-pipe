define(function(){
    var Exception = function(message, id){
        this.message = message;
        this.id = id;
    };
    Exception.prototype = Error;
    Exception.prototype.constructor = Error;
    var RangeTree = function(rangeRoot){
        this.root = rangeRoot||{TOPICS:{}};
        return this;
    };
    RangeTree.prototype.create = function(paths){
        var pathArray = paths.split('/');
        return pathArray.reduce(function(range, path){
            return range[path] = {TOPICS:{}};
        }, this.root);
    };
    //todo 看看是否需要正则检查一下range路径
    RangeTree.prototype.find = function(paths){
        if(!paths) return this.root; //默认返回根节点
        var pathArray = paths.split('/');
        return pathArray.reduce(function(range, path){
            if(!path){
                throw new Exception('子路径不能为空', 'empty_path');
            }
            if(!range[path]){
                throw new Exception('子路径' + path + '查找失败', 'no_path');
            }
            return range[path];
        }, this.root);
    };
    RangeTree.prototype.save = function(paths, topic){
        try{
            var saveRange = this.find(paths);
        }catch (error){
            if(error.id === 'no_path'){
                saveRange = this.create(paths)
            }else{
                console.error(error.message);
                return;
            }
        }
        var type = topic['type'];
        var handler = topic['handler'];
        var context = topic['context'];
        var priority = topic['priority']||1;
        var callbacks = saveRange['TOPICS'][type];
        if(!callbacks){
            callbacks = saveRange['TOPICS'][type] = [];
        }
        callbacks.push({
            handler: handler, context: context, priority: priority
        });
        return this;
    };
    /**
     * 删除paths对应节点的topic
     * @param paths
     * @param topic
     * @returns {RangeTree}
     */
    RangeTree.prototype.delete = function(paths, topic){
        try{
            var delRange = this.find(paths);
        }catch (error){
            console.error(error.message);
            return this;
        }
        if(topic){
            var type = topic['type'];
            var handler = topic['handler'];
            if(handler){
                var callbacks = delRange.TOPICS[type];
                callbacks.forEach(function(callback){
                    if(handler === callback['handler']){
                        delete callback['handler'];
                        delete callback['context'];
                    }
                });
            }else{
                delete delRange.TOPICS[type];
            }
        }else{
            delRange['TOPICS'] = {};
        }
        return this;
    };
    return RangeTree;
});