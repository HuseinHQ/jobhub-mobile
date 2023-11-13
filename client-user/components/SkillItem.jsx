import { View, Text } from "react-native";

export default function SkillItem({ skill }) {
  return (
    <View className="flex-row gap-3">
      <Text className="text-slate-800 font-extrabold col-span-1">{"\u2022"}</Text>
      <Text className="text-slate-800 text-sm col-span-9">
        {skill.name} - {skill.level}
      </Text>
    </View>
  );
}
