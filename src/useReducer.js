const initialState = {
	value: "",
	error: false,
	loading: false,
	deleted: false,
	confirmed: false,
};
/// forma base de un reduce
// const reducer = (state, action) => {

// }

/// FORMAS DE CREAR UN REDUCER
/// 1era forma
const reducerIf = (state, action) => {
	/// comparamos con un nombre clave del estado
	if (action.type === "ERROR") {
		return {
			/// tenemos que retornar un objeto !importante
			...state,
			error: true,
			loading: false,
		};
	} else if (action.type === "CHECK") {
		return {
			...state,
			loading: true,
		};
	} else {
		/// si el action.type no cumple con ninguna de las palabras clave
		return state;
	}
};

/// 2da forma
const reducerSwith = (state, action) => {
	switch (action.type) {
		case "ERROR":
			return {
				/// tenemos que retornar un objeto !importante
				...state,
				error: true,
				loading: false,
			};
		case "CHECK":
			return {
				...state,
				loading: true,
			};
		default:
			return {...state};
	}
};

/// 3ra forma (reducerObject + reducerFunction)

const reducerObject = (state, action) => ({
	ERROR: {
		...state,
		error: true,
		loading: false,
	},
	CHECK: {
		...state,
		loading: true,
	},
});

const reducerFunction = (state, action) => {
	if (reducerObject(state)[action.type]) {
		return reducerObject(state)[action.type];
	}else{
		return {...state}
	}
};
