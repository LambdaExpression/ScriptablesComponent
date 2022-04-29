<p align="center">
  <a href="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/">
    <img width="150" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/logo.png">
  </a>
</p>

<h1 align="center">ChinaTelecomPanel</h1>

<div align="center">中国电信面板插件。配合 <a href="https://github.com/LambdaExpression/ChinaTelecomMonitor">ChinaTelecomMonitor</a> 使用可无须反复手动获取登录cookie</div>
<br/>
<div align="center">
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/language-node-orange.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/platform-ios-green.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/support-light|dark-hotpink.svg" /></a>
    <a href="javascript:void(0)"><img src="https://img.shields.io/badge/version-v1.0.1-royalblue.svg" /></a>
  
  
</div>
<br/>

<br/>
<br/>

<p align="center">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/IMG_3101.png">
  <img width="49%" src="https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/IMG_3102.png">
</p>

## 介绍

ChinaTelecomPanel 是一个用于展示电信话费和流量使用情况的插件。

需要配合 [ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor) 共同使用。 [ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor) 是一个可以通过配置电信账号密码实现自动获取话费和流量服务应用，可用于解决cookie有效期短的痛点

- 第一行的百分比是 (已使用通用流量+已使用专用流量)/(通用流量总额度+专用流量总额度)
- 第二行的百分比是 (已使用通用流量)/(通用流量总额度)
- 具体 通用流量 和 专用流量 概念可以在电信的手机app中查看


## 安装

### 1.复制下面代码

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(['ChinaTelecomPanel.js'].map(async js => {
  const REQ = new Request(`https://lambdaexpression.github.io/ScriptablesComponent/ChinaTelecomPanel/${encodeURIComponent(js)}`);
  const RES = await REQ.load();
  FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
}));
FILE_MGR.remove(module.filename);
Safari.open("scriptable:///open?scriptName="+encodeURIComponent('ChinaTelecomPanel'));
```

### 2.在手机打开 [Scriptable](scriptable:///add?scriptName=hello) ，点击 ➕，粘贴，运行 ▶️


## 设置

### 1.部署好 [ChinaTelecomMonitor](https://github.com/LambdaExpression/ChinaTelecomMonitor) ，获取项目远程访问地址 http://xxxxx/show/flow

### 2.点击执行小组件，选择“地址设置”，输入保存上面的远程访问地址

### 3.点击执行小组件，选择“预览组件”->“小尺寸 Small”。测试正常后，就可以愉快的添加至桌面了。

--------

[源码地址](https://github.com/LambdaExpression/Scriptables/blob/v2-dev/Scripts/ChinaTelecomPanel.js)
