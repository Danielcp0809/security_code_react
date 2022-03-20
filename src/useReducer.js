import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

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
// const reducerIf = (state, action) => {
// 	/// comparamos con un nombre clave del estado
// 	if (action.type === "ERROR") {
// 		return {
// 			/// tenemos que retornar un objeto !importante
// 			...state,
// 			error: true,
// 			loading: false,
// 		};
// 	} else if (action.type === "CHECK") {
// 		return {
// 			...state,
// 			loading: true,
// 		};
// 	} else {
// 		/// si el action.type no cumple con ninguna de las palabras clave
// 		return state;
// 	}
// };

/// 2da forma
// const reducerSwith = (state, action) => {
// 	switch (action.type) {
// 		case "ERROR":
// 			return {
// 				/// tenemos que retornar un objeto !importante
// 				...state,
// 				error: true,
// 				loading: false,
// 			};
// 		case "CHECK":
// 			return {
// 				...state,
// 				loading: true,
// 			};
// 		default:
// 			return { ...state };
// 	}
// };

/// 3ra forma (reducerObject + reducerFunction)
const reducerObject = (state, action) => ({
	[actionTypes.confirm]: {
		...state,
		error: false,
		loading: false,
		confirmed: true,
	},
	[actionTypes.error]: {
		...state,
		error: true,
		loading: false,
	},
	[actionTypes.write]: {
		...state,
		value: action.payload,
	},
	[actionTypes.check]: {
		...state,
		loading: true,
	},
	[actionTypes.delete]: {
		...state,
		deleted: true,
	},
	[actionTypes.reset]: {
		...state,
		confirmed: false,
		deleted: false,
		value: "",
	},
});

const reducerFunction = (state, action) => {
	if (reducerObject(state, action)[action.type]) {
		return reducerObject(state, action)[action.type];
	} else {
		return { ...state };
	}
};

const actionTypes = {
	confirm: "CONFIRM",
	error: "ERROR",
	check: "CHECK",
	write: "WRITE",
	delete: "DELETE",
	reset: "RESET",
};

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
	// estado compuesto usando useState

	// const [state, setState] = useState({
	// 	value: "",
	// 	error: false,
	// 	loading: false,
	// 	deleted: false, // mostrar la pantalla de elimado con exito
	// 	confirmed: false, // para pasar a la pantalla de confirmacion
	// });

	// useReducer
	const [state, dispatch] = React.useReducer(reducerFunction, initialState);

	const onConfirm = () => {
		/// cuando queramos pasar al estado de confirmacion
		dispatch({
			type: actionTypes.confirm,
		});
	};

	const onError = () => {
		/// cuando queramos pasar al estado de errpr
		dispatch({
			type: actionTypes.error,
		});
	};

	const onWrite = (event) => {
		/// estado de cambio en el input
		dispatch({
			type: actionTypes.write,
			payload: event.target.value,
		});
	};

	const onCheck = () => {
		/// estado de comprobacion del codigo
		dispatch({
			type: actionTypes.check,
		});
	};

	const onDelete = () => {
		/// estado de confirmar la eliminacion del componente
		dispatch({
			type: actionTypes.delete,
		});
	};

	const onReset = () => {
		/// volver al estado original
		dispatch({
			type: actionTypes.reset,
		});
	};

	useEffect(() => {
		/// useEffect para simular una respuesta del backen
		if (!!state.loading) {
			setTimeout(() => {
				if (state.value !== SECURITY_CODE) {
					onError();
				} else {
					onConfirm();
				}
			}, 2000); /// si loading es true, 3sg despues poner en falso.
		}
	}, [state.loading]);
	if (!state.deleted && !state.confirmed) {
		return (
			<div>
				<h2>Eliminar {name}</h2>
				<p>
					Por favor, escribe el codigo de seguridad para comprobar que quieres
					eleminar esta seccion
				</p>
				{state.loading && (
					<div>
						<CircularProgress />
						<p>Loading...</p>
					</div>
				)}
				{!state.loading && state.error && <p>Error: El codigo es incorrecto</p>}
				<input
					placeholder="Codigo de seguridad"
					value={state.value}
					onChange={onWrite}
				/>
				<button onClick={onCheck}>Comprobar</button>
			</div>
		);
	} else if (!state.deleted && state.confirmed) {
		return (
			<React.Fragment>
				<h2>Eliminar {name}</h2>
				<p>Estas seguro que quieres eliminar {name}?</p>
				<button onClick={onDelete}>Si, eliminar</button>
				<button onClick={onReset}>No, volver</button>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<h2>{name} fue eliminado</h2>
				<button onClick={onReset}>Recuperar {name}</button>
			</React.Fragment>
		);
	}
}

export { UseReducer };
