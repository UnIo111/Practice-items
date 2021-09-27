window.addEventListener('load', function() {
    // 网页轮播图开始---------------------------------------------
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click(); // 手动调用点击事件
        }, 2000);
    });


    // 3. 动态生成小圆圈，有几张图片就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li'); // 创建一个li        
        li.setAttribute('index', i); // 记录当前小圆圈的索引号，通过自定义属性来做        
        ol.appendChild(li); // 把li插入ol里面
        // 4. 小圆圈的排他思想：直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''; // 干掉所有人：把所有li清除current类名
            }
            this.className = 'current'; // 留下我自己：当前的li设置current类名
            // 5. 点击小圆圈，移动图片。移动的是ul。ul的移动距离 = 小圆圈的索引号 * 图片的宽度（负值）。
            var index = this.getAttribute('index'); // 当点击了某个li，就拿到当前li的索引号
            num = index; // 当点击了某个li，就要把这个li的索引号给num
            circle = index; // 当点击了某个li，就要把这个li的索引号给circle
            // num = circle = index;
            animate(ul, -index * focusWidth);
        });

    }
    ol.children[0].className = 'current'; // 把ol里的第一个li设置类名为current


    // 6. 克隆第一张图片(li)放到ul最后面。因为此次克隆发生在小圆圈生成完毕的后面，所以不会增加小圆圈的个数。
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    // 7. 点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0; // circle控制小圆圈的播放
    var flag = true; // flag节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0; // 如果走到了最后复制的一张图片，此时ul要快速复原left改为0
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle++;
            if (circle == ol.children.length) {
                circle = 0; // 如果circle == 4，说明走到最后一张克隆的图片了，就复原circle
            }
            circleChange(); // 调用函数
        }
    });

    // 9. 点击左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px'; // 如果走到了最后复制的一张图片，此时ul要快速复原left改为0
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1; // 如果circle < 0，说明走到第一张图片了，则小圆圈要改为第4个小圆圈(3)
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange(); //调用函数
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''; // 先清除其余小圆圈的current类名
        }
        ol.children[circle].className = 'current'; // 留下当前小圆圈的current类名
    }


    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click(); // 手动调用点击事件
    }, 2000);
    // 网页轮播图结束-----------------------------------------------------
});