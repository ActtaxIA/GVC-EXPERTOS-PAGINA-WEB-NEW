interface IconProps {
  className?: string
}

export function ScalpelIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52 12L40 24M40 24L20 44C18 46 15 47 12 47C9 47 6 46 4 44L20 28L40 24Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 24L56 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 47L4 55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SearchMedicalIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="28"
        cy="28"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M28 20V36M20 28H36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 40L56 56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HospitalIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8"
        y="20"
        width="48"
        height="36"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="8"
        width="16"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M32 28V44M24 36H40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 56V48H24V56M40 56V48H48V56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BabyIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="32"
        cy="40"
        rx="20"
        ry="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="32"
        cy="20"
        r="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="27" cy="18" r="2" fill="currentColor" />
      <circle cx="37" cy="18" r="2" fill="currentColor" />
      <path
        d="M28 24C28 24 30 26 32 26C34 26 36 24 36 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 12C22 8 27 6 32 6C37 6 42 8 44 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PillIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12"
        y="24"
        width="40"
        height="20"
        rx="10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M32 24V44" stroke="currentColor" strokeWidth="2" />
      <circle
        cx="50"
        cy="14"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M50 10V18M46 14H54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DocumentCheckIcon({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8H40L52 20V56H12V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 8V20H52"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 36L30 42L42 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24H36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Mapa de iconos por nombre
export const serviceIcons: Record<string, React.FC<IconProps>> = {
  scalpel: ScalpelIcon,
  search: SearchMedicalIcon,
  hospital: HospitalIcon,
  baby: BabyIcon,
  pill: PillIcon,
  document: DocumentCheckIcon,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = serviceIcons[name] || DocumentCheckIcon
  return <Icon className={className} />
}
