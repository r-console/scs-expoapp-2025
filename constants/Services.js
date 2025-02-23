const Ipconfig = {
  // version 2
  // BACKEND_IP:ip () => {
  //   return "http://13.127.123.145:9000/v2"
  // },
  // version 1
  // BACKEND_IP:ip () => { return 'http://scsservicing-env.eba-zu5hsnce.ap-south-1.elasticbeanstalk.com' },
  // localhost

  // new aws2 2023
  BACKEND_IP: (ip) => {
    return `http://${ip}:9000/v2`
  },
  VERSION_CODE: () => {
    return 14
  },
  VERSION: () => {
    return "1.1.1"
  },

  PORT: () => {
    return "9000"
  },
}

const Services = {
  // login page
  LOGIN: (ip) => {
    return `${Ipconfig.BACKEND_IP(ip)}/auth/login`
  },
  LOGIN_LOCATION: (ip) => {
    return `${Ipconfig.BACKEND_IP(ip)}/auth/loginlocation`
  },
  // live location
  LIVE_LOCATION: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/location/livelocation`
  },
  // Bill history page
  GET_BILLS_LASTONEMONTH: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/auth/lastservices/${userid}`
  },

  // dashboard home page
  TODAY_SERVICES: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/dashboard/today/${userid}`
  },
  MONTHLY_SERVICES: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/dashboard/month/${userid}`
  },
  TOTAL_SERVICES: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/dashboard/total/${userid}`
  },
  LAST_BILL: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/dashboard/lastbillid`
  },

  //   calls pending
  CALLS_PENDING: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/callspending/${userid}`
  },
  CALLS_PENDING_DONE: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/callspending/done`
  },

  // billing page
  ADD_BILL: (ip) => {
    return `${Ipconfig.BACKEND_IP(ip)}/bill/addbill`
  },
  // App.js offline data
  ADD_OFFLINE_BILL: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/bill/addofflinebill`
  },
  // update my employee last invoice id
  UPDATE_INVOICE_ID: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/bill/updateinvoice`
  },

  // range bills
  GET_RANGE_BILLS: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/getbillsrange/${userid}`
  },
  // bill history page search bill
  GET_BILL: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/getbill/${userid}`
  },
  // get s_sign
  GET_SER_SIGN: (billid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/getsersign/${billid}`
  },
  // get c_sign
  GET_CUS_SIGN: (billid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/getcussign/${billid}`
  },
  GET_MACHINE_DATA: (billid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/getmachinedetails/${billid}`
  },
  BRANCH: (branchid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/search/branch/${branchid}`
  },

  // get Sign image from s3 bucket
  GET_SIGN_IMAGE: (keyName) => {
    return `${Ipconfig.BACKEND_IP(ip)}/s3image/images/${keyName}`
  },

  GET_CREDIT_BILLS: (userid) => {
    return `${Ipconfig.BACKEND_IP(ip)}/creditBill/mycreditbills/${userid}`
  },

  VERSION_CHECK: () => {
    return `${Ipconfig.BACKEND_IP(ip)}/version/versioncheck`
  },
}

export default Services
