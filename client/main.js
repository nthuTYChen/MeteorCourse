/*
    ELIZA Meteor Template Created by CHEN, Tsung-Ying
    for the NTHU course "Basic Web Linguistic Application Development"
    Last Updated on Nov 1, 2017
*/

//把msgRecords的mongoDB資料庫連結到msgRecords
msgRecords = new Mongo.Collection("msgRecords"); //請勿變更此行

Template.body.helpers({
  allMsg: function() {
    //從msgRecords搜尋所有訊息，並且依time的內容以遞增方式(1)排序
    //因為資料庫的存取是有反應性(reactive)的，每次資料庫的內容變更
    //整個helpers就會重新執行一次，所以網頁的內容就會隨資料庫內容改變
    var allMsgs = msgRecords.find({}, {sort: {time: 1}});
    //將資料庫搜尋結果轉換為一個物件陣列
    allMsgs = allMsgs.fetch();
    //建立一個變數儲存要回傳的所有訊息字串
    var msgTexts = "";
    //檢查是不是有從資料庫找到任何訊息。有找到任何訊息的話allMsgs物件陣列的
    //長度會大於0
    if(allMsgs.length > 0)
    {
      //利用for迴圈合併每個訊息中的說話者跟訊息內容並儲存到msgTexts裡
      for(index=0 ; index<allMsgs.length; index++)
      {
        //allMsgs[index].speaker = 這筆訊息的說話者
        //allMsgs[index].msg = 這筆訊息的內容
        //在最後加上"\n"這個代表換行的字串
        msgTexts = msgTexts+
                    allMsgs[index].speaker+': '+allMsgs[index].msg+'\n';
      }
    }
    //在allMsgs陣列長度不是大於0的時候，代表資料庫中沒有任何訊息
    else
    {
      //這時候將一筆預設訊息儲存到msgTexts裡
      msgTexts = "ELIZA: This is ELIZA. How are you doing today?";
    }
    //回傳msgTexts
    return msgTexts;
  }
});

//定義網頁事件
Template.body.events({
  //事件：當網頁中id=submitMsg的物件被點選的時候
  "click #submitMsg": function(event) {
    //每個事件的功能函數function()都可以接受一個事件的變數，這邊我們取名做event
    //event.preventDefault()代表這個事件我們不要執行預設的HTML功能，避免每次按
    //Submit的按鈕都會重新讀取網頁
    event.preventDefault();
    //建立一個變數myMsg儲存輸入在網頁中id=myMsg物件的內容(value)
    var myMsg = document.getElementById("myMsg").value;
    //把網頁中id=myMsg的內容設定為一個空的字串
    document.getElementById("myMsg").value = "";
    //呼叫大腦的msgReceiver功能，並且傳送myMsg變數
    Meteor.call("msgReceiver", myMsg);
  },
  //事件：當網頁中id=resetMsg的物件被點選的時候
  "click #resetMsg": function(event) {
    //同上，避免Reset按鈕執行預設的HTML功能
    event.preventDefault();
    //把網頁中id=myMsg的內容設定為一個空的字串
    document.getElementById("myMsg").value = "";
    //呼叫大腦的resetELIZA功能，但不傳送任何訊息
    Meteor.call("resetELIZA");
  }
});
