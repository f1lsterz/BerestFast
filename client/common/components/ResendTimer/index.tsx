import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import style from "./style";

const ResendTimer = () => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
    }
  };

  return (
    <View>
      {canResend ? (
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={style.descriptionText}>Відправити код ще раз</Text>
        </TouchableOpacity>
      ) : (
        <Text style={style.descriptionText}>
          Повторна відправка через {timer} сек
        </Text>
      )}
    </View>
  );
};

export default ResendTimer;
