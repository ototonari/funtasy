enum KEY {
  GUIDE = "guide_status"
}

export const Debug = {
  showStatus: () => {
    console.log(`
    ${KEY.GUIDE}: ${localStorage.getItem(KEY.GUIDE)}
    `)
  }
}

export const GuideStatus = {
  get: ():boolean => {
    const status = localStorage.getItem(KEY.GUIDE)
    return status !== null && JSON.parse(status) === true;
  },
  set: (status: boolean) => {
    localStorage.setItem(KEY.GUIDE, JSON.stringify(status))
  }
}