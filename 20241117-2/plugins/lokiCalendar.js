//宣告全域變數區
let
    apiPath = './db.json',
    booked = [],
    nationalHoliday = [],
    pallet = {};

//初始化作業
const init = () => {
    fetch('./db.json', { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            //booked = json.booked;
            //pallet = json.pallet;
            //nationalHoliday = json.nationalHoliday;
            ({ booked, pallet, nationalHoliday } = json);
            runCalendarService();
        });
}

const runCalendarService = () => {
    //宣告區，注意這裡變成只有service可以讀到的變數或fn，所以console.log不會印出
    let theDay = dayjs();
    today = dayjs(),
        calLeft = {
            title: 'Left Calender',
            listBox: '<li>1</li><li>2</li>',
            thisDate: theDay,
        },
        calRight = {
            title: 'Right Calender',
            listBox: '',
            thisDate: theDay.add(1, 'month'),
        },


        listMaker = (obj) => { //調整萬年曆物件，調整完畢後返回修改後的物件
            //const firstDay = obj.thisDate.date(1).day();
            const firstDay = obj.thisDate.startOf('month').day();//該月第一天禮拜幾
            const totalDay = obj.thisDate.daysInMonth();//該月有幾天
            //console.log(firstDay,totalDay );

            //1=mon,2=tue,3=wed, 4=thu, 5=fri, 6=sat, 0(7)=sun
            for (let i = 1; i <= (firstDay || 7); i++) { //控制產生多少空白日
                obj.listBox += `<li class = "JsCal"></li>`;
            }

            for (let i = 1; i <= totalDay; i++) { //控制產生多少空白日
                obj.listBox += `<li class = "JsCal">${i}</li>`;
            }

            //method 1
            //obj.title = `${obj.thisDate.year()}年${obj.thisDate.month()+1}月`;

            //method 2
            const monthIndexTostring = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            obj.title = `${monthIndexTostring[obj.thisDate.month()]} ${obj.thisDate.year()}`;

            //method 3
            const twMonth = window.dayjs_locale_zh_tw.month;
            obj.title = `${monthIndexTostring[obj.thisDate.month()]} ${obj.thisDate.year()}`;


            return obj;
        },

        listPrint = () => { //準備輸出到DOM
            //console.log(listMaker(calLeft).listBox);
            document.querySelector('.leftDayList').innerHTML = listMaker(calLeft).listBox;
            document.querySelector('.rightDayList').innerHTML = listMaker(calright).listBox;

            document.querySelector('.leftBar>h4').innerHTML = listMaker(calLeft).tital;
            //document.querySelector('.rightBar>h4').innerHTML = listMaker(calright).tital;
        }

        listPrint();


}


