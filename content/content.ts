
interface Article {
  path: string,
  subsection?: string
}

interface Folder {
  path: string,
  subsections: string[],
  articles: Article[]
}

export const whatIsIt: Folder = {
  path: 'what_is_it',
  subsections: [
    'basic_concept', 'z_window_system', 'zen', 'others'
  ],
  articles: [
    {
      path: 'what_is_z_window_system',
      subsection: 'basic_concept'
    },
    {
      path: 'rendering_scheme',
      subsection: 'z_window_system'
    },
    {
      path: '3d_window',
      subsection: 'z_window_system'
    },
    {
      path: 'interactions_on_zen',
      subsection: 'zen'
    },
    {
      path: 'faq',
      subsection: 'others'
    },
  ]
}

export const gettingStarted: Folder = {
  path: 'getting_started',
  subsections: [
    'setup'
  ],
  articles: [{
    path: 'system_requirements',
    subsection: 'setup'
  }]
}

export const roadMap: Article = {
  path: 'roadmap'
}
