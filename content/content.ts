
interface Article {
  path: string,
  nameEn: string,
  nameJa: string
}

interface Folder {
  path: string,
  nameEn: string,
  nameJa: string,
  children: Article[]
}

export const whatIsIt: Folder = {
  path: 'what_is_it',
  nameEn: 'What is it?',
  nameJa: 'Z Window Systemとは',
  children: [
    {
      path: 'what_is_z_window_system',
      nameEn: 'What is Z Window System?',
      nameJa: 'Z Window Systemとは？'
    },
    {
      path: 'rendering_scheme',
      nameEn: 'Rendering scheme',
      nameJa: 'レンダリング方式'
    },
    {
      path: '3d_window',
      nameEn: '3D Window',
      nameJa: '3Dウィンドウ'
    },
    {
      path: 'interactions_on_zen',
      nameEn: 'Interactions on Zen',
      nameJa: 'Zenでのインタラクション'
    },
    {
      path: 'faq',
      nameEn: 'FAQ',
      nameJa: 'FAQ'
    },
  ]
}

export const gettingStarted: Folder = {
  path: 'getting_started',
  nameEn: 'Getting started',
  nameJa: 'はじめる',  
  children: [{
    path: 'system_requirements',
    nameEn: 'System requirements',
    nameJa: 'システム要件'
  }]
}

export const roadMap: Article = {
  path: 'roadmap',
  nameEn: 'Roadmap',
  nameJa: 'ロードマップ'
}

// export const content: (Folder | Article)[] = [
//   whatIsIt,
//   gettingStarted,
//   {
//     path: 'roadmap',
//     nameEn: 'Roadmap',
//     nameJa: 'ロードマップ'
//   },
// ]
