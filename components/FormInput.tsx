import { FC } from "react";
import { Input } from "react-native-elements";

interface FormInputProps {
  id: string;
  deleteInput: (v: string) => void;
}

const FormInput: FC<FormInputProps> = ({ id, deleteInput }) => {
  return (
    <Input
      key={id}
      placeholder="請輸入"
      rightIcon={{
        type: "font-awesome",
        name: "trash",
        color: "#f65757",
        onPress: () => deleteInput(id),
      }}
    />
  );
};
export default FormInput;
