'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';

interface SocialLink {
  id: string;
  name: string;
  href: string;
  iconPath: string;
  external: boolean;
}

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

interface SocialFooterConfig {
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
  layout: {
    container: string;
    socialGrid: string;
    footerGrid: string;
    spacing: string;
  };
  typography: {
    copyright: string;
    footerLink: string;
  };
  interactions: {
    socialIcon: {
      base: string;
      hover: string;
    };
    footerLink: {
      base: string;
      hover: string;
    };
    transition: string;
  };
  accessibility: {
    sectionRole: string;
    sectionLabel: string;
    socialLabel: string;
    footerLabel: string;
    externalLinkLabel: (name: string) => string;
  };
  content: {
    copyright: string;
  };
}

// Design System Configuration - Enterprise Pattern
const socialFooterConfig: SocialFooterConfig = {
  socialLinks: [
    {
      id: 'facebook',
      name: 'Facebook',
      href: 'https://facebook.com/rapkology',
      iconPath: '/icons/facebook.svg',
      external: true
    },
    {
      id: 'twitter',
      name: 'Twitter',
      href: 'https://twitter.com/rapkology',
      iconPath: '/icons/twitter.svg',
      external: true
    },
    {
      id: 'discord',
      name: 'Discord',
      href: 'https://discord.gg/rapkology',
      iconPath: '/icons/discord.svg',
      external: true
    },
    {
      id: 'spotify',
      name: 'Spotify',
      href: 'https://open.spotify.com/user/rapkology',
      iconPath: '/icons/spotify.svg',
      external: true
    },
    {
      id: 'youtube',
      name: 'YouTube',
      href: 'https://youtube.com/@rapkology',
      iconPath: '/icons/youtube.svg',
      external: true
    }
  ],
  footerLinks: [
    {
      id: 'haberler',
      label: 'HABERLER',
      href: '/haberler'
    },
    {
      id: 'etkinlikler',
      label: 'ETKİNLİKLER',
      href: '/etkinlikler'
    },
    {
      id: 'muzikler',
      label: 'MÜZİKLER',
      href: '/muzikler'
    },
    {
      id: 'videolar',
      label: 'VİDEOLAR',
      href: '/videolar'
    },
    {
      id: 'iletisim',
      label: 'İLETİŞİM',
      href: '/iletisim'
    }
  ],
  layout: {
    container: "space-y-8",
    socialGrid: "flex items-center justify-start gap-4",
    footerGrid: "flex flex-wrap gap-x-6 gap-y-3",
    spacing: "py-6 border-t border-ink-700"
  },
  typography: {
    copyright: "font-saira font-normal text-sm leading-none text-ink-500",
    footerLink: "font-saira font-normal text-sm leading-none text-white"
  },
  interactions: {
    socialIcon: {
      base: "p-2 text-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black",
      hover: "hover:text-white"
    },
    footerLink: {
      base: "focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm",
      hover: "hover:text-brand-yellow"
    },
    transition: "transition-all duration-200"
  },
  accessibility: {
    sectionRole: "contentinfo",
    sectionLabel: "Sosyal medya ve footer linkleri",
    socialLabel: "Sosyal medya bağlantıları",
    footerLabel: "Site navigasyon linkleri",
    externalLinkLabel: (name: string) => `${name} - yeni sekmede açılır`
  },
  content: {
    copyright: "© RAPKOLOGY All Rights Are Reserved 2024."
  }
};

export default function SocialFooter() {

  // Performance: Memoized handlers
  const handleSocialClick = useCallback((socialLink: SocialLink) => {
    // Analytics tracking could be added here
    console.log(`Social link clicked: ${socialLink.name}`);
  }, []);

  const handleFooterLinkClick = useCallback((footerLink: FooterLink) => {
    // Analytics tracking could be added here
    console.log(`Footer link clicked: ${footerLink.label}`);
  }, []);

  return (
    <section 
      className={socialFooterConfig.layout.container}
      role={socialFooterConfig.accessibility.sectionRole}
      aria-label={socialFooterConfig.accessibility.sectionLabel}
    >
      
      {/* Social Media Links */}
      <div 
        className={socialFooterConfig.layout.socialGrid}
        role="group"
        aria-label={socialFooterConfig.accessibility.socialLabel}
      >
        {socialFooterConfig.socialLinks.map((social) => (
          <Link
            key={social.id}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            onClick={() => handleSocialClick(social)}
            aria-label={
              social.external 
                ? socialFooterConfig.accessibility.externalLinkLabel(social.name)
                : social.name
            }
            className={`
              ${socialFooterConfig.interactions.socialIcon.base}
              ${socialFooterConfig.interactions.socialIcon.hover}
              ${socialFooterConfig.interactions.transition}
              inline-block
            `}
          >
            <Image
              src={social.iconPath}
              alt={social.name}
              width={20}
              height={20}
              className="w-9 h-9"
              priority={false}
            />
          </Link>
        ))}
      </div>

      {/* Footer Navigation Links */}
      <nav 
        className={socialFooterConfig.layout.footerGrid}
        role="navigation"
        aria-label={socialFooterConfig.accessibility.footerLabel}
      >
        {socialFooterConfig.footerLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => handleFooterLinkClick(link)}
            className={`
              ${socialFooterConfig.typography.footerLink}
              ${socialFooterConfig.interactions.footerLink.base}
              ${socialFooterConfig.interactions.footerLink.hover}
              ${socialFooterConfig.interactions.transition}
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Copyright Section */}
      <div className={socialFooterConfig.layout.spacing}>
        <p className={socialFooterConfig.typography.copyright}>
          {socialFooterConfig.content.copyright}
        </p>
      </div>

    </section>
  );
}
