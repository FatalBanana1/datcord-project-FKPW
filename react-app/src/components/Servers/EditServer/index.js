import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal.js";
import { thunkGetChannels } from "../../../store/channels.js";
import { thunkUpdateServer } from "../../../store/servers.js";
import "./EditServer.css";

const EditServer = ({ server, theme }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState(server.name);
	const [icon_url, setIconUrl] = useState(server.icon_url);
	const [description, setDescription] = useState(server.description);

	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		const serverToUpdate = {
			id: server.id,
			name,
			icon_url,
			description,
		};
		// .then((data) => {
		//   console.log("DISPATCHING DATA!!!!!!!!=>>>>>>>>", data);
		//   history.push(`/channels/${data.id}/${data.channels[0].id}`);
		// })
		// .then(dispatch(thunkGetChannels(server.id)))

		dispatch(thunkUpdateServer(server.id, serverToUpdate))
			.then(() => closeModal())
			.catch((res) => {
				const data = res;
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div className="create-server-container" id={theme}>
			<div className="create-server-header-container">
				<h1 className="create-server-title">Edit Your Server</h1>
				<div className="create-server-subtext" id={theme}>
					Your server is where you and your friends hang out. Make
					yours and start talking.
				</div>
			</div>
			<form
				className="create-server-form-container"
				onSubmit={handleSubmit}
			>
				<div className="create-server-form-title" id={theme}>Server Name</div>
				<div className="create-server-input" id={theme}>
					<input
						className="input-fields"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						id={theme}
					/>
				</div>
				<div className="create-server-form-title" id={theme}>Img Url</div>
				<div className="create-server-input">
					<input
						className="input-fields"
						type="text"
						value={icon_url}
						onChange={(e) => setIconUrl(e.target.value)}
						required
						id={theme}
					/>
				</div>
				<div className="create-server-form-title" id={theme}>Description</div>
				<div className="create-server-text-area">
					<textarea
						rows="5"
						className="input-fields"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						id={theme}
					/>
				</div>
				<div className="create-server-buttons-container">
					<button
						className="create-server-button-cancel"
						onClick={closeModal}
						id={theme}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="create-server-button-submit"
						id={theme}
					>
						Edit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditServer;
