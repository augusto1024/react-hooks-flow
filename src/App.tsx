import Container from "./Components/Container";
import { ComponentTreeProvider } from "./Providers/ComponentTreeProvider";

function App() {
  return (
    <div className="flex justify-center p-10">
      <ComponentTreeProvider>
        <Container />
      </ComponentTreeProvider>
    </div>
  );
}

export default App;
