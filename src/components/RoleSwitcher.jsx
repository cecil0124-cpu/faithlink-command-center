import { roleOptions } from '../config/rolesConfig'

function RoleSwitcher({ currentRoleId, onRoleChange }) {
  return (
    <label className="role-switcher">
      <span>Role Preview</span>
      <select onChange={(event) => onRoleChange(event.target.value)} value={currentRoleId}>
        {roleOptions.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>
      <small>Local role preview only - real login will be added later.</small>
    </label>
  )
}

export default RoleSwitcher
