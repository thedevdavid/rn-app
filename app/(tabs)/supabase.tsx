import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { supabase } from "@/utils/supabase";

export default function TabTwoScreen() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { data: employees, error } = await supabase
          .from("employees")
          .select();

        if (error) {
          console.error("Error fetching employees: ", error.message);
          return;
        }

        if (employees && employees.length > 0) {
          setEmployees(employees);
        }
      } catch (error) {
        console.error("Error fetching employees: ", error);
      }
    };

    getEmployees();
  }, []);

  console.log("employees");
  console.log(employees);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedText key={item.id}>{item.name}</ThemedText>
        )}
      />
    </View>
  );
}
