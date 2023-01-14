type ContactEvent = {
  action: 'submit_form'
  category: 'contact'
  label: string
}

type ClickEvent = {
  action: 'click'
  category: 'other'
  label: string
}

export type Event = ContactEvent | ClickEvent

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export const existsGaId = GA_ID !== ''

export const event = ({action, category, label}: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label)
  })
}

export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}
