# Release Your Needs

依據台北市政府公廁點位資訊，當使用者定位後，提供使用者搜尋周邊鄰近廁所。
依照公廁點位當前是否營業，將地標區分為三種不同顏色，快速尋找開放中的場所。  
This application provides preside location of public restrooms based on the sources produced by the Taipei city government.Enabling users to search for nearby public restrooms.According to opening hours, with 3 different color markers to quickly look for available locations.

🔗 Website URL : https://mymap-896b7.web.app/  

The testing account and testing password : user2@user2.com / user22  

<img src="./src/source/map-map.gif" width="550" height='415'>

## Frontend Technique
- React Hooks   
  (SPA with functional components)
- React Router  
  ( SPA routing )
 
## Backend Technique
- Cloud Firebase  
  ( managed sources for toilet spots and users login infomation )
- Firebase Storage  
  ( managed images )
- Firebase Authentication   
  ( e-mail , password login / google login )
- Firebase Hosting  
  ( production-grade web content hosting )

## Third Party APIs
- Google Maps JavaScript API  
- Google Maps Place API ( Place Search , Place Details )  
- 政府開放資料平台 － 臺北市公廁點位資訊

## Version Control
- Git / GitHub

## Building tools
- NPM 
- Webpack  
- Babel-Loader
- Prettier 

## Main Features
- 串接 Google Map，提供使用者定點搜尋鄰近的公廁點位  
  Integrate Google Map API for map interface.​ Enabling users to search for nearby public restrooms.
- 撰寫評論功能，描述體驗以提供實用資訊  
  comment writing feature, share experiences and provide useful information. 
- 收藏地點功能，建立專屬清單  
  Save locations. Create private list.
- 支援多種裝置切換  
  Build the RWD page with CSS FlexBox and support RWD on different devices.
- 使用 use Context 管理會員登陸狀態   
  Manage user state with React Context to pass data through the component tree.
- 使用 Firebase 多項服務，提供帳號密碼 及 第三方會員登錄系統，Firestore 及 Store 存取資訊、會員資料、圖片 及 部署網站上線  
- Utilize Firestore, Storage, Authentication, Hosting with Firebase for member systems and deploying.
- 使用 React Router 管理專案路由，實作 SPA
React-Router to implement a Single Page Application(SPA).
- NPM 套件管理 及 Webpack 打包專案
NPM package management and Webpack javascript module packaging.



## Contact
Jessie Lin  
📫 e-mail : b19950828@gmail.com