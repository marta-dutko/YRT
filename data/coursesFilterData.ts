export const BASE_URL = 'https://yrt-app-staging.vercel.app'
export const COURSES_URL = `${BASE_URL}/courses`

export interface FilterOption {
    param: string    // URL query parameter name
    value: string    // input[value] and URL param value
    label: string    // visible label text in the filter panel
    badge?: string   // pill badge text shown on course cards (type filters only)
}

export const TYPE_FILTERS: FilterOption[] = [
    { param: 'type', value: 'accredited', label: 'Accredited course', badge: 'Accredited' },
    { param: 'type', value: 'workshop',   label: 'Workshop',badge: 'Workshop' },
]

export const DURATION_FILTERS: FilterOption[] = [
    { param: 'duration', value: 'qualification', label: 'Full qualification' },
    { param: 'duration', value: 'skill_set',     label: 'Skill set' },
    { param: 'duration', value: 'unit',          label: 'Single unit' },
]

export const LOCATION_FILTERS: FilterOption[] = [
    { param: 'location', value: 'western_australia', label: 'Western Australia' },
    { param: 'location', value: 'new_south_wales',   label: 'New South Wales' },
    { param: 'location', value: 'victoria',          label: 'Victoria' },
    { param: 'location', value: 'queensland',        label: 'Queensland' },
]

export const INDUSTRY_FILTERS: FilterOption[] = [
    { param: 'industry', value: 'construction',       label: 'Construction' },
    { param: 'industry', value: 'transport_logistic', label: 'Transport & Logistics' },
    { param: 'industry', value: 'manufacturing',      label: 'Manufacturing' },
    { param: 'industry', value: 'environmental',      label: 'Environmental' },
    { param: 'industry', value: 'business_lead',      label: 'Business & Leadership' },
    { param: 'industry', value: 'info_tech',          label: 'Information & Technology' },
    { param: 'industry', value: 'creative_arts',      label: 'Creative Arts' },
]

export const ALL_FILTER_OPTIONS: FilterOption[] = [
    ...TYPE_FILTERS,
    ...DURATION_FILTERS,
    ...LOCATION_FILTERS,
    ...INDUSTRY_FILTERS,
]

// Values confirmed from the select element on the courses page
export const PER_PAGE_OPTIONS = ['5', '10', '20', '50'] as const
