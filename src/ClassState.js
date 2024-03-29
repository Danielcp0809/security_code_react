import { CircularProgress } from "@mui/material";
import React from "react";
import { Loading } from "./loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			error: false,
			loading: false,
		};
	}
	componentDidUpdate() {
		if (this.state.loading) {
			setTimeout(() => {
				if (SECURITY_CODE !== this.state.value) {
					this.setState({ error: true });
				}
				this.setState({ loading: false });
			}, 2000);
		}
	}

	render() {
		const { value, error, loading } = this.state;
		return (
			<div>
				<h2>Eliminar {this.props.name}</h2>
				<p>
					Por favor, escribe el codigo de seguridad para comprobar que quieres
					eleminar esta seccion
				</p>

				{loading && <Loading />}

				{error && !loading && <p>Error: El codigo es incorrecto</p>}

				<input
					placeholder="Codigo de seguridad"
					value={value}
					onChange={(event) => {
						this.setState({ value: event.target.value });
					}}
				/>
				<button
					onClick={() => {
						this.setState({ loading: true });
					}}
				>
					Comprobar
				</button>
			</div>
		);
	}
}

export { ClassState };
