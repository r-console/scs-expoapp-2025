import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "./context/userSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen() {
  const user = useSelector((state: any) => state.user)
  const url = useSelector((state: any) => state.url)
  const dispatch = useDispatch()

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("employee_id")
      await AsyncStorage.removeItem("employee_name")
      await AsyncStorage.removeItem("employee_branch")
      await AsyncStorage.removeItem("username")
      await AsyncStorage.removeItem("last_invoice_id")
      dispatch(clearUser())
      router.back()
    } catch (e) {
      console.log("Unable to delete async data")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleName}>SREE CHAKRA SEWING SYSTEMS</Text>
        <Text>{`\n`}</Text>
        {/* <View>
          <Text style={styles.text}>Id: {user.id}</Text>
          </View> */}
        <View>
          <Text style={styles.text}>Name: {user.name}</Text>
        </View>

        <Text>{`\n`}</Text>
        {/* <View>
          <Text style={styles.text}>Username: {user.username}</Text>
        </View>
        <Text style={styles.text}>Last invoice id: {user.last_invoice_id}</Text> */}
        {/* <HelloWave /> */}
      </View>
      <Link
        href={{ pathname: "/Bill", params: { id: "123", name: "John" } }}
        style={styles.textSign}
      >
        <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 40 }}>
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
            <Text style={styles.textSign}>Add New Bill </Text>
            <MaterialCommunityIcons
              name="file"
              style={{ alignSelf: "center" }}
              size={20}
              color="#fff"
            />
          </View>
        </View>
      </Link>

      <TouchableOpacity
        style={{
          width: "50%",
          paddingHorizontal: 40,
          bottom: 20,
          position: "absolute",
        }}
        onPress={() => deleteData()}
      >
        <View
          style={[
            styles.signIn,
            {
              borderWidth: 1,
              borderColor: "#16233f",
              marginTop: 10,
              flexDirection: "row",
            },
          ]}
        >
          <Text style={[styles.textSign, { color: "16233f" }]}>Logout</Text>
          <MaterialCommunityIcons
            name="login-variant"
            style={{ alignSelf: "center", marginLeft: 10 }}
            size={20}
            color="#16233f"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
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
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  titleName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
})
