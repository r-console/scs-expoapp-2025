import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native"

import DateTimePicker from "@react-native-community/datetimepicker"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useContext, useEffect, useState } from "react"
import { Picker } from "@react-native-picker/picker"
import { Link, useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Services from "@/constants/Services"
import { setUser } from "../context/userSlice"

import { increment, decrement, reset } from "../context/counterSlice"
import axios from "axios"
import { clearSigns, setPdfPath } from "../context/signSlice"

export default function CreateBillScreen() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const { cusSign, serSign } = useSelector((state) => state.sign)
  const url = useSelector((state) => state.url)
  console.log("URL", url.value)

  // const user = useState({
  //   id: 0,
  //   name: "name",
  //   branch: "branch",
  //   username: "username",
  //   last_invoice_id: "last_invoice_id",
  // })
  // const [cusSign, setCusSign] = useState(null)
  // const [serSign, setSerSign] = useState(null)
  // const { user, cusSign, serSign, isOnline, setUser } = useContext(AuthContext)
  // const { setCusSign, setSerSign } = useContext(AuthContext)
  const [keyboardStatus, setKeyboardStatus] = useState(false)

  const [pageView, setPageView] = useState(0)

  const [offlineBillData, setOfflineBillData] = useState([])
  const [oldData, setOldData] = useState(false)

  const [posting, setPosting] = useState(false)
  const [billSaved, setBillSaved] = useState(false)

  const app_version = "1.0.9"

  let lastiv_id = user.last_invoice_id

  const [billDetails, setBillDetails] = useState({
    customer_Name: "",
    customer_Address: "",
    customer_PhoneNumber: "",
    nature_of_job: "Installation",
    rectification_details: "",
    bill_type: "Sewing",
    working_condition: "YES",
    remarks: "",
    service_charges: "",
    invoice_id: `B${user.branch}E${user.id}${user.last_invoice_id}`,
    payment_method: "Cash",
    signed_by: "",
    pending_reason: "",
  })
  const [ho_sign_name, setHOSignName] = useState("")
  const [service_persons, setServicePersons] = useState("")
  const [today, setToday] = useState("")
  const [inTime, setInTime] = useState("")
  const [outTime, setOutTime] = useState("")

  const [inTimeSet, setInTimeSet] = useState(new Date())
  const [outTimeSet, SetOutTimeSet] = useState(new Date())

  const [timeShow1, setTimeShow1] = useState(false)
  const [timeShow2, setTimeShow2] = useState(false)

  const [submitPage0, setSubmitPage0] = useState(false)
  const [submitPage1, setSubmitPage1] = useState(false)
  const [submitPage2, setSubmitPage2] = useState(false)

  const [machine, setMachine] = useState([{ machineModel: "", partNo: "" }])
  const handleMachineModel = (index, value) => {
    let newFormValues = [...machine]
    newFormValues[index].machineModel = value
    setMachine(newFormValues)
  }

  const handlePartNo = (index, value) => {
    let newFormValues = [...machine]
    newFormValues[index].partNo = value
    setMachine(newFormValues)
  }

  const addFormFields = () => {
    setMachine([...machine, { machineModel: "", partNo: "" }])
  }

  const removeFormFields = (i) => {
    let newFormValues = [...machine]
    newFormValues.splice(i, 1)
    setMachine(newFormValues)
  }

  const firstSUBMIT = () => {
    setSubmitPage0(true)
    let flag = 0
    if (
      billDetails.customer_Name === "" ||
      billDetails.customer_Address === "" ||
      billDetails.customer_PhoneNumber === 0 ||
      billDetails.nature_of_job === "" ||
      billDetails.rectification_details === "" ||
      billDetails.bill_type === ""
    ) {
      flag = 1
    }
    if (flag == 0) {
      setPageView(1)
    }
  }

  const secondSUBMIT = () => {
    setSubmitPage1(true)
    let flag = 0
    machine.forEach((element) => {
      if (element.machineModel === "" || element.partNo === "") {
        flag = 1
      }
    })
    if (flag == 0) {
      setPageView(2)
    }
  }

  const thirdSUBMIT = () => {
    setSubmitPage2(true)
    let flag = 0
    if (
      billDetails.service_charges === "" ||
      billDetails.remarks === "" ||
      inTime === ""
    ) {
      flag = 1
    }
    if (
      billDetails.payment_method === "Calls Pending" &&
      billDetails.pending_reason === ""
    ) {
      flag = 1
    }
    if (flag == 0) {
      setPageView(3)
    }
  }

  const onChangeTime1 = (event, selectedDate) => {
    console.log(event)
    if (event.type === "neutralButtonPressed") {
      setInTime("")
      setInTimeSet(new Date())
    } else {
      setTimeShow1(false)
      if (event.type === "set") {
        try {
          setInTimeSet(selectedDate)
          setTimeShow1(false)
          // let tm = moment(selectedDate).format("hh:mm A")
          let tm = new Date(selectedDate).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })

          setInTime(tm)

          let nowTime = new Date()
          // let tm2 = moment(nowTime).format("hh:mm A")

          let tm2 = new Date(nowTime).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })

          setOutTime(tm2)
        } catch (error) {
          console.log(error.message)
        }
      }
      if (event.type == "dismissed") {
        setTimeShow1(false)
      }
    }
  }

  const onChangeTime2 = (event, selectedDate) => {
    if (event.type === "neutralButtonPressed") {
      setOutTime("")
      SetOutTimeSet(new Date())
    } else {
      setTimeShow2(false)
      if (event.type === "set") {
        SetOutTimeSet(selectedDate)
        setTimeShow2(false)
        // let tm = moment(selectedDate).format("hh:mm A")

        let tm = new Date(selectedDate).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })

        setOutTime(tm)
      }
      if (event.type == "dismissed") {
        setTimeShow2(false)
      }
    }
  }

  var destpath = "/data/user/0/com.scsbilling/files/BillsDataFile.json"

  useEffect(() => {
    let d = new Date()
    let CD =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
      "-" +
      (d.getDate() > 9 ? d.getDate() : "0" + d.getDate())
    setToday(CD)

    return () => {
      dispatch(clearSigns())
    }
  }, [])

  const FinalSUBMIT = async () => {
    setPosting(true)
    let lastInvoiceId = parseInt(await AsyncStorage.getItem("last_invoice_id"))
    AsyncStorage.setItem("last_invoice_id", (lastInvoiceId + 1).toString())

    dispatch(
      setUser({
        ...user,
        last_invoice_id: (parseInt(lastInvoiceId) + 1).toString(),
      })
    )

    let nowInvoiceId = user.last_invoice_id
    console.log(nowInvoiceId)

    // setUser({ ...user, last_invoice_id: nowInvoiceId + 1 })

    // after image upload post and add bill data in database
    // if(isOnline)
    // {
    console.log("Network is connected so data posted to backend")
    axios
      .post(Services.ADD_BILL(), {
        Bill: {
          employee_id: user.id,
          invoice_id: billDetails.invoice_id,
          customer_name: billDetails.customer_Name,
          customer_address: billDetails.customer_Address,
          customer_phoneno: billDetails.customer_PhoneNumber,
          bill_date: today,
          nature_of_job: billDetails.nature_of_job,
          rectification_details: billDetails.rectification_details,
          working_condition: billDetails.working_condition,
          remarks: billDetails.remarks,
          s_charge: billDetails.service_charges,
          in_time: inTime,
          out_time: outTime,
          s_sign: serSign,
          c_sign: cusSign,
          bill_type: billDetails.bill_type,
          payment_method: billDetails.payment_method,
          signed_by: billDetails.signed_by,
          // payment_status: billDetails.payment_method == 'Credit'?'PENDING':'COMPLETED',
          payment_status: "PENDING",
          services_persons: service_persons,
          pending_reason: billDetails.pending_reason,
          app_version: app_version,
        },
        machineDetails: machine,
        last_invoice_id: parseInt(nowInvoiceId) + 1, //nowInvoiceId + 1,
        bill_location: {
          latitude: 0,
          longitude: 0,
        },
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.status === 200) {
          console.log("pdf creation started")
        }
        setBillSaved(true)
      })
      .catch((error) => {
        if (error == "Error: Network Error") {
          // CreateJson(nowInvoiceId)
          // CreatePDF()
        }
        // setBillSaved(false)
      })
    // }
    // else
    // {
    //     // no internet so upload data to json
    //     console.log('Network is connected so data saved to offline Json file')
    //     CreateJson();
    //     CreatePDF();
    //     setBillSaved(false)
    // }
  }

  return (
    <View style={styles.container}>
      {timeShow1 ? (
        <DateTimePicker
          mode={"time"}
          is24Hour={false}
          value={inTimeSet}
          onChange={onChangeTime1}
          neutralButtonLabel="clear"
          minimumDate={new Date()}
        />
      ) : null}

      {timeShow2 ? (
        <DateTimePicker
          mode={"time"}
          is24Hour={false}
          value={outTimeSet}
          onChange={onChangeTime2}
          neutralButtonLabel="clear"
          minimumDate={new Date()}
        />
      ) : null}

      {posting && (
        <View
          style={{
            backgroundColor: "lightblue",
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <View style={{ marginTop: -50, marginBottom: 30 }}>
            <View
              style={[
                styles.signIn,
                {
                  borderColor: "#888",
                  borderWidth: 1,
                  backgroundColor: "#16233f",
                  borderRadius: 100,
                  height: 100,
                  width: 100,
                },
              ]}
            >
              {billSaved ? (
                <MaterialCommunityIcons
                  name="check"
                  style={{ alignSelf: "center", padding: 10 }}
                  size={40}
                  color="#fff"
                />
              ) : (
                <ActivityIndicator size="large" color="#fff" />
              )}
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {billSaved ? "Bill Saved Successfully..." : "Connecting server..."}
          </Text>
        </View>
      )}

      {/*<Spinner
        visible={posting}
        textContent={"Creating..."}
        textStyle={{ color: "#fff" }}
      />
      <Spinner
        visible={locationLoading}
        textContent={"Finding Location..."}
        textStyle={{ color: "#fff" }}
      /> */}
      {/* first page */}
      {pageView === 0 ? (
        <>
          <ScrollView
            style={{
              marginBottom: keyboardStatus ? 0 : 80,
              width: "100%",
              height: "100%",
            }}
          >
            {/* <View style={{
            marginTop:20,
            }}>
            <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold',color:'#000'}}>SCS Bill</Text>
        </View> */}

            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                // flexDirection:'row',justifyContent:'space-between',
              }}
            >
              {/* <Text style={styles.settingName}>NO: 4534</Text> */}
              {/* <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>setDateShow(true)}>
                <Text style={styles.settingName}>Date: 0</Text>
            </TouchableOpacity> */}
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Customer Name</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor:
                        submitPage0 && billDetails.customer_Name === ""
                          ? "red"
                          : "#888",
                    },
                  ]}
                  onChangeText={(val) =>
                    setBillDetails({ ...billDetails, customer_Name: val })
                  }
                  value={billDetails.customer_Name}
                />
              </View>
            </View>

            <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
              <Text style={styles.settingName}>Address</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor:
                        submitPage0 && billDetails.customer_Address === ""
                          ? "red"
                          : "#888",
                      height: 80,
                      fontSize: 18,
                    },
                  ]}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(val) =>
                    setBillDetails({ ...billDetails, customer_Address: val })
                  }
                  value={billDetails.customer_Address}
                />
              </View>
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Rectification Details</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor:
                        submitPage0 && billDetails.rectification_details === ""
                          ? "red"
                          : "#888",
                      height: 80,
                      fontSize: 18,
                    },
                  ]}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(val) =>
                    setBillDetails({
                      ...billDetails,
                      rectification_details: val,
                    })
                  }
                  value={billDetails.rectification_details}
                />
              </View>
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Phone Number</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor:
                        submitPage0 && billDetails.customer_PhoneNumber === ""
                          ? "red"
                          : "#888",
                    },
                  ]}
                  onChangeText={(val) =>
                    setBillDetails({
                      ...billDetails,
                      customer_PhoneNumber: val,
                    })
                  }
                  keyboardType="numeric"
                  maxLength={10}
                  value={billDetails.customer_PhoneNumber}
                />
              </View>
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Nature of Job</Text>
              <View
                style={{
                  borderColor: "#888",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Picker
                  selectedValue={billDetails.nature_of_job}
                  onValueChange={(itemValue) => {
                    setBillDetails({ ...billDetails, nature_of_job: itemValue })
                  }}
                >
                  <Picker.Item label="Installation" value="Installation" />
                  <Picker.Item label="Repairing" value="Repairing" />
                  <Picker.Item label="Servicing" value="Servicing" />
                </Picker>
              </View>
            </View>

            <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
              <Text style={styles.settingName}>Billing Type</Text>
              <View
                style={{
                  borderColor: "#888",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Picker
                  selectedValue={billDetails.bill_type}
                  onValueChange={(itemValue) => {
                    setBillDetails({ ...billDetails, bill_type: itemValue })
                  }}
                >
                  <Picker.Item label="Sewing" value="Sewing" />
                  <Picker.Item label="Spare" value="Spare" />
                </Picker>
              </View>
            </View>
            {!keyboardStatus ? (
              <Pressable
                style={{
                  width: "100%",
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  firstSUBMIT()
                }}
              >
                <View
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#888",
                      borderWidth: 1,
                      backgroundColor: "#16233f",
                      marginTop: 10,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      { alignSelf: "center", color: "#fff" },
                    ]}
                  >
                    NEXT{" "}
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    style={{ alignSelf: "center" }}
                    size={20}
                    color="#fff"
                  />
                </View>
              </Pressable>
            ) : null}
          </ScrollView>
        </>
      ) : null}

      {/* second page */}
      {pageView === 1 ? (
        <>
          <ScrollView
            style={{
              marginBottom: keyboardStatus ? 0 : 80,
              width: "100%",
              height: "100%",
            }}
          >
            {/* <View style={{
            marginTop:20,
            }}>
            <Text style={{alignSelf:'center',color:'#000',
            fontSize:18,fontWeight:'bold'}}>Machine details</Text>
        </View> */}
            {machine.map((element, index) => (
              <View key={index}>
                <View style={[styles.mainBoxItem, { alignSelf: "center" }]}>
                  <Text style={styles.settingName}>
                    Machine Name and Model No {index + 1}
                  </Text>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      style={[
                        styles.InputBox,
                        {
                          borderColor:
                            element.machineModel === "" && submitPage1
                              ? "red"
                              : "#888",
                        },
                      ]}
                      value={element.machineModel}
                      onChangeText={(e) => handleMachineModel(index, e)}
                    />
                  </View>
                </View>

                <View style={styles.mainBoxItem}>
                  <Text style={styles.settingName}>S/No {index + 1}</Text>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      style={[
                        styles.InputBox,
                        {
                          borderColor:
                            element.partNo === "" && submitPage1
                              ? "red"
                              : "#888",
                        },
                      ]}
                      value={element.partNo}
                      onChangeText={(e) => handlePartNo(index, e)}
                    />
                  </View>
                </View>
                {index ? (
                  <Pressable
                    style={{
                      width: "100%",
                      paddingHorizontal: 20,
                      paddingBottom: 15,
                    }}
                    onPress={() => removeFormFields(index)}
                  >
                    <View
                      cornerRadius={10}
                      elevation={8}
                      style={[
                        styles.signIn,
                        {
                          borderColor: "#888",
                          borderWidth: 1,
                          backgroundColor: "#ccc",
                          marginTop: 10,
                          flexDirection: "row",
                        },
                      ]}
                    >
                      <Text style={[styles.textSign, { alignSelf: "center" }]}>
                        Remove {index + 1}{" "}
                      </Text>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        style={{ alignSelf: "center" }}
                        size={20}
                        color="#000"
                      />
                    </View>
                  </Pressable>
                ) : null}
              </View>
            ))}

            {!keyboardStatus ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // position: "absolute",
                  // height: "100%",
                  paddingHorizontal: 20,
                  marginBottom: 50,
                }}
              >
                <Pressable
                  style={{ width: "35%" }}
                  onPress={() => {
                    setPageView(0)
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="arrow-left"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#000"
                    />
                    <Text
                      style={[
                        styles.textSign,
                        { alignSelf: "center", color: "#000" },
                      ]}
                    >
                      {" "}
                      BACK
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{ width: "20%" }}
                  onPress={() => addFormFields()}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text>{machine.length}</Text>
                    <MaterialCommunityIcons
                      name="plus"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#000"
                    />
                  </View>
                </Pressable>
                <Pressable
                  style={{ width: "35%" }}
                  onPress={() => {
                    secondSUBMIT()
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        backgroundColor: "#16233f",
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        { alignSelf: "center", color: "#fff" },
                      ]}
                    >
                      NEXT{" "}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#fff"
                    />
                  </View>
                </Pressable>
              </View>
            ) : null}
          </ScrollView>
        </>
      ) : null}

      {/* final page */}
      {pageView === 2 ? (
        <>
          <ScrollView style={{ marginBottom: keyboardStatus ? 0 : 80 }}>
            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>
                Certify that the Machine is in Satisfactory working Condition
              </Text>
              <View style={{ borderColor: "#888", borderWidth: 1 }}>
                <Picker
                  selectedValue={billDetails.working_condition}
                  onValueChange={(itemValue) => {
                    setBillDetails({
                      ...billDetails,
                      working_condition: itemValue,
                    })
                  }}
                >
                  <Picker.Item label="YES" value="YES" />
                  <Picker.Item label="NO" value="NO" />
                </Picker>
              </View>
            </View>

            <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
              <Text style={styles.settingName}>Remarks</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      height: 80,
                      fontSize: 18,
                      borderColor:
                        billDetails.remarks === "" && submitPage2
                          ? "red"
                          : "#888",
                    },
                  ]}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(val) =>
                    setBillDetails({ ...billDetails, remarks: val })
                  }
                  value={billDetails.remarks}
                />
              </View>
            </View>

            <View
              style={[
                styles.mainBoxItem,
                {
                  flexDirection: "row",
                  marginBottom: 10,
                  justifyContent: "space-between",
                },
              ]}
            >
              <View style={{ width: "49%" }}>
                <Text style={styles.settingName}>In Time</Text>
                <Pressable onPress={() => setTimeShow1(true)}>
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderWidth: 1,
                        backgroundColor: "#ddd",
                        borderColor:
                          inTime === "" && submitPage2 ? "red" : "#888",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: "#555",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {inTime === "" ? "00:00" : inTime}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={{ width: "49%" }}>
                <Text style={styles.settingName}>S. Charges</Text>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={[
                      styles.InputBox,
                      {
                        borderColor:
                          billDetails.service_charges === "" && submitPage2
                            ? "red"
                            : "#888",
                      },
                    ]}
                    onChangeText={(val) =>
                      setBillDetails({ ...billDetails, service_charges: val })
                    }
                    value={billDetails.service_charges}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              {/* <View style={[styles.mainBoxItem,{width:'50%'}]}>
                <Text style={styles.settingName}>Out Time</Text>
                <Pressable onPress={()=>setTimeShow2(true)}>
                    <View  style={[styles.signIn,{
                    borderColor: '#888',
                    borderWidth:1,
                    backgroundColor:'#fff',
                    borderColor:'#888'
                    }]} >
                    <Text style={{color:'#555',fontSize:16,fontWeight:'bold'}}>{outTime===""?'00:00':outTime}</Text>
                    </View>
                </Pressable>
            </View> */}
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Payment Method</Text>
              <View
                style={{
                  borderColor: "#888",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Picker
                  selectedValue={billDetails.payment_method}
                  onValueChange={(itemValue) => {
                    if (itemValue == "Free Service") {
                      setBillDetails({
                        ...billDetails,
                        service_charges: "0",
                        payment_method: itemValue,
                      })
                    } else {
                      setBillDetails({
                        ...billDetails,
                        payment_method: itemValue,
                      })
                    }
                  }}
                >
                  <Picker.Item label="Free Service" value="Free Service" />
                  <Picker.Item label="Cash" value="Cash" />
                  <Picker.Item label="Credit" value="Credit" />
                  <Picker.Item label="AMC" value="AMC" />
                  <Picker.Item label="Calls Pending" value="Calls Pending" />
                </Picker>
              </View>
            </View>

            {billDetails.payment_method === "Calls Pending" ? (
              <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
                <Text style={styles.settingName}>Calls Pending Reason</Text>
                <View>
                  <TextInput
                    style={[
                      styles.InputBox,
                      {
                        height: 80,
                        fontSize: 18,
                        borderColor:
                          billDetails.pending_reason === "" && submitPage2
                            ? "red"
                            : "#888",
                      },
                    ]}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(val) =>
                      setBillDetails({ ...billDetails, pending_reason: val })
                    }
                    value={billDetails.pending_reason}
                  />
                </View>
              </View>
            ) : (
              <View style={{ height: 20 }}></View>
            )}
            {!keyboardStatus ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  style={{ width: "45%" }}
                  onPress={() => {
                    setPageView(1)
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="arrow-left"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#000"
                    />
                    <Text
                      style={[
                        styles.textSign,
                        { alignSelf: "center", color: "#000" },
                      ]}
                    >
                      {" "}
                      BACK
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{ width: "45%" }}
                  onPress={() => {
                    thirdSUBMIT()
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        backgroundColor: "#16233f",
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        { alignSelf: "center", color: "#fff" },
                      ]}
                    >
                      NEXT{" "}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#fff"
                    />
                  </View>
                </Pressable>
              </View>
            ) : null}
          </ScrollView>
        </>
      ) : null}
      {pageView == 3 ? (
        <>
          <ScrollView
            style={{ marginBottom: keyboardStatus ? 0 : 80, width: "100%" }}
          >
            {/* signature */}
            <View style={[styles.mainBoxItem, { paddingBottom: 10 }]}>
              <Text style={styles.settingName}>S.Eng Signature </Text>
              <View>
                {serSign == null ? (
                  <Link
                    href={{
                      pathname: "Bill/Sign",
                      params: { title: "S. Eng Sign", type: "ser" },
                    }}
                    // onPress={() =>
                    //   navigation.navigate("Sign", {
                    //     title: "S. Eng Sign",
                    //     type: "ser",
                    //   })
                    // }
                    style={{
                      width: "100%",
                      height: 90,
                      backgroundColor: "#a1a7b6",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Link
                    href={{
                      pathname: "Bill/Sign",
                      params: { title: "S. Eng Sign", type: "ser" },
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 10,
                    }}
                  >
                    <Image style={styles.SignImage} source={{ uri: serSign }} />
                  </Link>
                )}
              </View>
            </View>

            {user.name == "HO" || user.name == "BO" ? (
              <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
                <Text style={styles.settingName}>
                  S.Eng Signature Signed by
                </Text>
                <View>
                  <TextInput
                    style={[
                      styles.InputBox,
                      {
                        borderColor: "#888",
                      },
                    ]}
                    onChangeText={(val) => setHOSignName(val)}
                    value={ho_sign_name}
                  />
                </View>
              </View>
            ) : null}

            <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
              <Text style={styles.settingName}>Technicians</Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor: "#888",
                    },
                  ]}
                  onChangeText={(val) => setServicePersons(val)}
                  value={service_persons}
                />
              </View>
            </View>

            <View style={styles.mainBoxItem}>
              <Text style={styles.settingName}>Customer Signature</Text>
              <View>
                {cusSign == null ? (
                  <Link
                    href={{
                      pathname: "Bill/Sign",
                      params: { title: "Customer Sign", type: "cus" },
                    }}
                    style={{
                      width: "100%",
                      height: 90,
                      backgroundColor: "#a1a7b6",
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <Link
                    href={{
                      pathname: "Bill/Sign",
                      params: { title: "Customer Sign", type: "cus" },
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "#888",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      style={[styles.SignImage, { borderRadius: 10 }]}
                      source={{ uri: cusSign }}
                    />
                  </Link>
                )}
              </View>
            </View>

            <View style={[styles.mainBoxItem, { paddingBottom: 15 }]}>
              <Text style={styles.settingName}>
                Customer Signature Signed by
              </Text>
              <View>
                <TextInput
                  style={[
                    styles.InputBox,
                    {
                      borderColor: "#888",
                    },
                  ]}
                  onChangeText={(val) =>
                    setBillDetails({ ...billDetails, signed_by: val })
                  }
                  value={billDetails.signed_by}
                />
              </View>
            </View>
            {!keyboardStatus ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // position: "absolute",
                  // bottom: 20,
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  style={{ width: "45%" }}
                  onPress={() => {
                    setPageView(2)
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="arrow-left"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color="#000"
                    />
                    <Text
                      style={[
                        styles.textSign,
                        { alignSelf: "center", color: "#000" },
                      ]}
                    >
                      {" "}
                      BACK
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{ width: "45%" }}
                  onPress={() => {
                    if (
                      billDetails.service_charges != "" &&
                      billDetails.remarks != "" &&
                      billDetails.working_condition != "" &&
                      billDetails.signed_by != "" &&
                      inTime != "" &&
                      serSign != null &&
                      cusSign != null
                    ) {
                      FinalSUBMIT()
                    } else {
                      alert("Please fill the details")
                    }
                  }}
                >
                  <View
                    style={[
                      styles.signIn,
                      {
                        borderColor: "#888",
                        borderWidth: 1,
                        backgroundColor:
                          billDetails.service_charges != "" &&
                          billDetails.remarks != "" &&
                          inTime != "" &&
                          cusSign != null &&
                          serSign != null &&
                          billDetails.signed_by != ""
                            ? "#16233f"
                            : "#ccc",
                        marginTop: 10,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          alignSelf: "center",
                          color:
                            billDetails.service_charges != "" &&
                            billDetails.remarks != "" &&
                            inTime != "" &&
                            cusSign != null &&
                            serSign != null &&
                            billDetails.signed_by != ""
                              ? "#fff"
                              : "#000",
                        },
                      ]}
                    >
                      SUBMIT{" "}
                    </Text>
                    <MaterialCommunityIcons
                      name="file"
                      style={{ alignSelf: "center" }}
                      size={18}
                      color={
                        billDetails.service_charges != "" &&
                        billDetails.remarks != "" &&
                        inTime != "" &&
                        cusSign != null &&
                        serSign != null &&
                        billDetails.signed_by != ""
                          ? "#fff"
                          : "#000"
                      }
                    />
                  </View>
                </Pressable>
              </View>
            ) : null}
          </ScrollView>
        </>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    //   flex: 1,
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ddd",
  },
  mainBoxItem: {
    flexDirection: "column",
    // alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  settingName: {
    color: "#000",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    textShadowColor: "#ddd",
    textShadowRadius: 15,
    marginTop: 10,
  },
  InputBox: {
    borderColor: "#888",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 20,
    height: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  SignImage: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
  },
  textSign: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
