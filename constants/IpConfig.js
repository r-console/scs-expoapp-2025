const Ipconfig = {
  // version 2
  // BACKEND_IP: () => {
  //   return "http://13.127.123.145:9000/v2"
  // },
  // version 1
  // BACKEND_IP: () => { return 'http://scsservicing-env.eba-zu5hsnce.ap-south-1.elasticbeanstalk.com' },
  // localhost

  // new aws2 2023
  BACKEND_IP: () => {
    return "http://localhost:9000/v2"
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
export default Ipconfig
