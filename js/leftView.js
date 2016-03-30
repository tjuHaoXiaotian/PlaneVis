/**
 * Created by jack on 2015/12/27.
 */

var canvasLeft;

/**
 * 比例尺
 */
var yScaleLeft = d3.scale.linear()
    .domain([0,41200])  // 41125 所获取数据中最大的一个
    .range([maxHeight,20]);

//var vrateScaleLeft = d3.scale.linear()
//    .domain([0,5120])  // 3264 所获取数据中最大的一个
//    .range([0,60]);

function initLeft(){
    canvasLeft = svgLeft.append("svg:g")
        .attr("class", "airplaneInTianjinLeft");

    //定义y轴
    var yAxis = d3.svg.axis()
        .scale(yScaleLeft)
        .orient("right");



    //绘制坐标轴的直线
    for(var i = 0;i < 9;i++){
        if(i == 0) {
            canvasLeft.append("line")
                .attr("stroke", "black")
                .attr("stroke-width", "2px")
                .attr("x1", 0)
                .attr("y1", yScaleLeft(5000 * i))
                .attr("x2", width)
                .attr("y2", yScaleLeft(5000 * i));
        }else{
            canvasLeft.append("line")
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .attr("x1", 0)
                .attr("y1", yScaleLeft(5000 * i))
                .attr("x2", width)
                .attr("y2", yScaleLeft(5000 * i));
        }
    }

    //添加y轴
    canvasLeft.append("g")
        .attr("class","axis")
        .attr("transform","translate(" + 0.2 + "," + 0.2 + ")")
        .call(yAxis);


    canvasLeft.append("text").attr("class","axisExplain")
        .attr("dx",40).attr("dy",20).attr("text-anchor","middle")
        .attr("fill",textColor).attr("font-size","3px").attr("font-family","微软雅黑")
        //.attr("display","none")
        .text("高度/英尺");
}


function drawAirplaneLeft(projectionProvince) {
    /**
     * 标记地图上的飞机场
     */
    d3.json("json/airport.json", function (error, airport) {

        // 自定义 pophover
        function tooltipHtmlAirport(d){	/* function to create html content string in tooltip div. */
            return "<h4>"+ d.name+"</h4><table>"+
                "<tr><td>位置</td><td>"+(d.address)+"</td></tr>"+
                "</table>";
        }

        //  定义鼠标移上函数
        function mouseOver3(d){
            d3.select("#tooltip1").transition().duration(200).style("opacity", .9);

            d3.select("#tooltip1").html(tooltipHtmlAirport(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        }
        //  定义鼠标移出函数
        function mouseOut3(){
            d3.select("#tooltip1").transition().duration(500).style("opacity", 0).attr("fill","#ffffff");
        }
        canvasLeft.append("svg:g")
            .attr("class", "airports")
            .selectAll("image")
            .data(airport)
            .enter()
            .append('image')
            .attr("x", function (d) {
                //console.log("airport:" + d);
                return projectionProvince([d.lon, d.lat])[1]-6;
            })
            .attr("y", function (d) {

                //return 200;
                return yScaleLeft(maxHeight-2);
            })
            .attr("width", 12)
            .attr("height", 12)
            .attr("xlink:href","img/airport.png")
            .on("mouseover", mouseOver3).on("mouseout", mouseOut3);
    });
}

/**
 * 更新飞机数据
 * @type {number}
 */
//var count = 1;
//function updatePlanesLeft(projectionProvince) {
////        $.getJSON( "http://localhost:8080/Plane/planes/3", function(data) {
//    d3.json(baseUrl, function (error, planes) {
//        if (error)
//            return console.error(error);
//        //console.log(plane);
//        // 是否需要过滤
//        var plane;
//        if(doFilter){
//            plane = filter(planes);
//        }else{
//            plane = planes;
//        }
//
//
//        canvasLeft.selectAll("defs").remove();
//        var arrowMarker = [];
//        var arrowMarkerPoint = [];
//        plane.forEach(function (d) {
//
//            var defs = canvasLeft.append("defs");
//            // 飞机模型
//            arrowMarker[d.icao] = defs.append("marker")
//                .attr("id","arrowLeft"+ d.icao)
//                .attr("markerUnits","strokeWidth")
//                .attr("markerWidth","13")
//                .attr("markerHeight","13")
//                .attr("viewBox","0 0 18 18")
//                .attr("refX","8")
//                .attr("refY","8")
//                //.attr("orient","auto");
//                .attr("orient",function(){
//                    if(d.trueTrack >=90 && d.trueTrack <=270 ){  // 向南飞
//                        return 0;
//                    }else{   // 向北飞
//                        return 180;
//                    }
//                });
//
//            var arrow_path = "M11,8 L10,8.8 L9,9 L7,9 L3,16 L2,16 L4,9 L2,8.8 L1,10 L0,10 L1,8 L0,6 L1,6 L2,7.2 L4,7 L2,0 L3,0 L7,7 L9,7 L10,7.2 L11,8";
//
//            arrowMarker[d.icao].append("path")
//                .attr("d",arrow_path)
//                .attr("fill","#"+ d.icao);
//
//            // 箭头模型
//            arrowMarkerPoint[d.icao] = defs.append("marker")
//                .attr("id","arrowPointLeft"+ d.icao)
//                .attr("markerUnits","strokeWidth")
//                .attr("markerWidth","10")
//                .attr("markerHeight","10")
//                .attr("viewBox","0 0 12 12")
//                .attr("refX","6")
//                .attr("refY","6")
//                .attr("orient",function(){
//                    if(d.vrate >0){
//                        // 向上
//                        return 270;
//                    }else if(d.vrate < 0 ){
//                        // 向下
//                        return 90;
//                    }else{
//                        if(d.trueTrack >=90 && d.trueTrack <=270 ){  // 向南飞
//                            return 0;
//                        }else{   // 向北飞
//                            return 180;
//                        }
//                    }
//                });
//
//            var arrow_path_point = "M2,2 L10,6 L2,10 L6,6 L2,2";
//
//            arrowMarkerPoint[d.icao].append("path")
//                .attr("d",arrow_path_point)
//                .attr("fill","red");
//        });
//
//
//
//        //// 画轨迹
//        canvasLeft.selectAll("circle").remove();
//        //.attr("fill",function(d){
//        //    return "#1A76FF";
//        //})
//        //.attr('opacity',1)
//        //.attr('r',1);
//        canvasLeft.append("svg:g")
//            .attr("class", "tracks")
//            .selectAll("circle")
//            .data(plane)
//            .enter()
//            .append('circle')
//            .attr('class',function(d){
//                return "class_" + d.icao + " PlaneMark";
//            })
//            .attr('cx',function(d){
//                return projectionProvince([d.lon,d.lat])[1];
//            })
//            .attr('cy',function(d){
//                return yScaleLeft(d.alt);
//                //return  height - 50;
//            })
//            .attr('r',10)
//            .attr('opacity',0)
//            .attr("fill",function(d){
//                return "#" + d.icao;
//            })
//            //.attr("marker-end","url(#arrow)")
//            .on("mouseover", mouseOverSynchronous)
//            .on("mouseout", mouseOutSynchronous)
//            .on("click",mouseClickSynchronous);
//
//
//
//
//        // 标注飞机位置
//        //获取飞机的update部分
//        //var updatePlane = canvasLeft
//        //    .selectAll("line")
//        //    .attr("class", "planes")
//        //    .data(plane);
//        //
//        ////获取飞机的enter部分
//        //var enterPlane = updatePlane.enter();
//        //
//        ////获取飞机的exit部分
//        //var exitPlane = updatePlane.exit();
//        //
//        ////1. 飞机的update部分的处理方法
//        //updatePlane.attr('x1',function(d){
//        //    return projectionProvince([d.lon,d.lat])[0];
//        //})
//        //    .attr('y1',function(d){
//        //        return  projectionProvince([d.lon,d.lat])[1];
//        //    })
//        //    .attr('x2',function(d){
//        //        return projectionProvince([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
//        //    })
//        //    .attr('y2',function(d){
//        //        return  projectionProvince([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
//        //    })
//        //    .attr("stroke","red")
//        //    .attr("stroke-width",2)
//        //    .attr("fill",function(d){
//        //        return "#000000";
//        //    })
//        //    //.attr("marker-end","url(arrow"+ d.icao+")")
//        //    .attr("marker-start",function(d){
//        //        //return arrowMarker[d.icao];
//        //        return "url(#arrow"+ d.icao+")";
//        //    })
//        //    .attr("marker-end",function(d){
//        //        //return arrowMarker[d.icao];
//        //        return "url(#arrowPoint"+ d.icao+")";
//        //    })
//        //    .on("mouseover", mouseOver2).on("mouseout", mouseOut2);
//        //
//        ////2. 飞机的enter部分的处理方法
//        //enterPlane.append('line')
//        //    .attr('x1',function(d){
//        //        return projectionProvince([d.lon,d.lat])[0];
//        //    })
//        //    .attr('y1',function(d){
//        //        return  projectionProvince([d.lon,d.lat])[1];
//        //    })
//        //    .attr('x2',function(d){
//        //        return projectionProvince([d.lon,d.lat])[0] + d.speed /10 *  Math.sin(d.trueTrack*Math.PI/180);
//        //    })
//        //    .attr('y2',function(d){
//        //        return  projectionProvince([d.lon,d.lat])[1]- d.speed / 10 * Math.cos(d.trueTrack*Math.PI/180);
//        //    })
//        //    .attr("stroke","red")
//        //    .attr("stroke-width",2)
//        //    .attr("fill",function(d){
//        //        return "#000000";
//        //    })
//        //    //.attr("marker-end","url(arrow"+ d.icao+")")
//        //    .attr("marker-start",function(d){
//        //        //return arrowMarker[d.icao];
//        //        return "url(#arrow"+ d.icao+")";
//        //    })
//        //    .attr("marker-end",function(d){
//        //        //return arrowMarker[d.icao];
//        //        return "url(#arrowPoint"+ d.icao+")";
//        //    })
//        //    .on("mouseover", mouseOver2).on("mouseout", mouseOut2);
//        //
//        ////3. 飞机的exit部分的处理方法
//        //exitPlane.remove();
//
//
//
//        canvasLeft.selectAll(".PlaneLine").remove();
//        canvasLeft.append("svg:g")
//            .attr("class", "planes")
//            .selectAll("line")
//            .data(plane)
//            .enter()
//            .append('line')
//            .attr('class',function(d){
//                return "plane_" + d.icao + "  PlaneLine";
//            })
//            .attr('x1',function(d){
//                return projectionProvince([d.lon,d.lat])[1];
//            })
//            .attr('y1',function(d){
//                return yScaleLeft(d.alt);
//            })
//            .attr('x2',function(d){
//                return projectionProvince([d.lon,d.lat])[1];
//            })
//            .attr('y2',function(d){
//                //console.log(d.icao +":"+ vrateScale(d.vrate));
//                return  yScaleLeft(d.alt) - vrateScale(d.vrate);
//            })
//            .attr("stroke","red")
//            .attr("stroke-width",1.5)
//            .attr("fill",function(d){
//                return "#"+ d.icao;
//            })
//            //.attr("marker-end","url(arrow"+ d.icao+")")
//            .attr("marker-start",function(d){
//                //return arrowMarker[d.icao];
//                return "url(#arrowLeft"+ d.icao+")";
//            })
//            .attr("marker-end",function(d){
//                //return arrowMarker[d.icao];
//                return "url(#arrowPointLeft"+ d.icao+")";
//            })
//            .on("mouseover", mouseOverSynchronous).on("mouseout", mouseOutSynchronous);
//
//
//
//            if(MouseClicked){
//                //canvasSide.selectAll(".PlaneMark").attr("opacity",0);
//                //canvasSide.selectAll(".PlaneLine").attr("opacity",0);
//                // 所有轨迹
//                d3.selectAll(".PlaneMark").attr("opacity",0);
//                // 所有直线隐藏
//                d3.selectAll(".PlaneLine").attr("opacity",0);
//
//                d3.selectAll(".plane_" + PlaneSelected).attr("opacity",1);
//                d3.selectAll(".class_" + PlaneSelected).attr("opacity",0.5);
//            }
//
//    });
//}


//function startModelLeft(projectionProvince) {
//    initLeft();
//    drawAirplaneLeft(projectionProvince);
//    count = count + 1;
//    updatePlanesLeft(projectionProvince);
//    //getNext();
//    setInterval(function() {
//        if(!isPause) {
//            //console.log("点了暂停以后: " + isPause);
//            updatePlanesLeft(projectionProvince);
//            //getNext();
//        }
//    }, 1000);
//}


/**
 * 点击省级地区事件，包括四个直辖市（但要考虑排除直辖市的二级点击）
 * @param d
 * @param mapPath
 * @param svg
 */
function drawPrivenceMap( mapPath, svg) {

    d3.json(mapPath, function(error, root) {

        if (error)
            console.log(error);

        //console.log(root.features);

        var projectionProvince = d3.geo.mercator()
            .center(root.cp)
            .scale(root.size*2.5)
            //.translate([width/4*3, height/2]);
            .translate([width/1.9, height/2]);

        var path = d3.geo.path().projection(projectionProvince);

        //var color = d3.scale.category20();

        svg.selectAll(".pathProvince")
            .data( root.features )
            .enter()
            .append("path")
            .attr("class", "pathProvince")
            .attr("stroke","#6B695D")
            .attr("stroke-width",0.3)
            .attr("fill", function(d,i){
                return background;
            })
            .attr("d", path )
            .on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill",overColor);

            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .attr("fill",background);
            }).on("click",function(d,i){
                if(canCountriesClick){
                    clickProvince(d, i);
                }

            });

        provinceNodes = [];
        //获取中心点坐标
        root.features.forEach(function(d, i) {
            //console.log(d);
            var centroid = path.centroid(d);
            centroid.x = centroid[0];
            centroid.y = centroid[1];
            centroid.id = d.properties.id;
            centroid.name = d.properties.name;
            centroid.feature = d;
            //console.log("x:" + centroid.x);
            provinceNodes.push(centroid);
        });


        //给市加上名字
        drawCityName(type);
        if(!canCountriesClick){   // type == 0 在全国地图上，type == 1 在 地图详情上
            startModel(projectionProvince,type);
            if(type==1){
                startModelSide(projectionProvince);
                startModelLeft(projectionProvince);
            }
        }else{
            destroy();
        }

    });//end json


}//end drawMap


var projection = d3.geo.mercator()
    .center([107, 38])
    .scale(width-300)
    .translate([width/1.8, height/2]);
initLeft();
drawAirplaneLeft(projection);
//function destroy(){
//    svgLeft.selectAll(".airplaneInTianjin").remove();
//}
