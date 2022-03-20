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
	});

	useEffect(() => {
		/// useEffect para simular una respuesta del backen
		console.log("comprobando clave");
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
					});
					// setLoading(false)
					// setError(false)
				}
			}, 2000); /// si loading es true, 3sg despues poner en falso.
		}
	}, [state.loading]);
	console.log(state.error);
	return (
		<div>
			<h2>Eliminar {name}</h2>
			<p>
				Por favor, escribe el codigo de seguridad para comprobar que quieres eleminar
				esta seccion
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
}

export { UseState };
