import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
	// estado compuesto usando useState
	const [state, setState] = useState({
		value: "",
		error: false,
		loading: false,
		deleted: false, // mostrar la pantalla de elimado con exito
		confirmed: false, // para pasar a la pantalla de confirmacion
	});

	const onConfirm = () => {
		/// cuando queramos pasar al estado de confirmacion
		setState({
			...state,
			error: false,
			loading: false,
			confirmed: true,
		});
	};

	const onError = () => {
		/// cuando queramos pasar al estado de errpr
		setState({
			...state,
			error: true,
			loading: false,
		});
	};

	const onWrite = (event) => {
		/// estado de cambio en el input
		setState({
			...state,
			value: event.target.value,
		});
	};

	const onCheck = () => {
		/// estado de comprobacion del codigo
		setState({
			...state,
			loading: true,
		});
	};

	const onDelete = () => {
		/// estado de confirmar la eliminacion del componente
		setState({
			...state,
			deleted: true,
		});
	};

	const onReset = () => {
		/// volver al estado original
		setState({
			...state,
			confirmed: false,
			deleted: false,
			value: "",
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

export { UseState };
