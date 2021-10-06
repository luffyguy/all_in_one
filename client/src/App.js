import { Switch, Route } from "react-router-dom";

//components
import Home from "./components/Home/Home";

import CloudinaryUpload from "./components/cloudinary/upload";
import CloudinaryImages from "./components/cloudinary/images";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cloudinary/upload" component={CloudinaryUpload} />
        <Route path="/cloudinary/images" component={CloudinaryImages} />
      </Switch>
    </div>
  );
}

export default App;
