import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const LogoIcon: React.FC<ImageProps> = (props) => (
  <img src="/vattles-logo-512.svg" alt="Vattles Logo" {...props} />
);

// Additional logo variants for different use cases
export const LogoIconLarge: React.FC<ImageProps> = (props) => (
  <img src="/vattles-logo-1024.svg" alt="Vattles Logo Large" {...props} />
);

export const LogoIconPNG: React.FC<ImageProps> = (props) => (
  <img src="/vattles-logo-1024.png" alt="Vattles Logo PNG" {...props} />
);

export const FaviconIcon: React.FC<ImageProps> = (props) => (
  <img src="/vattles-favicon-32.svg" alt="Vattles Favicon" {...props} />
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.056-4.316A9.75 9.75 0 015.25 6.75a9.75 9.75 0 0113.5 0 9.75 9.75 0 01-2.306 7.684A9.75 9.75 0 0116.5 18.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21.75h4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l1.5 1.5M18 6l1.5-1.5" />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const AudioIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
  </svg>
);

export const TextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const CodeBracketIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.197a3.375 3.375 0 002.456 2.456l1.197.398-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const DocumentArrowUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const ClipboardIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);

export const HtmlIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l-4.5 4.5 4.5 4.5m7.5-9l4.5 4.5-4.5 4.5" /></svg>
);
export const CssIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.962 10.962c.373-.373.88-1.014 1.414-1.414m-1.414 1.414c-.373.373-1.014.88-1.414 1.414m1.414-1.414L12 12m-2.038-1.038L12 12m2.038 1.038c.373.373.88 1.014 1.414 1.414m-1.414-1.414c-.373-.373-1.014-.88-1.414-1.414m1.414 1.414L12 12" /></svg>
);
export const JsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.197a3.375 3.375 0 002.456 2.456l1.197.398-1.197.398a3.375 3.375 0 00-2.456 2.456z" /></svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72c-1.133-.093-1.98-1.057-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097m6.75-3.686l-6.75 3.686m6.75 0v.015m0 0v5.25m0 0l-6.75-3.686m6.75 3.686l-6.75-3.686" /></svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
);

export const PinIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" /></svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-8H6.306C9.656 39.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C41.389 36.372 44 30.655 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
);

export const GithubIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.81c.85 0 1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>
);

export const UserGroupIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.875-2.065l-.423-.232a4.5 4.5 0 00-4.122 6.062a4.5 4.5 0 004.122 6.062l.423.232a4.5 4.5 0 001.875-2.065m-2.228-4.243a4.5 4.5 0 00-1.875-2.065l-.423-.232a4.5 4.5 0 00-4.122 6.062a4.5 4.5 0 004.122 6.062l.423.232A4.5 4.5 0 006 18.72m12-2.228a4.5 4.5 0 001.875 2.065l.423.232a4.5 4.5 0 004.122-6.062a4.5 4.5 0 00-4.122-6.062l-.423-.232a4.5 4.5 0 00-1.875 2.065m-2.228 4.243a4.5 4.5 0 001.875 2.065l.423.232a4.5 4.5 0 004.122-6.062a4.5 4.5 0 00-4.122-6.062l-.423-.232a4.5 4.5 0 00-1.875 2.065" />
  </svg>
);

export const UserPlusIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BeakerIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.5 1.591L5.25 15.45M9.75 3.104l-2.022.506a2.25 2.25 0 00-1.79 2.118v6.178a2.25 2.25 0 001.79 2.118l2.022.506m-2.022-11.326L14.25 1.5M14.25 1.5l2.022.506a2.25 2.25 0 011.79 2.118v6.178a2.25 2.25 0 01-1.79 2.118l-2.022.506M14.25 1.5v5.714a2.25 2.25 0 00.5 1.591l3.998 4.044M4.5 15.45h15M4.5 15.45l.5-1.5m14 1.5l-.5-1.5" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SignalIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5v2.25c0 .385.223.73.563.896l2.378 1.189a.75.75 0 010 1.33l-2.378 1.189A1.125 1.125 0 0011.25 12v2.25c0 .385.223.73.563.896l2.378 1.189a.75.75 0 010 1.33l-2.378 1.189a1.125 1.125 0 00-.563.896V21M12.75 4.5v2.25c0 .385-.223.73-.563.896l-2.378 1.189a.75.75 0 000 1.33l2.378 1.189c.34.166.563.511.563.896v2.25c0 .385-.223.73-.563.896l-2.378 1.189a.75.75 0 000 1.33l2.378 1.189c.34.166.563.511.563.896V21M9 8.25h.008v.008H9V8.25zm.75 0h.008v.008H9.75V8.25zm.75 0h.008v.008h-.008V8.25zm.75 0h.008v.008h-.008V8.25zm.75 0h.008v.008h-.008V8.25zm.75 0h.008v.008h-.008V8.25zM9 15.75h.008v.008H9v-.008zm.75 0h.008v.008H9.75v-.008zm.75 0h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008v-.008zm.75 0h.008v.008h-.008v-.008zM15 8.25a3 3 0 100 6 3 3 0 000-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75v4.5a3 3 0 003 3h4.5" />
    </svg>
);

export const FirstWinIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.056-4.316A9.75 9.75 0 015.25 6.75a9.75 9.75 0 0113.5 0 9.75 9.75 0 01-2.306 7.684A9.75 9.75 0 0116.5 18.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.008v.008H12v-.008z" />
  </svg>
);

export const WinStreakIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.362A8.252 8.252 0 0115.362 5.214z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V15m-4.5 4.5L12 15m0 0l4.5 4.5M12 15l-4.5-4.5M12 15l4.5-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.138 2.25l1.363-1.362a.75.75 0 011.06 0l1.363 1.362a.75.75 0 010 1.06l-1.362 1.363a.75.75 0 01-1.06 0l-1.363-1.363a.75.75 0 010-1.06z" />
  </svg>
);

export const CyberpunkMasterIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

export const PromptVirtuosoIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.197a3.375 3.375 0 002.456 2.456l1.197.398-1.197.398a3.375 3.375 0 00-2.456 2.456z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c-1.657 0-3-4.03-3-9s1.343-9 3-9 3 4.03 3 9-1.343 9-3 9z" />
  </svg>
);

export const HandThumbUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.425 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.148 7.281c-.848 1.38-2.35 2.427-4.134 2.427h-3.126c-1.026 0-1.945-.694-2.054-1.715A4.496 4.496 0 0112 18.75v-1.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 12.75V8.25a2.25 2.25 0 012.25-2.25h1.383z" />
    </svg>
);

export const FlameIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.362A8.252 8.252 0 0115.362 5.214z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.832 2.822l1.363 1.363a.75.75 0 01-1.06 1.06L3.772 3.882a.75.75 0 011.06-1.06zM19.168 2.822l-1.363 1.363a.75.75 0 001.06 1.06l1.363-1.363a.75.75 0 00-1.06-1.06z" />
  </svg>
);

export const SwordsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21v-5.25a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25V21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 21v-5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V21" />
    </svg>
);

export const MusicNoteIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
);

export const BookmarkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

export const CursorArrowRaysIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
    </svg>
);

export const CloneIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375v-3.375a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v3.375" />
  </svg>
);

// FlowingLight Component
import { MessageSquareText } from 'lucide-react';

interface LightParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface FlowingLightProps {
  className?: string;
  lightIntensity?: number;
  fogDensity?: number;
  particleCount?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  life: number;
}

const FlowingLight: React.FC<FlowingLightProps> = ({
  className = "",
  lightIntensity = 1,
  fogDensity = 0.8,
  particleCount = 150
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const lightRef = useRef({ x: 400, y: 300 });
  const particlesRef = useRef<LightParticle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const lastChatTimeRef = useRef(0);
  const currentElementRef = useRef<HTMLElement | null>(null);

  const createParticle = useCallback((x: number, y: number): LightParticle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: Math.random() * 60 + 30,
      maxLife: Math.random() * 60 + 30,
      size: Math.random() * 3 + 1
    };
  }, []);

  const initializeParticles = useCallback(() => {
    particlesRef.current = [];
    if (canvasRef.current) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(
          Math.random() * canvasRef.current.width,
          Math.random() * canvasRef.current.height
        ));
      }
    }
  }, [particleCount, createParticle]);

  const getElementEdges = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return [];

    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;

    return [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height }
    ];
  }, []);

  const getDistanceToElementEdge = useCallback((x: number, y: number, element: HTMLElement) => {
    const edges = getElementEdges(element);
    if (edges.length === 0) return Infinity;

    let minDistance = Infinity;

    for (let i = 0; i < edges.length; i++) {
      const p1 = edges[i];
      const p2 = edges[(i + 1) % edges.length];

      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) {
        xx = p1.x;
        yy = p1.y;
      } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
      } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      minDistance = Math.min(minDistance, distance);
    }

    return minDistance;
  }, [getElementEdges]);

  const getClosestPointOnElementEdge = useCallback((x: number, y: number, element: HTMLElement) => {
    const edges = getElementEdges(element);
    if (edges.length === 0) return { x, y };

    let minDist = Infinity;
    let closestPoint = { x, y };

    for (let i = 0; i < edges.length; i++) {
      const p1 = edges[i];
      const p2 = edges[(i + 1) % edges.length];

      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) {
        xx = p1.x;
        yy = p1.y;
      } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
      } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
      }

      const dist = Math.sqrt((x - xx) ** 2 + (y - yy) ** 2);
      if (dist < minDist) {
        minDist = dist;
        closestPoint = { x: xx, y: yy };
      }
    }
    return closestPoint;
  }, [getElementEdges]);

  // Alfred's personality - customize messages here or connect to API
  const getAlfredMessage = useCallback((element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const textContent = element.textContent?.trim().substring(0, 50).toLowerCase();

    // Customize Alfred's responses here - perfect spot for API integration!
    if (tagName === 'button' || className.includes('button')) {
      return "Ah, a button! Shall we give it a press, sir?";
    } else if (tagName === 'a' || className.includes('link')) {
      return "A link! I wonder where this leads us...";
    } else if (tagName === 'input' || tagName === 'textarea') {
      return "An input field! What shall we write here?";
    } else if (tagName === 'form') {
      return "A form! Time to fill in some details, perhaps?";
    } else if (className.includes('card') || className.includes('item') || className.includes('product')) {
      return "Interesting card! Let me take a closer look...";
    } else if (className.includes('header') || tagName === 'h1' || tagName === 'h2') {
      return "Ah, a heading! This seems important.";
    } else if (className.includes('footer')) {
      return "The footer! We've reached the bottom, but not the end!";
    } else if (textContent?.includes('sign up') || textContent?.includes('register')) {
      return "Oooo, a sign up card... Oh can we please!?";
    } else if (textContent?.includes('stats') || textContent?.includes('statistics')) {
      return "Stats card? Nice! I love stats!";
    } else if (textContent?.includes('contact')) {
      return "Contact information! Shall we reach out?";
    } else if (textContent?.includes('about')) {
      return "About section! Let's learn more, shall we?";
    } else {
      return "Hmm, what do we have here?";
    }
  }, []);

  const generateChat = useCallback((element: HTMLElement) => {
    const now = Date.now();
    if (now - lastChatTimeRef.current < 2500) return; // Shortened to 2.5 seconds

    const message = getAlfredMessage(element);

    if (message) {
      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const chatX = (rect.left - containerRect.left) + rect.width / 2;
      const chatY = (rect.top - containerRect.top) - 60; // Further from element

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: message,
          x: chatX,
          y: chatY,
          opacity: 0.7, // 70% transparent
          life: 150 // Slightly shorter duration
        }
      ]);
      lastChatTimeRef.current = now;
    }
  }, [getAlfredMessage]);

  const updateLight = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    targetRef.current.x = mouseRef.current.x - rect.left;
    targetRef.current.y = mouseRef.current.y - rect.top;

    let closestDistance = Infinity;
    let closestPoint = { x: targetRef.current.x, y: targetRef.current.y };
    let newCurrentElement: HTMLElement | null = null;

    const allElements = Array.from(document.querySelectorAll('body *')) as HTMLElement[];
    const interactiveElements = allElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      // Filter out elements that are too small, hidden, or not interactive
      return elRect.width > 10 && elRect.height > 10 &&
             el.offsetParent !== null &&
             window.getComputedStyle(el).pointerEvents !== 'none' &&
             window.getComputedStyle(el).opacity !== '0' &&
             window.getComputedStyle(el).visibility !== 'hidden';
    });

    interactiveElements.forEach(el => {
      const distance = getDistanceToElementEdge(targetRef.current.x, targetRef.current.y, el);
      if (distance < 80 && distance < closestDistance) { // Check proximity
        closestDistance = distance;
        closestPoint = getClosestPointOnElementEdge(targetRef.current.x, targetRef.current.y, el);
        newCurrentElement = el;
      }
    });

    // If the light is close to an element, update currentElementRef
    if (newCurrentElement && closestDistance < 80) {
      if (currentElementRef.current !== newCurrentElement) {
        currentElementRef.current = newCurrentElement;
        generateChat(newCurrentElement);
      }
    } else {
      currentElementRef.current = null;
    }

    // Smooth movement towards target or closest edge
    const lerpFactor = 0.08;
    lightRef.current.x += (closestPoint.x - lightRef.current.x) * lerpFactor;
    lightRef.current.y += (closestPoint.y - lightRef.current.y) * lerpFactor;
  }, [getDistanceToElementEdge, getClosestPointOnElementEdge, generateChat]);

  const updateParticles = useCallback(() => {
    particlesRef.current.forEach((particle) => {
      // Attract particles to light
      const dx = lightRef.current.x - particle.x;
      const dy = lightRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const force = 0.02;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }

      // Apply velocity with damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update life
      particle.life--;

      // Respawn particle if dead or too far
      if (particle.life <= 0 || distance > 200) {
        const angle = Math.random() * Math.PI * 2;
        const spawnDistance = 100 + Math.random() * 50;
        particle.x = lightRef.current.x + Math.cos(angle) * spawnDistance;
        particle.y = lightRef.current.y + Math.sin(angle) * spawnDistance;
        particle.life = particle.maxLife;
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
      }
    });
  }, []);

  const updateChatMessages = useCallback(() => {
    setChatMessages(prev =>
      prev
        .map(msg => ({
          ...msg,
          life: msg.life - 1,
          opacity: Math.min((msg.life / 150) * 0.7, 0.7) // Start fading immediately, max 70% opacity
        }))
        .filter(msg => msg.life > 0)
    );
  }, []);

  // Alfred's welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatMessages([{
        id: 'welcome',
        text: "Hello. I am Alfred. Welcome to Vattles, Vattler!",
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
        opacity: 0.7,
        life: 300 // 5 seconds for welcome message, starts fading immediately
      }]);
    }, 500); // Show after half a second

    return () => clearTimeout(timer);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw fog effect (will invert based on background due to difference blend mode)
    const fogGradient = ctx.createRadialGradient(
      lightRef.current.x, lightRef.current.y, 0,
      lightRef.current.x, lightRef.current.y, 120 * fogDensity
    );
    fogGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * lightIntensity})`);
    fogGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.2 * lightIntensity})`);
    fogGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.08 * lightIntensity})`);
    fogGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles (will invert based on background)
    particlesRef.current.forEach(particle => {
      const alpha = (particle.life / particle.maxLife) * lightIntensity;
      const distance = Math.sqrt(
        (particle.x - lightRef.current.x) ** 2 +
        (particle.y - lightRef.current.y) ** 2
      );
      const proximityAlpha = Math.max(0, 1 - distance / 100);

      ctx.save();
      ctx.globalAlpha = alpha * proximityAlpha * 0.9;
      ctx.fillStyle = 'white';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'white';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw main light core (will invert based on background)
    const coreGradient = ctx.createRadialGradient(
      lightRef.current.x, lightRef.current.y, 0,
      lightRef.current.x, lightRef.current.y, 15
    );
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${1 * lightIntensity})`);
    coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.8 * lightIntensity})`);
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = coreGradient;
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'white';
    ctx.beginPath();
    ctx.arc(lightRef.current.x, lightRef.current.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [lightIntensity, fogDensity]);

  const animate = useCallback(() => {
    updateLight();
    updateParticles();
    updateChatMessages();
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateLight, updateParticles, updateChatMessages, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeParticles(); // Re-initialize particles on resize
    };

    resizeCanvas();
    initializeParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initializeParticles]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen bg-background overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ mixBlendMode: 'difference' }}
      />

      {chatMessages.map(msg => (
        <div
          key={msg.id}
          className="absolute z-50 flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs shadow-lg transition-opacity duration-300"
          style={{
            left: msg.x,
            top: msg.y,
            opacity: msg.opacity,
            transform: 'translateX(-50%) translateY(-100%)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <MessageSquareText className="h-3 w-3" />
          <span>{msg.text}</span>
        </div>
      ))}

      <div className="absolute bottom-8 left-8 text-muted-foreground text-sm z-10">
        <p>Move your cursor to guide the flowing light</p>
        <p className="text-xs mt-1">Light follows element edges and reacts to proximity</p>
      </div>
    </div>
  );
};

export default function FlowingLightDemo() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <FlowingLight />
      {/* Example elements for the light to interact with */}
      <div className="absolute top-1/4 left-1/4 w-64 h-40 bg-background/10 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl p-6 text-foreground z-30" id="example-card-1">
        <h3 className="text-xl font-bold mb-2">Welcome Card</h3>
        <p className="text-sm text-muted-foreground">This is a sample card. The light orb will interact with its edges.</p>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Learn More</button>
      </div>
      <div className="absolute top-1/2 right-1/4 w-56 h-32 bg-background/10 backdrop-blur-md border border-border/20 rounded-lg shadow-xl p-4 text-foreground z-30" id="example-card-2">
        <h4 className="font-semibold">Stats Overview</h4>
        <p className="text-xs text-muted-foreground mt-1">Users: 1.2M</p>
        <p className="text-xs text-muted-foreground">Revenue: $500K</p>
      </div>
      <button className="absolute bottom-1/4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors z-30" id="signup-button">
        Sign Up Now!
      </button>
      <a href="#" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-blue-400 hover:text-blue-300 transition-colors z-30" id="about-link">
        About Us
      </a>
      <input type="text" placeholder="Enter your email" className="absolute bottom-1/3 left-1/4 p-2 rounded-md bg-background/20 border border-border/40 text-foreground placeholder-muted-foreground z-30" id="email-input" />
    </div>
  );
}
