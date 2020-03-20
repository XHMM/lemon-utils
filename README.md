1. `npm i @xhmm/utils`
1. apis : 
- ```js
  import { 
    // common
    type,
    assertType,
    conditionalObjectMerge,
    conditionalArrayMerge,
    valueExistsInObject,
    hasRepeat,
  
    // browser
    getHiddenInputValues,
  
    // ali-oss 
    AliOSS,
  
    // ali-oss 
    DingDingBot
   } from '@xhmm/utils'
  ```
    当使用 `AliOSS` 时，需要：
    - 手动 `npm i ali-oss` 
    - 提供以下环境变量：
        - `AliOSS_KEY`
        - `AliOSS_SECRET`
        - `AliOSS_BUCKET`
        - `AliOSS_REGION`
        - `AliOSS_PUBLIC_HOST` // 公网地址 (会替换掉上传后url的域名)
        - `AliOSS_PRIVATE_HOST` // 内网地址 (用来上传)
        - (optional) `AliOSS_TIMEOUT`
        - (optional) `AliOSS_DIR` // 存放目录 (**不以 `/` 开头但以 `/` 结尾**)
    
    当时有 `DingDingBot` 时，需要：
    - 提供以下环境变量：
        - `DING_WEBHOOK` // 钉钉机器人的webhook地址
