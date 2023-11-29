import FipePage from "@/components/FipePage";
import { MyContextProvider } from "@/context/context";
export default function Home() {
  return (
    <MyContextProvider>
      <FipePage />
    </MyContextProvider>
  );
}
