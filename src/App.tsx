import Container from "./Components/Container";
import Intro from "./Components/Intro";
import { ComponentTreeProvider } from "./Providers/ComponentTreeProvider";

function App() {
  return (
    <div className="flex justify-center px-20 py-5">
      <ComponentTreeProvider>
        <div className="flex flex-col w-full gap-5">
          <Intro />
          <Container />
        </div>
      </ComponentTreeProvider>
    </div>
  );
}

export default App;
