# 웹팩 및 vscode 유용 패키지

### VScode

- Live server
- ESLint
- Prettier
- Material Icon Theme
- Color Highlight

#### Prettier

code를 설정한 규칙대로 보기 좋게 정리해주는 도구 (formatting 특화)
.prettierrc 파일안에 규칙 설정

```
{
    "singleQuote": true,
	"semi": true,
	"useTabs": false,
	"tabWidth": 2,
	"trailingComma": "all",
	"printWidth": 80
}
```

#### ESLint

문법을 자동으로 수정해주기 위해 사용하며 prettier와 같이 사용된다. (formatting,문법수정)
.eslintrc 혹은 package.json의 eslintConfig필드에 작성

- ESLint는 3가지 영역으로 나누어 구성한다.

1. Environments: 스크립트 실행에 대한 설정, 사전 전역변수 설정
2. Globals: 사용자가 추가하는 전역 변수
3. Rules: 활성화 규칙 및 오류 수준

##### parserOptions

ESLint 사용을 위해 지원하는 JavaScript 언어 옵션을 지정가능

```
{
    "parserOptions':{
        "ecmaVersion":6,    //사용항 ECMA 버전
        "sourceType":"module", //parser의 export 형태 설정
        "ecmaFeature":{"jsx":true} //ECMA 언어 확장 기능 설정
        /*
            globalReturn: 전역 스코프 사용 여부 (node, commonjs 환경에서 최상위 스코프는 module)
            impiledStrict: strict 모드 사용 여부
            jsx: ECMA 규격의 jsx 사용 여부
        */
    }
}
```

##### parser

ESLint 구문 분석을 위해 기본적으로 Espree 파서를 활용
Babel과 같이 사용되는 파서로는 babel-eslint가 있고 typescript 구문 분석을 위해 사용되는 @typescript-eslint/parser가 있다.

```
{
    "parser":"babel-eslint",
    //"parser":"@typescript-eslint/parser"
}
```

##### env

env는 사전 정의된 전역변수 사용을 정의한다.
자주 사용되는 설정으로는 browser와 node가 있다.

```
{
    "env":{
        "browser":true,
        "node":true
    }
}
``
```

##### globals

ESLint에서 선언되지 않은 전역변수에 대해서 경고가 발생하지 않도록 globals를 이용해 사용자 전역변수 추가가능

```
{
    "globals":{
        "$":true
    }
}
```

##### plugin

ESLint는 서드파티 플러그인 사용을 지원
플러그인을 설치한뒤 plugins에 추가해 사용가능

플러그인을 추가할때는 eslint-plugin을 생략가능

##### extends

추가한 플러그인에서 사용할 규칙을 설정한다.
플러그인은 일련의 규칙 집합이며, 플러그인을 추가해도 규칙은 적용되지 않는다.
규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 추가해주어 적용하면 된다.

```
{
    "plugins":[
        "eslint-plugin-react" //react
    ],
    "extends":[
        "eslint-recommended",
        "plugin:react/recommended"
    ]
}
//eslint-plugin을 생략하고 plugin: 을 사용해 사용할 플러그인을 지정해줄수 있다.
//eslint-all와 eslint-recommended는 eslint에서 기본으로 제공하는 확장이다.
//eslint-all은 production용으로 사용하지 않기를 권장함

//typescript 경우
{
    "parser":"@typescript-eslint/parser",
    "plugins":["@typescript-eslint"],
    "extends":[
        "plugin:@typescript-eslint/eslint-recommended"
    ]
}
```

##### rules

ESLint에는 프로젝트에 사용하는 규칙을 수정 할 수 있다.
규칙을 변경하는 경우 다음과 같이 설정해줘야 된다.

- "off" or 0 : 규칙사용 않함
- "warn" or 1 : 규칙을 경고로 사용
- "error" or 2 : 규칙을 오류로 사용

```
{
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"],
  	"comma-style": ["error", "last"],
  }
}
```

plugin에서 규칙을 지정할때는 eslint-plugin- 을 반드시 생략해줘야 된다.
eslint는 내부적으로 접두사 없이 이름을 사용하여 규칙을 찾는다.

##### 파일 디렉토리 제외

ignorePattern 필드 또는 .eslintignore 파일을 작성해 파일 및 디렉토리를 제외하도록 지정할수 있다.

```
{
    "ignorePattern":["temp.js","node_modules/"]
}

```

#### WebPack

Webpack은 모듈번들러로 웹 어플리케이션을 구성하는 HTML,CSS,Javascript 등 웹의 자원들을 각각의 모듈로 보고 이를 조합해 병합된 하나의 결과물로 만드는 도구

###### 웹팩 활용 해결 문제

1. javascript가 변수 유효범위 (es6의 module 문법과 웹팩의 모듈 번들링을 활용해 해결)
2. 브라우저 별 http 요청 숫자 제약 (webpack을 활용해 여러개의 파일을 하나로 합쳐 브라우저 별 http 요청횟수 제약을 피할수 있다)
3. 사용하지 않는 코드 관리
4. Dynamic Loading & Lazy Loading 미지원 (webpack의 code splitting 기능을 이용해 원하는 모듈을 원하는 타이밍에 로딩가능)

##### 필요 패키지

- webpack, webpack-cli
  package.json에서 "build": "webpack --mode=none" 을 작성하고 npm run build를 실행하면 dist 폴더가 생기고 그 안에 main.js가 생기는데
  이것과 같은 결과물을 webpack.config.js를 활용해서 똑같은 결과를 받아올수 있다.

```
- webpack.config.js
const path = require("path");

module.exports={
    mode:"none",
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist")
    }
}

//다시 package.json에서 "build":"webpack"을 작성한 뒤 npm run build를 실행해주면 끝
```

##### webpack 빌드 주요 속성

1. entry: webpack에서 웹 자원을 변환하기 위해 필요한 최초의 진입점이자 javascript의 파일 경로

```
module.exports={
    entry:"./src/index.js"
}
```

entry에 지정된 파일에는 웹 어플리케이션의 전반적인 구조와 내용이 담겨 있어야 한다.
webpack이 해당 파일을 가지고 웹 어플리케이션에서 사용되는 모듈들의 연관관계를 이해하고 분석하기 때문에 애플리케이션을 동작시킬수 있는
내용이 담겨져있어야 한다.

```
//블로그를 웹팩으로 빌드한다고 했을때 코드는 다음과 같을수 있다.
//index.js
import LoginView from "./LoginView.js";
import HomeView from "./HomeView.js";
import PostView from "./PostView.js";

function initApp(){
    LoginView.init();
    HomeView.init();
    PostView.init();
}
initApp();
//SPA인 경우를 가정했을때 로그인 화면, 홈 화면, 포스트 화면들이 모두 index.js에서 불려져 사용되고 있기 때문에
//웹팩을 실행하면 해당 파일들의 내용까지 해석해 파일을 빌드한다.
```

entry 포인트는 1개가 아닌 여러개가 될 수도 있습니다.

```
{
    entry:{
        login:"./src/LoginView",
        main"./src/MainView",
    }
}
```

이렇게 분리를 진행하는 경우는 SPA가 아닌 특정 page로 진입했을때 서버에서 해당 정보를 내려주는 형태의 멀티 페이지 어플리케이션에 적합하다.

2. output: webpack을 돌리고 나온 결과물을 파일 경로를 의미한다.

```
module.exports={
    ...
    output:{
        filename:"bundle.js"
        path:path.resolve(__dirname,"./dist")
    }
}
//최소한 빌드한 파일의 이름 filename은 지정해줘야 하며, path를 통해 해당 파일의 경로를 지정해 줄수 있다.
```

output 파일 옵션

- 1)결과 파일 이름에 entry 속성을 포함

```
module.exports={
    ...
    output:{
        filename:"[name].bundle.js"
    }
}
```

- 2)결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함

```
module.exports={
    ...
    output:{
        filename:"[id].bundle.js"
    }
}
```

- 3)매 빌드시 마다 고유 해시 값을 붙이는 옶션

```
module.exports={
    output:{
        filename:"[name].[hash].bundle.js"
    }
}
```

- 4)webpack의 각 모듈 내용을 기준으로 생성된 해시 값을 붙이는 옵션

```
module.exports={
    output:{
        filename:"[chunkhash].bundle.js"
    }
}
```

3. loader: javascript가 아닌 웹 자원들을 변환할수 있도록 해주는 속성.

```
module.exports={
    entry:"",
    output:{},
    module:{
        rules:[]
    }
}
//module이라는 속성을 사용, loader를 여러개 사용하는 경우 rules 배열에 아래와 같이 진행
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ]
```

- CSS Loader 적용 (npm i css-loader -D)

```
module.exports={
    entry:"",
    output:{},
    module:{
        rules:[{
            test:/\.css$/,
            use:["css-loader"]
        }]//모든 css 파일에 css-loader를 적용
    }
}
```

module의 rules배열에 추가되는 객체에는 2가지 속성이 포함되어 있는데

- test: loader를 적용할 파일 유형 (정규표현식 활용)
- use: 해당 파일에 적용할 loader 이름

css-loader 외에도 자주 사용되는 loader 정보는 다음과 같다.

- babel-loader (npm i babel-loader @babel/core @babel/preset-env -D)

```
module:{
    rules:[{
        test:/\.js$/,
        exclude:/(node_modules|bower_components)
        use:{
            loader:"babel-loader",
            options:{
                presets:["@babel/preset-env"]
            }
        }
    }]
}
```

- sass-loader (npm i sass-loader sass (node-sass or dart-sass) mini-css-extract-plugin -D)

```
//For production builds it's recommended to extract the CSS
//from your bundle being able to use parallel loading of CSS/JS resources later on
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports={
    module:{
        rules:[
            {
                test:/\.s(a|c)ss$/i,
                use:[
                    {// Creates `style` nodes from JS strings
                      loader:process.env.NODE_ENV==="production"?miniCssExtractPlugin.loader:'style-loader'
                    },
                    {
                    // Translates CSS into CommonJS
                      loader:'css-loader'
                    },
                    {
                    // Compiles Sass to CSS
                      loader:'sass-loader'
                    },
                ]
            }
        ]
    },
    plugins:{
        new miniCssExtractPlugin({
            filename:"[name].css",
            chunkFilename:"[id].css"
        })
    }
}
```

- file-loader

```
module.exports={
    module:{
        rules:[
            {
                test:/\.(png|jp?eg|gif)$/i,
                use:[
                  {
                    loader:"file-loader"
                    options:{
                        outputPath:"images"
                    }
                  }
                ]
            }
        ]
    }
}
```

- ts-loader (npm install --save-dev typescript ts-loader)

###### loader 적용 순서

특정 파일에 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야 한다.
loader는 기본적으로 오른쪽에서 왼쪽 순으로 적용된다.

```
module.exports={
    module:{
        rules:["css-loader","sass-loader"]
    }
    //scss 파일에 대해 먼저 sass-loader로 전처리를(scss를 css로 변환)한 다음 webpack에서 css 파일을 인식할수 있게 css-loader를 적용
}

```

4. plugin: webpack의 기본적인 동작에 추가적인 기능을 제공하는 속성, loader와 비교하면
   loader는 파일을 해석하고 변환하는 과정에 관여하는 반면, plugin은 해당 결과물의 형태를 바꾸는 역활을 한다고 보면 된다.

```
module.exports={
    plugins:[
        new HtmlWebpackPlugin(), //웹팩으로 빌드한 결과물로 HTML 파일 생성
        new webpack.ProgressPlugin() //웹팩의 빌드 진행율을 표시해주는 plugin
    ]
}
```

plugins 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될수 있다.

###### 자주 사용되는 Plugin

- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin

5. 기타 resolve, devServer, devtool
   resolve: webpack이 알아서 경로나 확장자를 처리할 수 있게 해주는 옵션

##### Webpack Dev Server

webpack의 빌드 대상 파일이 변경되었을 때 매번 webpack 명령어를 실행하지 않아도 코드만 변경하고 저장하면 webpack으로 build 한 뒤 브라우저를
새로고침 해준다.

매번 명령어를 치는 시간과 브라우저를 새로고침하는 시간 뿐만 아니라 웹팩 빌드 시간 또한 줄여주기 때문에 webpack기반의 웹 애플리케이션 개발에 필수로 사용된다.

```
"script":{
    "dev":"webpack-dev-server",
    "build":"webpack"
}
```

webpack-dev-server를 실행해 webpack 빌드를 하는 경우 빌드한 결과물이 파일 탐색기나 프로젝트 파일에서 보이지 않는다.
build한 결과물은 메모리에 저장되고 파일로 생성되지 않기 때문에 컴퓨터 내부적으로 접근은 가능하나 직접 눈으로 보고 파일을 조작할수는 없다.
따라서 webpack-dev-server는 개발때만 사용하다가 개발이 완료되면 웹팩 명령을 통해 결과물을 파일로 생성한다.

```
module.exports={
    "devServer":{
        port:9000
    }
}
```

##### HMR (Hot Module Replacement)

브라우저를 새로고침하지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영되도록 도와주는 설정

###### 설정하기

React, Vue, Angular 같이 대부분의 프레임워크는 이미 HMR을 사용할수 있는 loader를 지원하고 있지만
만약 개별적으로 설정하고 싶을 경우 아래와 같은 방식으로 설정해주면 된다.

```
module.exports={
    devServer:{
        hot:true
    }//javascript나 css가 변경되면 새로고침 없이 변경사항 확인 가능
}
```

##### Source Map

배포용으로 빌드한 파일과 원본을 연결시켜주는 기능.
서버에 배포를 할 때 성능 최적화를 위해 HTML,CSS,JavaScript 같은 웹자원들을 압축해주는데 만약 압축하여 배포한 파일에 에러가 난다면 소스맵을 통해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인해준다.

```
module.exports={
    devtool:"cheap-eval-source-map"
}
```

devtool 속성을 추가하고 소스 맵 설정 옵션 중 하나를 선택해 지정해주면 된다.

- [참고] https://webpack.js.org/configuration/devtool/#devtool
