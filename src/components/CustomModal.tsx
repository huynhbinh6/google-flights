import { colors } from "@utils/colors";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import Input from "./Input";
import { Ionicons } from "@expo/vector-icons";
import { set } from "@react-native-firebase/database";
import { LocationData, Place } from "@screens/search/types";
import { useSearchStore } from "@middleware/searchStore";
import { debounce } from "lodash";

const { height } = Dimensions.get("window");

export type CustomModalRef = {
  open: (data: any, onItemSelected?: (result: Place) => void) => void;
  close: () => void;
};

const CustomModal = forwardRef<CustomModalRef>((_, ref) => {
  const { query, setQuery, search, results } = useSearchStore();
  const [visible, setVisible] = useState(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [payload, setPayload] = useState<Place[]>();
  const [onSubmitCallback, setOnSubmitCallback] = useState<
    ((res: any) => void) | null
  >(null);

  const open = useCallback(
    (data: Place[], onItemSelected?: (result: Place) => void) => {
      setPayload(data);
      setOnSubmitCallback(() => onItemSelected);
      setVisible(true);
      setTrigger(false);
    },
    []
  );

  const close = useCallback(() => {
    setVisible(false);
    setTrigger(false);
    setOnSubmitCallback(null);
  }, []);

  const handleConfirm = (result: any) => {
    if (onSubmitCallback) {
      onSubmitCallback(result);
    }
    setTrigger(false);
    setQuery("");
    close();
  };

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  const debouncedSearch = useCallback(
    debounce(() => {
      search();
    }, 500),
    []
  );

  const handleTextChange = (text: string) => {
    setQuery(text);
    setTrigger(true);
    debouncedSearch();
  };

  return (
    <View>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              marginBottom: 10,
              backgroundColor: colors.primary,
              padding: 14,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              paddingBottom: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Input
                  value={query}
                  placeholder="Finding flights..."
                  leftIcon={
                    <Ionicons name="search" size={18} color={colors.gray} />
                  }
                  onChangeText={handleTextChange}
                />
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 14, flex: 1 }}>
            <FlatList
              data={trigger ? results : payload}
              keyExtractor={(item) => item.navigation.entityId}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handleConfirm(item)}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.black,
                      paddingVertical: 10,
                      fontWeight: "400",
                    }}
                  >
                    {item.presentation.suggestionTitle}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 1, backgroundColor: colors.borderInput }}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: height * 0.9,
    backgroundColor: colors.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeText: {
    marginBottom: 15,
    fontSize: 16,
    color: colors.white,
    fontWeight: "600",
  },
});
export default CustomModal;
