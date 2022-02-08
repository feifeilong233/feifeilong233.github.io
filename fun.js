//太阳和行星网格模型构建的逻辑是重复的，可以抽象为统一的函数
//所有的轨迹线全部是半径不同的圆弧线，也快成抽象为统一的函数，直接调用即可
//创建网格模型
function createMesh(geometry, URL) { //R半径,图片URL路径
  //Lambert
  var material = new THREE.MeshBasicMaterial({ //MeshLambertMaterial
    map: texLoader.load(URL),
    side: THREE.DoubleSide, //双面显示
    transparent:true, //开启透明
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}
//球体Mesh参数：半径R  图片文理
var geometry = new THREE.SphereGeometry(1, 100, 100); //共享的几何体对象,半径设置为1
function createSphereMesh(R, URL) { //R半径,图片URL路径
  var mesh = createMesh(geometry, URL);
  mesh.scale.set(R, R, R) //通过scale属性表达星球的大小
  return mesh;
}
//创建非环星体
function createPlanetMesh(R, URL,color) { //R半径,图片URL路径
  var group = new THREE.Group();
  var mesh = createSphereMesh(R, URL)
  group.add(mesh);
  //创建星球的精灵光圈
  var sprite = createSprite(R,color)
  group.add(sprite);
  return group;
}
//圆环Mesh参数：半径R  图片文理
function createRingMesh(r, R, URL) { //R半径,图片URL路径
  var geometry = new THREE.RingGeometry(r, R, 32); //圆环几何体
  return createMesh(geometry, URL);
}
//环星球Mesh
function createringPlanetMesh(sphere_R, sphere_URL, ring_r, ring_R, ring_URL,color) {
  let group = new THREE.Group();
  let spere = createSphereMesh(sphere_R, sphere_URL);
  let ring = createRingMesh(ring_r, ring_R, ring_URL);
  ring.rotateX(Math.PI/2); //调整星环姿态
  group.add(spere, ring)
  //创建环星球的精灵光圈
  //var sprite = createSprite(sphere_R,color)
  //group.add(sprite);
  //设置星环光圈
  var lightMesh = createLightMesh(ring_R,color)
  lightMesh.rotateX(Math.PI/2); //与星环在同一平面内
  lightMesh.position.y+=0.01
  group.add(lightMesh);
  return group;
}

//公转轨迹圆弧线
//创建一个半径为1的圆弧几何体，所有line共享同一个轨迹线
var arc = new THREE.ArcCurve(0, 0, 1, 0, 2 * Math.PI, true); //圆心  半径  起始角度
var points = arc.getPoints(50); //返回一个vector2对象作为元素组成的数组
var linegeometry = new THREE.Geometry();
linegeometry.setFromPoints(points);
//所有轨迹线共享同一个材质对象Material
var material = new THREE.LineBasicMaterial({
  color: 0x004444
});
function circle(r) {
  var line = new THREE.LineLoop(linegeometry, material);
  line.rotateX(Math.PI / 2);
  line.scale.set(r,r,r); //通过line的scale属性设置公转轨迹半径
  return line;
}


//所有星球材质共享的一个canvas纹理
//CanvasCir()函数返回一个canvas对象
var texture = new THREE.CanvasTexture(CanvasCir());
//创建精灵对象
function createSprite(R,color) {
  var spriteMaterial = new THREE.SpriteMaterial({
    color: color, //给canvas默认白色光圈设置特定颜色
    transparent: true, //注意开启透明,这样canvas画布的透明背景才会透明
    map: texture,
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  //缩放倍数比星球直径略大,在直径基础上缩放1.2倍
  sprite.scale.set(2*R*1.2+1.3, 2*R*1.2+1.3, 1); //只需要设置x、y两个分量就可以
  return sprite;
}
//通过矩形平面创建光圈
var lightgeometry = new THREE.PlaneGeometry(1,1);
function createLightMesh(R,color) {
  var material = new THREE.MeshBasicMaterial({ //MeshLambertMaterial
    color: color, //给canvas默认白色光圈设置特定颜色
    transparent: true, //注意开启透明,这样canvas画布的透明背景才会透明
    map: texture,
    side: THREE.DoubleSide, //双面显示
  }); //材质对象
  var mesh = new THREE.Mesh(lightgeometry, material); //网格模型对象
  //缩放倍数比星球直径略大,在直径基础上缩放1.2倍
  mesh.scale.set(2*R*1.2, 2*R*1.2, 1); //只需要设置x、y两个分量就可以
  return mesh;
}

//Canvas绘制一个白色光圈作为纹理贴图
function CanvasCir() {
  // 半径
  var R = 400
  var canvas = document.createElement('canvas');
  //document.body.appendChild(canvas)
  canvas.width = R;
  canvas.height = R;
  canvas.style.background = 'rgba(255, 0, 0, 0)'
  //获取canvas元素上下文
  var c = canvas.getContext('2d');
  //坐标原点居中
  c.translate(R / 2, R / 2);

  //线宽
  c.lineWidth = R / 10;
  //通过渐变色设置一个透明度渐变的光圈
  var grd = c.createRadialGradient(0, 0, R/2-c.lineWidth, 0, 0, R / 2);
  grd.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  grd.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  //径向渐变
  c.strokeStyle = grd;
  //c.strokeStyle = '#00ffff';
  c.arc(0, 0, (R-c.lineWidth)/2, 0, Math.PI * 2, true);
  c.stroke();
  return canvas;
}
