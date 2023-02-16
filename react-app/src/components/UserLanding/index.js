import CMIndex from "../ChannelMessages/CMIndex";
import ServerMembers from "../ServerMembers";
import "./UserLanding.css";

export default function UserLanding({ page }) {
	switch (page) {
		case "channel": {
			return (
				<div className="UserLanding-container">
					{/* <div className="UserLanding-main-content"> */}
					{/* <div className="UserLanding-server-members"> */}
						<CMIndex />
						<ServerMembers />
					{/* </div> */}
					{/* </div> */}
				</div>
			);
		}
		default: {
			return (
				<div className="UserLanding-container">
					{/* <ol>
                <li>welcome page when first logging in</li>
                <li>messages if on server page</li>
                <li>members list if on server page</li>
            </ol> */}
					<div className="UserLanding-main-content">
						<div className="UserLanding-header">

						</div>
						<div className="UserLanding-status">
							{/* adding 2 as placeholder for now */}
							<h2>Online — 2</h2>
						</div>
						{/* making fake friends here :( */}
						<div className="UserLanding-people-list-parent">
							{/* this is the container that holds main content in user landing
            can rename this later! */}
							<div className="UserLanding-people-list-container">
								{/* this holds a single user from the list */}
								<div className="UserLanding-people-list">
									{/* this holds the icon and the username and their status */}
									<div className="UserLanding-user-info-container">
										<div className="UserLanding-user-icon">
											<img
												src="https://qph.cf2.quoracdn.net/main-qimg-752ed13d997193cc6ab3b81f52d18168-lq"
												alt="user landing user icon"
											></img>
										</div>
										<div className="UserLanding-user-name-status-container">
											<div className="UserLanding-user-name">
												Sukuna
											</div>
											<div className="UserLanding-user-status">
												Online
											</div>
										</div>
									</div>
									{/* this holds the message and vertical ellipsis icons for actions */}
									<div className="UserLanding-user-actions-container">
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-message fa-xs"></i>
										</div>
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-ellipsis-vertical"></i>
										</div>
									</div>
								</div>
								{/* this is the second placeholder (chamber) */}
								<div className="UserLanding-people-list">
									<div className="UserLanding-user-info-container">
										<div className="UserLanding-user-icon">
											<img
												src="https://static.wikia.nocookie.net/valorant/images/0/09/Chamber_icon.png"
												alt="user landing user icon"
											></img>
										</div>
										<div className="UserLanding-user-name-status-container">
											<div className="UserLanding-user-name">
												Chamber
											</div>
											<div className="UserLanding-user-status">
												Online
											</div>
										</div>
									</div>
									<div className="UserLanding-user-actions-container">
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-message fa-xs"></i>
										</div>
										<div className="UserLanding-user-actions">
											<i className="fa-solid fa-ellipsis-vertical"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	if (page === "channel") {
		return (
			<div className="UserLanding-container">
				<div className="UserLanding-main-content">
					channel messages go here!
				</div>
			</div>
		);
	}
	return (
		<div className="UserLanding-container">
			{/* <ol>
                <li>welcome page when first logging in</li>
                <li>messages if on server page</li>
                <li>members list if on server page</li>
            </ol> */}
			<div className="UserLanding-main-content">
				<div className="UserLanding-status">
					{/* adding 2 as placeholder for now */}
					<h2>Online — 2</h2>
				</div>
				{/* making fake friends here :( */}
				<div className="UserLanding-people-list-parent">
					{/* this is the container that holds main content in user landing
            can rename this later! */}
					<div className="UserLanding-people-list-container">
						{/* this holds a single user from the list */}
						<div className="UserLanding-people-list">
							{/* this holds the icon and the username and their status */}
							<div className="UserLanding-user-info-container">
								<div className="UserLanding-user-icon">
									<img src="https://qph.cf2.quoracdn.net/main-qimg-752ed13d997193cc6ab3b81f52d18168-lq"></img>
								</div>
								<div className="UserLanding-user-name-status-container">
									<div className="UserLanding-user-name">
										Sukuna
									</div>
									<div className="UserLanding-user-status">
										Online
									</div>
								</div>
							</div>
							{/* this holds the message and vertical ellipsis icons for actions */}
							<div className="UserLanding-user-actions-container">
								<div className="UserLanding-user-actions">
									<i className="fa-solid fa-message fa-xs"></i>
								</div>
								<div className="UserLanding-user-actions">
									<i className="fa-solid fa-ellipsis-vertical"></i>
								</div>
							</div>
						</div>
						{/* this is the second placeholder (chamber) */}
						<div className="UserLanding-people-list">
							<div className="UserLanding-user-info-container">
								<div className="UserLanding-user-icon">
									<img src="https://static.wikia.nocookie.net/valorant/images/0/09/Chamber_icon.png"></img>
								</div>
								<div className="UserLanding-user-name-status-container">
									<div className="UserLanding-user-name">
										Chamber
									</div>
									<div className="UserLanding-user-status">
										Online
									</div>
								</div>
							</div>
							<div className="UserLanding-user-actions-container">
								<div className="UserLanding-user-actions">
									<i className="fa-solid fa-message fa-xs"></i>
								</div>
								<div className="UserLanding-user-actions">
									<i className="fa-solid fa-ellipsis-vertical"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
