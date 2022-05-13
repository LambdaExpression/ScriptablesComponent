// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: sun;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;
// 
// name:Weather-Lambdaexpression.js
// https://github.com/LambdaExpression/Scriptables
// 

// 组件基础类
const RUNTIME_VERSION = 20201209

class Base {
  constructor (arg="") {
    this.arg = arg
    this._actions = {}
    this.init()
  }

  init (widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily
    // 系统设置的key，这里分为三个类型：
    // 1. 全局
    // 2. 不同尺寸的小组件
    // 3. 不同尺寸+小组件自定义的参数
    // 当没有key2时，获取key1，没有key1获取全局key的设置
    // this.SETTING_KEY = this.md5(Script.name()+'@'+this.widgetFamily+"@"+this.arg)
    // this.SETTING_KEY1 = this.md5(Script.name()+'@'+this.widgetFamily)
    this.SETTING_KEY = this.md5(Script.name())
    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    this.FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local()
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY}.jpg`)
    // this.BACKGROUND_KEY1 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY1}.jpg`)
    // this.BACKGROUND_KEY2 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY2}.jpg`)
    // // 插件设置
    this.settings = this.getSettings()
  }

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  registerAction (name, func) {
    this._actions[name] = func.bind(this)
  }

  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl (name = '', data = '') {
    let u = URLScheme.forRunningScript()
    let q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(this.arg)}&__size=${this.widgetFamily}`
    let result = ''
    if (u.includes('run?')) {
      result = `${u}&${q}`
    } else {
      result = `${u}?${q}`
    }
    return result
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode (str) {
    const data = Data.fromString(str)
    return data.toBase64String()
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode (b64) {
    const data = Data.fromBase64String(b64)
    return data.toRawString()
  }

  /**
   * md5 加密字符串
   * @param {string} str 要加密成md5的数据
   */
  md5 (str) {
    function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((c=d(d(t,n),d(e,u)))<<(f=o)|c>>>32-f,r);var c,f}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function i(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=v(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=v(a,c,f,i,n[h+6],9,-1069501632),i=v(i,a,c,f,n[h+11],14,643717713),f=v(f,i,a,c,n[h],20,-373897302),c=v(c,f,i,a,n[h+5],5,-701558691),a=v(a,c,f,i,n[h+10],9,38016083),i=v(i,a,c,f,n[h+15],14,-660478335),f=v(f,i,a,c,n[h+4],20,-405537848),c=v(c,f,i,a,n[h+9],5,568446438),a=v(a,c,f,i,n[h+14],9,-1019803690),i=v(i,a,c,f,n[h+3],14,-187363961),f=v(f,i,a,c,n[h+8],20,1163531501),c=v(c,f,i,a,n[h+13],5,-1444681467),a=v(a,c,f,i,n[h+2],9,-51403784),i=v(i,a,c,f,n[h+7],14,1735328473),c=g(c,f=v(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=g(a,c,f,i,n[h+8],11,-2022574463),i=g(i,a,c,f,n[h+11],16,1839030562),f=g(f,i,a,c,n[h+14],23,-35309556),c=g(c,f,i,a,n[h+1],4,-1530992060),a=g(a,c,f,i,n[h+4],11,1272893353),i=g(i,a,c,f,n[h+7],16,-155497632),f=g(f,i,a,c,n[h+10],23,-1094730640),c=g(c,f,i,a,n[h+13],4,681279174),a=g(a,c,f,i,n[h],11,-358537222),i=g(i,a,c,f,n[h+3],16,-722521979),f=g(f,i,a,c,n[h+6],23,76029189),c=g(c,f,i,a,n[h+9],4,-640364487),a=g(a,c,f,i,n[h+12],11,-421815835),i=g(i,a,c,f,n[h+15],16,530742520),c=m(c,f=g(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function a(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function h(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return a(i(h(t=r(n)),8*t.length));var t}function u(n,t){return function(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,16<o.length&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}
    return t(str)
  }


  /**
   * HTTP 请求接口
   * @param {string} url 请求的url
   * @param {bool} json 返回数据是否为 json，默认 true
   * @param {bool} useCache 是否采用离线缓存（请求失败后获取上一次结果），
   * @return {string | json | null}
   */
  async httpGet (url, json = true, useCache = false) {
    let data = null
    const cacheKey = this.md5(url)
    if (useCache && Keychain.contains(cacheKey)) {
      let cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    try {
      let req = new Request(url)
      data = await (json ? req.loadJSON() : req.loadString())
    } catch (e) {}
    // 判断数据是否为空（加载失败）
    if (!data && Keychain.contains(cacheKey)) {
      // 判断是否有缓存
      let cache = Keychain.get(cacheKey)
      return json ? JSON.parse(cache) : cache
    }
    // 存储缓存
    Keychain.set(cacheKey, json ? JSON.stringify(data) : data)
    return data
  }

  async httpPost (url, data) {}

  /**
   * 获取远程图片内容
   * @param {string} url 图片地址
   * @param {bool} useCache 是否使用缓存（请求失败时获取本地缓存）
   */
  async getImageByUrl (url, useCache = true) {
    const cacheKey = this.md5(url)
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey)
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      return Image.fromFile(cacheFile)
    }
    try {
      const req = new Request(url)
      const img = await req.loadImage()
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img)
      return img
    } catch (e) {
      // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      let ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return await ctx.getImage()
    }
  }

  /**
   * base64 转 image，不需要带有""
   * @param base64
   * @returns {Promise<*>}
   */
  async base64ToImage(base64){
    if ( base64.indexOf(";base64,") >= 0 ) {
      let bs = base64.split(";base64,")
      base64 = bs[bs.length-1]
    }
    const d = Data.fromBase64String(base64)
    return  Image.fromData(d)
  }

  /**
   * 渲染标题内容
   * @param {object} widget 组件对象
   * @param {string} icon 图标地址
   * @param {string} title 标题内容
   * @param {bool|color} color 字体的颜色（自定义背景时使用，默认系统）
   */
  async renderHeader (widget, icon, title, color = false) {
    widget.addSpacer(10)
    let header = widget.addStack()
    header.centerAlignContent()
    let _icon = header.addImage(await this.getImageByUrl(icon))
    _icon.imageSize = new Size(14, 14)
    _icon.cornerRadius = 4
    header.addSpacer(10)
    let _title = header.addText(title)
    if (color) _title.textColor = color
    _title.textOpacity = 0.7
    _title.font = Font.boldSystemFont(12)
    widget.addSpacer(10)
    return widget
  }

  /**
   * 获取截图中的组件剪裁图
   * 可用作透明背景
   * 返回图片image对象
   * 代码改自：https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9
   * @param {string} title 开始处理前提示用户截图的信息，可选（适合用在组件自定义透明背景时提示）
   */
  async getWidgetScreenShot (title = null) {
    // Generate an alert with the provided array of options.
    async function generateAlert(message,options) {

      let alert = new Alert()
      alert.message = message

      for (const option of options) {
        alert.addAction(option)
      }

      let response = await alert.presentAlert()
      return response
    }

    // Crop an image into the specified rect.
    function cropImage(img,rect) {

      let draw = new DrawContext()
      draw.size = new Size(rect.width, rect.height)

      draw.drawImageAtPoint(img,new Point(-rect.x, -rect.y))
      return draw.getImage()
    }

    async function blurImage(img,style) {
      const blur = 150
      const js = `
var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=document.getElementById(id);var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}
      // https://gist.github.com/mjackson/5311256
    
      function rgbToHsl(r, g, b){
          r /= 255, g /= 255, b /= 255;
          var max = Math.max(r, g, b), min = Math.min(r, g, b);
          var h, s, l = (max + min) / 2;
    
          if(max == min){
              h = s = 0; // achromatic
          }else{
              var d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch(max){
                  case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                  case g: h = (b - r) / d + 2; break;
                  case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
          }
    
          return [h, s, l];
      }
    
      function hslToRgb(h, s, l){
          var r, g, b;
    
          if(s == 0){
              r = g = b = l; // achromatic
          }else{
              var hue2rgb = function hue2rgb(p, q, t){
                  if(t < 0) t += 1;
                  if(t > 1) t -= 1;
                  if(t < 1/6) return p + (q - p) * 6 * t;
                  if(t < 1/2) return q;
                  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                  return p;
              }
    
              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              var p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
          }
    
          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      }
      
      function lightBlur(hsl) {
      
        // Adjust the luminance.
        let lumCalc = 0.35 + (0.3 / hsl[2]);
        if (lumCalc < 1) { lumCalc = 1; }
        else if (lumCalc > 3.3) { lumCalc = 3.3; }
        const l = hsl[2] * lumCalc;
        
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * l;
        const s = hsl[1] * colorful * 1.5;
        
        return [hsl[0],s,l];
        
      }
      
      function darkBlur(hsl) {
    
        // Adjust the saturation. 
        const colorful = 2 * hsl[1] * hsl[2];
        const s = hsl[1] * (1 - hsl[2]) * 3;
        
        return [hsl[0],s,hsl[2]];
        
      }
    
      // Set up the canvas.
      const img = document.getElementById("blurImg");
      const canvas = document.getElementById("mainCanvas");
    
      const w = img.naturalWidth;
      const h = img.naturalHeight;
    
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w;
      canvas.height = h;
    
      const context = canvas.getContext("2d");
      context.clearRect( 0, 0, w, h );
      context.drawImage( img, 0, 0 );
      
      // Get the image data from the context.
      var imageData = context.getImageData(0,0,w,h);
      var pix = imageData.data;
      
      var isDark = "${style}" == "dark";
      var imageFunc = isDark ? darkBlur : lightBlur;
    
      for (let i=0; i < pix.length; i+=4) {
    
        // Convert to HSL.
        let hsl = rgbToHsl(pix[i],pix[i+1],pix[i+2]);
        
        // Apply the image function.
        hsl = imageFunc(hsl);
      
        // Convert back to RGB.
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
      
        // Put the values back into the data.
        pix[i] = rgb[0];
        pix[i+1] = rgb[1];
        pix[i+2] = rgb[2];
    
      }
    
      // Draw over the old image.
      context.putImageData(imageData,0,0);
    
      // Blur the image.
      stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});
      
      // Perform the additional processing for dark images.
      if (isDark) {
      
        // Draw the hard light box over it.
        context.globalCompositeOperation = "hard-light";
        context.fillStyle = "rgba(55,55,55,0.2)";
        context.fillRect(0, 0, w, h);
    
        // Draw the soft light box over it.
        context.globalCompositeOperation = "soft-light";
        context.fillStyle = "rgba(55,55,55,1)";
        context.fillRect(0, 0, w, h);
    
        // Draw the regular box over it.
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(55,55,55,0.4)";
        context.fillRect(0, 0, w, h);
      
      // Otherwise process light images.
      } else {
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(0, 0, w, h);
      }
    
      // Return a base64 representation.
      canvas.toDataURL(); 
      `

      // Convert the images and create the HTML.
      let blurImgData = Data.fromPNG(img).toBase64String()
      let html = `
      <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
      <canvas id="mainCanvas" />
      `

      // Make the web view and get its return value.
      let view = new WebView()
      await view.loadHTML(html)
      let returnValue = await view.evaluateJavaScript(js)

      // Remove the data type from the string and convert to data.
      let imageDataString = returnValue.slice(22)
      let imageData = Data.fromBase64String(imageDataString)

      // Convert to image and crop before returning.
      let imageFromData = Image.fromData(imageData)
      // return cropImage(imageFromData)
      return imageFromData
    }


    // Pixel sizes and positions for widgets on all supported phones.
    function phoneSizes() {
      let phones = {
        // 12 and 12 Pro
        "2532": {
          small:  474,
          medium: 1014,
          large:  1062,
          left:  78,
          right: 618,
          top:    231,
          middle: 819,
          bottom: 1407
        },

        // 11 Pro Max, XS Max
        "2688": {
          small:  507,
          medium: 1080,
          large:  1137,
          left:  81,
          right: 654,
          top:    228,
          middle: 858,
          bottom: 1488
        },

        // 11, XR
        "1792": {
          small:  338,
          medium: 720,
          large:  758,
          left:  54,
          right: 436,
          top:    160,
          middle: 580,
          bottom: 1000
        },


        // 11 Pro, XS, X
        "2436": {
          small:  465,
          medium: 987,
          large:  1035,
          left:  69,
          right: 591,
          top:    213,
          middle: 783,
          bottom: 1353
        },

        // Plus phones
        "2208": {
          small:  471,
          medium: 1044,
          large:  1071,
          left:  99,
          right: 672,
          top:    114,
          middle: 696,
          bottom: 1278
        },

        // SE2 and 6/6S/7/8
        "1334": {
          small:  296,
          medium: 642,
          large:  648,
          left:  54,
          right: 400,
          top:    60,
          middle: 412,
          bottom: 764
        },


        // SE1
        "1136": {
          small:  282,
          medium: 584,
          large:  622,
          left: 30,
          right: 332,
          top:  59,
          middle: 399,
          bottom: 399
        },

        // 11 and XR in Display Zoom mode
        "1624": {
          small: 310,
          medium: 658,
          large: 690,
          left: 46,
          right: 394,
          top: 142,
          middle: 522,
          bottom: 902
        },

        // Plus in Display Zoom mode
        "2001" : {
          small: 444,
          medium: 963,
          large: 972,
          left: 81,
          right: 600,
          top: 90,
          middle: 618,
          bottom: 1146
        }
      }
      return phones
    }

    var message
    message = title || "开始之前，请先前往桌面,截取空白界面的截图。然后回来继续"
    let exitOptions = ["我已截图","前去截图 >"]
    let shouldExit = await generateAlert(message,exitOptions)
    if (shouldExit) return

    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary()
    let height = img.size.height
    let phone = phoneSizes()[height]
    if (!phone) {
      message = "好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论"
      let _id = await generateAlert(message,["帮助", "取消"])
      if (_id===0) Safari.openInApp('https://support.qq.com/products/287371', false)
      return
    }

    // Prompt for widget size and position.
    message = "截图中要设置透明背景组件的尺寸类型是？"
    let sizes = ["小尺寸","中尺寸","大尺寸"]
    let size = await generateAlert(message,sizes)
    let widgetSize = sizes[size]

    message = "要设置透明背景的小组件在哪个位置？"
    message += (height == 1136 ? " （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）" : "")

    // Determine image crop based on phone size.
    let crop = { w: "", h: "", x: "", y: "" }
    if (widgetSize == "小尺寸") {
      crop.w = phone.small
      crop.h = phone.small
      let positions = ["左上角","右上角","中间左","中间右","左下角","右下角"]
      let _posotions = ["Top left","Top right","Middle left","Middle right","Bottom left","Bottom right"]
      let position = await generateAlert(message,positions)

      // Convert the two words into two keys for the phone size dictionary.
      let keys = _posotions[position].toLowerCase().split(' ')
      crop.y = phone[keys[0]]
      crop.x = phone[keys[1]]

    } else if (widgetSize == "中尺寸") {
      crop.w = phone.medium
      crop.h = phone.small

      // Medium and large widgets have a fixed x-value.
      crop.x = phone.left
      let positions = ["顶部","中间","底部"]
      let _positions = ["Top","Middle","Bottom"]
      let position = await generateAlert(message,positions)
      let key = _positions[position].toLowerCase()
      crop.y = phone[key]

    } else if(widgetSize == "大尺寸") {
      crop.w = phone.medium
      crop.h = phone.large
      crop.x = phone.left
      let positions = ["顶部","底部"]
      let position = await generateAlert(message,positions)

      // Large widgets at the bottom have the "middle" y-value.
      crop.y = position ? phone.middle : phone.top
    }

    // 透明/模糊选项
    message = "需要给背景图片加什么显示效果？"
    let blurOptions = ["透明", "白色 模糊", "黑色 模糊"]
    let blurred = await generateAlert(message, blurOptions)

    // Crop image and finalize the widget.
    if (blurred) {
      const style = (blurred === 1) ? 'light' : 'dark'
      img = await blurImage(img, style)
    }
    let imgCrop = cropImage(img, new Rect(crop.x,crop.y,crop.w,crop.h))


    return imgCrop

  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify (title, body, url, opts = {}) {
    let n = new Notification()
    n = Object.assign(n, opts);
    n.title = title
    n.body = body
    if (url) n.openURL = url
    return await n.schedule()
  }


  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {float} opacity 透明度
   */
  async shadowImage (img, color = '#000000', opacity = 0.7) {
    let ctx = new DrawContext()
    // 获取图片的尺寸
    ctx.size = img.size

    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
    ctx.setFillColor(new Color(color, opacity))
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))

    let res = await ctx.getImage()
    return res
  }

  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json=true){
    let res=json?{}:""
    let cache=""
    // if (global && Keychain.contains(this.SETTING_KEY2)) {
    //   cache = Keychain.get(this.SETTING_KEY2)
    // } else if (Keychain.contains(this.SETTING_KEY)) {
    //   cache = Keychain.get(this.SETTING_KEY)
    // } else if (Keychain.contains(this.SETTING_KEY1)) {
    //   cache = Keychain.get(this.SETTING_KEY1)
    // } else if (Keychain.contains(this.SETTING_KEY2)){
    if (Keychain.contains(this.SETTING_KEY)) {
      cache= Keychain.get(this.SETTING_KEY)
    }
      if (json){
        try {
          res=JSON.parse(cache)
        } catch (e) {}
      }else{
        res=cache
      }

    return res
  }

  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify=true){
    let res= (typeof this.settings==="object")?JSON.stringify(this.settings):String(this.settings)
    Keychain.set(this.SETTING_KEY, res)
    if (notify) this.notify("设置成功","桌面组件稍后将自动刷新")
  }

  /**
   * 获取当前插件是否有自定义背景图片
   * @reutrn img | false
   */
  getBackgroundImage () {
    // 如果有KEY则优先加载，key>key1>key2
    // key2是全局
    let result = null
    if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
      result = Image.fromFile(this.BACKGROUND_KEY)
    // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
    //   result = Image.fromFile(this.BACKGROUND_KEY1)
    // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
    //   result = Image.fromFile(this.BACKGROUND_KEY2)
    }
    return result
  }

  /**
   * 设置当前组件的背景图片
   * @param {image} img
   */
  setBackgroundImage (img, notify = true) {
    if (!img) {
      // 移除背景
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY1)) {
      //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY1)
      // } else if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY2)) {
      //   this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY2)
      }
      if (notify) this.notify("移除成功", "小组件背景图片已移除，稍后刷新生效")
    } else {
      // 设置背景
      // 全部设置一遍，
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY1, img)
      // this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY2, img)
      if (notify) this.notify("设置成功", "小组件背景图片已设置！稍后刷新生效")
    }
  }


  async themeSetting() {
    let a = new Alert()
    const settings = this.getSettings()
    const theme = Number(settings["theme"] === null ? 2 : settings["theme"])
    a.title = "外观设置"
    a.message = "自动适应，现版本有一个官方bug，暂不推荐使用"
    a.addAction((theme === 0 ? '✅ ' : '') + "保持浅色")
    a.addAction((theme === 1 ? '✅ ' : '') + "保持深色")
    a.addAction((theme === 2 ? '✅ ' : '') + "自动适应")
    a.addAction((theme === 3 ? '✅ ' : '') + "自定义")
    a.addCancelAction("取消操作")
    let i = await a.presentSheet()
    let themeTime
    if (i === -1) return
    switch (i) {
      case 0:
        break;
      case 1:
        break
      case 2:
        break
      case 3:
        themeTime = await this.themeTimeSetting()
        break
      default:
        return
    }

    this.settings["theme"] = i
    if (themeTime !== null) {
      this.settings["themeTime"] = String(themeTime)
    }
    this.saveSettings()
  }

  async themeTimeSetting() {
    const settings = this.getSettings()
    const arg = settings["themeTime"] || "7:00-22:00"
    let a = new Alert()
    a.title = "自定义"
    a.message = "输入浅色开始时间到结束时间，例如：'7:00-22:00'"
    a.addTextField("7:00-22:00", arg)
    a.addAction("确认");
    await a.presentAlert();
    return a.textFieldValue(0);
  }

  async isUsingDark() {
    const settings = this.getSettings()
    const theme = Number(settings["theme"] === null ? 2 : settings["theme"])
    var flag
    switch (theme) {
      case 0:
        flag = false
        break
      case 1:
        flag = true
        break
      case 2:
        flag = await Device.isUsingDarkAppearance()
        break
      case 3:
        const themeTime = settings["themeTime"] || "7:00-22:00"
        let result = themeTime.trim().match(/^(\d{1,2}):(\d{1,2})-(\d{1,2}):(\d{1,2})$/)
        if (result === null) {
          console.log("外观设置-自适应 输入(" + themeTime + ")格式有误，无法解析。启动自动适应模式")
          flag = await Device.isUsingDarkAppearance()
          break
        }
        let date = new Date()
        let themeTimeStartHours = Number(result[1])
        let themeTimeStartMinutes = Number(result[2])
        let themeTimeEndHours = Number(result[3])
        let themeTimeEndMinutes = Number(result[4])

        if (themeTimeStartHours < themeTimeEndHours || (themeTimeStartHours === themeTimeEndHours && themeTimeStartMinutes < themeTimeEndMinutes)) {
          flag = !((date.getHours() > themeTimeStartHours || (date.getHours() === themeTimeStartHours && date.getMinutes() > themeTimeStartMinutes))
              && (date.getHours() < themeTimeEndHours || (date.getHours() === themeTimeEndHours && date.getMinutes() < themeTimeEndMinutes)))
        } else {
          flag = (date.getHours() < themeTimeStartHours || (date.getHours() === themeTimeStartHours && date.getMinutes() < themeTimeStartMinutes))
              && (date.getHours() > themeTimeEndHours || (date.getHours() === themeTimeEndHours && date.getMinutes() > themeTimeEndMinutes))
        }
        break
      default:
        flag = await Device.isUsingDarkAppearance()
        break
    }
    return flag
  }

}
// @base.end
// 运行环境
// @running.start
const Running = async (Widget, default_args = "") => {
  let M = null
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else {
    let { act, data, __arg, __size } = args.queryParameters
    M = new Widget(__arg || default_args || '')
    if (__size) M.init(__size)
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions']
      const _actions = [
        // async () => {
        //   Safari.openInApp("https://support.qq.com/products/287371", false)
        // }
        // 预览组件
        async (debug = false) => {
          let a = new Alert()
          a.title = "预览组件"
          a.message = "测试桌面组件在各种尺寸下的显示效果"
          a.addAction("小尺寸 Small")
          a.addAction("中尺寸 Medium")
          a.addAction("大尺寸 Large")
          a.addAction("全部 All")
          a.addCancelAction("取消操作")
          const funcs = []
          if (debug) {
            for (let _ in actions) {
              a.addAction(_)
              funcs.push(actions[_].bind(M))
            }
            a.addDestructiveAction("停止调试")
          }
          let i = await a.presentSheet()
          if (i === -1) return
          let w
          switch (i) {
            case 0:
              M.widgetFamily = 'small'
              w = await M.render()
              await w.presentSmall()
              break;
            case 1:
              M.widgetFamily = 'medium'
              w = await M.render()
              await w.presentMedium()
              break
            case 2:
              M.widgetFamily = 'large'
              w = await M.render()
              await w.presentLarge()
              break
            case 3:
              M.widgetFamily = 'small'
              w = await M.render()
              await w.presentSmall()
              M.widgetFamily = 'medium'
              w = await M.render()
              await w.presentMedium()
              M.widgetFamily = 'large'
              w = await M.render()
              await w.presentLarge()
              break
            default:
              const func = funcs[i - 4];
              if (func) await func();
              break;
          }

          return i
        },
      ]
      const alert = new Alert()
      alert.title = M.name
      alert.message = M.desc
      // alert.addAction("反馈交流")
      alert.addAction("预览组件")

      for (let _ in actions) {
        alert.addAction(_)
        _actions.push(actions[_])
      }
      alert.addCancelAction("取消操作")
      const idx = await alert.presentSheet()
      if (_actions[idx]) {
        const func = _actions[idx]
        await func()
      }
      return
    }
    let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
    let _act = `action${_tmp}`
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M)
      await func(data)
    }
  }
}


class Widget extends Base {
    /**
     * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
     * @param {string} arg 自定义参数
     */
    constructor(arg) {
        super(arg)
        this.name = '天气预报'
        this.desc = '使用彩云天气api'


        this.general = {
            weatherSmallWidth: 36,
            weatherMediumWidth: 32,
            headerLocationSize: 16,
            headerTitleSize: 12,
            headerTipSize: 10,
            bodyHeight: 60,
            bodyBigHeight: 200,
            bodyMarginTop: 0,
            bodyMarginDown: 10,
            bodyMarginLeft: 0,
            bodyMarginRight: 0,
            lineWidth: 2,
            lineVerticalWidth: 4,
            weatherIconWidth: 22,
            bodyTextSize: 10,
            bodyTextWidth: 12,
            bodyTextHeight: 12,
            footerTemperatureSize: 10,
            footerTimeSize: 10,
            bodyAdditionalHeight: 30,
            lineProgressWidth: 4,


            temperature1: -100,
            temperature2: 0,
            temperature3: 10,
            temperature4: 20,
            temperature5: 27,
            temperature6: 100,
        }

        this.config = {}
        this.configLight = {
            light: 1,
            lineColor1_2: new Color('#95c0f5'),
            lineColor2_3: new Color('#116fe3'),
            lineColor3_4: new Color('#50a3ec'),
            lineColor4_5: new Color('#44d067'),
            lineColor5_6: new Color('#ec6f50'),
            backgroundColor: new Color('#fff'),
            locationColor: new Color('#1a7bf3'),
            weatherTitleColor: new Color('#505050'),
            weatherIconColor: new Color('#000'),
            bodyTextColor: new Color('#505050'),
            bodyTotalProgressColor: new Color('#e0e0e0'),
            bodyUltravioletProgressColor: {
                1: new Color('#83d266'),
                2: new Color('#bed266'),
                3: new Color('#d2d066'),
                4: new Color('#f5e66a'),
                5: new Color('#f5d76a'),
                6: new Color('#f5b66a'),
                7: new Color('#f59b6a'),
                8: new Color('#f58a6a'),
                9: new Color('#f57f6a'),
                10: new Color('#f56a6a'),
                11: new Color('#d06af5'),
            },
            bodyHumidityColor: new Color('#4a9bf3'),
        }

        this.configDark = {
            light: 0,
            lineColor1_2: new Color('#95c0f5'),
            lineColor2_3: new Color('#116fe3'),
            lineColor3_4: new Color('#50a3ec'),
            lineColor4_5: new Color('#44d067'),
            lineColor5_6: new Color('#ec6f50'),
            backgroundColor: new Color('#1c1c1e'),
            locationColor: new Color('#5199f5'),
            weatherTitleColor: new Color('#e3e3e3'),
            weatherIconColor: new Color('#fff'),
            bodyTextColor: new Color('#e3e3e3'),
            bodyTotalProgressColor: new Color('#3e3e3e'),
            bodyUltravioletProgressColor: {
                1: new Color('#83d266'),
                2: new Color('#bed266'),
                3: new Color('#d2d066'),
                4: new Color('#f5e66a'),
                5: new Color('#f5d76a'),
                6: new Color('#f5b66a'),
                7: new Color('#f59b6a'),
                8: new Color('#f58a6a'),
                9: new Color('#f57f6a'),
                10: new Color('#f56a6a'),
                11: new Color('#d06af5'),
            },
            bodyHumidityColor: new Color('#4a9bf3'),
        }

        this.registerAction('彩云天气Token设置', this.actionSetting.bind(this))
        this.registerAction('外观设置', this.themeSetting.bind(this))
    }

    /**
     * 渲染函数，函数名固定
     * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
     */
    async render() {
        this.config = this.configLight
        if (await this.isUsingDark()) {
            this.config = this.configDark
        }

        const data = await this.getData()
        if (data.status !== "ok") {
            return await this.renderError(data.error)
        }

        switch (this.widgetFamily) {
            case 'large':
                return await this.renderLarge(data)
            case 'medium':
                return await this.renderMedium(data)
            default:
                return await this.renderSmall(data)
        }
    }

    async renderError(msg) {
        let w = new ListWidget()
        let errorMsg = w.addText(msg)
        errorMsg.textColor = new Color('#ff0000')
        return w
    }

    /**
     * 渲染小尺寸组件
     */
    async renderSmall(data, num = 4) {
        let w = new ListWidget()
        w.backgroundColor = this.config.backgroundColor
        await this.renderHeader(w, data.location, (await data.weather[0].value).title)
        await this.renderBody(w, data, this.general.weatherSmallWidth, num)
        await this.renderFooter(w, data)
        return w
    }


    /**
     * 渲染中尺寸组件
     */
    async renderMedium(data, num = 10) {
        let w = new ListWidget()
        w.backgroundColor = this.config.backgroundColor
        await this.renderHeader(w, data.location, (await data.weather[0].value).title, data.tip)
        await this.renderBody(w, data, this.general.weatherMediumWidth, num)
        await this.renderFooter(w, data)
        return w
    }

    /**
     * 渲染大尺寸组件
     */
    async renderLarge(data, num = 10) {
        this.general.bodyHeight = this.general.bodyBigHeight

        let w = new ListWidget()
        w.backgroundColor = this.config.backgroundColor
        await this.renderHeader(w, data.location, (await data.weather[0].value).title, data.tip)
        await this.renderBodyVertical(w, data, this.general.weatherMediumWidth, num)
        await this.renderFooter(w, data)
        await this.renderAdditional(w, data, this.general.weatherMediumWidth, num)
        return w
    }

    /**
     * 获取数据函数，函数名可不固定
     */
    async getData() {

        let settings = this.getSettings()
        // let location = await Location.current()
        let location = {
            altitude: 10.567941665649414,
            latitude: 22.3756334222171,
            longitude: 113.56428185976212,
            horizontalAccuracy: 35,
            verticalAccuracy: 23.64764976501465
        }

        let latitude = new String(location.latitude).toString()
        let longitude = new String(location.longitude).toString()

        let token = settings["token"] || ""

        if (token === "") {
            return {
                status: "failed",
                error: "'token is null'",
            }
        }

        let locat = ""
        let amapApi = "https://ditu.amap.com/service/regeo?longitude=" + longitude + "&latitude=" + latitude
        let amapData = await this.httpGet(amapApi, true, false) || {status: "0"}
        if (amapData.status === "1" && amapData.data !== null) {
            if (amapData.data.district !== null && amapData.data.district !== "") {
                locat = amapData.data.district
            } else if (amapData.data.city !== null && amapData.data.city !== "") {
                locat = amapData.data.city
            } else if (amapData.data.province !== null && amapData.data.province !== "") {
                locat = amapData.data.province
            } else if (amapData.data.country !== null && amapData.data.country !== "") {
                locat = amapData.data.country
            }
        }

        let weather = []
        let weatherApi = "https://api.caiyunapp.com/v2.5/" + token + "/" + longitude + "," + latitude + "/daily.json?dailysteps=10"
        let weatherData = await this.httpGet(weatherApi, true, false) || {status: "error", error: "request errors"}

        if (
            weatherData.status === "ok"
            && weatherData.result !== null
            && weatherData.result.daily !== null
            && weatherData.result.daily.status === "ok"
            && weatherData.result.daily.temperature !== null
            && weatherData.result.daily.skycon !== null
        ) {
            let temperatures = weatherData.result.daily.temperature
            let skycons = weatherData.result.daily.skycon
            for (let i = 0; i < skycons.length; i++) {
                let day = temperatures[i].date.split("-")[2].split("T")[0] || ''
                weather[i] = {
                    day: i === 0 ? "now" : day,
                    value: await this.skyconType(skycons[i].value) || {},
                    avgTemperature: Math.round(temperatures[i].avg) || '',
                    minTemperature: Math.round(temperatures[i].min) || '',
                    maxTemperature: Math.round(temperatures[i].max) || '',
                }
            }
        } else {
            return {
                status: "failed",
                error: weatherData.error || 'param error',
            }
        }

        // 体感温度
        let apparentTemperature
        // 地面气压
        let pressure
        // 地表 2 米湿度相对湿度(%)
        let humidity
        // 地表 10 米风速, 地表 10 米风向
        let wind = {direction: "", speed: 0}
        // 紫外线
        let ultraviolet = {index: 0, maxIndex: 0, desc: ""}
        // 舒适度指数
        let comfort = {index: 0, maxIndex: 0, desc: ""}
        // 空气质量
        let aqi
        let weatherRealtimeApi = "https://api.caiyunapp.com/v2.5/" + token + "/" + longitude + "," + latitude + "/realtime.json"
        let weatherRealtimeData = await this.httpGet(weatherRealtimeApi, true, false) || {
            status: "error",
            error: "request errors"
        }

        if (
            weatherRealtimeData.status === "ok"
            && weatherRealtimeData.result !== null
            && weatherRealtimeData.result.realtime !== null
            && weatherRealtimeData.result.realtime.temperature !== null
            && weatherRealtimeData.result.realtime.apparent_temperature !== null
        ) {
            apparentTemperature = weatherRealtimeData.result.realtime.apparent_temperature
            pressure = weatherRealtimeData.result.realtime.pressure
            humidity = weatherRealtimeData.result.realtime.humidity
            wind = {
                direction: weatherRealtimeData.result.realtime.wind.direction,
                speed: weatherRealtimeData.result.realtime.wind.speed,
            }
            ultraviolet = {
                index: weatherRealtimeData.result.realtime.life_index.ultraviolet.index,
                maxIndex: 11,
                desc: weatherRealtimeData.result.realtime.life_index.ultraviolet.desc
            }
            comfort = {
                index: weatherRealtimeData.result.realtime.life_index.comfort.index,
                maxIndex: 11,
                desc: weatherRealtimeData.result.realtime.life_index.comfort.desc
            }
            aqi = weatherRealtimeData.result.realtime.air_quality.description.usa
            weather[0].avgTemperature = weatherRealtimeData.result.realtime.temperature
            weather[0].value = await this.skyconType(weatherRealtimeData.result.realtime.skycon) || {}
        }
        weather[0].maxTemperature = 28
        weather[0].avgTemperature = 28
        let tip = ""
        if (this.widgetFamily === 'large' || this.widgetFamily === 'medium') {

            let weatherMinutelyApi = "https://api.caiyunapp.com/v2.5/" + token + "/" + longitude + "," + latitude + "/minutely.json"
            let weatherMinutelyData = await this.httpGet(weatherMinutelyApi, true, false) || {
                status: "error",
                error: "request errors"
            }

            if (
                weatherMinutelyData.status === "ok"
                && weatherMinutelyData.result !== null
                && weatherMinutelyData.result.forecast_keypoint !== null
            ) {
                tip = weatherMinutelyData.result.forecast_keypoint
            }

        }

        let date = new Date()
        let hours = new String(date.getHours()).toString()
        hours = hours.length < 2 ? "0" + hours : hours
        let minutes = new String(date.getMinutes()).toString()
        minutes = minutes.length < 2 ? "0" + minutes : minutes
        let time = hours + ":" + minutes
        return {
            status: "ok",
            location: locat,
            weather: weather,
            now: {
                apparentTemperature: apparentTemperature,  // 体感温度
                pressure: pressure,                        // 地面气压
                wind: wind,                                // 地表 10 米风速, 地表 10 米风向
                humidity: humidity,                        // 地表 2 米湿度相对湿度(%)
                ultraviolet: ultraviolet,                  // 紫外线
                comfort: comfort,                          // 舒适度指数
                aqi: aqi,                                  //空气质量
            },
            tip: tip,
            time: time,
        }
    }


    // 晴（白天）   CLEAR_DAY                sun.max.fill
    // 晴（夜间）   CLEAR_NIGHT              moon.stars.fill
    // 多云（白天） PARTLY_CLOUDY_DAY        cloud.sun.fill
    // 多云（夜间） PARTLY_CLOUDY_NIGHT      cloud.moon.fill
    // 阴          CLOUDY                   cloud.fill
    // 轻度雾霾    LIGHT_HAZE                line.3.horizontal
    // 中度雾霾    MODERATE_HAZE             line.3.horizontal
    // 重度雾霾    HEAVY_HAZE                line.3.horizontal
    // 小雨       LIGHT_RAIN                cloud.drizzle.fill
    // 中雨       MODERATE_RAIN             cloud.rain.fill
    // 大雨       HEAVY_RAIN                cloud.heavyrain.fill
    // 暴雨       STORM_RAIN                cloud.bolt.rain.fill
    // 雾         FOG                       cloud.fog.fill
    // 小雪       LIGHT_SNOW                cloud.snow.fill
    // 中雪       MODERATE_SNOW             cloud.snow.fill
    // 大雪       HEAVY_SNOW                cloud.snow.fill
    // 暴雪       STORM_SNOW                cloud.snow.fill
    // 浮尘       DUST                      aqi.low
    // 沙尘       SAND                      aqi.medium
    // 大风       WIND                      wind
    async skyconType(skycon) {
        switch (skycon) {
            case "CLEAR_DAY":
                let clearDayIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "晴",//白天
                    scale: 1,
                    light: clearDayIcon,
                    dark: clearDayIcon,
                }
            case "CLEAR_NIGHT":
                let clearNightIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "晴",//（夜间）
                    scale: 1,
                    light: clearNightIcon,
                    dark: clearNightIcon,
                }
            case "PARTLY_CLOUDY_DAY":
                let partlyCloudyDayIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "多云",//白天
                    scale: 1,
                    light: partlyCloudyDayIcon,
                    dark: partlyCloudyDayIcon
                }
            case "PARTLY_CLOUDY_NIGHT":
                let partlyCloudyNightIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "多云",//夜间
                    scale: 1,
                    light: partlyCloudyNightIcon,
                    dark: partlyCloudyNightIcon,
                }
            case "CLOUDY":
                let cloudyIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "阴",
                    icon: 'cloud.fill',
                    scale: 1,
                    light: cloudyIcon,
                    dark: cloudyIcon,
                }
            case "LIGHT_HAZE":
                let lightHazeIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "轻度雾霾",
                    scale: 1,
                    light: lightHazeIcon,
                    dark: lightHazeIcon,
                }
            case "MODERATE_HAZE":
                let moderateHazeIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "中度雾霾",
                    scale: 1,
                    light: moderateHazeIcon,
                    dark: moderateHazeIcon,
                }
            case "HEAVY_HAZE":
                let heavyHazeIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "重度雾霾",
                    scale: 1,
                    light: heavyHazeIcon,
                    dark: heavyHazeIcon,
                }
            case "LIGHT_RAIN":
                let lightRainIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "小雨",
                    scale: 1,
                    light: lightRainIcon,
                    dark: lightRainIcon,
                }
            case "MODERATE_RAIN":
                let moderateRainIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "中雨",
                    scale: 1,
                    light: moderateRainIcon,
                    dark: moderateRainIcon,
                }
            case "HEAVY_RAIN":
                let heavyRainIcon = await this.base64ToImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAMDklEQVR4Xu1df5BVZRl+3rsLk2giKjQ21RRSUzCK9y6CqOm9S2loKJXQ1CBOQHB2IUeYqMRgv2VQmMDA0N27mzoFOTpRMUojOhN7bkK6G7t3oQbIJLOhgQQTS2WJZe/bnI1l7m539/z4vnPuOfd+Z2b/Ou/7Ps/7fM9+59zz4zsEvZW1AlTW3evmoQ1Q5ibQBtAGKHMFyrx9PQNoA5S5AmXevp4BtAHKXIEyb1/PANoAZa5AmbevZwBtgDJXoMzb1zOANkDpKrCunUd2AVfFYriKGR/K75QI7zJwkhgnOYeT4lrKlK4Sg3dWcjOA6OBqADMAVINwtYtB7QKwk2LYQz14aVUVdbjIjWxoSRhAtPLFGIZlvQNPSCgZDUJzLIfmUjdC5A1Qn+X5ICxlxgQlAz+wCKG5AtiwMk6v+VK/yEUjawDRydeDsQrArX5rSIQ3GVgn4rTJb6yg60fSACLLBgjrwbgoYMF+A0KdiNPLAeP6Bhc5A4gsNwIwfFPErjDhPTAWiwRtsQuNwv5IGUBk+ecAZoVCWMJyEacNoeAiQSIyBgjV4J8TnAhz6uL0lIT+RU+NhAHCOPh5I3ezSNBLRR9JjwRCbwDRwcI68fLYXxBpb8eA6lUJ2h8EmGqMUBugvoO/xIRfqW5aeT2GKarIugIZuS20BnjwIF9x9jR2M3BlFFSlHFbUTaK1UeCazzG0BojA1D9wrE+dyWHc2dN478IRWMjAF/MCjjFjHxH+JBL0XJhMEkoDWP/93afRDuDDYRLLARfrBlKVTdxuAh6pS9AvHdTzPSSUBojgf7/7gSL8RMTpG+4T1WaE0wBZfhXAp9S2Gspqb4gEfaKYzEJnALGXk6iAWUxRAsbeKRJ0W8CY5+HCZ4BO/iEYS4slSFFwGYtEFTUXA7voBhB7eSwqMBaMsQDOgPBgBE/+5MaO8fpRxqebJ1G3XCH32YEboHeKjyEJws0Aku4pl2YGAXcV45dBYAaoz/LdDCwBMLk0h1C6q60iQXOlq7gs4LsB6jt4BsewBIxbXHIrq3AC/lKXoHFBN+2rAUSW5wF4Iuimooo3HBizIkEnguTvmwHqO7mOGSLIZiKP1YNU0O8n+GIA0ckv6infvR1LYgYQHbwehG+7b19nMPBwTzceWzOF/hqUGkpnANHOMxHD9qDIlzCO9ZraVlTg12IiHfezT2UGECZX4mK0KXszx8+uI1L73PuLm0WcHvCLsjoDdPB9IGz0i2iZ131SJGi+HxooMcBDh/iy7i60ReXpHT+EDKDm88O7MXfFFPqnSiwlBiiL+/cqVfdeq/0sY+6aKjrkvUT/TDUGyHKbvsSrakhs6jCeElU0RxWatAFWtvOUihhaVRHSdewVyDG+vLqKlPzakjaAKMf79/Zj5G8EYY+I02dVgMgboINbQZiigoyu4UIBxlJRJf+6urwByuf5PRej438oAUdGVOAzyyfS+zJoKgxgXakaLUNC53pTIFaB61ZNJOsE3PMmb4AO7gah0jMDnehdAcI3RZwe914A8p+Mqe/kfzPjgzIkdK5HBRiPiCq6z2N2b5r8DJDlvwH4mAwJnetNAQJ21SXoc96y/5clbYD6LO9jYKIMCZ3rWYHjIkH9FsB0W0naACLL1ksc+ulet8oriCfg/boESS2UJW+ATl4Axo8V9KNLuFdA+tUyeQO08kcwHEfcc9cZsgowsLc+QVKP2UsbwGpCdPIOcL/34WV70/nOFGgSCZJaMk+VAfRhwNmAqY3qwe3iWnpepqgSA/TOAln+LYCbZMjoXBcKMF4XVSS9fI4yA9R38ixmWAs56i0ABYgg6uJULwulzADnzgW2gzFTlpTOt1Xg6LAPYNID4+mYbaRNgFIDfL+dr6yM9a7tc4ksMZ0/hAKMelFFSt66UmoAi3Jk1vaLrsO2iQTNVkVfuQF6DwXhX91TlX5B15G+8DOQsC8GOPerYBKAZ8tutQ//LPGWSJDy5y58M0CvCfbzGOpBAwNf8U+Xsqi8WyTIl5/Yvhqgb2jO/US0VgfxpYkStsBR6z6LqhO+QjoFYoA+YGHdOLI++KBXC7Hz7J/BeHrYBWhS8VNvKLBADZBnhI8jh5kg3EnAKAZGEWFUOT5ZZN3SZeCE9UfAK+jB9iAXiSiKAezsr/cHp4A2QHBahxJJGyCUwxIcKW2A4LQOJZI2QCiHJThS2gDBaR1KJG2AUA5LcKS0AYLTOpRI2gChHJbgSBXFAMlGFpkaNQ80eJGq3PHzNQvcAMlGThLBpBxua6mlnV4GUCanD58ZqUwNWQsyBroVG39gs4EbIJU+/ypZG3fhC5ml9E6QI5CHnzENSgWJbWEVG7+oBrCmXur/HeDNpkH3BjUIA/GZUR/koajY+IV0DmwG6Jv6Cjjw6y0GPe23CQbDD+pQUGz8wfQNzAB5U19/LozDDHw+U0Nv+GmCQfGBQA4FxcYvqgGSTVxHQ3w8goCftRh0t18GsMP3+1BQbPyhdPV9Bhhs6vu/QwGhtmURNao2gVN8vw4Fxca309N3Awwx9Q3k9jaAatOg/Xak3ex3ge/LoaDY+HZa+WqAVAMvRww/sCORt3+LadA9LuKHDHWNn8N3zFpaXyr4TvrwzQDJx3kcncXvAIxxQqQvhoHpGYNecJNTKNYj/nGuxA2ZBXQ46vhO+ftmgFSamwAsdEokL+4F06DpHvL6pUjgN5sGLYo6vlP+vhiguoGncwwyCxfcYxq0xWkTA+Nk8WUvUxcb341uvhggleZd1gmdGyIDYrNv/gNTDwo646WGAvwW06BpXrCtnGLju+Gt3ADVaf4WAz9yQ6JQLAHLWwza4LaOQvx7WwzaHDV8t3yVGuDGBh41LAbrZ9xH3RIpEP/37hyu3lNLJ53WSm7kS+gC/EER/pHuHCZGCd+pTvlxSg2QTPNdBGzzQqRQDgOzMgb9wmm9VDPfgVzvG8lKtqjhe2laqQFSjZwGQfoM+nwjjCazxvkyaKk0PwxgmRchCuZEDN9L36oN8BoI6j6Bzjhs1tAnnTaWSvMBAOOdxtvGRQzftp8CAcoMkGzmayiHTi8khsrhGOKZhbTPru60NI/PAZYBlG5RwffatDIDVDfy95iw1iuRwfKIcX9LDa2zq5tKszX1W4cApVtU8L02rcwALm56uOXq6CZNueO7FbUvXpkBCjzu5ZVTvzwCNrUYtNSuWHWaNzIg9fWMQTAaTIMW2+H71T+AtaZBK+zwve5XZoDqJr6FGS96JTJoHmO+WUNP2tVNNfI8EJ6wi/Owf7FpUINdnm/953CnWUvP2eF73a/MANMe5ctylXjLK5EhDHCjWUPWXcUht1Qj3wDCHrs4t/udPijiV/9nh2PM7nl0wi1vp/HKDGABJtP8MgFTnYI7iWPC6MwisjVWsokvJ4ZyodwMgOr+rSVjWgy63olOXmNUG2AOAVu9khmYx8CajEErndZLpnkjKTwPYGBTxsH5Rx+/ZJqV9g/gdtOQWw7eTjulBrDAUk38LBh32AE72N9mGnSdg7h+Iak0HwVwhdu8AvHHqBJTWxaQ9VU0x5uq/v1+ULWvIeUG6DVBmtmxYoMEXkS4cMciOuW2TnWTomXrGd81a8jN42znqaro3zTIl7EZqKcvIMnH+BqqgPU1MS+rhr/DPUhlFttf/RvMHNVp3sGQ+oRN9vJLMXXbbG/PI0j2f4oYqZYa+r1b83uJ98UAfURSab4fwEMuiK0wDVJyNTGV5rkAfuoCuzeUgfToS7Fk22zqcZs7MN5t/8x4JlNDX5PFdZPvqwF6DwfNfCt6sAqECQBGFiD3LzAOoAKrzYWk9DrCTY0cryBscrJELQF/zAGr3dx+diK0g/6tl2MPcAyPZhbSM05qqozx3QD5ZK0bNkyYkMthQiyGA8Q4sMuggyobGlirqolHjGR8NQdMJsD6xFrifAyjlQmtBHR257DDzcMfXjjn9w/GPgIOmbX0qpdaqnICNYAq0jJ1ZjTxiHdzmPyfLrS9soy6ZGqVQm7ZGaAUBk1lD9oAKtWMYC1tgAgOmkrK2gAq1YxgLW2ACA6aSsraACrVjGAtbYAIDppKytoAKtWMYC1tgAgOmkrK2gAq1YxgLW2ACA6aSsraACrVjGAtbYAIDppKyv8Fs5olvQhsRigAAAAASUVORK5CYII=")
                return {
                    skycon: skycon,
                    title: "大雨",
                    scale: 1,
                    light: heavyRainIcon,
                    dark: heavyRainIcon,
                }
            case "STORM_RAIN":
                let stormRainIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "暴雨",
                    scale: 1,
                    light: stormRainIcon,
                    dark: stormRainIcon,
                }
            case "FOG":
                let fogIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "雾",
                    scale: 1,
                    light: fogIcon,
                    dark: fogIcon,
                }
            case "LIGHT_SNOW":
                let lightSnowIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "小雪",
                    scale: 1,
                    light: lightSnowIcon,
                    dark: lightSnowIcon,
                }
            case "MODERATE_SNOW":
                let moderateSnowIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "中雪",
                    scale: 1,
                    light: moderateSnowIcon,
                    dark: moderateSnowIcon,
                }
            case "HEAVY_SNOW":
                let heavySnowIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "大雪",
                    scale: 1,
                    light: heavySnowIcon,
                    dark: heavySnowIcon,
                }
            case "STORM_SNOW":
                let stormSnowIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "暴雪",
                    scale: 1,
                    light: stormSnowIcon,
                    dark: stormSnowIcon,
                }
            case "DUST":
                let dustIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "浮尘",
                    scale: 1,
                    light: dustIcon,
                    dark: dustIcon,
                }
            case "SAND":
                let sandIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "沙尘",
                    scale: 1,
                    light: sandIcon,
                    dark: sandIcon,
                }
            case "WIND":
                let windIcon = await this.base64ToImage("data:image/png;base64,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")
                return {
                    skycon: skycon,
                    title: "大风",
                    scale: 1,
                    light: windIcon,
                    dark: windIcon,
                }
            default:
                return {}
        }
    }

    async renderHeader(widget, location, weatherTitle, tip) {
        let locationStack = widget.addStack()
        locationStack.centerAlignContent()
        let _location = locationStack.addText(location)
        _location.textColor = this.config.locationColor
        _location.font = Font.boldSystemFont(this.general.headerLocationSize)

        widget.addSpacer(2)
        let weatherStack = widget.addStack()
        weatherStack.centerAlignContent()
        let _weather = weatherStack.addText(weatherTitle)
        _weather.textColor = this.config.weatherTitleColor
        _weather.font = Font.boldSystemFont(this.general.headerTitleSize)

        if (tip !== undefined && tip !== null && tip !== "") {
            weatherStack.addSpacer()
            let _weather_tip = weatherStack.addText(tip)
            _weather_tip.rightAlignText()
            _weather_tip.textColor = this.config.weatherTitleColor
            _weather_tip.font = Font.boldSystemFont(this.general.headerTipSize)
        }


    }

    async renderBody(widget, data, weathersWidth, num) {
        let weathers = data.weather

        widget.addSpacer()
        let bodyStack = widget.addStack()

        let canvasWidth = weathersWidth * (num - 1) + this.general.bodyMarginLeft + this.general.bodyMarginRight
            + (this.general.bodyTextWidth > this.general.weatherIconWidth ? this.general.bodyTextWidth : this.general.weatherIconWidth)
        let canvasHeight = this.general.bodyHeight + this.general.bodyMarginTop + this.general.bodyMarginDown

        let canvas = new DrawContext();
        canvas.opaque = false;
        canvas.respectScreenScale = true;
        canvas.size = new Size(canvasWidth, canvasHeight);

        let minTemperature = weathers[0].avgTemperature
        let maxTemperature = weathers[0].avgTemperature
        for (let i = 1; i < weathers.length && i < num; i++) {
            if (minTemperature > weathers[i].avgTemperature) {
                minTemperature = weathers[i].avgTemperature
            }
            if (maxTemperature < weathers[i].avgTemperature) {
                maxTemperature = weathers[i].avgTemperature
            }
        }
        for (let i = 0; i < weathers.length && i < (num - 1); i++) {
            let x1 = i * weathersWidth
            let y1 = await this.calcYHeight(weathers[i].avgTemperature, minTemperature, maxTemperature)
            let x2 = (i + 1) * weathersWidth
            let y2 = await this.calcYHeight(weathers[i + 1].avgTemperature, minTemperature, maxTemperature)
            let colorType
            if (weathers[i + 1].avgTemperature > this.general.temperature5) {
                colorType = this.config.lineColor5_6
            } else if (weathers[i + 1].avgTemperature > this.general.temperature4) {
                colorType = this.config.lineColor4_5
            } else if (weathers[i + 1].avgTemperature > this.general.temperature3) {
                colorType = this.config.lineColor3_4
            } else if (weathers[i + 1].avgTemperature > this.general.temperature2) {
                colorType = this.config.lineColor2_3
            } else {
                colorType = this.config.lineColor1_2
            }
            await this.drawLine(canvas, x1, y1, x2, y2, colorType)
        }
        for (let i = 0; i < weathers.length && i < num; i++) {
            let x = i * weathersWidth

            let dwY = await this.calcYHeight(weathers[i].avgTemperature, minTemperature, maxTemperature)
            await this.drawWeather(canvas, weathers[i].value, x, dwY)

            let weatherIconHeight = await this.scaleHeight(1, this.general.weatherIconWidth)
            let dtY = dwY - weatherIconHeight / 2 - this.general.bodyTextHeight / 2
            // await this.drawText(canvas, weathers[i].value.title, x, dtY1)
            await this.drawText(canvas, new String(weathers[i].avgTemperature).toString() + "°", x, dtY)

            let dtY2 = this.general.bodyMarginTop + this.general.bodyHeight + this.general.bodyTextHeight / 2
            await this.drawText(canvas, weathers[i].day, x, dtY2)
        }

        bodyStack.backgroundImage = canvas.getImage();
        // bodyStack.backgroundColor = this.config.weatherTitleColor
        bodyStack.size = canvas.size;
        // bodyStack.setPadding(20, 0, 0, 0);
        widget.addSpacer()

    }

    async renderFooter(widget, data) {
        let weatherStack = widget.addStack()
        let _weather = weatherStack.addText("体感温度: " + new String(data.now.apparentTemperature).toString() + "°")
        _weather.textColor = this.config.weatherTitleColor
        _weather.font = Font.boldSystemFont(this.general.footerTemperatureSize)

        weatherStack.addSpacer()
        let _weather_tip = weatherStack.addText(data.time)
        _weather_tip.rightAlignText()
        _weather_tip.textColor = this.config.weatherTitleColor
        _weather_tip.font = Font.boldSystemFont(this.general.footerTimeSize)
    }

    async renderBodyVertical(widget, data, weathersWidth, num) {
        this.general.lineWidth = this.general.lineVerticalWidth

        let weathers = data.weather

        widget.addSpacer()
        let bodyStack = widget.addStack()

        let weatherIconHeight = await this.scaleHeight(1, this.general.weatherIconWidth)

        let canvasWidth = weathersWidth * (num - 1) + this.general.bodyMarginLeft + this.general.bodyMarginRight
            + (this.general.bodyTextWidth > this.general.weatherIconWidth ? this.general.bodyTextWidth : this.general.weatherIconWidth)
        let canvasHeight = this.general.bodyHeight + this.general.bodyMarginTop + this.general.bodyMarginDown

        let canvas = new DrawContext();
        canvas.opaque = false;
        canvas.respectScreenScale = true;
        canvas.size = new Size(canvasWidth, canvasHeight);

        let minTemperature = weathers[0].minTemperature
        let maxTemperature = weathers[0].maxTemperature
        for (let i = 1; i < weathers.length && i < num; i++) {
            if (minTemperature > weathers[i].minTemperature) {
                minTemperature = weathers[i].minTemperature
            }
            if (minTemperature > weathers[i].maxTemperature) {
                minTemperature = weathers[i].maxTemperature
            }
            if (maxTemperature < weathers[i].minTemperature) {
                maxTemperature = weathers[i].minTemperature
            }
            if (maxTemperature < weathers[i].maxTemperature) {
                maxTemperature = weathers[i].maxTemperature
            }
        }
        for (let i = 0; i < weathers.length && i < num; i++) {
            let x = i * weathersWidth

            await this.drawVertical(canvas, this.general.temperature1, this.general.temperature2, weathers[i].minTemperature, weathers[i].maxTemperature, minTemperature, maxTemperature, x, this.config.lineColor1_2)
            await this.drawVertical(canvas, this.general.temperature2, this.general.temperature3, weathers[i].minTemperature, weathers[i].maxTemperature, minTemperature, maxTemperature, x, this.config.lineColor2_3)
            await this.drawVertical(canvas, this.general.temperature3, this.general.temperature4, weathers[i].minTemperature, weathers[i].maxTemperature, minTemperature, maxTemperature, x, this.config.lineColor3_4)
            await this.drawVertical(canvas, this.general.temperature4, this.general.temperature5, weathers[i].minTemperature, weathers[i].maxTemperature, minTemperature, maxTemperature, x, this.config.lineColor4_5)
            await this.drawVertical(canvas, this.general.temperature5, this.general.temperature6, weathers[i].minTemperature, weathers[i].maxTemperature, minTemperature, maxTemperature, x, this.config.lineColor5_6)

            let dwY = await this.calcYHeight(weathers[i].avgTemperature, minTemperature, maxTemperature, 1)
            await this.drawWeather(canvas, weathers[i].value, x, dwY)

            let dtYMin = await this.calcYHeight(weathers[i].minTemperature, minTemperature, maxTemperature, 1) + this.general.bodyTextHeight / 2
            if ((dwY + weatherIconHeight / 2) >= dtYMin) {
                dtYMin += weatherIconHeight / 2
            }
            await this.drawText(canvas, new String(weathers[i].minTemperature).toString() + "°", x, dtYMin)
            let dtYMax = await this.calcYHeight(weathers[i].maxTemperature, minTemperature, maxTemperature, 1) - this.general.bodyTextHeight / 2
            if ((dwY - weatherIconHeight / 2) <= dtYMax) {
                dtYMax -= weatherIconHeight / 2
            }
            await this.drawText(canvas, new String(weathers[i].maxTemperature).toString() + "°", x, dtYMax)

            let dtY2 = this.general.bodyMarginTop + this.general.bodyHeight + this.general.bodyTextHeight / 2
            await this.drawText(canvas, weathers[i].day, x, dtY2)
        }

        bodyStack.backgroundImage = canvas.getImage();
        // bodyStack.backgroundColor = this.config.weatherTitleColor
        bodyStack.size = canvas.size;
        // bodyStack.setPadding(20, 0, 0, 0);
        widget.addSpacer()

    }

    async renderAdditional(widget, data, weathersWidth, num) {
        widget.addSpacer()
        let bodyStack = widget.addStack()
        let now = data.now

        let canvasWidth = weathersWidth * (num - 1) + this.general.bodyMarginLeft + this.general.bodyMarginRight
            + (this.general.bodyTextWidth > this.general.weatherIconWidth ? this.general.bodyTextWidth : this.general.weatherIconWidth)
        let canvasHeight = this.general.bodyAdditionalHeight

        let canvas = new DrawContext();
        canvas.opaque = false;
        canvas.respectScreenScale = true;
        canvas.size = new Size(canvasWidth, canvasHeight);

        let descLenght = 3

        let ultravioletColor = this.config.bodyUltravioletProgressColor[String(now.ultraviolet.index)]
        await this.drawProgress(canvas, "紫外线指数:", now.ultraviolet.desc, descLenght, now.ultraviolet.index, now.ultraviolet.maxIndex, ultravioletColor, 0, 0, canvasWidth / 2, canvasHeight / 2)
        await this.drawProgress(canvas, "相对湿度值:", String(now.humidity) + "%", descLenght, now.humidity, 1, this.config.bodyHumidityColor, 0, 0 + canvasHeight / 2, canvasWidth / 2, canvasHeight / 2)

        let x2 = canvasWidth / 2 + 20
        let x3 = x2 + 5 * this.general.bodyTextWidth
        let y2 = 0 + canvasHeight / 2 / 2
        await this.drawText(canvas, "舒适度 ：", x2, y2, 1, false)
        await this.drawText(canvas, now.comfort.desc, x3, y2, 1, false)
        await this.drawText(canvas, "空气质量：", x2, y2 + canvasHeight / 2, 1, false)
        await this.drawText(canvas, now.aqi, x3, y2 + canvasHeight / 2, 1, false)


        bodyStack.backgroundImage = canvas.getImage();
        // bodyStack.backgroundColor = this.config.weatherTitleColor
        bodyStack.size = canvas.size;
        // bodyStack.setPadding(20, 0, 0, 0);
        widget.addSpacer()

    }

    async drawLine(canvas, x1, y1, x2, y2, lineColor, lineWidth = this.general.lineWidth, calcXY = true) {
        if (calcXY) {
            x1 = await this.calcX(x1)
            y1 = await this.calcY(y1)
            x2 = await this.calcX(x2)
            y2 = await this.calcY(y2)
        }

        const path = new Path()
        path.move(new Point(x1, y1))
        path.addLine(new Point(x2, y2))
        canvas.addPath(path)
        canvas.setStrokeColor(lineColor)
        canvas.setLineWidth(lineWidth)
        canvas.strokePath()
    }

    async drawEllipse(canvas, x, y, width, height, color, calcXY = true) {
        if (calcXY) {
            x = await this.calcX(x)
            y = await this.calcY(y)
        }

        canvas.setFillColor(color)
        canvas.fillEllipse(new Rect(x - width / 2, y - height / 2, width, height))
    }

    async drawWeather(canvas, circleIcon, x, y) {
        x = await this.calcX(x)
        y = await this.calcY(y)

        let weatherIconHeight = await this.scaleHeight(circleIcon.scale, this.general.weatherIconWidth)
        let image = await this.selectImage(circleIcon)

        if (image != null) {
            canvas.setFillColor(this.config.backgroundColor)
            canvas.fillEllipse(new Rect((x - this.general.weatherIconWidth / 2), (y - weatherIconHeight / 2), this.general.weatherIconWidth, weatherIconHeight))
            canvas.drawImageInRect(image, new Rect((x - this.general.weatherIconWidth / 2), (y - weatherIconHeight / 2), this.general.weatherIconWidth, weatherIconHeight));
        }
    }

    async drawText(canvas, text, x, y, textAligned = 2, calc = true) {
        if (calc) {
            y = await this.calcY(y)
        }
        y = (y - this.general.bodyTextHeight / 2)
        let width = text.length * this.general.bodyTextWidth
        canvas.setFont(Font.boldSystemFont(this.general.bodyTextSize))
        canvas.setTextColor(this.config.bodyTextColor)
        switch (textAligned) {
            case 1:
                canvas.setTextAlignedLeft()
                break
            case 2:
                canvas.setTextAlignedCenter()
                x = await this.calcX(x)
                x = x - width / 2
                break
            case 3:
                canvas.setTextAlignedRight()
                x = x - width
                break
            default:
                canvas.setTextAlignedCenter()
        }
        canvas.drawTextInRect(text, new Rect(x, y, width, this.general.bodyTextHeight))
    }

    async drawVertical(canvas, minScope, maxScope, weathersMinTemperature, weathersMaxTemperature, minTemperature, maxTemperature, x, color) {
        let lineInterval = await this.interval(minScope, maxScope, weathersMinTemperature, weathersMaxTemperature)
        if (lineInterval[0] === 1) {
            let y1 = await this.calcYHeight(lineInterval[1], minTemperature, maxTemperature, 1)
            if (lineInterval[1] === weathersMinTemperature) {
                y1 -= this.general.lineWidth / 2
                await this.drawEllipse(canvas, x, y1, this.general.lineWidth, this.general.lineWidth, color)
            }
            let y2 = await this.calcYHeight(lineInterval[2], minTemperature, maxTemperature, 1)
            if (lineInterval[2] === weathersMaxTemperature) {
                y2 += this.general.lineWidth / 2
                await this.drawEllipse(canvas, x, y2, this.general.lineWidth, this.general.lineWidth, color)
            }
            await this.drawLine(canvas, x, y1, x, y2, color)
        }
    }

    async drawProgress(canvas, title, text, textLength, value, maxValue, progressColor, x, y, width, height) {
        if (progressColor == null) {
            progressColor = this.config.bodyTotalProgressColor
        }

        let titleY = y + height / 2 - this.general.bodyTextHeight / 2
        let titleWidth = title.length * this.general.bodyTextWidth
        canvas.setFont(Font.boldSystemFont(this.general.bodyTextSize))
        canvas.setTextColor(this.config.bodyTextColor)

        canvas.drawTextInRect(title, new Rect(x, titleY, titleWidth, this.general.bodyTextHeight))

        let textWidth = textLength * this.general.bodyTextWidth
        canvas.setFont(Font.boldSystemFont(this.general.bodyTextSize))
        canvas.setTextColor(this.config.bodyTextColor)
        canvas.drawTextInRect(text, new Rect(x + titleWidth, titleY, textWidth, this.general.bodyTextHeight))

        let x1 = x + titleWidth + textWidth + 10
        let y1 = y + height / 2
        let x2 = x + width
        let y2 = y + height / 2
        await this.drawEllipse(canvas, x1, y1, this.general.lineProgressWidth, this.general.lineProgressWidth, this.config.bodyTotalProgressColor, false)
        await this.drawLine(canvas, x1, y1, x2, y2, this.config.bodyTotalProgressColor, this.general.lineProgressWidth, false)
        await this.drawEllipse(canvas, x2, y2, this.general.lineProgressWidth, this.general.lineProgressWidth, this.config.bodyTotalProgressColor, false)

        let x3 = x1 + ((x2 - x1) / maxValue * value)
        await this.drawEllipse(canvas, x1, y1, this.general.lineProgressWidth, this.general.lineProgressWidth, progressColor, false)
        await this.drawLine(canvas, x1, y1, x3, y2, progressColor, this.general.lineProgressWidth, false)
        await this.drawEllipse(canvas, x3, y2, this.general.lineProgressWidth, this.general.lineProgressWidth, progressColor, false)
    }


    async calcX(x) {
        return (x + this.general.bodyMarginLeft
            + (this.general.bodyTextWidth > this.general.weatherIconWidth ? this.general.bodyTextWidth / 2 : this.general.weatherIconWidth / 2)
        )
    }

    async calcY(y) {
        return (y + this.general.bodyMarginTop)
    }

    async calcYHeight(value, min, max, isVertical = 0) {
        let weatherIconHeight = await this.scaleHeight(1, this.general.weatherIconWidth)
        let height = this.general.bodyHeight - this.general.bodyTextHeight - weatherIconHeight
        if (isVertical === 1) {
            height = height - weatherIconHeight / 2
        }
        let yHeight
        if (min !== max) {
            let heightScale = height / (max - min)
            yHeight = height - (value - min) * heightScale + this.general.bodyTextHeight + weatherIconHeight / 2
        } else {
            yHeight = height / 2 + this.general.bodyTextHeight + weatherIconHeight / 2
        }
        return yHeight
    }

    async scaleHeight(scale, width) {
        return scale * width
    }

    async interval(a1, a2, b1, b2) {
        if (b2 > a1 && a2 >= b1) {
            return [1, (a1 > b1 ? a1 : b1), (a2 < b2 ? a2 : b2)]
        }
        return [0]
    }

    async selectImage(skycon) {
        return this.config.light ? skycon.light : skycon.dark
    }


    async actionSetting() {
        const settings = this.getSettings()
        const arg = settings["token"] || ""
        let a = new Alert()
        a.title = "设置彩云天气Token"
        a.message = "设置彩云天气Token"
        a.addTextField("", arg)
        a.addAction("确认");
        await a.presentAlert();
        let result = a.textFieldValue(0);
        this.settings["token"] = String(result)
        this.saveSettings()
    }

}


await Running(Widget)