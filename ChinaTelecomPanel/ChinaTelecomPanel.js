// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: mobile-alt;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;
// 
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
        this.name = '中国电信面板'
        this.desc = '一个展示电信话费、流量的小插件'
        this.config = {
            canvSize: 100,
            canvRadius: 100,
            canvWidth: 5, // circle thickness
            canvTextSize: 40,
            dayRadiusOffset: 60,

            line1: {
                circleIcon: 'network',
                circleUrlIcon: null,
                label: "话费余额",
                unit: "元",
            },
            line2: {
                circleIcon: 'waveform.path.badge.minus',
                circleUrlIcon: null,
                label: "通用流量",
                unit: "M",
            }

        }
        this.configLight = {
            backgroundColor: new Color('#fff'),
            textColor: new Color('#000'),
            line1: {
                fgCircleColor: new Color('#dddef3'),
                percentColor: new Color('#000'),
                circleColor: new Color('#1a7bf3'),
                iconColor: new Color('#1a7bf3'),
                textColor: new Color('#000'),
            },
            line2: {
                fgCircleColor: new Color('#dddef3'),
                percentColor: new Color('#000'),
                circleColor: new Color('#1a7bf3'),
                iconColor: new Color('#1a7bf3'),
                textColor: new Color('#000'),
            }
        }
        this.configDark = {
            backgroundColor: new Color('#1c1c1e'),
            textColor: new Color('#eaeaea'),
            line1: {
                fgCircleColor: new Color('#fff'),
                percentColor: new Color('#eaeaea'),
                circleColor: new Color('#1a7bf3'),
                iconColor: new Color('#1a7bf3'),
                textColor: new Color('#eaeaea'),
            },
            line2: {
                fgCircleColor: new Color('#fff'),
                percentColor: new Color('#eaeaea'),
                circleColor: new Color('#1a7bf3'),
                iconColor: new Color('#1a7bf3'),
                textColor: new Color('#eaeaea'),
            }
        }

        this.registerAction('地址设置', this.actionSetting.bind(this))
        this.registerAction('外观设置', this.themeSetting.bind(this))
    }

    /**
     * 渲染函数，函数名固定
     * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
     */
    async render() {
        const data = await this.getData()
        switch (this.widgetFamily) {
            case 'large':
                return await this.renderLarge(data)
            case 'medium':
                return await this.renderMedium(data)
            default:
                return await this.renderSmall(data)
        }
    }

    /**
     * 渲染小尺寸组件
     */
    async renderSmall(data) {

        var config = this.configLight
        if (await this.isUsingDark()) {
            config = this.configDark
        }

        let w = new ListWidget()
        w.backgroundColor = config.backgroundColor

        let balance = w.addStack()
        await this.renderLine(balance, data.totalRatio, data.balance, this.config.line1.unit, this.config.line1, config.line1)

        let r2 = w.addStack()
        await this.renderLine(r2, data.generalRatio, data.generalRemainder, data.generalUnit, this.config.line2, config.line2)

        const stackDescFooter = w.addStack();
        stackDescFooter.centerAlignContent();

        stackDescFooter.addSpacer();
        const count = stackDescFooter.addText(`更新时间：${data.createTime}`)
        count.font = Font.lightSystemFont(10)
        count.textColor = config.textColor
        stackDescFooter.addSpacer();

        return w
    }

    /**
     * 渲染中尺寸组件
     */
    async renderMedium(data, num = 3) {
        let w = new ListWidget()
        w.addText("待开发")
        return w
    }

    /**
     * 渲染大尺寸组件
     */
    async renderLarge(data) {
        return await this.renderMedium(data, 10)
    }

    /**
     * 获取数据函数，函数名可不固定
     */
    async getData() {

        var data = {
            "code": 200,
            "data": {
                "username": "",
                "use": 0,
                "total": 0,
                "generalUse": 0,
                "generalTotal": 0,
                "specialUse": 0,
                "specialTotal": 0,
                "balance": 0,
                "voiceUsage": 0,
                "voiceAmount": 0,
                "createTime": "0000-00-00 00:00:00"
            }
        }

        const settings = this.getSettings()
        const api = settings["url"] || ""
        if (api !== "") {
            data = await this.httpGet(api, true, false)
        }

        var d = data.data

        let balance = (d.balance / 100).toFixed(2)
        let totalRatio = (d.total - d.use) / d.total * 100
        totalRatio = (totalRatio | 0)
        let generalRatio = (d.generalTotal - d.generalUse) / d.generalTotal * 100
        generalRatio = (generalRatio | 0)
        let generalRemainder = d.generalTotal - d.generalUse
        let generalUnit = 'KB'
        if (generalRemainder > 1048576) {
            generalRemainder = generalRemainder / 1024 / 1024
            generalUnit = "GB"
        } else if (generalRemainder > 1024) {
            generalRemainder = generalRemainder / 1024
            generalUnit = "MB"
        }

        let getDataTime = new Date(d.createTime.replace(/-/g, '/'))

        let month = (getDataTime.getMonth() | 0)
        let day = (getDataTime.getDay() | 0)
        let hours = (getDataTime.getHours() | 0)
        let minutes = (getDataTime.getMinutes() | 0)

        let createTime = hours + ":" + (minutes.toString().length > 1 ? minutes : '0' + minutes)
        let newDate = new Date()
        if (newDate.getDay() !== day || newDate.getMonth() !== month) {
            createTime = (month.toString().length > 1 ? month : '0' + month) + '/' + (day.toString().length > 1 ? day : '0' + day) + ' ' + createTime
        }
        return {
            balance: balance,
            totalRatio: (totalRatio).toFixed(0),
            generalRatio: (generalRatio).toFixed(0),
            generalRemainder: (generalRemainder).toFixed(2),
            generalUnit: generalUnit,
            createTime: createTime
        }
    }

    /**
     * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
     * @param {string} url 打开的链接
     */
    async actionOpenUrl(url) {
        Safari.openInApp(url, false)
    }

    async renderLine(stack, ratio, value, unit, configLine, configTheme) {
        const stackCircle = stack.addStack();
        const canvas = await this.makeCanvas();
        stackCircle.size = new Size(70, 70);
        this.makeCircle(
            canvas,
            this.config.dayRadiusOffset,
            ratio * 3.6,
            configTheme
        );
        this.drawText(ratio, canvas, 75, 18, configTheme);
        this.drawPointText(`%`, canvas, new Point(65, 50), 14, configTheme);
        stackCircle.backgroundImage = canvas.getImage();
        //
        stackCircle.setPadding(20, 0, 0, 0);
        stackCircle.addSpacer();

        const icon = configLine.circleUrlIcon
            ? {image: configLine.circleUrlIcon}
            : SFSymbol.named(configLine.circleIcon);
        const imageIcon = stackCircle.addImage(icon.image);

        imageIcon.tintColor = configTheme.iconColor;
        imageIcon.imageSize = new Size(15, 15);
        canvas.drawImageInRect(icon.image, new Rect(110, 80, 60, 60));
        stackCircle.addSpacer();

        stack.addSpacer(5);
        const stackDesc = stack.addStack();
        stackDesc.size = new Size(70, 60);
        stackDesc.centerAlignContent();
        stackDesc.layoutVertically();
        stackDesc.addSpacer(10);


        const label = stackDesc.addText(configLine.label)
        label.font = Font.mediumSystemFont(12)
        label.textColor = configTheme.textColor

        stackDesc.addSpacer(10);

        const stackDescFooter = stackDesc.addStack();
        stackDescFooter.centerAlignContent();


        const count = stackDescFooter.addText(`${value}`)
        count.font = Font.mediumSystemFont(16)
        count.textColor = configTheme.textColor
        stackDescFooter.addSpacer(2);


        const unitText = stackDescFooter.addText(`${unit}`)
        unitText.font = Font.mediumSystemFont(8)
        unitText.textColor = configTheme.textColor

        return stackCircle
    }

    async makeCanvas() {
        const canvas = new DrawContext();
        canvas.opaque = false;
        canvas.respectScreenScale = true;
        canvas.size = new Size(this.config.canvSize, this.config.canvSize);
        return canvas;
    }

    makeCircle(canvas, radiusOffset, degree, configTheme) {
        let ctr = new Point(this.config.canvSize / 2, this.config.canvSize / 2);
        // Outer circle
        const bgx = ctr.x - (this.config.canvRadius - radiusOffset);
        const bgy = ctr.y - (this.config.canvRadius - radiusOffset);
        const bgd = 2 * (this.config.canvRadius - radiusOffset);
        const bgr = new Rect(bgx, bgy, bgd, bgd);
        canvas.setStrokeColor(configTheme.fgCircleColor);
        canvas.setLineWidth(2);
        canvas.strokeEllipse(bgr);
        // Inner circle
        canvas.setFillColor(configTheme.circleColor);
        for (let t = 0; t < degree; t++) {
            const rect_x =
                ctr.x +
                (this.config.canvRadius - radiusOffset) * this.sinDeg(t) -
                this.config.canvWidth / 2;
            const rect_y =
                ctr.y -
                (this.config.canvRadius - radiusOffset) * this.cosDeg(t) -
                this.config.canvWidth / 2;
            const rect_r = new Rect(rect_x, rect_y, this.config.canvWidth, this.config.canvWidth);
            canvas.fillEllipse(rect_r);
        }
        return canvas
    }

    sinDeg(deg) {
        return Math.sin((deg * Math.PI) / 180);
    }

    cosDeg(deg) {
        return Math.cos((deg * Math.PI) / 180);
    }

    drawText(txt, canvas, txtOffset, fontSize, configTheme) {
        const txtRect = new Rect(
            this.config.canvTextSize / 2 - 20,
            txtOffset - this.config.canvTextSize / 2,
            this.config.canvSize,
            this.config.canvTextSize,
        );
        canvas.setTextColor(configTheme.percentColor);
        canvas.setFont(Font.boldSystemFont(fontSize));
        canvas.setTextAlignedCenter();
        canvas.drawTextInRect(`${txt}`, txtRect);
    }

    drawPointText(txt, canvas, txtPoint, fontSize, configTheme) {
        canvas.setTextColor(configTheme.percentColor);
        canvas.setFont(Font.boldSystemFont(fontSize));
        canvas.drawText(txt, txtPoint);
    }

    async actionSetting() {
        const settings = this.getSettings()
        const arg = settings["url"] || ""
        let a = new Alert()
        a.title = "设置地址"
        a.message = "输入ChinaTelecomMonitor访问地址"
        a.addTextField("", arg)
        a.addAction("确认");
        await a.presentAlert();
        let result = a.textFieldValue(0);
        this.settings["url"] = String(result)
        this.saveSettings()
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


    // async isUsingDarkAppearance() {
    //     const wv = new WebView()
    //     let js ="(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)"
    //     let r = await wv.evaluateJavaScript(js)
    //     return r
    // }

}


await Running(Widget)