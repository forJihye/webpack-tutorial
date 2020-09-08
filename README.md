## Webpack
------
![webpack](./image/webpack.png)
### 1. webpack(웹팩) 이란?
* 자바스크립트 정적 모듈 번들러 (Static Module Bundler)
* 웹팩에서의 모든 것은 모듈이다. 상호 의존성이 있는 모듈을을 사용해 그 모듈들과 같은 역활은 하는 정적 에셋들을 생성한다,
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
npm install -save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader clean-webpack-plugin css-loader html-loader html-webpack-plugin mini-css-extract-plugin node-sass react react-dom sass-loader style-loader webpack webpack-cli webpack-dev-server webpack-dev-middleware
```
4. `webpack.config.js` 파일 생성
...
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
}
```

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

### 5. clean-webpack-plugin 적용
