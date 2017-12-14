/**
 * Created by lenovo on 2017/11/6.
 */
var num = 0,result = 0,numshow = "0";
var operate = 0;//判断输入状态的标志
var calcul = 0;//判断计算状态的标志
var quit = 0;//防止重复按键的标志

function command(num) {
    var str = String(document.counter.numScreen.value);//获得当前显示数据
    //先判断：str是不是‘0’，如果是，就返回‘’给str，如果不是再判断operate是不是0，如果operate是0，str本身是多少就是多少，如果operate不是0，也把‘’返回给str
    str = (str!="0") ? ((operate==0)?str : "") : "";//(三目运算)
    str = str+String(num);//给当前值追加字符
    document.counter.numScreen.value=str;//刷新显示
    operate = 0;//重置输入状态
    quit = 0;//重置防止重复按钮的标志
}

//功能字符
//退格
function backspace() {
    var str = String(document.counter.numScreen.value);
    str = (str!="0")? str : "";
    str = str.substr(0,str.length-1);
    str = (str!="")? str : "0";
    document.counter.numScreen.value = str;
}

//清除
function del() {
    num = 0;
    result = 0;
    numshow = 0;
    document.counter.numScreen.value ="0";
}

//除法
function divide() {
    calculate(); //调用计算函数
    operate = 1; //更改输入状态
    calcul = 4; //更改计算状态为除
}
//乘法
function multi() {
    calculate();
    operate = 1;
    calcul = 3;
}
//加法
function plus() {
    calculate();
    operate = 1;
    calcul = 1;
}
//减法
function minus() {
    calculate();
    operate = 1;
    calcul = 2;
}

//双零
function dzero() {
    var str = String(document.counter.numScreen.value);
    str=(str!="0")? ((operate==0)? str+"00":"0"):"0";//如果当前值不是0，且状态为0，则返回当str+“00”，否则返回”0“
    document.counter.numScreen.value=str;
    operate=0;
}

//点
function dot() {
    var str = String(document.counter.numScreen.value);
    str =(str!="0")? ((operate==0)?str:"0"):"0";
    for(i=0;i<str.lenght;i++){ //判断是否有一个点
        if(str.substr(i,1)==".")
            return false; //如果有则不再插入
    }
    str=str+".";
    document.counter.numScreen.value=str;
    operate=0;
}

//等于
function equal() {
    calculate();
    operate = 1;
    num = 0;
    result = 0;
    numshow = "0";
}

function calculate() {
    numshow = Number(document.counter.numScreen.value);
    if(num!=0 && quit!=1){//判断前一个运算数是否为0，防重复按键
        switch (calcul) { //判断要输入的状态
            case 1:result = num+numshow;
                    break;
            case 2:result = num-numshow;
                    break;
            case 3:result = num*numshow;
                    break;
            case 4:result = num/numshow;
                    break;
        }
        quit=1; //避免重复按键
    }else{
        result = numshow;
    }
    numshow = String(result);
    document.counter.numScreen.value = numshow;
    num = result; //储存当前值
}

