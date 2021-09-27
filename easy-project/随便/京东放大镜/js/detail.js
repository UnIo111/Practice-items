window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1 当我们鼠标经过或离开preview_img，就显示或隐藏mask遮挡层和big大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        // (1) 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // (2) x、y减去mask高度、宽度的一半得最终移动距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (3) 如果mask的坐标小于0，则让其停在0位置
        var maskMax = preview_img.offsetWidth - mask.offsetWidth; // 遮挡层的最大移动距离
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax; // 正方形宽高一致
        }
        // (4) mask移动的距离
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        var bigIMg = document.querySelector('.bigImg');
        var bigMax = bigIMg.offsetWidth - big.offsetWidth; // 大图片最大移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax; // 大图片的移动距离x y
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    });
});