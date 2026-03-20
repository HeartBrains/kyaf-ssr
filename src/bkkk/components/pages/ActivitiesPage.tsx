import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';
import { useBkkkActivities } from '../../../lib/useWPData';
import { siteConfig, getEmptyStateMessage } from '../../utils/siteConfig';

interface ActivitiesPageProps {
  onNavigate: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function ActivitiesPage({ onNavigate, targetSectionId }: ActivitiesPageProps) {
  const { language, t } = useLanguage();
  const { data: rawActivities } = useBkkkActivities();
  const [activeSection, setActiveSection] = useState('current-activities');

  const currentActivities = rawActivities.filter(a => a.status === 'current');
  const upcomingActivities = rawActivities.filter(a => a.status === 'upcoming');
  const pastActivities = rawActivities.filter(a => a.status === 'past');

  const sections = [
    ...(siteConfig.visibility.activities.current ? [{
      id: 'current-activities',
      label: t('activities.current'),
    }] : []),
    ...(siteConfig.visibility.activities.upcoming ? [{
      id: 'upcoming-activities',
      label: t('activities.upcoming'),
    }] : []),
    ...(siteConfig.visibility.activities.past ? [{
      id: 'past-activities',
      label: t('activities.past'),
    }] : []),
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to target section on mount
  useEffect(() => {
    if (targetSectionId) {
      setTimeout(() => scrollToSection(targetSectionId), 100);
    }
  }, [targetSectionId]);

  const ActivityCard = ({ item }: { item: typeof rawActivities[number] }) => (
    <div
      className="flex flex-col gap-6 w-full cursor-pointer group"
      onClick={() => onNavigate('activity-detail', item.slug)}
    >
      {item.featuredImage && (
        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
          <ImageWithFallback
            src={item.featuredImage}
            alt={item.title[language]}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
          {item.title[language]}
        </h3>
        {item.dateDisplay[language] && (
          <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
            {item.dateDisplay[language]}
          </p>
        )}
      </div>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="py-20 text-gray-400 font-sans text-xl md:text-2xl">
      {message}
    </div>
  );

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      <ParallaxHero
        image="https://images.unsplash.com/photo-1761403757058-e3c95b662a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBtdXNldW0lMjB3aGl0ZSUyMHdhbGxzfGVufDF8fHx8MTc3Mjk3NjY4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Sticky anchor menu */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-black'
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content sections */}
          <main className="w-full md:w-1/2 flex flex-col">
            {siteConfig.visibility.activities.current && (
              <section id="current-activities" className="mb-32 md:mb-40 scroll-mt-32">
                <div className="flex flex-col gap-12 md:gap-16">
                  {currentActivities.length > 0 ? (
                    currentActivities.map((item, i) => (
                      <Reveal key={item.id} delay={i * 0.1}>
                        <ActivityCard item={item} />
                      </Reveal>
                    ))
                  ) : (
                    <EmptyState message={getEmptyStateMessage('noCurrentActivities', language)} />
                  )}
                </div>
              </section>
            )}

            {siteConfig.visibility.activities.upcoming && (
              <section id="upcoming-activities" className="mb-32 md:mb-40 scroll-mt-32">
                <div className="flex flex-col gap-12 md:gap-16">
                  {upcomingActivities.length > 0 ? (
                    upcomingActivities.map((item, i) => (
                      <Reveal key={item.id} delay={i * 0.1}>
                        <ActivityCard item={item} />
                      </Reveal>
                    ))
                  ) : (
                    <EmptyState message={getEmptyStateMessage('comingSoon', language)} />
                  )}
                </div>
              </section>
            )}

            {siteConfig.visibility.activities.past && (
              <section id="past-activities" className="mb-32 md:mb-40 scroll-mt-32">
                <div className="flex flex-col gap-12 md:gap-16">
                  {pastActivities.length > 0 ? (
                    pastActivities.map((item, i) => (
                      <Reveal key={item.id} delay={i * 0.1}>
                        <ActivityCard item={item} />
                      </Reveal>
                    ))
                  ) : (
                    <EmptyState message={getEmptyStateMessage('comingSoon', language)} />
                  )}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}