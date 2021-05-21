# Roufarm

> 성공하는 사람들을 위한 하루하루 습관 만들기



- 파일 구조

```
frontend(react native application)
client(Vue)
backend(Spring Boot)
```

[1. 프로젝트 세팅](#1.-debug-setting)

[2. DB dump file](#2.-dump)

[3. release 버전 확인](#3.-release)

[참고 - RN build](#rn-build)

## 1. debug setting

> 프로젝트 로컬 실행 기준

1. frontend

   - 안드로이드 스튜디오

     [Window 개발환경 구축](https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/)

     [mac OS 개발환경 구축](https://dev-yakuza.posstree.com/ko/react-native/install-on-mac/)

   ```bash
   # install
   $ npm install 
   
   # run application
   $ react-native run-android
   ```

2. client

   ```bash
   # install
   $ npm install
   
   # run application
   $ npm run serve
   ```

   

### 2. dump



### 3. release

- client: 카카오 공유하기 및 애플리케이션 소개 웹 페이지

  http://k4c105.p.ssafy.io/

- frontend: 안드로이드 애플리케이션

  [apk file download](https://drive.google.com/drive/folders/1k9VgP8AbFAEt9T0qVbGdzdsdixhIyuWG)



### RN build

> 안드로이드는 모든 앱이 설치전에 디지털 서명화가 되어있어야 한다.
>
> 따라서 릴리즈 키가 필요(구글 플레이에 등록할 때)

[공식문서](https://reactnative.dev/docs/signed-apk-android)

### 1. 업로드 키 생성

`~/android/app` 경로에서

```bash
$ keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

```
keystore password: ssafy1234
first name and last name: ssafy
organizational unit: ssafy
organization name: ssafy
City or Locality: GJ
State or Province: GJ
country code: KR
```

output

```
>> Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=ssafy, OU=ssafy, O=ssafy, L=GJ, ST=GJ, C=KR
[Storing my-upload-key.keystore]
```



### 2. Gradle 변수 설정

1. `my-upload-key.keystore` 파일이 `android/app` 디렉토리에 위치하고 있는지 확인

2. `android/gradle.properties` 변수 추가

   ```properties
   # build 
   MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=위에서 지정한 비밀번호
   MYAPP_UPLOAD_KEY_PASSWORD=위에서 지정한 비밀번호
   ```

   ```properties
   # build example
   MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=ssafy1234
   MYAPP_UPLOAD_KEY_PASSWORD=ssafy1234
   ```

### 3.  `android/app/build.gradle`에 서명 경로 추가

```gradle
...
android {
    ...
    defaultConfig{...}
    // signing config 추가
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
    // 여기까지
}
```

### 4. release AAB 생성

> AAB: Android App Bundle
>
> [설명자료](https://liapp.lockincomp.com/ko/blog/blog-Post/tech-google-android-app-bundle/)

```bash
$ cd android
# aab
$ ./gradlew bundleRelease

# apk
$ ./gradlew assembleRelease
```



#### 에러 발생

1. 3번 항목에서 `...` 빼주고 작동하니 일단 해결

2. `Task :app:mergeReleaseResources FAILED` 에러 발생

   > Resource and asset merger: Duplicate resources

=> darawble 파일들이 겹쳐서 발생하는 문제(겹치는 파일 확인 후 삭제)

3. `FAILURE: Build failed with an exception`에러 발생

   ```
   * What went wrong:
   Execution failed for task ':app:bundleReleaseResources'.
   > A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
      > Android resource linking failed
        C:\Users\qsoo\Desktop\.autonomy_pjt\code\frontend\android\app\build\intermediates\bundle_manifest\release\AndroidManifest.xml:37: AAPT: error: resource mipmap/ic_launcher (aka com.frontend:mip
   > ID
   ```

   => 매핑이 잘못되서 생기는 문제 같음 일단 `./gradlew clean` 실시

   => 아이콘과 스플래쉬 스크린이 없어져서 발생했던 문제 - 다시 생성해서 시도

4. splashscreenTheme 2번 선언되서 발생 - `android/app/src/main/res/values`에서 수정



### 5.  output 확인

`android/app/build/outputs/bundle/release/app.aab` (aab)

`android/app/build/outputs/apk/release/app-release.apk` (aab)



#### 6. 빌드된 파일 테스트

```bash
$ react-native run-android --variant=release
```



## 에러 발생

> 릴리즈 버전에서 서버와 통신이 되지 않을 때

### 해결법

`android/app/src/main/AndroidManifest.xml` 파일에

```xml
manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        ...
        android:usesCleartextTraffic="true"  // <-- added this !!!!
        ...>
        ...
    </application>
</manifest>
```

[참고자료](https://velog.io/@hyoungnamoh/%EC%B2%AB-%EA%B2%8C%EC%8B%9C%EA%B8%80)