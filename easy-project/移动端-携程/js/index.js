window.addEventListener('load', function() {
    // 1 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var w = focus.offsetWidth; // 获得focus的宽度
    var ol = focus.children[1];
    // 2 利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000); // 每隔两秒调用一次此函数
    ul.addEventListener('transitionend', function() { // 等过渡完成之后再去判断是否要回跳到最前方。监听过渡完成的事件 transitionend        
        if (index >= 3) { // 无缝滚动
            index = 0;
            ul.style.transition = 'none'; // 去掉过渡效果让ul快速跳到目标位置
            var translatex = -index * w; // 利用最新的索引号乘以宽度去滚动图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w; // 利用最新的索引号乘以宽度去滚动图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3 小圆点跟随变化        
        ol.querySelector('.current').classList.remove('current'); // 把ol里的li带有current类名的选出来，remove去掉类名       
        ol.children[index].classList.add('current'); // 让当前索引号的li加上current
    });
    // 4 手指滑动轮播图
    var startX = 0;
    var moveX = 0; // 先定义一个全局变量，以便后期使用
    var flag = false;
    ul.addEventListener('touchstart', function(e) { // 触摸(touchstart)元素：获取手指初始坐标
        startX = e.targetTouches[0].pageX;
        clearInterval(timer); // 手指触摸的时候就停止定时器
    });
    ul.addEventListener('touchmove', function(e) { // 移动(touchmove)手指，计算手指滑动的距离并移动盒子
        moveX = e.targetTouches[0].pageX - startX; // 计算移动距离
        var translatex = -index * w + moveX; // 盒子的移动距离 = 盒子原来的位置 + 手指移动的距离
        ul.style.transition = 'none'; // 手指移动的时候不需要动画效果，故取消过渡效果
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; // 如果用户手指移动过我们再去判断否则不做判断效果
        e.preventDefault(); // 阻止滚动屏幕的行为
    });
    ul.addEventListener('touchend', function(e) { // 手指离开，根据移动距离去判断是会弹还是播放上一张下一张
        if (flag) {
            // (1) 如果距离大于50像素我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) { // 如果是右滑就播放上一张，moveX是正值
                    index--;
                } else { // 如果是左滑就播放下一张，moveX是负值
                    index++;
                }
            }
            // (2) 动画效果写在外面，距离小于50就会自动回弹
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // (3) 手指离开的时候重新开启定时器
        clearInterval(timer); // 小技巧：重新开始计时器前先清空所有计时器以保证只有一个定时器
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });





    // 返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    });
});