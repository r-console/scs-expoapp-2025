import React, { useRef, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import Signature from "react-native-signature-canvas"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import { setCusSign, setSerSign } from "../context/signSlice"

const HEIGHT = Dimensions.get("window").height
const WIDTH = Dimensions.get("window").width

export default function SignatureScreen() {
  const { type } = useLocalSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { cusSign, serSign } = useSelector((state) => state.sign)
  const [loading, setLoading] = useState(false)

  const [saved, setSaved] = useState(false)
  const ref = useRef(null)

  // Save Signature
  const handleOK = (signature) => {
    setLoading(true)
    console.log("Signature:", signature)
    if (type === "cus") {
      dispatch(setCusSign(signature))
      console.log("Customer Signature Saved")
    }
    if (type === "ser") {
      dispatch(setSerSign(signature))
      console.log("Service Signature Saved")
    }
    setSaved(true)
  }

  // Clear Signature
  const handleClear = () => {
    if (ref.current) {
      ref.current.clearSignature()
      console.log("Signature cleared!")
      setSaved(false)
    }
  }

  // Read Signature Data
  const handleData = (data) => {
    if (ref.current) {
      const s = ref.current.readSignature()
      console.log("Signature Data:", s)
      //   console.log("Customer Sign:", cusSign)
      //   console.log("Service Sign:", serSign)
      //   router.back()
    }

    setTimeout(() => {
      setLoading(true)
      router.back()
    }, 2000)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        {loading && (
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ddd",
              zIndex: 1,
              width: "120%",
              height: "120%",
              opacity: 0.5,
            }}
          >
            <ActivityIndicator
              size="large"
              style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        )}
        <View style={styles.signatureWrapper}>
          <Signature
            ref={ref}
            onOK={handleOK}
            dotSize={3}
            rotated={true}
            webStyle={`
            .m-signature-pad {
              width: 100%;
              height: 100%;
            }
            .m-signature-pad--footer {
              display: none;
              margin: 0px;
            }
          `}
          />
        </View>

        <View style={styles.rotateInfo}>
          <Text style={{ color: "#666" }}>Sign this way</Text>
        </View>

        {saved && (
          <View style={styles.savedInfo}>
            <Text style={{ color: "#666" }}>Signature saved</Text>
          </View>
        )}

        {/* Clear Button */}
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <View style={styles.iconButton}>
            <MaterialCommunityIcons name="close" size={20} color={"#000"} />
          </View>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleData}>
          <View style={styles.iconButton}>
            <MaterialCommunityIcons name="check" size={20} color={"#000"} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signatureWrapper: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
  rotateInfo: {
    position: "absolute",
    top: 50,
    left: -20,
    transform: [{ rotate: "90deg" }],
  },
  savedInfo: {
    position: "absolute",
    top: "45%",
    left: -30,
    transform: [{ rotate: "90deg" }],
  },
  clearButton: {
    position: "absolute",
    left: 15,
    bottom: 95,
    transform: [{ rotate: "90deg" }],
  },
  saveButton: {
    position: "absolute",
    left: 15,
    bottom: 20,
    transform: [{ rotate: "90deg" }],
  },
  iconButton: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 50,
  },
})
