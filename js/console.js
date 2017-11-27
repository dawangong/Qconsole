let cons=document.getElementById('console');
let cle=document.getElementById('clear');
let hid=document.getElementById('hide');
let content=document.getElementById('content');

//控制效果
cons.onclick=() => {
    cle.style.display='block';
    hid.style.display='block';
};
hid.onclick=() => {
    cle.style.display='none';
    hid.style.display='none';
};
//清除效果
cle.onclick=() => {
    let ps=document.getElementsByClassName('ps');
    while (ps.length>0){
        ps[0].parentNode.removeChild(ps[0]);
    }
};
//输出到指定位置
function control(str) {
    let op=document.createElement('p');
    op.innerHTML=str;
    op.style.borderTop='1px solid black';
    op.className='ps';
    content.appendChild(op);
}

//重写console下的方法
console.log = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,control(str));
    }
})(console.log);

console.info = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,control(str));
    }
})(console.info);

console.error = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,control(str));
    }
})(console.error);

console.warn = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,control(str));
    }
})(console.warn);

console.debug = (function(oriLogFunc){
    return function(str)
    {
        oriLogFunc.call(console,control(str));
    }
})(console.debug);
