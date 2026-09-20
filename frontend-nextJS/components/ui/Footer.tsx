import { TranslationContent } from '../../utils/types';

export interface FooterProps {
  t: TranslationContent;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="footer-bottom">
      <p>{t.footer.passion}</p>
      <div className="footer-socials">
        <span style={{ fontWeight: 600 }}>{t.footer.follow} :</span>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          <span>Instagram</span>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23-.73.38-1.56.88-2.28 1.48-.49-.8-.92-1.66-1.24-2.58-.29-.83-.43-1.7-.44-2.58v-.53zm0 9c.14-1.24-.13-2.5-.78-3.62.66-.46 1.34-1 1.94-1.62.77 1.48 1.09 3.16.92 4.82-.16 1.58-.87 3.08-1.99 4.22-.52-.61-1.07-1.19-1.68-1.72.63-.62 1.15-1.34 1.49-2.14.33-.8.43-1.66.42-2.52v-1.54z"/>
            <path d="M24 9v4.25c-1.53-.1-3.04-.59-4.38-1.42 0 3.32-.82 6.6-2.57 9.38-2.02 3.14-5.32 5.25-9.05 5.79-4.8.7-9.58-1.95-11.23-6.5C-1.52 14.54.43 9.4 4.85 7.08c3.21-1.68 7.15-1.62 10.3.15-.31.85-.75 1.66-1.28 2.4-2.15-1.22-4.82-1.34-7.09-.32-2.88 1.3-4.48 4.54-3.8 7.68.68 3.13 3.5 5.4 6.7 5.37 3.4-.03 6.34-2.48 6.9-5.83.1-.64.12-1.3.07-1.95V9.01H24zm-6.52 2.21a7.485 7.485 0 011.66 3.11c.29 1.15.22 2.37-.2 3.48-.48 1.25-1.38 2.32-2.52 3.05.51-.62.97-1.3 1.37-2.01.76-1.33 1.09-2.87 1.04-4.41-.05-1.12-.29-2.22-.73-3.26l-.62.04z"/>
          </svg>
          <span>TikTok</span>
        </a>
      </div>
    </footer>
  );
}
