import { roleConfigs } from '../config/rolesConfig'

const firebaseNeeds = {
  pastor_view: 'Read-only claims or profile role plus section-scoped Firestore reads.',
  pastor_contributor: 'Contributor role with create/update rules limited to approved draft sections.',
  prayer_team: 'Prayer request assignment fields, private note rules, and care-team scoped reads.',
  hospitality_team: 'Visitor assignment fields and connect-card rules scoped to hospitality users.',
  media_team: 'Media/service/SOP assignment fields and production workflow write rules.',
  music_team: 'Music/prompt collaboration fields with approved contributor write access.',
  member: 'Authenticated profile plus submit-only prayer request and connect card rules.',
}

const onboardingNotes = {
  pastor_view: 'Use this view for weekly awareness without accidental edits.',
  pastor_contributor: 'Use draft items for sermon, media, website, and planning notes.',
  prayer_team: 'Keep prayer updates focused, current, and private.',
  hospitality_team: 'Use visitor follow-up notes to keep connection steps moving.',
  media_team: 'Review Sunday, livestream, upload, and SOP readiness before service.',
  music_team: 'Capture songs, prompts, lyrics, and release planning in one place.',
  member: 'Future member access should feel simple: submit, receive confirmation, and stay informed.',
}

function TeamViewPrep() {
  const roleIds = ['pastor_view', 'pastor_contributor', 'prayer_team', 'hospitality_team', 'media_team', 'music_team', 'member']

  return (
    <section className="section-page">
      <div className="section-intro">
        <span className="eyebrow">Firebase Prep</span>
        <h2>Team View Prep</h2>
        <p>Local planning cards for future team roles, onboarding, and Firebase permission design.</p>
      </div>

      <div className="team-role-grid">
        {roleIds.map((roleId) => {
          const role = roleConfigs[roleId]
          const enabledActions = Object.entries(role.permissions)
            .filter(([, enabled]) => enabled)
            .map(([key]) => key)

          return (
            <article className="content-panel team-role-card" key={roleId}>
              <div className="panel-heading">
                <span className="eyebrow">Team Role</span>
                <h2>{role.label}</h2>
              </div>
              <p><strong>Can see:</strong> {role.allowedSections.join(', ')}</p>
              <p><strong>Can do:</strong> {enabledActions.join(', ') || 'View only'}</p>
              <p><strong>Firebase later:</strong> {firebaseNeeds[roleId]}</p>
              <p><strong>Onboarding note:</strong> {onboardingNotes[roleId]}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TeamViewPrep
