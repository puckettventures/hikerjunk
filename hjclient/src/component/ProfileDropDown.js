import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProfileDropDown = Props => (
	<Dropdown item text={"Welcome " + Props.UserName}>
		<Dropdown.Menu>
			<Dropdown.Item>
				<Link to="/logout"><Icon name="external" /> Logout</Link>
			</Dropdown.Item>
			<Dropdown.Item>
				<Link to="/profile"><Icon name="user" /> Profile</Link>
			</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
);

export default ProfileDropDown;
