
interface Article {
  path: string, subsection?: string
}

interface Folder {
  path: string, subsections: string[], articles: Article[]
}

export const whatIsIt: Folder = {
  path: 'what_is_it',
  subsections: ['basic_concept', 'z_window_system', 'zen', 'others'],
  articles: [
    {path: 'what_is_zwin', subsection: 'basic_concept'},
    {path: 'rendering_scheme', subsection: 'z_window_system'},
    {path: '3d_window', subsection: 'z_window_system'},
    {path: 'interactions_on_zen', subsection: 'zen'},
    {path: 'faq', subsection: 'others'},
  ]
}

export const gettingStarted: Folder = {
  path: 'getting_started',
  subsections: ['setup', 'advanced_tutorial'],
  articles: [
    {path: 'system_requirements', subsection: 'setup'},
    {path: 'installation', subsection: 'setup'},
    {path: '3d_app_development', subsection: 'advanced_tutorial'}
  ]
}

export const roadMap: Article = {
  path: 'roadmap'
}
