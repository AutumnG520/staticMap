// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import {defaults as defaultControls, ScaleLine} from 'ol/control';
// import TileLayer from 'ol/layer/Tile';
// import TileWMS from 'ol/source/TileWMS';
// import ol from 'ol'
// import {transform} from 'ol/proj';
// import XYZ from 'ol/source/XYZ';
let layers = [
  new ol.layer.Tile({
	source: new ol.source.XYZ({
	  // 设置本地离线瓦片所在路径，由于例子里面只有一张瓦片，页面显示时就只看得到一张瓦片。
	  tileUrlFunction: (tileCoord, pixelRatio, proj) => {
		var z = tileCoord[0];
		var x = tileCoord[1];
		var y = tileCoord[2];
		// console.log(x, y, z); //x:412429//y:
		// console.log(pixelRatio, proj);
		// const image = '../satellite/19/412193/213878.jpg'
		const image = '../images/timg.jpg';
		// getImageBae64(image);
		// let image = require('satellite/19/412193/213878.jpg');
		let SRC = getBase64Image(image);
		console.log(SRC)
		return SRC;
	  }
	})
  })
];
let center = [104.080003, 30.6557];
center = new ol.proj.transform([104.080003, 30.6557], "EPSG:4326", "EPSG:3857");
console.log(ol)
console.log(ol.Map)
let map = new ol.Map({
  controls: ol.control.defaults().extend([
	new ol.control.defaults({
	  units: "degrees"
	})
  ]),
  layers: layers,
  target: "map",
  view: new ol.View({
	center: center,
	zoom: 19,
	minZoom: 18, //限制放大层级
	maxZoom: 20
  })
});
// 读取本地图片的Base64
function getImageBae64(path){
	plus.io.requestFileSystem( plus.io.PRIVATE_WWW, function( fs ) {
			var rootEntry = fs.root; //获取文件系统的根目录
			var reader = null;
			var newPath = '';
			if(plus.device.vendor == 'Apple') { //如果是ios
				newPath = path.slice(5)
			} else {
				newPath = path
			}
			// fs.root是根目录操作对象DirectoryEntry
			rootEntry.getFile(newPath, {}, function(entry) {
			
				entry.file(function(file) {
					reader = new plus.io.FileReader();
					reader.onloadend = function(e) {
						console.log('饿:',e)
					};
					// reader.readAsDataURL(file);//以编码url格式
				},
				function(e) {
					alert(e.message);
				});
			},
			function(e) {
				alert(JSON.stringify(e));
			});
			
			
			
			// 可通过fs进行文件操作 
			// alert( "File system name: " + fs.name );
			// 通过fs.root获取DirectoryEntry对象进行操作 
			// fs.root 
		}, function ( e ) {
			alert( "Request file system failed: " + e.message );
		} );
	
}



// 读取本地图片的Base64

function getBase64Image(image) {
	debugger
  var img = new Image();
  img.src = image;
  console.log(image);
  console.log(img);
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  var dataURL = canvas.toDataURL();
  console.log("dataURL:", dataURL);
  return dataURL;
}































// return false;
// var maap = new Map({
// 	target: 'map', //要渲染到元素的id
// 	layers: [
// 	  new TileLayer({               // 使用XYZ的方式加载OpenStreetMap
// 		source: new XYZ({
// 			// url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// 			// url:'./satellite/{z}/{x}/{y}.png'
// 			  tileUrlFunction: function (tileCoord, pixelRatio, proj) {
// 					var z = tileCoord[0];
// 					var x = tileCoord[1];
// 					var y = tileCoord[2];
// 					// let a = JSON.parse(localStorage.getItem('path'));
// 					// return a + '/' + z + "/" + y + "/" + x+'.png';
					
// 					if(x>413429 || x<412193){
// 						x=412193
// 					}
// 					if(y>216148 || y<213878){
// 						y=216145
// 					}
// 					if(z!=19){
// 						z=19;
// 					}
					
// 					console.log('X:'+x+"===="+"y:"+y+'====z:'+z)
// 					return `./satellite/${z}/${x}/${y}.jpg`
// 					// return "http://www.dzmap.cn/OneMapServer/rest/services/vector_service/MapServer/tile/" + z + "/" + y + "/" + x;
// 				}
// 		})
// 	  })
// 	],
// 	view: new View({
// 	  // center: [116, 39],
// 	  // extent: [102, 29, 104, 31], //限制地图显示的区域[minX, minY, maxX, maxY]
// 	  // 设置成都为地图中心
// 	  center: [116,39],
// 	  projection:'EPSG:4326',
// 	  zoom: 19,// 设置默认缩放级别
// 	   // 限制地图缩放最大级别为14，最小级别为10
// 	  minZoom: 19,
// 	  maxZoom: 19
// 	})
// });


// function fitToChengdu() {
// 	console.log('fitToChengdu')
//   // 让地图最大化完全地显示区域[104, 30.6, 104.12, 30.74]
//   map.getView().fit([104, 30.6, 104.12, 30.74], map.getSize());
// }
// ————————————————版权声明：本文为CSDN博主「不睡觉的怪叔叔」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。原文链接：https://blog.csdn.net/qq_35732147/article/details/94973411
// var layers = [
//   new TileLayer({
//     source: new TileWMS({
//       url: 'https://ahocevar.com/geoserver/wms',
//       params: {
//         'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
//         'TILED': true
//       }
//     })
//   })
// ];
// console.log(layers);
// var map = new Map({
//   controls: defaultControls().extend([
//     new ScaleLine({
//       units: 'degrees'
//     })
//   ]),
//   layers: layers,
//   target: 'map',
//   view: new View({
//     projection: 'EPSG:4326',
//     center: [0, 0],
//     zoom: 2
//   })
// });

// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';


//  localStorage.setItem('path',JSON.stringify('/Users/gaoxingkai/Desktop/satellite'));
// var map = new Map({
//   view: new View({
//     center: [39, 116],
// 	projection:'EPSG:4326',
//     zoom: 1
//   }),
//   layers: [
//     new TileLayer({
//       source: new XYZ({
// 		  tileUrlFunction: function (tileCoord, pixelRatio, proj) {
// 				var z = tileCoord[0] + 11;
// 				var x = tileCoord[1];
// 				var y = -tileCoord[2] - 1;
// 				// let a = JSON.parse(localStorage.getItem('path'));
// 				// return a + '/' + z + "/" + y + "/" + x+'.png';
// 				return "http://www.dzmap.cn/OneMapServer/rest/services/vector_service/MapServer/tile/" + z + "/" + y + "/" + x;
// 			}
// 	  })
//     })
//   ],
//   target: 'map'
// });
// console.log(map)