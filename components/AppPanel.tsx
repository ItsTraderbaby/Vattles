import React, { useState } from 'react';
import { AppSubmission, Ratings, RatingCategory, FinalCode } from '../types';
import RatingSystem from './RatingSystem';
import CodeViewer from './CodeViewer';
import { AudioIcon, ImageIcon, TextIcon, LinkIcon, CodeBracketIcon, TrophyIcon } from './icons';
import './AppPanel.css';

interface AppPanelProps {
  submission: AppSubmission;
  mode: 'voting' | 'vod';
  ratings?: Ratings;
  onRate?: (category: RatingCategory, value: number) => void;
  onVote?: () => void;
  hasVoted?: boolean;
  isWinner?: boolean;
  codeToShow?: FinalCode;
}

const AppPanel: React.FC<AppPanelProps> = ({
  submission,
  mode,
  ratings,
  onRate,
  onVote,
  hasVoted,
  isWinner,
  codeToShow,
}) => {
  const { title, imageUrl, demoUrl, prompts, totalVotes, color, accentColor, finalCode } = submission;

  const [isDemoVisible, setIsDemoVisible] = useState(mode === 'vod' ? false : true);
  const [activeVodTab, setActiveVodTab] = useState<'demo' | 'code' | 'prompts'>('demo');

  const voteButtonBaseClasses =
    'w-full py-3 mt-4 font-orbitron text-lg font-bold rounded-lg transition-all duration-300';
  const purpleClasses =
    'bg-purple-600 text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 hover:shadow-purple-500/50';
  const tealClasses =
    'bg-teal-500 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-400 hover:shadow-teal-400/50';
  const votedPurpleClasses =
    'bg-purple-900/50 text-purple-400/70 border border-purple-700/50 cursor-not-allowed shadow-none';
  const votedTealClasses =
    'bg-teal-900/50 text-teal-400/70 border border-teal-700/50 cursor-not-allowed shadow-none';

  const getVoteButtonClasses = () => {
    if (hasVoted) return color === 'purple' ? votedPurpleClasses : votedTealClasses;
    return color === 'purple' ? purpleClasses : tealClasses;
  };

  const voteButtonClasses = `${voteButtonBaseClasses} ${getVoteButtonClasses()}`;
  const displayedCode = codeToShow || finalCode;

  const PromptsSection: React.FC = () => (
    <div className="bg-black/30 p-3 rounded-lg border border-gray-800">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
        AI Asset Prompts
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <ImageIcon className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" aria-hidden />
          <p className="text-gray-300">
            <span className="font-semibold text-gray-400">Visuals:</span> {prompts.visuals}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <AudioIcon className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" aria-hidden />
          <p className="text-gray-300">
            <span className="font-semibold text-gray-400">Audio:</span> {prompts.audio}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <TextIcon className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" aria-hidden />
          <p className="text-gray-300">
            <span className="font-semibold text-gray-400">Text:</span> {prompts.text}
          </p>
        </div>
      </div>
    </div>
  );

const DemoSection: React.FC = () => {
  // Precompile safe, case-insensitive regexes
  const LINK_STYLE_RE = /<link[^>]*href=["']?style\.css["']?[^>]*>/gi;
  const SCRIPT_FILE_RE = /<script[^>]*src=["']?script\.js["']?[^>]*>\s*<\/script>/gi;

  // Remove external style/script tags from provided HTML
  const sanitizedHtml =
    displayedCode
      ? displayedCode.html
          .replace(LINK_STYLE_RE, '')
          .replace(SCRIPT_FILE_RE, '')
      : null;

  const buildSrcDoc = (htmlContent: string, cssContent: string, jsContent: string) => `
    <!DOCTYPE html>
    <html>
      <head><style>${cssContent}</style></head>
      <body>
        ${htmlContent}
        <script>${jsContent}</script>
      </body>
    </html>`;

  const previewSrcDoc =
    displayedCode && sanitizedHtml
      ? buildSrcDoc(sanitizedHtml, displayedCode.css, displayedCode.js)
      : null;

  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-black relative">
      {previewSrcDoc ? (
        <iframe
          srcDoc={previewSrcDoc}
          title={`${title} - Live Preview`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      ) : isDemoVisible ? (
        <iframe
          src={demoUrl}
          title={`${title} - Live Demo`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      ) : (
        <>
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button
              onClick={() => setIsDemoVisible(true)}
              className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-lg border border-white/20 transition-all transform hover:scale-105"
            >
              <LinkIcon className="h-5 w-5" aria-hidden />
              Launch Live Demo
            </button>
          </div>
        </>
      )}
    </div>
  );
};


  const containerTone = color === 'purple' ? 'tone-purple' : 'tone-teal';
  const containerState = hasVoted ? 'state-voted' : 'state-active';

  return (
    <div
      className={`app-panel-container ${containerTone} ${containerState} bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 flex flex-col gap-4 transition-all duration-300 ${
        hasVoted ? 'opacity-80' : 'hover:shadow-2xl'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-orbitron text-lg font-semibold text-white">{title}</h3>

        {mode === 'vod' &&
          (isWinner ? (
            <div className="flex items-center gap-2 text-yellow-300 bg-yellow-500/20 border border-yellow-500/50 px-3 py-1 rounded-full text-sm font-bold">
              <TrophyIcon className="h-5 w-5" aria-hidden />
              WINNER
            </div>
          ) : (
            <div className="text-red-300 bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-full text-sm font-bold">
              LOSER
            </div>
          ))}

        {mode === 'voting' && (
          <span className="text-sm font-light text-gray-400">Total Votes: {totalVotes}</span>
        )}
      </div>

      {mode === 'voting' ? (
        <>
          <DemoSection />
          <PromptsSection />
          <div className="bg-black/30 p-3 rounded-lg border border-gray-800 flex-grow">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <RatingSystem
                label="Vibe"
                rating={ratings?.vibe ?? 0}
                onRate={(value) => onRate && onRate('vibe', value)}
                accentColor={accentColor}
                disabled={hasVoted}
              />
              <RatingSystem
                label="Creativity"
                rating={ratings?.creativity ?? 0}
                onRate={(value) => onRate && onRate('creativity', value)}
                accentColor={accentColor}
                disabled={hasVoted}
              />
              <RatingSystem
                label="Aesthetics"
                rating={ratings?.aesthetics ?? 0}
                onRate={(value) => onRate && onRate('aesthetics', value)}
                accentColor={accentColor}
                disabled={hasVoted}
              />
              <RatingSystem
                label="Functionality"
                rating={ratings?.functionality ?? 0}
                onRate={(value) => onRate && onRate('functionality', value)}
                accentColor={accentColor}
                disabled={hasVoted}
              />
            </div>
          </div>
          <button onClick={onVote} disabled={hasVoted} className={voteButtonClasses}>
            {hasVoted ? 'VOTED' : 'VOTE'}
          </button>
        </>
      ) : null}

      {mode === 'vod' ? (
        <>
         <div
  role="tablist"
  aria-label="VOD content"
  className="flex bg-gray-800/50 border border-gray-600 rounded-md p-1 mb-2"
>
  {([
    { key: 'demo' as const, label: 'Demo', Icon: LinkIcon },
    { key: 'code' as const, label: 'Code', Icon: CodeBracketIcon },
    { key: 'prompts' as const, label: 'Prompts', Icon: TextIcon },
  ]).map(({ key, label, Icon }) => {
    const isActive = activeVodTab === key;
    return (
      <button
        key={key}
        type="button"
        role="tab"
        id={`tab-${key}`}
        aria-controls={`panel-${key}`}
        aria-selected={isActive ? "true" : "false"}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveVodTab(key)}
        className={`w-1/3 py-1.5 rounded transition-colors text-sm font-semibold flex items-center justify-center gap-2 ${
          isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden /> {label}
      </button>
    );
  })}
</div>


          <div className="app-panel-tabpanel">
            {(['demo', 'code', 'prompts'] as const).map((key) => {
              const isActive = activeVodTab === key;
              return (
                <div
                  key={key}
                  role="tabpanel"
                  id={`panel-${key}`}
                  aria-labelledby={`tab-${key}`}
                  aria-hidden={!isActive ? 'true' : undefined}
                  hidden={!isActive}
                  data-tab={key}
                >
                  {key === 'demo' && <DemoSection />}
                  {key === 'code' &&
                    (displayedCode ? (
                      <CodeViewer code={displayedCode} />
                    ) : (
                      <div className="text-center text-gray-500 p-8">
                        Code not available for this Vattle.
                      </div>
                    ))}
                  {key === 'prompts' && <PromptsSection />}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AppPanel;
