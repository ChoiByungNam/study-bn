# Gulp 세팅

## 시작하기

프로젝트 명으로 SETUP.Proposal 저장소를 클론

```sh
git clone https://gitlab.com/cttd/SETUP.Proposal.git project-name
```

프로젝트 디렉토리로 이동

```sh
cd project-name
```

`package.json` 파일의 `name`과 `description` 값을 프로젝트에 맞게 수정합니다.

```json
{
    "name": "project-name",
    "description": "project-name 시안",
}
```

각 프로젝트는 별도의 Git 저장소를 사용할 것이므로 `git clone` 시 생성된 `.git`
디렉토리 삭제 후 해당 프로젝트의 Git 관련 설정

```sh
rm -rf .git
git init
git remote add origin <git-repository-url>
```

NPM 패키지 설치

```sh
npm install
```

Gulp 실행

```sh
npm start
```

## 디렉토리

- 모든 작업은 `src` 디렉토리 안에서 이루어짐
- `build` 디렉토리의 내용은 Gulp 테스크들에 의해 생성되므로 직접 수정하지 말 것
- `build` 디렉토리의 내용은 추가 작업 없이 바로 전달할 수 있는 최종 결과물
- `src` 디렉토리 내의 `_`로 시작하는 디렉토리나 파일은 `build` 디렉토리에
  생성되지 않음
- `src` 디렉토리의 구조 그대로 `build` 디렉토리의 구조가 생성됨

## 팁

- 압축파일로 전달하는 경우가 대부분이니 로컬에서 열었을 때 문제 없도록 상대 경로
  사용할 것
- 파일명이나 디렉토리명이 `_`로 시작할 경우 `build` 디렉토리에 옮겨지지 않으므로
  전달물에 포함될 필요가 없는 내용은 이를 활용할 것

## 테스크

각 테스크에 대한 상세 설명은 `gulpfile.js`의 주석 참고

### Markup

```sh
npm start markup
```

- [HTMLHint](http://htmlhint.com/)를 사용한 코드 검사
- HTML Include

### Style

```sh
npm start style
```

- [Less](http://lesscss.org/)
- [CSS Lint](http://csslint.net/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

### Script

- [ESLint](http://eslint.org/)
- JS Include

### Image

```sh
npm start image
```

- [imagemin](https://github.com/imagemin/imagemin)을 사용하여 이미지 최적화

### Copy

```sh
npm start copy
```

- 위 테스크들에서 처리되지 않는 `src` 디렉토리 내의 파일들을 `build` 디렉토리로
  복사

### Build

```sh
npm start build
```

- 위의 테스크들을 모두 실행함
- 추가적인 파일 수정은 하지 않을 경우 사용

### Watch

```sh
npm start watch
```

- `build` 테스크를 실행하고 `src` 디렉토리 내의 파일에 수정이 이루어지는지 체크
- 수정되는 파일이 있으면 각 파일에 해당하는 테스크 실행

### Serve

```sh
npm start serve
```

- 기본 테스크. `npm start`와 동일
- `watch` 테스크를 실행하고 [Browsersync](http://www.browsersync.io/)를 사용하여
  로컬 서버 구동
- 수정된 파일은 브라우저에서 직접 새로 고침을 하지 않아도 내용이 반영 됨
