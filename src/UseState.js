import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		/// useEffect para simular una respuesta del backen
		if (loading) {
			setTimeout(() => {
				setValue("");
				if (value !== SECURITY_CODE) {
					setError(true);
				}
				setLoading(false);
			}, 2000); /// si loading es true, 3sg despues poner en falso.
		}
	}, [loading]);

	return (
		<div>
			<h2>Eliminar {name}</h2>
			<p>
				Por favor, escribe el codigo de seguridad para comprobar que quieres eleminar
				esta seccion
			</p>
			{loading && (
				<div>
					<CircularProgress />
					<p>Loading...</p>
				</div>
			)}
			{!loading && error && <p>Error: El codigo es incorrecto</p>}
			<input
				placeholder="Codigo de seguridad"
				onChange={(event) => {
					setValue(event.target.value);
				}}
			/>
			<button
				onClick={() => {
					setLoading(true);
				}}
			>
				Comprobar
			</button>
		</div>
	);
}

export { UseState };
