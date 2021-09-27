// 动画原理
// var obj = {};
// obj.name = 'andy';
// 简单动画函数封装obj目标对象 target目标位置
function animate(obj, target, callback) {
    clearInterval(obj.timer); // 让元素只有一个定时器执行，先清除以前的定时器，只保留当前的一个定时器执行。
    obj.timer = setInterval(function() { // 给不同元素指定了不同的定时器
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 5;
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 步长要取整
        if (obj.offsetLeft == target) {
            // 停止动画本质是停止定时器
            clearInterval(obj.timer);
            // if (callback) { // 回调函数写到定时器结束里面
            //     callback(); // 调用函数
            // }
            callback && callback();
        }
        // 把每次加一的步长值改为一个慢慢变小的值，步长公式 = (目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}