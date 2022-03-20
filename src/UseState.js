import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);
	// const [value, setValue] = useState("");
	// estado compuesto usando useState
	const [state, setState] = useState({
		value: "",
		error: false,
		loading: false,
		deleted: false, // mostrar la pantalla de elimado con exito
		confirmed: false, // para pasar a la pantalla de confirmacion
	});

	useEffect(() => {
		/// useEffect para simular una respuesta del backen
		if (!!state.loading) {
			setTimeout(() => {
				if (state.value !== SECURITY_CODE) {
					setState({
						...state,
						error: true,
						loading: false,
					});
					// setError(true)
					// setLoading(false)
				} else {
					setState({
						...state,
						error: false,
						loading: false,
						confirmed: true,
					});
					// setLoading(false)
					// setError(false)
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
					onChange={(event) => {
						setState({
							...state,
							value: event.target.value,
						});
						// setValue(event.target.value)
					}}
				/>
				<button
					onClick={() => {
						setState({
							...state,
							loading: true,
						});
						// setLoading(true)
					}}
				>
					Comprobar
				</button>
			</div>
		);
	} else if (!state.deleted && state.confirmed) {
		return (
			<React.Fragment>
				<h2>Eliminar {name}</h2>
				<p>Estas seguro que quieres eliminar {name}?</p>
				<button
					onClick={() => {
						setState({
							...state,
							deleted: true,
						});
					}}
				>
					Si, eliminar
				</button>
				<button
					onClick={() => {
						setState({
							...state,
							confirmed: false,
							value: "",
						});
					}}
				>
					No, volver
				</button>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<h2>{name} fue eliminado</h2>
				<button
					onClick={() => {
						setState({
							...state,
							confirmed: false,
							deleted: false,
							value: "",
						});
					}}
				>
					Recuperar {name}
				</button>
			</React.Fragment>
		);
	}
}

export { UseState };
