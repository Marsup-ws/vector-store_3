export type Language = 'fr' | 'en' | 'ru' | 'uk';

export interface UserBean {
  id?: number;
  login: string;
  password?: string;
  email: string;
  rank: number;
}

export interface AdminItem {
  id: string;
  title?: string;
  price?: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  title?: string;
  image?: string;
  origin?: 'artisanat' | 'partenaires' | string;
  originLabel?: string;
  originBadgeColor?: 'green' | 'blue' | string;
  category?: 'vetements' | 'mugs' | 'supports' | string;
  categoryLabel?: string;
  type?: 'physique' | 'numerique' | string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'error';
}

export type ActiveModal = 'devis' | 'workshop' | 'doc1' | 'doc2' | 'doc3' | 'doc4' | string | null;

export interface TranslationContent {
  nav: {
    activities: string;
    store: string;
    studio: string;
    ateliers: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    tagline: string;
    description: string;
    btnExplore: string;
    btnDoc: string;
  };
  artisanat: {
    badge: string;
    tag: string;
    name: string;
    price: string;
    btn: string;
  };
  commerce: {
    badge: string;
    tag: string;
    name: string;
    price: string;
    btn: string;
  };
  digital: {
    badge: string;
    tag: string;
    name: string;
    price: string;
    btn: string;
    formats: string;
  };
  studio: {
    badge: string;
    direction: string;
    subtitle: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    btn: string;
  };
  ateliers: {
    badge: string;
    atelier1: {
      title: string;
      desc: string;
      btn: string;
    };
    event2: {
      title: string;
      desc: string;
      btn: string;
    };
  };
  cert: {
    text: string;
    title: string;
  };
  footer: {
    passion: string;
    follow: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    toastAdded: string;
    toastRemoved: string;
    checkoutSuccess: string;
  };
  devisModal: {
    title: string;
    name: string;
    email: string;
    projectType: string;
    projectTypePlaceholder: string;
    message: string;
    submit: string;
    success: string;
  };
  workshopModal: {
    title: string;
    name: string;
    email: string;
    date: string;
    notes: string;
    submit: string;
    success: string;
  };
  docLightbox: {
    certTitle: string;
    certSubtitle: string;
    text1: string;
    text2: string;
    text3?: string;
    close?: string;
  };
  presentation: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    paragraph5: string;
    sign: string;
  };
  contactPage: {
    heroTitle: string;
    heroSubtitle: string;
    heroSubtext: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formSubject: string;
    formSubjectPlaceholder: string;
    formSubjectOptions: {
      devis: string;
      store: string;
      workshop: string;
      collab: string;
      other: string;
    };
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSuccessTitle: string;
    formSuccessDesc: string;
    formReset: string;
    infoTitle: string;
    infoEmailLabel: string;
    infoPhoneLabel: string;
    infoAddressLabel: string;
    infoHoursLabel: string;
    infoHoursValue: string;
    infoHoursSub: string;
    socialTitle: string;
    socialSubtitle: string;
    mapTitle: string;
    mapSubtitle: string;
    mapDirections: string;
    mapEnlarge: string;
    mapBtn: string;
    trust1Title: string;
    trust1Desc: string;
    trust2Title: string;
    trust2Desc: string;
    trust3Title: string;
    trust3Desc: string;
    trust4Title: string;
    trust4Desc: string;
  };
  storePage: {
    heroTitle: string;
    heroSubtitle: string;
    heroTags: string;
    tabPhysical: string;
    tabDigital: string;
    filterTitle: string;
    filterReset: string;
    filterOrigin: string;
    filterOriginArtisanat: string;
    filterOriginArtisanatDesc: string;
    filterOriginPartenaires: string;
    filterOriginPartenairesDesc: string;
    filterCategory: string;
    filterCatVetements: string;
    filterCatMugs: string;
    filterCatSupports: string;
    craftBoxTitle: string;
    craftBoxText: string;
    sortByLabel: string;
    sortRecent: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortNameAZ: string;
    productsCount: string;
    productsCountPlural: string;
    emptyProducts: string;
    showAllProducts: string;
    addToCart: string;
    addToFav: string;
    trust1Title: string;
    trust1Desc: string;
    trust2Title: string;
    trust2Desc: string;
    trust3Title: string;
    trust3Desc: string;
    trust4Title: string;
    trust4Desc: string;
  };
  studioPage: {
    heroTitle: string;
    heroTagline: string;
    heroDesc: string;
    portfolioTitle: string;
    portfolioSubtitle: string;
    catAll: string;
    catLogos: string;
    catIdentite: string;
    catReseaux: string;
    catPrint: string;
    catIllustrations: string;
    seeMore: string;
    guarantee1Title: string;
    guarantee1Desc: string;
    guarantee2Title: string;
    guarantee2Desc: string;
    guarantee3Title: string;
    guarantee3Desc: string;
    guarantee4Title: string;
    guarantee4Desc: string;
    devisTitle: string;
    devisSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formCompany: string;
    formCompanyPlaceholder: string;
    formEmail: string;
    formPhone: string;
    formProjectType: string;
    formProjectTypePlaceholder: string;
    formProjectOptions: {
      logo: string;
      identity: string;
      sublimation: string;
      print: string;
      social: string;
      other: string;
    };
    formDesc: string;
    formDescPlaceholder: string;
    formFileLabel: string;
    dropzoneMain: string;
    dropzoneSub: string;
    privacyText: string;
    privacyHighlight: string;
    formSubmit: string;
    successTitle: string;
    successMsg: string;
    resetBtn: string;
  };
  atelierPage: {
    heroTitle: string;
    heroTagline: string;
    heroDesc: string;
    calendarTitle: string;
    todayBtn: string;
    legendSublimation: string;
    legendDesign: string;
    legendEvents: string;
    locationTitle: string;
    upcomingTitle: string;
    spotsAvailable: string;
    selectBtn: string;
    reserveBtn: string;
    viewAllSessions: string;
    bookingTitle: string;
    participantInfo: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    paymentTitle: string;
    payAndBook: string;
    processing: string;
    reassurance: string;
    whyTitle: string;
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    why5: string;
    promoTitle: string;
    promoSubtext: string;
  };
  adminPage: {
    articlesTitle: string;
    servicesTitle: string;
    addBtn: string;
    deleteBtn: string;
    newServiceBtn: string;
    editBtn: string;
    noImage: string;
    modalEditArticle: string;
    modalAddArticle: string;
    modalEditService: string;
    modalAddService: string;
    imageLabel: string;
    changeImage: string;
    dragImage: string;
    titleLabel: string;
    descLabel: string;
    priceLabel: string;
    cancelBtn: string;
    saveBtn: string;
  };
}
