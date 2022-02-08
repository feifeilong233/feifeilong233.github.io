function data() {
//设置一个基准值K，所有星体的半径和公转半径均是改参数的倍数
//所有参数都与K关联，改变K可以很方便改变所有值
  var K = 5;
  return {
    //太阳
    sun: {
      name: '太阳',
      R: 10 * K, //天体半径
      URL: './贴图/太阳.jpg', //天体纹理路径
      color:0xE1950E, //光圈颜色
    },
    //普通行星
    planet: [{

      name: '水星',
      R: 2.5 * K,
      URL: './贴图/水星.jpg',
      revolutionR: 20 * K, //公转半径
      color:0x3D95DF, //光圈颜色
    }, {

      name: '金星',
      R: 3 * K,
      URL: './贴图/金星.jpg',
      revolutionR: 30 * K, //公转半径
      color:0xB56216, //光圈颜色
    }, {

      name: '地球',
      R: 3.2 * K,
      URL: './贴图/地球.jpg',
      revolutionR: 40 * K, //公转半径
      color:0x73A6DD, //光圈颜色
    }, {

      name: '火星',
      R: 2.5 * K,
      URL: './贴图/火星.jpg',
      revolutionR: 50 * K, //公转半径
      color:0xC78A31, //光圈颜色
    }, {

      name: '木星',
      R: 5 * K,
      URL: './贴图/木星.jpg',
      revolutionR: 60 * K, //公转半径
      color:0xB18F69, //光圈颜色
    }, {

      name: '土星',
      sphere: {
        R: 3.5 * K, //半径
        URL: './贴图/土星.jpg',
      },
      ring: {
        r: 4 * K, //内径
        R: 6 * K, //外径
        URL: './贴图/土星环.png',
      },
      revolutionR: 73 * K,
      color:0xC8A15C, //光圈颜色
    }, {

      name: '天王星',
      sphere: {
        R: 3.5 * K, //半径
        URL: './贴图/天王星.jpg',
      },
      ring: {
        r: 4 * K, //内径
        R: 6 * K, //外径
        URL: './贴图/天王星环.png',
      },
      revolutionR: 90 * K,
      color:0x5BB6FB, //光圈颜色
    }, {

      name: '海王星',
      R: 4 * K,
      URL: './贴图/海王星.jpg',
      revolutionR: 105 * K, //公转半径
      color:0x0073FC, //光圈颜色
    }, ],
    //环行星
    ringPlanet: [],
    //月球
    moon: {
      R: K,
      URL: 'tu.png',
      revolutionR: 10 * K,
      color:0xE0E0E0, //光圈颜色
    },
  };
}
