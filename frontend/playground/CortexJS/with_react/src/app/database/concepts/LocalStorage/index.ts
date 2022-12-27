enum KEY {
  GUIDE = "guide_status",
  USER_INFO = "user_info",
  ICM = "instructional_curriculum_map",
}

export const Debug = {
  showStatus: () => {
    console.log(`
    ${KEY.GUIDE}: ${localStorage.getItem(KEY.GUIDE)}
    `);
    console.log(`
    ${KEY.ICM}: ${localStorage.getItem(KEY.ICM)}
    `)
  },
  resetGuide: () => {
    localStorage.setItem(KEY.GUIDE, JSON.stringify(false));
  },
  resetICM: () => {
    localStorage.setItem(KEY.ICM, null);
  }
};

export const GuideStorage = {
  get: (): boolean => {
    const status = localStorage.getItem(KEY.GUIDE);
    return status !== null && JSON.parse(status) === true;
  },
  set: (status: boolean) => {
    localStorage.setItem(KEY.GUIDE, JSON.stringify(status));
  },
};

export const UserInfoStorage = {
  get: (): boolean => {
    const status = localStorage.getItem(KEY.USER_INFO);
    return status !== null && JSON.parse(status) === true;
  },
  set: (status: boolean) => {
    localStorage.setItem(KEY.USER_INFO, JSON.stringify(status));
  },
};

export const ICMStorage = {
  get: (): string => localStorage.getItem(KEY.ICM),
  set: (rawStatus: string) => localStorage.setItem(KEY.ICM, rawStatus),
};
