<p align="center">
  <a href="https://github.com/LambdaExpression/GatewayAuth">
    <img width="150" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomMonitor/logo.png">
  </a>
</p>

<h1 align="center">ChinaTelecomMonitor</h1>

<div align="center">中国电信监控插件 </div>
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
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomMonitor/IMG_3101.png">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomMonitor/IMG_3102.png">
</p>

## 插件安装

### 1.复制下面代码

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(['ChinaTelecomMonitor.js'].map(async js => {
  const REQ = new Request(`https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomMonitor/${encodeURIComponent(js)}`);
  const RES = await REQ.load();
  FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
}));
FILE_MGR.remove(module.filename);
Safari.open("scriptable:///open?scriptName="+encodeURIComponent('ChinaTelecomMonitor'));
```

### 2.在手机打开 [Scriptable](scriptable:///add?scriptName=hello) ，点击 ➕，粘贴，运行 ▶️


