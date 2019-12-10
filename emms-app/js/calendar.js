//require(['echarts', 'getdatacom', 'jq', 'base64'], function(echarts, getdatacom, $, base64) {
    //默认时间
    var time = document.querySelector('#time');
    time.value = new Date().getFullYear() + '-' + addZero(new Date().getMonth() + 1) + '-' + addZero(new Date().getDate());
    var newArr = [];
    $('main').attr('op').split(',').forEach(function(v, k) {
        newArr.push(Number(v));
    })
    //数据请求 首页列表
    mobileList(newArr);

    $('#time').on('input propertychange', function() {
        mobileList(newArr);
    });

    //数据请求 首页列表
    function mobileList(newArr) {
        var paramList = {
            "seachStr": "",
            "opType": newArr,
            "projid": "",
            "orgid": "",
            "type": -1,
            "progress": -1,
            "status": -1,
            // "page_no":1,
            "page_size": -1,
            // "sort_col":"theme",
            // "sort_order":"desc",
            "st": time.value + " 00:00",
            "et": time.value + " 23:59"
        };
        mobileAjax(paramList, '0x02', function(result1) {
            var result = JSON.parse(result1);
            $('main').empty();
            var state1 = 0,
                state2 = 0,
                state3 = 0;
            if (result.total === 0) {
                $('main').html('<div class="no">今天没有任务。</div>');
                $('#circle').html('');
                $('#chart').html('');
            } else {
                result.data.forEach(function(v, k) {
                    if (v.status == 0) {
                        state1 += 1;
                    } else if (v.status == 1) {
                        state2 += 1;
                    } else if (v.status == 2) {
                        state3 += 1;
                    }
                    var str = '';
                    str = newHtml(v.status, v.theme, v.projCode, v.progress, v.actor, v.projName, v.plan_st, v.plan_et, v.isCare);
                    $('main').append(str);
                    mobilePie(state1, state2, state3);
                    mobileRect(state1, state2, state3);
                })
            }

        });
    }

    function mobileAjax(param, cmd, callback) {
        param = JSON.stringify(param);
        param = BASE64.encoder(param);
        var p = { 'cmd': cmd, param: param };
        $.ajax({
            url: '/task?',
            data: p,
            type: 'GET',
            success: callback
        });
    }

    //页面展示字符串
    function newHtml(status, theme, projCode, progress, actor, projName, plan_st, plan_et, care) {
        var asideCon = ['正常', '预警', '逾期'],
            asideColor = ['green', 'red', 'yellow'],
            state = ['未开始', '进行中', '完成', '确认', '驳回', '暂停'],
            isCare = ['collect-1', 'collect-2']
        str = '';
        str += '<section>' +
            '<aside class="' + asideColor[status] + '">' +
            '<div class="aside-con">' + asideCon[status] +
            '</div>' +
            '</aside>' +
            '<article class="main">' +
            '<hgroup>' +
            '<h5>' + theme + '</h5>' +
            '<i class="collect ' + isCare[care] + '"></i>' +
            '<div class="state">' + state[progress] +
            '</div>' +
            '<div class="projCode">' + projCode +
            '</div>' +
            '</hgroup>' +
            '<div class="content">' +
            '<div class="username">' +
            '<div class="icon-name">' +
            '<i></i>' +
            '<span>' + actor + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="projName">' +
            '<i></i>' +
            '<span>' + projName + '</span>' +
            '</div>' +
            '<div class="date-range">' +
            '<i></i>' +
            '<span>' + plan_st + '-' + plan_et + '</span>' +
            '</div>' +
            '</div>' +
            '</article>' +
            '</section>';
        return str;
    }

    // 时间
    var calendar = new LCalendar();
    calendar.init({
        'trigger': '#time', //标签id
        'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
        'minDate': '1980-1-1', //最小日期
        'maxDate': '2040-12-31' //最大日期
        // 'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
    });

    function mobilePie(s1, s2, s3) {
        //圆饼
        echarts.init(document.getElementById('circle')).setOption({
            title: {
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#53FF53', '#D0B473', '#EE8687'],
            series: [{
                // name: '访问来源',
                type: 'pie',
                radius: '60%',
                center: ['50%', '50%'],
                data: [
                    { value: s1, name: '正常任务\n' + s1 },
                    { value: s3, name: '逾期任务\n' + s3 },
                    { value: s2, name: '预警任务\n' + s2 },
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }]
        }, null, { renderer: 'svg' });

    }


    function mobileRect(s1, s2, s3) {
        //柱状
        echarts.init(document.getElementById('chart')).setOption({
            color: ['#53FF53', '#D0B473', '#EE8687'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['正常任务', '逾期任务', '预警任务']
            },
            xAxis: [{
                    type: 'category',
                    data: ['正常任务', '逾期任务', '预警任务'],
                    // axisTick: {
                    //     alignWithLabel: true
                    // }
                },
                // nameLocation:'start'
            ],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                // name:'nihao',
                type: 'bar',
                barWidth: '60%',
                data: [s1, s3, s2],
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#53FF53', '#D0B473', '#EE8687'];
                            return colorList[params.dataIndex];
                        },
                        label: { show: true }
                    }
                },
            }]
        }, null, { renderer: 'svg' });

    }

    //右侧页面
    var btn = document.querySelector('.btn'),
        section = document.querySelectorAll('.section');
    xiaowang = document.querySelector('.xiaowang'),
        start = 0;

    btn.addEventListener('click', function() {
        if (this.classList.contains('statist')) {
            xiaowang.style.left = 0 + 'px';
            $('main').css('display', 'none');
            this.classList.remove('statist');
            this.classList.add('info');
        } else {
            $('main').css('display', 'block');
            xiaowang.style.left = '100%';
            this.classList.remove('info');
            this.classList.add('statist');
        }
    });

    function addZero(a){
        if(a<10){
            return '0'+a;
        }else{
            return a;
        }
    }

//});