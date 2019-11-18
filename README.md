一個簡單的遊戲算分網站，僅計劃單次使用幾小時即結束

遊戲為AB兩隊玩Mario party，分2人及4人賽，在遊戲後每位參賽者能各抽一張道具卡並套用效果，詳細可以看網站的"詳細規則"頁面

### 記錄儲存

專案使用Google sheet來儲存分數，以Google App Script撰寫簡單的CURD，由於它本身的限制，每次http request大約需要3秒才會response。相關的script放在googleScripts資料夾，使用方式可參考其它網路文章

### 專案架構

src/module/container資料夾下為每個頁面一個資料夾，每個container資料夾放只有該頁面使用的component

src/shared資料夾下為共用的component等元件

src/module/services與src/services的差異在src/services為共用的service，而module則偏向專為特定頁面使用

### NgRx

專案中使用NgRx統一管理遊戲分數的資料。為避免頁面重開時要載入太久，在每次取得所有記錄時都會另外存至localstorage暫存，在開啟頁面時先行載入cache，並同步等待api取回資料時更新

