//index.js

import api from "../../utils/api"


//获取应用实例
const app = getApp()

Page({
  data: {
    courses: []
  },
  onLoad: function(){
    api.courses({
      success:(res)=>{
        this.setData({
          courses: res.data
        })
      }
    })
  },
})