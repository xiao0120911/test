// 获取canvas元素
const canvas = document.getElementById('ballCanvas');
const ctx = canvas.getContext('2d');

// 设置canvas大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义球的属性
let balls = [];
const ballCount = 10;  // 生成的球的数量

for (let i = 0; i < ballCount; i++) {
    balls.push({
        x: Math.random() * canvas.width,  // 球的x坐标
        y: Math.random() * canvas.height, // 球的y坐标
        radius: 20,                        // 球的半径
        color: getRandomColor(),           // 球的颜色
        dx: (Math.random() - 0.5) * 10,    // 球的x轴速度
        dy: (Math.random() - 0.5) * 10     // 球的y轴速度
    });
}

// 随机生成颜色函数
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 绘制球函数
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// 更新球的位置
function updateBall(ball) {
    // 检测边界碰撞
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
        ball.color = getRandomColor();  // 碰撞时更换颜色
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        ball.color = getRandomColor();  // 碰撞时更换颜色
    }

    // 更新位置
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新并绘制所有球
    balls.forEach(ball => {
        drawBall(ball);
        updateBall(ball);
    });

    requestAnimationFrame(animate);
}

// 开始动画
animate();
