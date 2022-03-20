import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
	const [state, setState] = useState({
		value: "",
		error: false,
		loading: false,
		deleted: false, 
		confirmed: false, 
	});

	const onConfirm = () => {
		setState({
			...state,
			error: false,
			loading: false,
			confirmed: true,
		});
	};

	const onError = () => {
		setState({
			...state,
			error: true,
			loading: false,
		});
	};

	const onWrite = (event) => {
		setState({
			...state,
			value: event.target.value,
		});
	};

	const onCheck = () => {
		setState({
			...state,
			loading: true,
		});
	};

	const onDelete = () => {
		setState({
			...state,
			deleted: true,
		});
	};

	const onReset = () => {
		setState({
			...state,
			confirmed: false,
			deleted: false,
			value: "",
		});
	};

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

export { UseState };
