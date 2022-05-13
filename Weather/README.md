<p align="center">
  <a href="https://lambdaexpression.github.io/ScriptablesComponent/Weather/">
    <img width="150" src="https://lambdaexpression.github.io/ScriptablesComponent/Weather/weather_style_1.png">
  </a>
</p>

<h1 align="center">Weather</h1>

<div align="center">天气面板组件，使用 彩云天气api</div>
<br/>
<div align="center">
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/language-node-orange.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/platform-ios-green.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/support-light|dark-hotpink.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/version-v1.0.0-royalblue.svg" /></a>
  
  
</div>
<br/>

<br/>
<br/>

<p align="center">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/Weather/weather03.png">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/Weather/weather04.png">
</p>

# 近期完成上线

## 介绍

Weather 小组件是使用 彩云天气api 获取天气信息

## 安装


### 1.复制下面其中一份源的代码

**github国际源**

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(['Weather-Lambdaexpression.enc.js'].map(async js => {
  const REQ = new Request(`https://lambdaexpression.github.io/ScriptablesComponent/Weather/${encodeURIComponent(js)}`);
  const RES = await REQ.load();
  FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
}));
FILE_MGR.remove(module.filename);
Safari.open("scriptable:///open?scriptName="+encodeURIComponent('Weather-Lambdaexpression.enc'));
```

**gitee国内源**
```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(['Weather-Lambdaexpression.enc.js'].map(async js => {
  const REQ = new Request(`https://gitee.com/LambdaExpression/ScriptablesComponent/raw/main/Weather/${encodeURIComponent(js)}`);
  const RES = await REQ.load();
  FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
}));
FILE_MGR.remove(module.filename);
Safari.open("scriptable:///open?scriptName="+encodeURIComponent('Weather-Lambdaexpression.enc'));
```


## 设置

### 1.设置位置权限，“手机设置” -> “Scrptable” -> “位置” -> “使用App或小组件期间”
### 2.[获取彩云天气令牌](https://github.com/chiupam/tutorial/blob/master/caiyun/caiyun_api.md)
### 3.安装小组件，运行，点击“彩云天机token设置”，输入步骤二获取到的彩云天气令牌。点击预览测试
### 4.把小组件添加至桌面




