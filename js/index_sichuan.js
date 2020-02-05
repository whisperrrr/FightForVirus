var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading();

$.getJSON('./json/statusData.json',function(data){myData = data;});

$.get('./json/sichuan.json', function (geoJson) {
    citysData = parseToCity();
    myChart.hideLoading();

    echarts.registerMap('四川', geoJson);

    myChart.setOption(option = {
        title: {
            text: '四川省新冠状病毒实时疫情数据(2020-02-05 10:30(北京时间))',
            subtext: '数据来自丁香医生',
            sublink: 'https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=singlemessage&isappinstalled=0'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}例'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            splitNumber: 10,
            inRange: {
                color: ['#f5d6d9','#d94e5d'],
            },
            outOfRange: {
                color: 'darkred',
            },
            textStyle: {
                color: '#000',
            }
        },
        series: [
            {
                name: '四川新冠状病毒实时疫情数据',
                type: 'map',
                mapType: '四川', // 自定义扩展图表类型
                label: {
                    show: true
                },
                data: citysData,
                // 自定义名称映射
                // nameMap: {
                //     'Central and Western': '中西区',
                //     'Eastern': '东区',
                //     'Islands': '离岛',
                //     'Kowloon City': '九龙城',
                //     'Kwai Tsing': '葵青',
                //     'Kwun Tong': '观塘',
                //     'North': '北区',
                //     'Sai Kung': '西贡',
                //     'Sha Tin': '沙田',
                //     'Sham Shui Po': '深水埗',
                //     'Southern': '南区',
                //     'Tai Po': '大埔',
                //     'Tsuen Wan': '荃湾',
                //     'Tuen Mun': '屯门',
                //     'Wan Chai': '湾仔',
                //     'Wong Tai Sin': '黄大仙',
                //     'Yau Tsim Mong': '油尖旺',
                //     'Yuen Long': '元朗'
                // }
            }
        ]
    });
});

function parseToCity() {
  let cityList = myData[10].cities;    //  “10”代表丁香园统计数据中四川的实时序号
  let cityListLength = cityList.length;
  let resultdata = [];
  for (let i = 0; i < cityListLength; i++) {
    let city = {name:"",value:""};
    city.name = cityList[i].cityName.length < 3 ? cityList[i].cityName + "市":cityList[i].cityName;
    city.value = cityList[i].confirmedCount;
    resultdata.push(city);
  }
  return resultdata;
}
