export const workflowTemplates = [
  {
    templateName: 'Full Sunday Service Prep',
    section: 'sunday',
    group: 'Sunday Service',
    description: 'Prepare worship flow, team assignments, audio, video, livestream, and closeout.',
    tasks: [
      {
        title: 'Full Sunday technical checklist',
        description: 'Run the full Sunday service readiness flow before rehearsal and service.',
        category: 'Sunday Service',
        nextStep: 'Start with audio and livestream checks.',
        notes: 'Use this before team call time.',
        checklist: [
          'Confirm X32 scene',
          'Check Dante audio',
          'Check vMix inputs',
          'Check Castr/stream destination',
          'Test YouTube/Facebook stream',
          'Confirm lower thirds',
          'Confirm recording',
          'Confirm team assignments',
        ],
      },
      {
        title: 'Confirm service flow',
        description: 'Review worship set, sermon title, announcements, altar flow, and transitions.',
        category: 'Sunday Service',
        nextStep: 'Send final flow to team.',
        notes: 'Make sure slides match the latest order.',
      },
    ],
  },
  {
    templateName: 'Wednesday Service Prep',
    section: 'sunday',
    group: 'Sunday Service',
    description: 'Prepare a lighter midweek service workflow.',
    tasks: [
      { title: 'Wednesday service run sheet', description: 'Confirm worship, Bible study notes, mics, slides, and recording needs.', category: 'Midweek', nextStep: 'Confirm speaker notes.', notes: '' },
    ],
  },
  {
    templateName: 'Post-Service Media Workflow',
    section: 'media',
    group: 'Sunday Service',
    description: 'Move Sunday recordings into editing, upload, and social follow-up.',
    tasks: [
      { title: 'Post-service media handoff', description: 'Back up recording, label files, note sermon title, and queue edit.', category: 'Post-Service', nextStep: 'Start sermon edit.', notes: '' },
      { title: 'Publish sermon assets', description: 'Prepare YouTube upload, thumbnail, Facebook caption, and short clip candidate.', category: 'Publishing', nextStep: 'Export final sermon video.', notes: '' },
    ],
  },
  {
    templateName: 'Guest Speaker Service Prep',
    section: 'sunday',
    group: 'Sunday Service',
    description: 'Prepare service details for a guest speaker.',
    tasks: [
      { title: 'Guest speaker media prep', description: 'Collect speaker name, sermon title, bio, slides, mic needs, and livestream lower thirds.', category: 'Guest Speaker', nextStep: 'Confirm assets with speaker.', notes: '' },
    ],
  },
  {
    templateName: 'Sermon Edit Workflow',
    section: 'media',
    group: 'Media Production',
    description: 'Edit, export, upload, and promote a sermon recording.',
    tasks: [
      { title: 'Edit sermon recording', description: 'Trim start/end, balance audio, add intro/outro, and export final file.', category: 'Sermon Edit', nextStep: 'Review first export.', notes: '' },
      { title: 'Upload sermon to YouTube', description: 'Add title, description, thumbnail, tags, and playlist.', category: 'Upload', nextStep: 'Schedule Facebook post.', notes: '' },
    ],
  },
  {
    templateName: 'Access 21 Broadcast Prep',
    section: 'media',
    group: 'Media Production',
    description: 'Prep an Access 21 episode from outline to production assets.',
    tasks: [
      { title: 'Access 21 episode prep', description: 'Confirm topic, guests, talking points, lower thirds, recording plan, and promo copy.', category: 'Access 21', nextStep: 'Finalize show outline.', notes: '' },
    ],
  },
  {
    templateName: 'Social Clip Creation',
    section: 'media',
    group: 'Media Production',
    description: 'Create short-form clips from sermon or broadcast content.',
    tasks: [
      { title: 'Create short social clip', description: 'Pick highlight, cut vertical version, caption it, and export platform-ready file.', category: 'Short Clip', nextStep: 'Choose strongest quote.', notes: '' },
    ],
  },
  {
    templateName: 'Livestream Troubleshooting Review',
    section: 'sops',
    group: 'Media Production',
    description: 'Review livestream issues and convert them into repeatable fixes.',
    tasks: [
      { title: 'Livestream issue review', description: 'Document stream drops, audio problems, sync issues, and fixes for next service.', category: 'Livestream', nextStep: 'Add confirmed fixes to SOP.', notes: '' },
    ],
  },
  {
    templateName: 'X32 Startup Checklist',
    section: 'sops',
    group: 'Audio/Video Tech',
    description: 'Start and verify the X32 before service.',
    tasks: [
      { title: 'X32 startup checklist', description: 'Power on, load scene, check routing, test mics, confirm recording and monitor mixes.', category: 'Audio', nextStep: 'Save verified scene notes.', notes: '', checklist: ['Power on console', 'Load correct scene', 'Line check vocals', 'Check playback', 'Confirm recording feed'] },
    ],
  },
  {
    templateName: 'vMix Startup Checklist',
    section: 'sops',
    group: 'Audio/Video Tech',
    description: 'Open and verify vMix before livestream.',
    tasks: [
      { title: 'vMix startup checklist', description: 'Open project, verify cameras, titles, audio source, stream destination, and recording path.', category: 'Video', nextStep: 'Run stream test.', notes: '', checklist: ['Open vMix project', 'Check camera inputs', 'Check lower thirds', 'Check audio source', 'Confirm recording path'] },
    ],
  },
  {
    templateName: 'Dante Check',
    section: 'sops',
    group: 'Audio/Video Tech',
    description: 'Verify Dante network audio routing.',
    tasks: [
      { title: 'Dante routing check', description: 'Confirm network adapter, clock status, subscriptions, and device visibility.', category: 'Dante', nextStep: 'Document any missing device.', notes: '' },
    ],
  },
  {
    templateName: 'MainStage/Keyboard Check',
    section: 'sops',
    group: 'Audio/Video Tech',
    description: 'Prepare keyboard rig and backup sounds.',
    tasks: [
      { title: 'MainStage keyboard check', description: 'Load concert, test patches, MIDI, audio output, and backup source.', category: 'Keys', nextStep: 'Confirm patches for setlist.', notes: '' },
    ],
  },
  {
    templateName: 'Stream Audio Check',
    section: 'sops',
    group: 'Audio/Video Tech',
    description: 'Verify livestream audio before going live.',
    tasks: [
      { title: 'Stream audio check', description: 'Check mix feed, meters, sync, headphones, and private stream audio quality.', category: 'Livestream Audio', nextStep: 'Record 30-second test.', notes: '' },
    ],
  },
  {
    templateName: 'New Prayer Request Follow-Up',
    section: 'prayer',
    group: 'Prayer & Visitors',
    description: 'Follow up on a new prayer request with care.',
    tasks: [
      { title: 'New prayer request follow-up', description: 'Review request, assign care owner, contact requester, and log update.', category: 'Prayer', nextStep: 'Assign prayer team owner.', notes: '' },
    ],
  },
  {
    templateName: 'Urgent Prayer Request Workflow',
    section: 'prayer',
    group: 'Prayer & Visitors',
    description: 'Escalate urgent prayer and pastoral care needs.',
    tasks: [
      { title: 'Urgent prayer workflow', description: 'Notify pastoral care, assign immediate contact, document response, and schedule follow-up.', category: 'Urgent Prayer', nextStep: 'Contact care leader today.', notes: '' },
    ],
  },
  {
    templateName: 'First-Time Visitor Follow-Up',
    section: 'visitors',
    group: 'Prayer & Visitors',
    description: 'Follow up with a first-time guest after service.',
    tasks: [
      { title: 'First-time visitor follow-up', description: 'Send welcome text, invite to Bible study, log interest, and assign hospitality contact.', category: 'Visitor Follow-Up', nextStep: 'Send welcome message.', notes: '' },
    ],
  },
  {
    templateName: 'Hospitality Weekly Review',
    section: 'visitors',
    group: 'Prayer & Visitors',
    description: 'Review guest follow-up and hospitality needs for the week.',
    tasks: [
      { title: 'Hospitality weekly review', description: 'Review open visitor follow-ups, new connect cards, and next invitations.', category: 'Hospitality', nextStep: 'Update open follow-ups.', notes: '' },
    ],
  },
  {
    templateName: 'WordPress Page Update',
    section: 'websites',
    group: 'Website/App',
    description: 'Update a WordPress page safely.',
    tasks: [
      { title: 'WordPress page update', description: 'Confirm copy, update page, check mobile layout, test links, and document change.', category: 'WordPress', nextStep: 'Draft exact content edits.', notes: '' },
    ],
  },
  {
    templateName: 'Rm App Feature Update',
    section: 'websites',
    group: 'Website/App',
    description: 'Plan and track an Rm App feature update.',
    tasks: [
      { title: 'Rm App feature update', description: 'Define feature, acceptance notes, data needs, and release checklist.', category: 'Rm App', nextStep: 'Write feature notes.', notes: '' },
    ],
  },
  {
    templateName: 'Firebase Deployment Review',
    section: 'websites',
    group: 'Website/App',
    description: 'Review future Firebase deployment readiness without connecting yet.',
    tasks: [
      { title: 'Firebase deployment review', description: 'Review env variables, hosting plan, build command, Auth/Firestore readiness, and rollback notes.', category: 'Firebase', nextStep: 'Confirm project checklist later.', notes: 'Planning only. Firebase is not connected.' },
    ],
  },
  {
    templateName: 'Broken Link Check',
    section: 'websites',
    group: 'Website/App',
    description: 'Check website/app links before publishing updates.',
    tasks: [
      { title: 'Broken link check', description: 'Test nav, giving, events, sermon links, and mobile links.', category: 'QA', nextStep: 'Record broken links found.', notes: '' },
    ],
  },
  {
    templateName: 'New Song Idea',
    section: 'music',
    group: 'Music',
    description: 'Capture a new song concept and next step.',
    tasks: [
      { title: 'New song idea', description: 'Capture theme, hook, Scripture idea, melody note, and rough arrangement direction.', category: 'Songwriting', nextStep: 'Record rough voice memo.', notes: '', key: '', tempo: '', style: '' },
    ],
  },
  {
    templateName: 'Suno Prompt Build',
    section: 'music',
    group: 'Music',
    description: 'Build a structured Suno prompt for a song idea.',
    tasks: [
      { title: 'Suno prompt build', description: 'Define style, vocal direction, lyric theme, tempo, instruments, and reference mood.', category: 'Suno', nextStep: 'Draft prompt variations.', notes: '', key: '', tempo: '', style: 'Gospel / worship' },
    ],
  },
  {
    templateName: 'Album Planning',
    section: 'music',
    group: 'Music',
    description: 'Plan songs, sequencing, artwork, and release steps.',
    tasks: [
      { title: 'Album planning', description: 'List songs, themes, production status, cover needs, and release timeline.', category: 'Album', nextStep: 'Choose working tracklist.', notes: '' },
    ],
  },
  {
    templateName: 'Release Prep',
    section: 'music',
    group: 'Music',
    description: 'Prepare music for release.',
    tasks: [
      { title: 'Release prep', description: 'Confirm final mix, master, artwork, metadata, release date, captions, and platform checklist.', category: 'Release', nextStep: 'Confirm final audio files.', notes: '' },
    ],
  },
  {
    templateName: 'Codex Build Prompt',
    section: 'prompts',
    group: 'AI Prompt Library',
    description: 'Create a clear Codex implementation prompt.',
    tasks: [
      { title: 'Codex build prompt', description: 'Write goal, constraints, files, expected behavior, build command, and summary requirements.', category: 'Codex', nextStep: 'Add repo-specific instructions.', notes: '' },
    ],
  },
  {
    templateName: 'Claude Cowork Prompt',
    section: 'prompts',
    group: 'AI Prompt Library',
    description: 'Prepare a prompt for planning or drafting with Claude.',
    tasks: [
      { title: 'Claude cowork prompt', description: 'Define role, context, desired output, tone, constraints, and review criteria.', category: 'Claude', nextStep: 'Add source notes.', notes: '' },
    ],
  },
  {
    templateName: 'Sermon Social Post Prompt',
    section: 'prompts',
    group: 'AI Prompt Library',
    description: 'Generate sermon captions and social copy.',
    tasks: [
      { title: 'Sermon social post prompt', description: 'Prompt for captions, quote posts, YouTube description, Facebook copy, and short clip hooks.', category: 'Sermon Media', nextStep: 'Add sermon title and Scripture.', notes: '' },
    ],
  },
  {
    templateName: 'Songwriting Prompt',
    section: 'prompts',
    group: 'AI Prompt Library',
    description: 'Develop lyrics, themes, and arrangement ideas.',
    tasks: [
      { title: 'Songwriting prompt', description: 'Prompt for theme, lyric ideas, bridge options, call-and-response, and arrangement direction.', category: 'Music', nextStep: 'Add key theme and style.', notes: '' },
    ],
  },
  {
    templateName: 'SOP Creation Prompt',
    section: 'prompts',
    group: 'AI Prompt Library',
    description: 'Turn rough technical notes into a clean SOP.',
    tasks: [
      { title: 'SOP creation prompt', description: 'Prompt for purpose, tools, step-by-step process, troubleshooting, and closeout checklist.', category: 'SOP', nextStep: 'Paste rough notes.', notes: '' },
    ],
  },
]

export const recommendedTemplates = [
  'Full Sunday Service Prep',
  'Sermon Edit Workflow',
  'First-Time Visitor Follow-Up',
]

export function getTemplatesForSection(sectionId) {
  return workflowTemplates.filter((template) => template.section === sectionId)
}

export function getTemplateByName(templateName) {
  return workflowTemplates.find((template) => template.templateName === templateName)
}

export function groupTemplatesByCategory(templates = workflowTemplates) {
  return templates.reduce((groups, template) => {
    groups[template.group] = [...(groups[template.group] || []), template]
    return groups
  }, {})
}
