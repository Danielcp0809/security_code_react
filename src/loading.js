import { CircularProgress } from "@mui/material";
import React from "react";

class Loading extends React.Component {

    componentWillUnmount(){
        // Este componente se va a ejecutar cuando ya no aparesca en el lugar que fue llamado.
        console.log('Loading se ha desmontado')
    }

	render() {
		return (
			<div>
				<CircularProgress />
				<p>Loading...</p>
			</div>
		);
	}
}

export { Loading };
