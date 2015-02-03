define(['../src/events_pipe'], function(eventsPipe){
    describe('EventsPipe', function(){
        beforeEach(function(){
            eventsPipe.unsubscribe();
        });
        it('测试发布事件', function(){
            eventsPipe.subscribe('global', 'click', function(data){
                console.log('事件发布成功!');
                expect(data).toEqual({a: 'a', b: 'b'});
            });
            eventsPipe.publish('globals', 'click', {a: 'a', b: 'b'});
            eventsPipe.publish('global', 'click', {a: 'a', b: 'b'});
        });
        it('测试解除事件', function(){
            eventsPipe.subscribe('global', 'click', function(data){
                console.log('不会调用!'); //没有调用
                expect(data).toEqual({a: 'a', b: 'b'});
            });
            eventsPipe.publish('global', 'click', {a: 'a', b: 'b'});
        });
        it('请指定事件作用域', function(){
            var errorMsg = '请指定事件作用域，字符串类型';

        })
    });
})