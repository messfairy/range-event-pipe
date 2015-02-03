define(['../src/range_tree'], function(RangeTree){

    describe('RangeTree', function(){
        var EXAMPLE_ROOT;
        beforeAll(function(){
            EXAMPLE_ROOT = {
                TOPICS: {},
                messages: {
                    TOPICS: {}
                },
                container: {
                    TOPICS: {},
                    view: {
                        TOPICS: {},
                        plugin:{
                            TOPICS: {
                                create: [{
                                    priority: 12, context: {}, handler: function(){}
                                },{
                                    priority: 11, context: {}, handler: function(){}
                                }],
                                deleted: [{
                                    priority: 12, context: {}, handler: function(){}
                                },{
                                    priority: 11, context: {}, handler: function(){}
                                }],
                                edit: [{
                                    priority: 12, context: {}, handler: function(){}
                                },{
                                    priority: 11, context: {}, handler: function(){}
                                }],
                                select: [{
                                    priority: 12, context: {}, handler: function(){}
                                },{
                                    priority: 11, context: {}, handler: function(){}
                                }]
                            },
                            tool: {
                                TOPICS:{}
                            }
                        }
                    }
                }
            };
        });
        it('在range树上寻找节点', function(){
            var rangeTree = new RangeTree(EXAMPLE_ROOT);
            var plugin = rangeTree.find('container/view/plugin/tool');
            console.log(plugin);
            expect(plugin).toEqual({
                TOPICS:{}
            });
        });

        it('在range树上新建节点', function(){

        });

    });
});