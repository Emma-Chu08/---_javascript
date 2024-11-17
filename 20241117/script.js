//step1:初始宣告區，作為全域使用利於整個js都能讀到
const btnStart = document.querySelector('button');
const timeNode = document.querySelector('#time');
const countNode = document.querySelector('#combo');
const animals = document.querySelector('.cell');

let time, count;


//step2:規劃功能函式

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

    //step3:開始計時
    const timer = setInterval(() => {
        time--;
        timeNode.textContent = time;

        if (time === 0) {
            clearInterval(timer);
            //讓btnStart 恢復，可以再玩
            btnStart.addEventListener('click', gameStart);
            btnStart.disabled = false;
        }
    }, 1000);

    //step4:產生100個red事件，然後指定到9宮格內某個state.png空閒位置，然後這個100 red 出現時機已設定好
    for (let i = 0; i < 100; i++){
        const atSpace= Math.floor(Math.random() * 9); //0~8
        const atTime = Math.floor(Math.random() * 56000); //0~60sec => rand 0~55999 ms
        const atShow = Math.floor(Math.random() * 3)+2; //2~4sec =>(0~2)+2

    //在單一事件下，試圖觸發到畫面上，每一個都要延遲觸發 atTime
    setTimeout(() => {
        showIt(atTime, i);
    },);

    }


};

const showIt = (atTime, idx) => {

}


//初始執行區域
btnStart.addEventListener('click', gameStart);