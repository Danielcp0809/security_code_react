import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

const initialState = {
	value: "",
	error: false,
	loading: false,
	deleted: false,
	confirmed: false,
};

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
	const [state, dispatch] = React.useReducer(reducerFunction, initialState);

	const onConfirm = () => dispatch({type: actionTypes.confirm});
	const onError = () => dispatch({type: actionTypes.error});
	const onWrite = (event) => dispatch({type: actionTypes.write, payload: event.target.value});
	const onCheck = () => dispatch({type: actionTypes.check});
	const onDelete = () => dispatch({type: actionTypes.delete});
	const onReset = () => dispatch({type: actionTypes.reset});

	useEffect(() => {
		if (!!state.loading) {
			setTimeout(() => {
				if (state.value !== SECURITY_CODE) {
					onError();
				} else {
					onConfirm();
				}
			}, 2000);
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
