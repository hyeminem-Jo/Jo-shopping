import Header from "./components/Header";
import Footer from "./components/Footer";
import Orders from "./components/Orders";
import Prototypes from "./components/Prototypes";
import AppStateProvider from "./providers/AppStateProvide";

function App() {
  return (
    <AppStateProvider>
    <Header />
    <div className="container">
      <Prototypes />
      <Orders />
      <Footer />
    </div>
    </AppStateProvider>
  );
}

export default App;
