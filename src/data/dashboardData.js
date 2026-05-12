export const navigationItems = [
  { id: 'overview', label: 'My World Overview' },
  { id: 'sunday', label: 'Sunday Service' },
  { id: 'media', label: 'Media Tasks' },
  { id: 'prayer', label: 'Prayer Requests' },
  { id: 'visitors', label: 'Visitors / Connect Cards' },
  { id: 'music', label: 'Music Projects' },
  { id: 'websites', label: 'Website & App Projects' },
  { id: 'prompts', label: 'AI Prompt Library' },
  { id: 'sops', label: 'Tech SOPs' },
  { id: 'templates', label: 'Templates' },
  { id: 'weeklyReview', label: 'Weekly Review' },
  { id: 'runSheet', label: 'Sunday Run Sheet' },
  { id: 'teamViewPrep', label: 'Team View Prep' },
  { id: 'deployPrep', label: 'Deploy Prep' },
  { id: 'settings', label: 'Settings' },
]

export const editableSectionIds = [
  'sunday',
  'media',
  'prayer',
  'visitors',
  'music',
  'websites',
  'prompts',
  'sops',
]

export const dashboardMeta = {
  lastUpdated: 'May 11, 2026',
}

export const focusCard = {
  title: 'Sunday readiness and follow-up',
  detail: 'Prepare the service checklist, confirm media work, and make sure care items do not get buried.',
  nextStep: 'Next: finish the worship service checklist and assign media owners.',
}

export const overviewCards = [
  { category: 'Sunday Service', title: 'Prep Needed', status: 'Checklist, worship flow, and tech handoff.' },
  { category: 'Media Tasks', title: '4 Open', status: 'Editing, graphics, posts, and livestream review.' },
  { category: 'Prayer Requests', title: '3 New', status: 'Needs care team review and follow-up notes.' },
  { category: 'Visitors', title: '2 Follow-ups', status: 'Connect cards ready for outreach.' },
  { category: 'Music Projects', title: 'Active', status: 'Song ideas and arrangements in motion.' },
  { category: 'Website/App', title: 'Updates Needed', status: 'Content and feature notes are queued.' },
  { category: 'AI Prompts', title: 'Library Ready', status: 'Reusable ministry and media prompts.' },
  { category: 'Tech SOPs', title: 'Drafting', status: 'Audio, video, and platform notes under construction.' },
]

export const todaysFocusItems = [
  { title: 'Sunday Service', detail: 'Lock the pre-service checklist and confirm team assignments.' },
  { title: 'Media Production', detail: 'Move sermon edit, thumbnail, and YouTube upload into clear order.' },
  { title: 'Care Follow-up', detail: 'Review urgent prayer and two visitor follow-ups before the day ends.' },
]

export const needsAttentionItems = [
  { area: 'Prayer', title: 'Urgent request needs owner' },
  { area: 'Website', title: 'Giving page check is still open' },
  { area: 'Tech SOPs', title: 'Livestream troubleshooting draft needs review' },
]

export const priorityItems = [
  'Create Sunday service checklist',
  'Build media production tracker',
  'Add prayer request workflow',
  'Create AI prompt library',
  'Add tech SOP links',
]

export const quickCreateItems = [
  'Prayer Request',
  'Media Task',
  'Song Idea',
  'Website Update',
  'AI Prompt',
  'SOP Note',
]

export const upcomingItems = [
  { when: 'Sunday', title: 'Sunday worship service' },
  { when: 'Wednesday', title: 'Wednesday Bible study' },
  { when: 'This week', title: 'Sermon editing' },
  { when: 'Next post', title: 'Social media post' },
  { when: 'Review', title: 'Website update check' },
]

const sectionData = {
  sunday: {
    kicker: 'Service Operations',
    title: 'Sunday Service',
    description: 'Manage worship flow, audio/video readiness, team assignments, and post-service tasks.',
    items: [
      {
        title: 'Pre-service checklist',
        status: 'In Progress',
        detail: 'Confirm order of service, announcements, slides, worship set, sermon title, and welcome flow.',
        nextStep: 'Add final worship songs and announcement copy.',
      },
      {
        title: 'Audio checklist',
        status: 'Open',
        detail: 'Review X32 scene, vocal mics, playback channels, monitor mixes, and recording input.',
        nextStep: 'Verify channels before rehearsal.',
      },
      {
        title: 'Video/livestream checklist',
        status: 'Open',
        detail: 'Check cameras, vMix inputs, stream key, lower thirds, sermon title, and recording destination.',
        nextStep: 'Run a short private stream test.',
      },
      {
        title: 'Team assignments',
        status: 'New',
        detail: 'Assign audio, lyrics, camera, livestream, host, hospitality, and follow-up owners.',
        nextStep: 'Text assignments to the team.',
      },
      {
        title: 'Post-service tasks',
        status: 'Draft',
        detail: 'Capture attendance notes, export sermon media, save prayer needs, and document tech issues.',
        nextStep: 'Create reusable closeout checklist.',
      },
    ],
  },
  media: {
    kicker: 'Production Queue',
    title: 'Media Tasks',
    description: 'Track sermon editing, livestream review, Access 21 prep, graphics, uploads, and clips.',
    items: [
      {
        title: 'Sermon edit',
        status: 'In Progress',
        detail: 'Clean up the message recording, add intro/outro, normalize audio, and export final video.',
        nextStep: 'Review the first exported cut.',
      },
      {
        title: 'Thumbnail',
        status: 'Open',
        detail: 'Create a sermon thumbnail with title, speaker, and church branding.',
        nextStep: 'Pick the strongest still image.',
      },
      {
        title: 'YouTube upload',
        status: 'Open',
        detail: 'Prepare title, description, tags, thumbnail, and playlist assignment.',
        nextStep: 'Upload after sermon edit is approved.',
      },
      {
        title: 'Facebook post',
        status: 'New',
        detail: 'Write a short caption and schedule the sermon link for the church page.',
        nextStep: 'Draft caption from sermon theme.',
      },
      {
        title: 'Access 21 episode prep',
        status: 'Draft',
        detail: 'Collect topic notes, guest details, talking points, and production assets.',
        nextStep: 'Confirm episode outline.',
      },
      {
        title: 'Short clip creation',
        status: 'Open',
        detail: 'Cut one 30-60 second sermon highlight for vertical social media.',
        nextStep: 'Choose the strongest quote.',
      },
    ],
  },
  prayer: {
    kicker: 'Care Workflow',
    title: 'Prayer Requests',
    description: 'Review, assign, and follow up on prayer needs.',
    items: [
      {
        title: 'New request',
        status: 'New',
        detail: 'Family asked for prayer after Sunday service.',
        nextStep: 'Assign care follow-up owner.',
      },
      {
        title: 'Urgent request',
        status: 'Urgent',
        detail: 'Hospital visit and immediate prayer requested.',
        nextStep: 'Contact pastoral care today.',
      },
      {
        title: 'Assigned request',
        status: 'In Progress',
        detail: 'Care team member is following up with a member this week.',
        nextStep: 'Add update after phone call.',
      },
      {
        title: 'Completed request',
        status: 'Completed',
        detail: 'Follow-up completed and testimony note captured.',
        nextStep: 'Archive after review.',
      },
    ],
  },
  visitors: {
    kicker: 'Connection Path',
    title: 'Visitors / Connect Cards',
    description: 'Track first-time guests, hospitality follow-up, and connection steps.',
    items: [
      {
        title: 'First-time visitor',
        status: 'New',
        detail: 'Guest completed a connect card after Sunday service.',
        nextStep: 'Send welcome text.',
      },
      {
        title: 'Needs follow-up',
        status: 'Open',
        detail: 'Visitor requested more information about ministries and service times.',
        nextStep: 'Call before Wednesday.',
      },
      {
        title: 'Invited to Bible study',
        status: 'In Progress',
        detail: 'Guest was invited to Wednesday Bible study and needs reminder.',
        nextStep: 'Send reminder the morning of Bible study.',
      },
      {
        title: 'Hospitality contacted',
        status: 'Completed',
        detail: 'Hospitality team made contact and logged the response.',
        nextStep: 'Check back next Sunday.',
      },
    ],
  },
  music: {
    kicker: 'Creative Workbench',
    title: 'Music Projects',
    description: 'Manage songs, albums, Suno prompts, keys, tempos, styles, and release planning.',
    items: [
      {
        title: 'Faithful Again',
        status: 'In Progress',
        detail: 'Original worship song about testimony and endurance.',
        meta: [
          { label: 'Key', value: 'G' },
          { label: 'Tempo', value: '74 BPM' },
          { label: 'Style', value: 'Gospel worship' },
        ],
        nextStep: 'Record simple piano/vocal demo.',
      },
      {
        title: 'Mercy Still Speaks',
        status: 'Draft',
        detail: 'Mid-tempo song idea with choir response sections.',
        meta: [
          { label: 'Key', value: 'Bb' },
          { label: 'Tempo', value: '92 BPM' },
          { label: 'Style', value: 'Choir contemporary' },
        ],
        nextStep: 'Finish second verse lyrics.',
      },
      {
        title: 'Sunday reprise idea',
        status: 'New',
        detail: 'Short closing tag for altar or prayer moment.',
        meta: [
          { label: 'Key', value: 'Eb' },
          { label: 'Tempo', value: '68 BPM' },
          { label: 'Style', value: 'Worship reprise' },
        ],
        nextStep: 'Test with keys and pad.',
      },
    ],
  },
  websites: {
    kicker: 'Digital Projects',
    title: 'Website & App Projects',
    description: 'Track WordPress, Rm App, Firebase, GitHub, and feature updates.',
    items: [
      {
        title: 'WordPress update',
        status: 'Open',
        detail: 'Review homepage copy, ministry page content, plugin updates, and latest announcement.',
        nextStep: 'List exact page edits before making changes.',
      },
      {
        title: 'Rm App feature',
        status: 'Draft',
        detail: 'Plan a simple feature note for member resources and event visibility.',
        nextStep: 'Write user story and acceptance notes.',
      },
      {
        title: 'Firebase task',
        status: 'Draft',
        detail: 'Placeholder for future Firebase setup planning only. No Firebase services are connected in Phase 2.',
        nextStep: 'Define collections after local workflows are stable.',
      },
      {
        title: 'Broken link check',
        status: 'In Progress',
        detail: 'Review navigation, sermon links, giving link, and event URLs.',
        nextStep: 'Document any broken links found.',
      },
      {
        title: 'Giving page check',
        status: 'Urgent',
        detail: 'Verify copy, button labels, and mobile readability for the giving page.',
        nextStep: 'Confirm page loads correctly on mobile.',
      },
    ],
  },
  prompts: {
    kicker: 'Reusable AI Workflows',
    title: 'AI Prompt Library',
    description: 'Store reusable prompts for music, media, website, app development, and SOPs.',
    items: [
      {
        title: 'Website prompt',
        status: 'Draft',
        detail: 'Prompt for turning ministry notes into clear website page copy.',
        nextStep: 'Add tone and audience rules.',
      },
      {
        title: 'Music prompt',
        status: 'Open',
        detail: 'Prompt for developing song ideas, lyrics, themes, and arrangement options.',
        nextStep: 'Add fields for key, tempo, and style.',
      },
      {
        title: 'Media prompt',
        status: 'Open',
        detail: 'Prompt for sermon captions, YouTube descriptions, thumbnails, and short clip ideas.',
        nextStep: 'Add output formats for each platform.',
      },
      {
        title: 'SOP prompt',
        status: 'Draft',
        detail: 'Prompt for turning rough tech notes into clean step-by-step procedures.',
        nextStep: 'Add checklist formatting rules.',
      },
      {
        title: 'App development prompt',
        status: 'In Progress',
        detail: 'Prompt for planning FaithLink features and local-first dashboard updates.',
        nextStep: 'Add guardrails for free-first tools.',
      },
    ],
  },
  sops: {
    kicker: 'Tech Playbooks',
    title: 'Tech SOPs',
    description: 'Store setup guides, troubleshooting notes, and training material for X32, vMix, Dante, MainStage, Logic, and livestream systems.',
    items: [
      {
        title: 'X32 setup',
        status: 'Draft',
        detail: 'Document power-on order, scene loading, channel checks, routing, and recording setup.',
        nextStep: 'Confirm exact scene names.',
      },
      {
        title: 'vMix startup',
        status: 'In Progress',
        detail: 'Open project, verify inputs, titles, stream settings, recording path, and audio source.',
        nextStep: 'Add screenshot references later.',
      },
      {
        title: 'Dante checklist',
        status: 'Open',
        detail: 'Check network adapter, Dante Controller routing, clock status, and device visibility.',
        nextStep: 'Write troubleshooting steps for missing devices.',
      },
      {
        title: 'MainStage setup',
        status: 'Draft',
        detail: 'Load concert, check patches, MIDI controller, audio output, and backup sound source.',
        nextStep: 'Add Sunday morning quick check.',
      },
      {
        title: 'Livestream troubleshooting',
        status: 'Urgent',
        detail: 'Capture steps for no audio, dropped frames, wrong camera, stream key issues, and recording failures.',
        nextStep: 'Prioritize the top five failure points.',
      },
    ],
  },
  settings: {
    kicker: 'Local App Setup',
    title: 'Settings',
    description: 'Manage local data, export, reset, and future connection placeholders.',
    items: [
      {
        title: 'App name',
        status: 'Completed',
        detail: 'FaithLink Command Center',
        nextStep: 'Keep naming consistent across future docs and screens.',
      },
      {
        title: 'Theme colors',
        status: 'Completed',
        detail: 'Primary burgundy, dark gray sidebar, light gray background, white cards, and subtle gold accents.',
        nextStep: 'Create reusable theme tokens when the app grows.',
      },
      {
        title: 'Version',
        status: 'Completed',
        detail: 'Phase 2 Local',
        nextStep: 'Move to Phase 3 only after local workflows feel solid.',
      },
      {
        title: 'Data mode',
        status: 'Completed',
        detail: 'Browser localStorage',
        nextStep: 'Use reset sample data if local testing gets messy.',
      },
      {
        title: 'Future Firebase connection placeholder',
        status: 'Draft',
        detail: 'Reserved for a later Firebase/Auth/Firestore setup. Nothing is connected in this phase.',
        nextStep: 'Wait until local workflows are approved.',
      },
      {
        title: 'User role placeholder',
        status: 'Draft',
        detail: 'Future roles may include admin, media team, care team, and volunteer.',
        nextStep: 'Define roles before adding authentication.',
      },
    ],
  },
}

// Future Firebase/Auth/Firestore connection point:
// Replace this local sectionData object with reads from Firestore after Phase 2 local workflows are approved.
// Keep sample data available as a fallback for local development and offline demos.
export const sectionPages = navigationItems.reduce((pages, item) => {
  pages[item.id] =
    sectionData[item.id] || {
      kicker: item.label,
      title: item.label,
      description: 'Local Phase 2 workspace.',
      items: [],
    }

  pages.templates = {
    kicker: 'Workflow Library',
    title: 'Templates',
    description: 'Browse reusable workflow templates for services, media, tech, music, ministry follow-up, apps, and AI prompts.',
    items: [],
  }

  return pages
}, {})
