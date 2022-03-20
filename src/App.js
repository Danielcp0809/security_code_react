// import { UseReducer } from "./useReducer";
import "./App.css";
import { ClassState } from "./ClassState.js";
import { UseState } from "./UseState.js";

function App() {
	return (
		<div className="App">
			<UseState name="Use State" />
			<ClassState name="Class State" />
			{/* <UseReducer name="Use Reducer" /> */}
		</div>
	);
}

export default App;
