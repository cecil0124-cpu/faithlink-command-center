import { roleOptions } from '../config/rolesConfig'

function RoleSwitcher({ currentRoleId, onRoleChange, realRole }) {
  const canPreview = !realRole || realRole === 'admin'

  return (
    <label className="role-switcher">
      <span>Role Preview</span>
      <select disabled={!canPreview} onChange={(event) => onRoleChange(event.target.value)} value={currentRoleId}>
        {roleOptions.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>
      <small>{canPreview ? `Real Role: ${realRole || 'loading'}. Preview is local only.` : `Real Role: ${realRole}. Preview locked for this account.`}</small>
    </label>
  )
}

export default RoleSwitcher
