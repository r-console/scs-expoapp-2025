import React, { useContext } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  BackHandler,
} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import PDFView from "react-native-view-pdf"
// import Share from "react-native-share"
// import RNFetchBlob from "rn-fetch-blob"
import { useSelector } from "react-redux"

const ViewBillPdf = () => {
  const { pdfPath, clearSigns } = useSelector((state) => state.sign)

  const resources = {
    file: pdfPath,
    // url: props.pdfPath,
    // base64: 'JVBERi0xLjMKJcfs...',
  }
  const resourceType = "file"

  const ShareBill = () => {
    RNFetchBlob.fs
      .readFile(pdfPath, "base64")
      .then(async (base64Data) => {
        base64Data = `data:application/pdf;base64,` + base64Data
        // await Share.open({ url: base64Data })
        // remove the image or pdf from device's storage
        await RNFS.unlink(filePath)
      })
      .catch((err) => {})
  }

  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.navigate("Main")
    return true
  })

  return (
    <>
      <PDFView
        style={{ width: "100%", height: "100%", marginTop: 60 }}
        fadeInDuration={250.0}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={(error) => console.log("Cannot render PDF", error)}
      />

      <View style={styles.headerBox}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#ccd0d5"}
          style={styles.back_icon_box}
          onPress={() => {
            clearSigns()
            navigation.navigate("Main")
          }}
        >
          <MaterialCommunityIcons name="arrow-left" size={25} />
        </TouchableHighlight>
        <Text
          style={{
            flex: 1,
            padding: 0,
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Bill PDF
        </Text>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.shareBtn} onPress={ShareBill}>
          <MaterialCommunityIcons name="share" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </>
  )
}
export default ViewBillPdf
const styles = StyleSheet.create({
  bottomButton: {
    position: "absolute",
    right: 20,
    bottom: 10,
    margin: 20,
    borderRadius: 50,
  },
  shareBtn: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  headerBox: {
    position: "absolute",
    // marginTop: Platform.OS === 'ios' ? 40 : 25,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    height: 55,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 10,
    top: 28,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
})
