<p align="center">
  <a href="https://github.com/LambdaExpression/GatewayAuth">
    <img width="150" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/logo.png">
  </a>
</p>

<h1 align="center">ChinaTelecomPanel</h1>

<div align="center">中国电信监控插件。配合 <a href="https://github.com/LambdaExpression/ChinaTelecomMonitor">ChinaTelecomMonitor</a> 使用可无须反复手动获取登录cookie</div>
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
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/IMG_3101.png">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/IMG_3102.png">
</p>

## 介绍

ChinaTelecomPanel 是一个用于展示电信话费和流量使用情况的插件。需要配合[ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor)共同使用。

[ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor)可以通过配置电信账号密码实现自动获取话费和流量，解决cookie有效期短的痛点


## 安装

### 1.复制下面代码

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(['ChinaTelecomPanel.js'].map(async js => {
  const REQ = new Request(`https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomMonitor/${encodeURIComponent(js)}`);
  const RES = await REQ.load();
  FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
}));
FILE_MGR.remove(module.filename);
Safari.open("scriptable:///open?scriptName="+encodeURIComponent('ChinaTelecomPanel'));
```

### 2.在手机打开 [Scriptable](scriptable:///add?scriptName=hello) ，点击 ➕，粘贴，运行 ▶️


## 设置

### 1.配置好 [ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor) ，获取项目远程访问地址 http://xxxxx:8080/show/flow

### 2.
