import Container from "./Components/Container";
import Footer from "./Components/Footer";
import Intro from "./Components/Intro";
import SmallScreen from "./Components/SmallScreen";
import { ComponentTreeProvider } from "./Providers/ComponentTreeProvider";

function App() {
  return (
    <div className="flex justify-center xs:px-6 sm:px-6 px-20 py-5">
      <ComponentTreeProvider>
        <div className="flex flex-col w-full gap-5">
          <Intro className="xs:hidden" />
          <Container className="xs:hidden" />
          <SmallScreen className="xs:block hidden" />
          <Footer />
        </div>
      </ComponentTreeProvider>
    </div>
  );
}

export default App;
