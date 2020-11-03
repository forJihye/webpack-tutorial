## Webpack
------
### 1. webpack(웹팩) 이란?
* 자바스크립트 정적 모듈 번들러 (Static Module Bundler)
* 웹팩에서의 모든 것은 모듈이다. 상호 의존성이 있는 모듈들을 사용해 그 모듈들과 같은 역활은 하는 정적 에셋들을 생성한다,
* 웹팩이 실행된다면 Dependencies Graph를 통해 필요한 형태의 하나 또는 여러개 Bundler로 생성한다.
#### 1-1. Module(모듈) 이란?
* 프로그램을 구성하는 구성 요소의 일부
* 관련된 데이터와 함수들이 묶여서 모듈을 형성하고 파일 단위로 나뉘는 것이 일반적이다
#### 1-2. Bundler(번들러) 이란?
* 번들러는 지정한 단위로 파일들을 하나로 만들어서 요청에 대한 응답으로 전달할 수 있는 환경을 만들어주는 역할을 한다.
* 번들러를 사용하면 소스 코드를 모듈별로 작성할 수 있고 모듈간 또는 외부 라이브러리의 의존성도 쉽게 관리할 수 있다.
#### 1-3. Module Bundler(모듈 번들러) 이란?
여러개의 나누어져있는 파일들을 하나의 파일로 만들어주는 라이브러리이다.     
모듈 번들러 라이브러리는 webpack, parcel등이 있다.     

여러개의 자바스크립트 파일을 하나의 파일로 묶어서 한 번에 요청을 통해 가지고 올 수 있게 하고,     
최신 자바스크립트 문법을 브라우저에서 사용할 수 있게 해준다.     
또한, 코드들을 압축하고 최적화 할 수 있기 때문에 로딩 속도를 높일 수 있다.     
수많은 파일이 하나의 파일로 묶인다면 초기 로딩 속도가 느려질 수 있지만 이를 해결하기 위해 청크, 캐시, 코드 스플릿 개념들을     
도입하면서 문제를 해결하고 있다. 

### 2. webpack 주요 4가지 개념
#### 2-1. Entry
* dependency graph를 만들기 위해 필요한 `Input Source`입니다.
* 직/간접적으로 의존성을 가진 모듈들을 이해합니다.
* 여러개의 entry가 존재할 수 있습니다.
* 엔트리를 통해서 필요한 모듈을 로딩하고 하나의 파일로 묶는다.
* Default value : `./src/index.js`
#### 2-2. Output 
* Webpack이 생성한 bundles의 결과물의 위치를 지정할 수 있습니다.
* Default value : ./dist/main.js
#### 2-3. Loader 
* Webpack은 오직 Javascript와 Json만 이해할 수 있는 단점이 있습니다.
* Loader는 다른 Type의 파일(img, font, stylesheet 등)을 Webpack이 이해하고 처리가능한 모듈로 변환시키는 작업을 담당합니다.
#### 2-4. Plugin
* Loader가 파일단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다.
* Loader가 변환하는 동안 플러그인은 bundle optimization, asset management and injection of environment과 같은 일을 진행할 수 있다.

### 3. webpack 설치
1. package.json 설치
```
npm init -y
```
2. webpack 설치
```
npm i webpack webpack-cli --save-dev
```
3. 라이브러리 설치
```
npm install -save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin css-loader html-loader file-loader url-loader html-webpack-plugin mini-css-extract-plugin node-sass react react-dom sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-dev-middleware
```
4. `webpack.config.js` 파일 생성
```js
const path = require('path')

module.exports = {
  mode: 'development', // webpack 빌드 옵션 1. development = 빠르게 빌드, 2. production = 최적화 빌드, 3. none 
  entry: './src/index.js', // webpack이 빌드할 파일 경로
  output: { // 빌드 후 명시되어있는 정보를 통해 빌드파일 생성
    filename: '[name].bundle.js', // 파일명
    path: path.resolve(__dirname, 'dist') // 저장될 디렉터리
  }
}
```
5. `package.json` 내용수정
```json
... 
"script" : {
  "bulid": "webpack
}
``` 
### 4. webpack loader, plugin으로 다른 파일 빌드
loader 로더 사용법
```js
module : {
  rules: {
    test: '가지고올 파일 정규식',
    use: [
        {
            loader: '사용할 로더 이름',
            options: { 사용할 로더 옵션 }
        }
    ]
  }
}
```

#### 4-1 HTML 빌드

* HTML 빌드 `./public/index.htm` 파일 생성

* HTML 빌드 `webpack.config.js` 수정
HtmlWebPackPlugin 은 웹팩이 html 파일을 읽어서 html 파일을 빌드할 수 있게 해준다
```js
...
module: {
  rules: [
    {
      test: /\.html$/,
      use: ['html-loader']
    }
  ]
},
plugins: [
  new HtmlWebpackPlugin({template: './public/index.htm'});
]
//minimize: ture || false 빌드된 파일 내용 한 줄 처리 옵션기능
optimization: {
  minimize: true
}
```

#### 4-2 React 빌드

* `./src/main.js` 수정
```js
import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

ReactDOM.render(<Root />, document.getElementById("root"));
```

* `./src/root.js` 생성
```js
import React from 'react';
const Root = () => <div>Hello React<div>
export default Root;
```

* `./.babelrc 생성` babel 설정 
바벨은 자바스크립트 ES6 -> ES5 변환해주는 역활
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```
`regeneratorRuntime is not defined` 에러 발생 시 `@babel/plugin-transform-runtime` 플러그인 추가 (async/await)
* `webpack.config.js` 수정
```js
...
{
  test: /\.(js|jsx)$/,
  exclude: "/node_modules",
  use: ['babel-loader'],
},
```

#### 4-3 CSS 빌드
* `./src/style.css` 파일 생성

* `./src/main.js`에 `style.css` import 적용

*  `./webpack.config.js` 수정
```js
{
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'sass-loader'
  ]
}
plugins: [
  new MiniCssExtractPlugin({
    filename: 'assets/[name].css',
    chunkFilename: 'assets/[id].css',
  })
]
```
### 4-4 File 빌드
* `./webpack.config.js` 수정
```js
{
  test: /\.(png|jpg|gif|svg)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 0, // [value]kb 미만 파일만 data-url로 처리
        name: 'assets/[hash].[ext]' // 파일명 형식
      }
    }
  ]
}
```

### 5. clean-webpack-plugin 적용
빌드 될 때 마다 clean-webpack-plugin 을 통해 안쓰는 파일들을 삭제
* `./webpack.config.js` 수정
```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
plugins: [
  new CleanWebpackPlugin()
],
```

### 6. webpack build mode
* development: 빠른 빌드를 위해 최적화 X
* production: 빌드 시 최적화

### 7. webpack-dev-server 
실시간 리로드 기능을 갖춘 개발 서버
* 디스크에 저장되지 않는 메모리 컴파일을 사용하기 때문에 컴파일 속도가 빨라김
* webpack.config.js 에도 devServer옵션을 통해 지정하여 사용가능
```
npm install -D (--save-dev 약자) webpack-dev-server
```
* `webpack.config.js` 수정
```js
devServer: {
  contentBase: path.join(__dirname, 'src'), // 콘텐츠를 제공할 경로지정 (정적파일을 제공하려는 경우에만 필요)
  compress: true, //모든 항목에 대해 gzip압축 사용
  hot: true, //webpack의 HMR 기능 활성화
  host: 'localhost',
  port: 8080 //접속 포트 설정,
  noInfo: true,
  inline: true
},
```
* `package.json` 명령어 추가
```js
{
  "scripts": {
    "start": "webpack-dev-server --open"
  }
}
```
`npm run start` 실행 시 아래와 같은 에러 발생시
webpack 과 webpack-dev-server 버전이 서로간 충돌로 인해서 버전을 맞춰주면된다.
>Error: Cannot find module 'webpack-cli/bin/config-yargs'

### 8. inline-source-map
예를들어 a.js, b.js, c.js 세가지 파일을 bundle.js 하나의 파일로 번들링 했을 때, a.js 파일에서 에러가 발생시
에러는 단지 bundle.js 파일에 에러가 발생되었다고 말하기 때문에 정확히 어디서 에러가 났는지 확인하지 못합니다.
쉽게 에러를 트래킹하기 위해서 inline-source-map를 사용해야합니다.
```js
// webpack.config.js
{
  ...,
  devtool: 'inline-source-map'
  // devtool: isDev ? 'inline-source-map' : false,
}
```

### 9. webpack-dev-middleware, webpack-hot-middleware
`HMR (Hot Modules Rendering)` 목표     
webpack-dev-middleware는 웹팩으로 빌드한 정적파일을 처리하는 익스프레스 스타일 미들웨어이다.
웹팩 패키지가 제공하는 함수를 실행하면 Compiler 타입의 인스턴스를 반환해준다,
웹팩 설정 객체를 함수 인자로 전달하는데 보통은 설정 파일 `webpack.config.js`에 있는 코드를 가져다 사용한다.

[webpack-hot-middleware 참고](https://github.com/webpack-contrib/webpack-hot-middleware),
[webpack-dev-middleware 참고](https://webpack.js.org/guides/development/#using-webpack-dev-middleware),
[webpack-dev-middleware github](https://github.com/webpack/webpack-dev-middleware)

* 라이브러리 설치
```
npm install --save-dev express webpack-hot-middleware webpack-dev-middleware --save
```
```js
// server.js
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const express= require('express');
const app = express();

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: 'minimal',
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.listen(3000, function () {
  console.log('http://localhost:3000');
});
```

* `./webpack/entry.js` 파일 생성
```js
require('../src/main.js');

if(module.hot) {
  module.hot.accept(); // This will make current module replaceable
}
```

* `./webpack.config.js` entry 경로 수정
```js
{
  entry: isDev ? ['webpack-hot-middleware/client', './webpack/entry.js'] : './webpack/entry.js',
  output: {
    path: pathResolve('dist'),
    filename: isDev ? '[name].js' : 'dist.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
}
```

* `package.json` 명령어 추가
```js
{
  "scripts": {
    "server": "node server.js"
  }
}
```

* 모드 설정 시 (development, production)
```js
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack",
    "start": "cross-env NODE_ENV=development node server"
  }
}
```

* CSS Build HMR 옵션 설정       
링크 참고 [mini-css-extract-plugin HMR](https://github.com/webpack-contrib/mini-css-extract-plugin#hot-module-reloading-hmr)
```js
{
  test: /\.(sa|sc|c)ss$/,
  use: [
    process.env.NODE_ENV === 'development' ? 'style-loader'
    : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/',
      }
    },
    'css-loader',
    'sass-loader'
  ]
}
```
개발 모드에서 `.scss` import시 에러 발생     
[이슈 참고](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/288)
```
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ReferenceError: document is not defined
```
해결하기 위해 MiniCssExtractPlugin 플러그인 모드 구분해서 사용

### 10. webpack 옵션
1. `resolve`
import 파일 경로 설정

2. `new OptimizeCSSAssetsPlugin()` CSS min 압축파일 만들기 

### 11. 참고
```js
if(module.hot) {
  let prevTimeoutIndex = -1;
  let prevIntervalIndex = -1;
  let prevRAFIndex = -1;
  module.hot.accept((err) => { // 모듈의 의존사항이 갱신 될 때 호출 (업데이트)
    console.log('err', err);
  });

  // 현재 모듈이 무효화되어 HMR 업데이트가 적용될 때이를 폐기하고 다시 생성
  module.hot.dispose(data => {
    console.log(module.hot.status());
    const tIdx = setTimeout(() => {});
    for (let i = prevTimeoutIndex; i < tIdx; i++) clearTimeout(i);
    prevTimeoutIndex = tIdx;

    const iIdx = setInterval(() => {});
    for (let i = prevIntervalIndex; i < iIdx; i++) clearInterval(i);
    prevIntervalIndex = iIdx;

    const rIdx = requestAnimationFrame(() => {});
    for (let i = prevRAFIndex; i < rIdx; i++) cancelAnimationFrame(i);
    prevRAFIndex = rIdx;
  });
}
```

`setTimeout(() => {})` 를 콘솔로 찍어봤을 때, 숫자가 나오는데 그 숫자의 의미는 해당 브라우저에서 setTimeout 함수 사용 횟수이다.
`setTimeout` 를 해제하기 위해 `clearTimeout` 함수를 이용하는데 사용법은 다음과 같다
```js
const timeout = setTimeout(() => console.log('hi'), 1000);
clearTimeouf(timeout);
```
이렇게 clearTimeout를 사용하는데 함수 인자값은 `setTimeout`를 담고 있는 변수 즉 숫자인건데, 그 숫자는 해당 `setTimeout` 함수의 `key` 값 인것이다. 
`...setInterval, requestAnimationFrame` 도 만찬가지

위 코드가 하는 기능은 HMR 모듈이 다시 생성될 때 수정 전에 사용되었던 `setTimeout, setInterval, requestAnimationFrame` 함수를 모두 멈추고 다시 실행되로록 해준다. (함수들이 겹치지 않기위해)

-----
### jsconfig.json
```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```
