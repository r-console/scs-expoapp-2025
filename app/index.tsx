import {
  Image,
  StyleSheet,
  Platform,
  View,
  TextInput,
  Pressable,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import { setUser, clearUser } from "./context/userSlice"
import { useEffect, useState } from "react"
import axios from "axios"
import Services from "@/constants/Services"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setUrl, clearUrl } from "./context/urlSlice"

export default function LoginScreen() {
  const router = useRouter()
  const user = useSelector((state: any) => state.user)
  const [inUrl, setInUrl] = useState("3.108.63.57")
  const dispatch = useDispatch()
  const updateUserDetails = (
    id: any,
    name: any,
    branch: any,
    username: any,
    last_invoice_id: any
  ) => {
    dispatch(
      setUser({
        id: id,
        name: name.toString(),
        branch: branch.toString(),
        username: username.toString(),
        last_invoice_id: parseInt(last_invoice_id),
      })
    )

    dispatch(setUrl(inUrl))
    router.push("/HomeScreen")
  }
  const [username1, setUsername] = useState("")
  const [password1, setPassword] = useState("")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const id = await AsyncStorage.getItem("employee_id")
        const name = await AsyncStorage.getItem("employee_name")
        const branch = await AsyncStorage.getItem("employee_branch")
        const username = await AsyncStorage.getItem("username")
        const last_invoice_id = await AsyncStorage.getItem("last_invoice_id")

        if (name != null) {
          updateUserDetails(id, name, branch, username, last_invoice_id)
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
        // error reading value
      }
    }
    getData()
  }, [])

  const [submit, setSubmit] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)

  const [myLocation, setMyLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  const storeData = async (
    id: Number,
    name: String,
    branch: String,
    lastInvoiceId: Number
  ) => {
    try {
      await AsyncStorage.setItem("employee_id", id.toString())
      await AsyncStorage.setItem("employee_name", name.toString())
      await AsyncStorage.setItem("employee_branch", branch.toString())
      await AsyncStorage.setItem("username", username1)
      await AsyncStorage.setItem("last_invoice_id", lastInvoiceId.toString())

      updateUserDetails(id, name, branch, username1, lastInvoiceId)

      router.push("/HomeScreen")
    } catch (e) {
      console.log("Unable to save async data")
    }
  }

  const LoginToApp = async () => {
    console.log("login")
    setSubmit(true)
    if (username1 != "" && password1 != "") {
      // const loc = await GetMyLocation()
      const loc = true
      console.log(loc)
      if (true) {
        console.log("login2")
        setLoginStatus(true)
        axios
          .post(Services.LOGIN(), {
            username: username1,
            password: password1,
          })
          .then((response) => {
            if (response.data.status === 200) {
              setLoginStatus(true)
              console.log(response.data)
              storeData(
                response.data.userData.id,
                response.data.userData.name,
                response.data.userData.branch,
                response.data.userData.last_invoice_id
              )
              let curDate = new Date()
              axios
                .post(Services.LOGIN_LOCATION(), {
                  loginLocation: {
                    emp_id: response.data.userData.id,
                    lat: myLocation.latitude,
                    lng: myLocation.longitude,
                    log_status: "login",
                    log_date: curDate.toISOString().split("T")[0],
                    log_time: curDate.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }),
                  },
                })
                .then((res) => {
                  console.log(res.data)
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              setLoginStatus(false)
              alert("Username or Password is incorrect")
            }
          })
          .catch((error) => {
            setLoginStatus(false)
            alert(
              "Something wrong!!.Please check your username, password and internet connection"
            )
            console.log(error)
            ToastAndroid.show("Try Again", ToastAndroid.SHORT)
          })
      } else {
        ToastAndroid.show("Try Again", ToastAndroid.SHORT)
      }
    } else {
      setErrorMsg(true)
    }
  }

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#A1CEDC" />
          <Text style={{ color: "#A1CEDC" }}>Loading.....</Text>
        </View>
      ) : (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.reactLogo}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">SCS Login</ThemedText>
            {/* <HelloWave /> */}
          </ThemedView>

          <TextInput
            style={styles.InputBox}
            onChangeText={(val) => {
              setInUrl(val)
              dispatch(setUrl(val))
            }}
            autoCapitalize="none"
            placeholder="url"
            returnKeyType="next"
            defaultValue={inUrl}
          />

          <View>
            <TextInput
              style={styles.InputBox}
              onChangeText={(val) => setUsername(val)}
              autoCapitalize="none"
              placeholder="Username"
              returnKeyType="next"
            />
          </View>
          <View>
            <TextInput
              style={styles.InputBox}
              onChangeText={(val) => setPassword(val)}
              autoCapitalize="none"
              placeholder="Password"
              returnKeyType="next"
            />
          </View>
          <View style={{ width: "100%" }}>
            <Pressable
              style={{
                width: "100%",
              }}
              onPress={LoginToApp}
            >
              {/* <Link href={{ pathname: "/HomeScreen" }} style={styles.textSign}> */}
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
                <Text style={styles.textSign}>LOGIN </Text>
                <MaterialCommunityIcons
                  name="login-variant"
                  style={{ alignSelf: "center" }}
                  size={20}
                  color="#fff"
                />
              </View>
              {/* </Link> */}
            </Pressable>
          </View>
        </ParallaxScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  InputBox: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 20,
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 3,
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
