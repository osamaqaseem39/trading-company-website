// Color scheme constants for Wingz Impex

export const colors = {
  primary: {
    main: 'emeraldPine',
    accent: 'oliveDrab',
    background: 'sandstone',
    alt: 'deepTeal',
  },
  text: {
    main: '[#001a33]',
    onPrimary: 'white',
  },
};

export const buttonStyles = {
  primary: `${colors.primary.main} ${colors.text.onPrimary} hover:bg-wingzimpex-brand-light transition-colors`,
};

export const colorSchemes = {
  button: {
    primary: 'bg-wingzimpex-brand text-white hover:bg-wingzimpex-brand-dark px-6 py-3 rounded-lg font-semibold transition-colors',
    secondary: 'bg-wingzimpex-brand-light text-wingzimpex-brand hover:bg-wingzimpex-brand px-6 py-3 rounded-lg font-semibold transition-colors',
  },
  badge: {
    primary: 'inline-block bg-wingzimpex-brand text-white px-3 py-1 rounded-full text-xs font-semibold',
    secondary: 'inline-block bg-wingzimpex-brand-light text-wingzimpex-brand px-3 py-1 rounded-full text-xs font-semibold',
  },
  card: {
    primary: 'border-2 border-wingzimpex-brand bg-white',
    secondary: 'border-2 border-wingzimpex-brand-light bg-white',
  },
}; 