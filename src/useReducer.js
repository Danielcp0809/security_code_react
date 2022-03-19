import React, { useState } from "react";

function UseReducer({ name }) {
	const [error, setError] = useState(false);
	return (
		<div>
			<h2>Eliminar {name}</h2>
			<p>
				Por favor, escribe el codigo de seguridad para comprobar que quieres eleminar
				esta seccion
			</p>
			{error && <p>Error: El codigo es incorrecto</p>}
			<input placeholder="Codigo de seguridad" />
			<button
				onClick={() => {
					setError((prevState) => !prevState);
				}}
			>
				Comprobar
			</button>
		</div>
	);
}

export { UseReducer };
