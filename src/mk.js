const mkTree = (data) => {
  data.map(item => {

    item.pid = item.mkid.substring(0, item.mkid.length - 2)//
    if (item.zj) {
      let com = () => import('./pages' + item.zj + '.vue')
      item.component = com  //url文件路径设置
    }
  })
  var rst = [] //存放一级路由的地方
  data.map(item => {
    // item.name = item.mkname
    item.iconFontClass = item.img  //所有的图片信息
    item.expand = false   //当前页面是否打开
    item.path = item.url //打开的url route路径
    if (item.pid === '') {
      rst.push(item)//因为header栏没有pid，所以将header栏存放在rst里面
    }
  })
  rst.map(item => {
    listtotree(data, item.pid)

  })

  return rst
}
function listtotree (data, pid) {

  var result = []
  var temp
  data.map(item => {
    if (item.pid === pid) {
      temp = listtotree(data, item.mkid)
      if (temp.length > 0) {
        item.children = temp
      }
      if (item.pid !== '') {
        item.path = item.url
        item.iconFontClass = item.img
      }
      result.push(item)
    }
  })
  return result
}

const treeToPath = (tree, paths, currentPaths) => {
  var currentPath = currentPaths || []
  var path = paths || []
  var obj = {}
  for (let i = 0; i < tree.length; i++) {
    if (i !== 0) {
      // currentPath.pop()
    }
    obj.name = tree[i].text
    obj.mobileyeId = tree[i].mobileyeId
    obj.plateNumber = tree[i].text
    obj.longitude = tree[i].longitude
    obj.latitude = tree[i].latitude
    if (obj.longitude) {
      currentPath.push(obj)
      obj = {}
    }
    if (tree[i].children.length) {
      treeToPath(tree[i].children, path, currentPath)
    } else {
      // path.push(currentPath.slice(0))
    }
  }

  // currentPath.pop()
  return currentPath
}
const chunk = function (arr, len) {
  len = parseInt(len)
  let groups = []
  if (len <= 1 || arr.length < len) {
    groups.push(arr)
    return groups
  }
  let loop = Math.ceil(arr.length / len)
  for (var i = 0; i < loop; i++) {
    groups.push(arr.slice(len * i, len * (i + 1)))
  }

  return groups

}
export {mkTree, treeToPath, chunk}
