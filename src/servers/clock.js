export const userClock = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 0,
                msg: '打卡成功',
            })
        }, 1000);
    })
}

export const getUserClockList = () => {
    const data = [
        {
          title: '锻炼',
          mask: '10个俯卧撑',
          isCheck: false,
          id: 1,
        }, {
          title: '学习',
          mask: '研究react',
          isCheck: true,
          id: 2,
        }
      ]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 0,
                msg: '打卡成功',
                data,
            })
        }, 1000);
    })
}