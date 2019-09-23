class Storage {
  // 将数据存储在本地缓存中指定的 key 中
  set (key, data) {
    try {
      uni.setStorageSync(key, data)
    } catch (e) {
      console.log(e)
    }
  }
  // 从本地缓存中获取指定 key 对应的内容
  get (key) {
    let data
    try {
      data = uni.getStorageSync(key)
    } catch (e) {
      console.log(e)
    }
    return data
  }
  // 从本地缓存中移除指定 key
  delete (key) {
    try {
      uni.removeStorageSync(key)
    } catch (e) {
      console.log(e)
    }
  }
  // 返回一个布尔值，表示 key 是否在本地缓存之中
  has (key) {
    let value
    try {
      const res = uni.getStorageInfoSync()
      value = res.keys.includes(key)
    } catch (e) {
      console.log(e)
    }
    return value
  }
  // 清理本地数据缓存
  clear () {
    try {
      uni.clearStorageSync()
    } catch (e) {
      console.log(e)
    }
  }
}
const chache=new Storage();
export default chache