import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditServerMember } from "../../store/serverMembers";
import "./RoleEdit.css"


const RoleEdit = ({member, onChange, serverId, endEditRole}) => {
    let dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    let [role, setRole] = useState(member.role)

    const changeRole = (e) => {
        e.preventDefault()
        member.role = role
        let editMembership = dispatch(thunkEditServerMember(serverId, member.id, member))
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors);
        })
        onChange(false)
        endEditRole()
    }

    const cancelChange = (e) => {
        e.preventDefault()
        endEditRole()
    }

    return (
        <div className="edit-role-div">
        <form onSubmit={changeRole} className="edit-role-form">
				<select
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className="role-input"
				>
                    <option value="admin">admin</option>
                    <option value="member">member</option>
                    <option value="pending">pending</option>
                </select>
		</form>
        <div className="role-button">
            <button type="submit" className="cancel-role-button" onClick={cancelChange}>Cancel</button>
            <button type="submit" className="save-role-button" onClick={changeRole}>Save</button>
        </div>
        </div>
    )
}

export default RoleEdit
