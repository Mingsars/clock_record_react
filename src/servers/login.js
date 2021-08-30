export const userLogin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'admin' && data.password === '123456') {
        resolve({
          code: 0,
          msg: '登录成功',
        })
      } else {
        reject({
          code: -1,
          msg: '登录失败，请输入正确的账号和密码'
        })
      }
    }, 1000);
  })
}

export const userRegist = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        msg: '注册成功',
      })
    }, 1000);
  })
}

export const userLogout = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        msg: '登出成功',
      })
    }, 1000);
  })
}