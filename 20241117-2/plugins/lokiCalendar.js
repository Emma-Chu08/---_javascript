dayjs.locale('zh-tw');


//宣告全域變數區
let
    apiPath = './db.json',
    booked = [],
    nationalHoliday = [],
    pallet = {};

//初始化作業
const init = () => {
    fetch('./db.json', { method: 'GET' })
        .then(response => response.json())
        .then(json => {
            //booked = json.booked;
            //pallet = json.pallet;
            //nationalHoliday = json.nationalHoliday;
            ({ booked, pallet, nationalHoliday } = json);
            //runCalendarService().print();
            const myCalendar = runCalendarService(); //你創造一個服務原生函式，他提供一些method，像是print,add,sub
            myCalendar.print(); //對這個原生函式調用 print


            //規劃DOM事件
            document.querySelector('a[href="nextCtrl"]').onclick = (e) => {
                console.log('right');
                e.preventDefault();
                myCalender.add();
            };
            document.querySelector('a[href="prevCtrl"]').addEventListener('click', (e) => {
                e.preventDefault();
                myCalender.sub();
            });
        });
}

const runCalendarService = () => {
    //宣告區，注意這裡變成只有service可以讀到的變數或fn，所以console.log不會印出
    let theDay = dayjs(); //今天的時間物件，透過第三方套件獲取
    let 
    calLeft = {
        title: '',
        listBox: '',
        thisDate: theDay,
    },
    calRight = {
        title: '',
        listBox: '',
        thisDate: theDay.add(1, 'month'),
    };
    const
        today = dayjs(),
        
        changeMonth = (num) => {
            theDay = theDay.add(num,'month');
            calLeft = {
                title: '',
                listBox: '',
                thisDate: theDay, //改變該月份代表日
            },
            calRight = {
                title: '',
                listBox: '',
                thisDate: theDay.add(1, 'month'), //改變該下月份代表日
            };
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
                let classStr = 'JsCal';

                //過期判定
                const tempDay = obj.thisDate.date(i);
                if (tempDay.isSameOrBefore(today)) classStr += 'delDay';
                else {
                    //沒過期才考慮追加以下class可能

                    const tempDayStr = tempDay.format('YYYY-MM-DD');
                    //假日判定
                    const isNationalHoliday = nationalHoliday.includes(tempDayStr);
                    if (((firstDay + i) % 7 < 2) || isNationalHoliday) classStr += 'holiday';

                    //滿帳，訂光了的日子
                    const checkBookObject = booker.find((bookObj) => bookObj.date === tempDayStr);
                    if (
                        checkBookObject
                        &&
                        (pallet.count === Object.values(checkBookObject.sellout).reduce((prv, cur) => prv + cur, 0))
                    ) classStr += 'fullDay';
                }

                obj.listBox += `<li class = "${classStr}">${i}</li>`;
            }

            //method 1
            //obj.title = `${obj.thisDate.year()}年${obj.thisDate.month()+1}月`;

            //method 2
            const monthIndexTostring = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            obj.title = `${monthIndexTostring[obj.thisDate.month()]} ${obj.thisDate.year()}`;

            //method 3
            const twMonth = window.dayjs_locale_zh_tw.month;
            obj.title = `${monthIndexTostring[obj.thisDate.month()]} ${obj.thisDate.year()}`;


            return obj;
        },

        listPrint = () => { //準備輸出到DOM
            //console.log(listMaker(calLeft).listBox);
            const newCalLeft = listMaker(calLeft); //把乾淨的calc物件進去得到更新後的calc物件
            const newCalRight = listMaker(calRight); //也可以不使用return obj 來操作DOM，因為listMarker直接修改指定物件內容，所以原本的物件就會變更新,也可以直接利用原本的obj變數來操作DOM

            document.querySelector('.leftDayList').innerHTML = newCalLeft.listBox;
            document.querySelector('.rightDayList').innerHTML = newCalRight.listBox;

            document.querySelector('.leftBar>h4').innerHTML = newCalLeft.tital;
            document.querySelector('.rightBar>h4').innerHTML = newCalRight.tital;
        }

    //listPrint();
    return {
        print: () => listPrint(),
        add: () => {
            changeMonth(1);
            //listPrint();
        },
        sub: () =>{
            changeMonth(-1);
            //listPrint();
        },
    };


}

init();


