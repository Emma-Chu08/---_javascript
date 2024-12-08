onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, { percentPosition: 'true' });
}

//cookie 設定
//1.取得cookie
const lokiCookieAry = document.cookie.split(';'),
nodeCookie = document.querySelector('#lokiCookie'),
keywordCookie = 'cookieUsed-agree';

//2.檢查cookieAry是否為關鍵字
if(aryCookie.includes(keywordCookie)){

}else{

}
nodeCookie.style.display = 'block';
nodeCookie.computedStyleMap('button').onclik = () =>{
  document.cookie = keywordCookie;
};

