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
} from "react-native";
import Modal from "react-native-modal";

const { height } = Dimensions.get("window");

export type PassengerData = {
  adult: number;
  child: number;
  infant: number;
};

export type PassengerModalRef = {
  open: (
    initial: PassengerData,
    onSubmit?: (result: PassengerData) => void
  ) => void;
  close: () => void;
};

const PassengerModal = forwardRef<PassengerModalRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [onSubmitCallback, setOnSubmitCallback] = useState<
    ((res: PassengerData) => void) | null
  >(null);
  const [passengers, setPassengers] = useState<PassengerData>({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const open = useCallback(
    (data: PassengerData, onSubmit?: (result: PassengerData) => void) => {
      setPassengers(data);
      setOnSubmitCallback(() => onSubmit);
      setVisible(true);
    },
    []
  );

  const close = useCallback(() => {
    setVisible(false);
    setOnSubmitCallback(null);
  }, []);

  const updatePassenger = (type: keyof PassengerData, delta: number) => {
    setPassengers((prev) => {
      const updated = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      if (type === "infant" && updated.infant > updated.adult) {
        updated.infant = updated.adult; // infants ≤ adults rule
      }
      return updated;
    });
  };

  const handleConfirm = () => {
    if (onSubmitCallback) {
      onSubmitCallback(passengers);
    }
    close();
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const renderCounter = (label: string, type: keyof PassengerData) => (
    <View style={styles.counterRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => updatePassenger(type, -1)}>
          <Text style={styles.controlBtn}>−</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{passengers[type]}</Text>
        <TouchableOpacity onPress={() => updatePassenger(type, 1)}>
          <Text style={styles.controlBtn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Modal
        isVisible={visible}
        onBackdropPress={close}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Passengers</Text>

          {renderCounter("Adults", "adult")}
          {renderCounter("Children", "child")}
          {renderCounter("Infants", "infant")}

          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
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
    height: height * 0.5,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: colors.black,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlBtn: {
    fontSize: 24,
    color: colors.primary,
    paddingHorizontal: 14,
  },
  count: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 6,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PassengerModal;
