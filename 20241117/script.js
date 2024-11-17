//初始宣告區，作為全域使用利於整個js都能讀到
const btnStart = document.querySelector('button');
const timeNode = document.querySelector('#time');
const countNode = document.querySelector('#combo');
const animals = document.querySelector('.cell');

let time, count;


//規劃功能函式

const gameStart = () => {
    console.log('gameStart');
    //一開始讓btnStart失去作用
    btnStart.removeEventListener('click', gameStart);
    btnStart.disabled = true;

    //校正歸零
    time = 60;
    count = 0;
    timeNode.textContent = time;
    countNode.textContent = count;

    //開始計時
    const timer = setInterval(() => {
        time--;
        timeNode.textContent = time;

        if (time === 0) {
            clearInterval(timer);

            btnStart.addEventListener('click', gameStart);
            btnStart.disabled = false;
        }
    }, 1000);


};


//初始執行區域
btnStart.addEventListener('click', gameStart);