/**
 * Created by haoxiaotian on 16-3-24.
 */

var data = [];
var BJ = [116.36,40.04];
var WLMQ = [87.68,43.77];

// var startP;
// var endP;
// var midP;

var t = 0;

function makeData(start,end,t){
    if(t > 10)
    {
        return;
    }
    t = t + 1;

    var x = (Math.random()*2 - 1)*0.006;

    //制造偏差后的中点
    var mid = [];
    mid[0] = (start[0] + end[0])/2 + x;
    mid[1] = (start[1] + end[1])/2 + x;

    makeData(start,mid,t);
    // console.log(mid);
    data.push(mid);

    makeData(mid,end,t);

    return data;

}


//console.log(data);