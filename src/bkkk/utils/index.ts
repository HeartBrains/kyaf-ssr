/**
 * Utils Index
 * Central export file for all utility functions and data
 */

// Configuration
export { siteConfig, getEmptyStateMessage } from './siteConfig';

// Translation and Language
export { translations, getTranslation } from './translations';
export { LanguageProvider, useLanguage } from './languageContext';

// Types
export type { WPImage, WPScheduleItem, WPPost } from './types';

// Data - Exhibitions
export { exhibitionsDataNew } from './exhibitionsDataNew';
export { exhibitionHelpers } from './exhibitionHelpers';

// Data - Moving Image
export { movingImageData } from './movingImageData';
export { movingImageGalleryData } from './movingImageGalleryData';

// Data - Residency
export { residencyData } from './residencyData';
export { residencyCreditData } from './residencyCreditData';

// Data - Other
export { teamDataBilingual } from './teamDataBilingual';
export { pressDataBilingual } from './pressDataBilingual';
export { mockDataBilingual } from './mockDataBilingual';

// Detail Content
export { 
  detailContent,
  getDetailContent,
  getAllDetailSlugs 
} from './detailContent';

export {
  detailContentThaiData,
  getDetailContentThai,
  getAllDetailSlugsThai
} from './detailContentThaiData';

// Search
export { searchData } from './searchData';

// Date and Status Helpers
export { 
  determineStatus,
  formatDateRange,
  isUpcoming,
  isCurrent,
  isPast 
} from './dateStatusHelper';

// Assets
export * from './assets';

// Records (if used)
export * from './records';
