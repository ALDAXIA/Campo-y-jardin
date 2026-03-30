import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, Search, ShoppingCart, Phone, MapPin, Mail, 
  Clock, ChevronRight, Check, ArrowRight, Tractor, 
  Droplets, Shovel, Leaf, Wrench, TreePine, Home,
  Facebook, Instagram, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Types
interface Product {
  id: number;
  nameKey: string;
  descriptionKey: string;
  price: string;
  image: string;
  categoryKey: string;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span?: string;
}

// Data
const galleryImages: GalleryImage[] = [
  { id: 1, src: '/gallery-1.jpg', alt: 'Beautiful landscaped garden', span: 'col-span-2' },
  { id: 2, src: '/gallery-2.jpg', alt: 'Professional brush cutter', span: 'row-span-2' },
  { id: 3, src: '/gallery-3.jpg', alt: 'Irrigation installation' },
  { id: 4, src: '/gallery-4.jpg', alt: 'Rose garden', span: 'col-span-2' },
  { id: 5, src: '/gallery-5.jpg', alt: 'Chainsaw work', span: 'row-span-2' },
  { id: 6, src: '/gallery-6.jpg', alt: 'Outdoor patio', span: 'col-span-2' },
  { id: 7, src: '/gallery-7.jpg', alt: 'Lawn mowing' },
  { id: 8, src: '/gallery-8.jpg', alt: 'Tree planting', span: 'row-span-2' },
];

function AppContent() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    need: '',
    size: '',
    services: [] as string[],
    budget: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showQuoteSuccess, setShowQuoteSuccess] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Products data with translation keys
  const products: Product[] = [
    { id: 1, nameKey: 'products.items.0.name', descriptionKey: 'products.items.0.description', price: '€2,490', image: '/product-mower.jpg', categoryKey: 'products.items.0.category' },
    { id: 2, nameKey: 'products.items.1.name', descriptionKey: 'products.items.1.description', price: '€149', image: '/product-irrigation.jpg', categoryKey: 'products.items.1.category' },
    { id: 3, nameKey: 'products.items.2.name', descriptionKey: 'products.items.2.description', price: '€39', image: '/product-shears.jpg', categoryKey: 'products.items.2.category' },
    { id: 4, nameKey: 'products.items.3.name', descriptionKey: 'products.items.3.description', price: '€27', image: '/product-fertilizer.jpg', categoryKey: 'products.items.3.category' },
    { id: 5, nameKey: 'products.items.4.name', descriptionKey: 'products.items.4.description', price: '€219', image: '/product-washer.jpg', categoryKey: 'products.items.4.category' },
    { id: 6, nameKey: 'products.items.5.name', descriptionKey: 'products.items.5.description', price: '€89', image: '/product-cart.jpg', categoryKey: 'products.items.5.category' },
  ];

  // Services data
  const services = [
    { icon: Tractor, titleKey: 'services.items.0.title', descriptionKey: 'services.items.0.description' },
    { icon: Droplets, titleKey: 'services.items.1.title', descriptionKey: 'services.items.1.description' },
    { icon: Shovel, titleKey: 'services.items.2.title', descriptionKey: 'services.items.2.description' },
    { icon: Leaf, titleKey: 'services.items.3.title', descriptionKey: 'services.items.3.description' },
    { icon: Wrench, titleKey: 'services.items.4.title', descriptionKey: 'services.items.4.description' },
    { icon: TreePine, titleKey: 'services.items.5.title', descriptionKey: 'services.items.5.description' },
  ];

  // Categories data
  const categories = [
    { id: 1, nameKey: 'categories.items.0', image: '/category-machinery.jpg' },
    { id: 2, nameKey: 'categories.items.1', image: '/category-irrigation.jpg' },
    { id: 3, nameKey: 'categories.items.2', image: '/category-tools.jpg' },
    { id: 4, nameKey: 'categories.items.3', image: '/category-soil.jpg' },
  ];

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 }
      );

      // Section reveal animations
      const sections = document.querySelectorAll('.reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Card stagger animations
      const cardGroups = document.querySelectorAll('.card-group');
      cardGroups.forEach((group) => {
        const cards = group.querySelectorAll('.card-item');
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleQuoteNext = () => {
    if (quoteStep < 5) setQuoteStep(quoteStep + 1);
  };

  const handleQuoteBack = () => {
    if (quoteStep > 1) setQuoteStep(quoteStep - 1);
  };

  const handleQuoteSubmit = () => {
    setShowQuoteSuccess(true);
    setTimeout(() => {
      setShowQuoteSuccess(false);
      setQuoteStep(1);
      setQuoteData({
        need: '', size: '', services: [], budget: '',
        name: '', phone: '', email: '', message: ''
      });
    }, 3000);
  };

  const toggleService = (service: string) => {
    setQuoteData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-md border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-forest" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-paper border-forest/10">
                <SheetHeader>
                  <SheetTitle className="font-heading text-forest text-xl">CAMPO Y JARDÍN</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <button onClick={() => scrollToSection(heroRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.home')}</button>
                  <button onClick={() => scrollToSection(categoriesRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.categories')}</button>
                  <button onClick={() => scrollToSection(productsRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.catalog')}</button>
                  <button onClick={() => scrollToSection(quoteRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.quote')}</button>
                  <button onClick={() => scrollToSection(galleryRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.gallery')}</button>
                  <button onClick={() => scrollToSection(contactRef)} className="text-left text-forest hover:text-olive transition-colors py-2">{t('nav.contact')}</button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex-1 flex justify-center lg:justify-start lg:flex-none">
              <button onClick={() => scrollToSection(heroRef)} className="font-heading font-bold text-lg sm:text-xl tracking-tight text-forest">
                CAMPO Y JARDÍN
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection(categoriesRef)} className="text-sm font-medium text-forest hover:text-olive transition-colors">{t('nav.categories')}</button>
              <button onClick={() => scrollToSection(productsRef)} className="text-sm font-medium text-forest hover:text-olive transition-colors">{t('nav.catalog')}</button>
              <button onClick={() => scrollToSection(quoteRef)} className="text-sm font-medium text-forest hover:text-olive transition-colors">{t('nav.quote')}</button>
              <button onClick={() => scrollToSection(galleryRef)} className="text-sm font-medium text-forest hover:text-olive transition-colors">{t('nav.gallery')}</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-sm font-medium text-forest hover:text-olive transition-colors">{t('nav.contact')}</button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5 text-forest" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-forest" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-forest text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-garden.jpg" 
            alt="Beautiful garden with machinery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="hero-title font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                onClick={() => scrollToSection(quoteRef)}
                className="bg-forest hover:bg-forest/90 text-white px-8 py-6 text-base font-semibold rounded-full"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection(productsRef)}
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full"
              >
                {t('hero.ctaSecondary')}
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-olive" />
                <span>{t('hero.badge1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-olive" />
                <span>{t('hero.badge2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-olive" />
                <span>{t('hero.badge3')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-forest/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <a href="tel:956858759" className="flex items-center gap-2 text-white hover:text-olive transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">{t('contactBar.phone')}</span>
              </a>
              <a 
                href="https://wa.me/34956858759" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-olive hover:bg-olive/90 text-white px-4 py-2 rounded-full transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{t('contactBar.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-paper reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="font-mono-label text-xs text-olive mb-4 block">{t('about.label')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mb-6">
                {t('about.title')}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Wrench className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('about.feature1.title')}</h3>
                    <p className="text-sm text-text-secondary">{t('about.feature1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Tractor className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('about.feature2.title')}</h3>
                    <p className="text-sm text-text-secondary">{t('about.feature2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Droplets className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('about.feature3.title')}</h3>
                    <p className="text-sm text-text-secondary">{t('about.feature3.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Home className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('about.feature4.title')}</h3>
                    <p className="text-sm text-text-secondary">{t('about.feature4.description')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large">
                <img src="/seasonal-kit.jpg" alt="Garden tools" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest text-white p-6 rounded-2xl shadow-large">
                <div className="text-4xl font-bold mb-1">15+</div>
                <div className="text-sm text-white/80">{t('about.experience')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-forest/5 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono-label text-xs text-olive mb-4 block">{t('services.label')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              {t('services.title')}
            </h2>
          </div>
          <div className="card-group grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="card-item bg-paper p-8 rounded-2xl shadow-soft hover-lift group"
              >
                <div className="bg-forest/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-forest transition-colors">
                  <service.icon className="h-7 w-7 text-forest group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-text-secondary">
                  {t(service.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-20 lg:py-32 bg-paper reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="font-mono-label text-xs text-olive mb-4 block">{t('categories.label')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
                {t('categories.title')}
              </h2>
            </div>
            <Button 
              onClick={() => scrollToSection(productsRef)}
              variant="link" 
              className="text-forest hover:text-olive mt-4 sm:mt-0"
            >
              {t('categories.viewAll')}
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
          <div className="card-group grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="card-item group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer img-zoom"
                onClick={() => scrollToSection(productsRef)}
              >
                <img 
                  src={category.image} 
                  alt={t(category.nameKey) as string} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {t(category.nameKey)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-20 lg:py-32 bg-forest/5 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono-label text-xs text-olive mb-4 block">{t('products.label')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              {t('products.title')}
            </h2>
          </div>
          <div className="card-group grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card-item bg-paper rounded-2xl overflow-hidden shadow-soft hover-lift">
                <div className="aspect-square img-zoom">
                  <img 
                    src={product.image} 
                    alt={t(product.nameKey) as string} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3 bg-forest/10 text-forest">
                    {t(product.categoryKey)}
                  </Badge>
                  <h3 className="font-heading text-lg font-semibold text-forest mb-2">
                    {t(product.nameKey)}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {t(product.descriptionKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-forest">
                      {product.price}
                    </span>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-forest border-forest hover:bg-forest hover:text-white">
                            {t('products.info')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-paper">
                          <DialogHeader>
                            <DialogTitle className="font-heading text-forest">{t(product.nameKey)}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <img src={product.image} alt={t(product.nameKey) as string} className="w-full rounded-lg" />
                            <p className="text-text-secondary">{t(product.descriptionKey)}</p>
                            <p className="font-heading text-2xl font-bold text-forest">{product.price}</p>
                            <Button onClick={addToCart} className="bg-forest hover:bg-forest/90">
                              {t('products.addToCart')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        onClick={() => scrollToSection(quoteRef)}
                        size="sm" 
                        className="bg-olive hover:bg-olive/90 text-white"
                      >
                        {t('products.requestQuote')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Builder Section */}
      <section ref={quoteRef} className="py-20 lg:py-32 bg-paper reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="font-mono-label text-xs text-olive mb-4 block">{t('quote.label')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mb-6">
                {t('quote.title')}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {t('quote.description')}
              </p>
              <div className="bg-forest/5 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="h-5 w-5 text-forest" />
                  <span className="text-forest font-medium">{t('quote.preferCall')}</span>
                </div>
                <a href="tel:956858759" className="font-heading text-2xl font-bold text-forest hover:text-olive transition-colors">
                  {t('quote.phone')}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-large p-8">
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div 
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step <= quoteStep ? 'bg-forest text-white' : 'bg-forest/10 text-forest'
                    }`}
                  >
                    {step < quoteStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                ))}
              </div>

              {/* Form Steps */}
              <div className="min-h-[300px]">
                {showQuoteSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-16 h-16 bg-olive/20 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-olive" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-forest mb-2">
                      {t('quote.success.title')}
                    </h3>
                    <p className="text-text-secondary">
                      {t('quote.success.message')}
                    </p>
                  </div>
                ) : (
                  <>
                    {quoteStep === 1 && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                          {t('quote.step1.title')}
                        </h3>
                        <div className="grid gap-3">
                          {(t('quote.step1.options') as string[]).map((option) => (
                            <button
                              key={option}
                              onClick={() => setQuoteData({ ...quoteData, need: option })}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                quoteData.need === option 
                                  ? 'border-forest bg-forest/5' 
                                  : 'border-forest/10 hover:border-forest/30'
                              }`}
                            >
                              <span className="text-forest font-medium">{option}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quoteStep === 2 && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                          {t('quote.step2.title')}
                        </h3>
                        <div className="grid gap-3">
                          {(t('quote.step2.options') as string[]).map((option) => (
                            <button
                              key={option}
                              onClick={() => setQuoteData({ ...quoteData, size: option })}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                quoteData.size === option 
                                  ? 'border-forest bg-forest/5' 
                                  : 'border-forest/10 hover:border-forest/30'
                              }`}
                            >
                              <span className="text-forest font-medium">{option}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quoteStep === 3 && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                          {t('quote.step3.title')}
                        </h3>
                        <div className="grid gap-3">
                          {(t('quote.step3.options') as string[]).map((option) => (
                            <button
                              key={option}
                              onClick={() => toggleService(option)}
                              className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                                quoteData.services.includes(option) 
                                  ? 'border-forest bg-forest/5' 
                                  : 'border-forest/10 hover:border-forest/30'
                              }`}
                            >
                              <span className="text-forest font-medium">{option}</span>
                              {quoteData.services.includes(option) && <Check className="h-5 w-5 text-forest" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quoteStep === 4 && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                          {t('quote.step4.title')}
                        </h3>
                        <div className="grid gap-3">
                          {(t('quote.step4.options') as string[]).map((option) => (
                            <button
                              key={option}
                              onClick={() => setQuoteData({ ...quoteData, budget: option })}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                quoteData.budget === option 
                                  ? 'border-forest bg-forest/5' 
                                  : 'border-forest/10 hover:border-forest/30'
                              }`}
                            >
                              <span className="text-forest font-medium">{option}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quoteStep === 5 && (
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                          {t('quote.step5.title')}
                        </h3>
                        <div className="grid gap-4">
                          <Input 
                            placeholder={t('quote.step5.name') as string}
                            value={quoteData.name}
                            onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                            className="border-forest/20 focus:border-forest"
                          />
                          <Input 
                            placeholder={t('quote.step5.phone') as string}
                            value={quoteData.phone}
                            onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                            className="border-forest/20 focus:border-forest"
                          />
                          <Input 
                            placeholder={t('quote.step5.email') as string}
                            type="email"
                            value={quoteData.email}
                            onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                            className="border-forest/20 focus:border-forest"
                          />
                          <Textarea 
                            placeholder={t('quote.step5.message') as string}
                            value={quoteData.message}
                            onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                            className="border-forest/20 focus:border-forest min-h-[100px]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Navigation */}
              {!showQuoteSuccess && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleQuoteBack}
                    disabled={quoteStep === 1}
                    className="border-forest/20 text-forest"
                  >
                    {t('quote.back')}
                  </Button>
                  {quoteStep < 5 ? (
                    <Button
                      onClick={handleQuoteNext}
                      disabled={
                        (quoteStep === 1 && !quoteData.need) ||
                        (quoteStep === 2 && !quoteData.size) ||
                        (quoteStep === 3 && quoteData.services.length === 0) ||
                        (quoteStep === 4 && !quoteData.budget)
                      }
                      className="bg-forest hover:bg-forest/90 text-white"
                    >
                      {t('quote.next')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleQuoteSubmit}
                      disabled={!quoteData.name || !quoteData.phone}
                      className="bg-forest hover:bg-forest/90 text-white"
                    >
                      {t('quote.submit')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section ref={featuredRef} className="py-20 lg:py-32 bg-forest/5 reveal-section">
        <div className="relative rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto">
          <div className="absolute inset-0">
            <img 
              src="/quote-background.jpg" 
              alt="Seasonal collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/60" />
          </div>
          <div className="relative z-10 py-20 lg:py-32 px-8 text-center">
            <Badge className="mb-6 bg-paper/20 text-white border-0 backdrop-blur-sm">
              {t('featured.badge')}
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('featured.title')}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              {t('featured.description')}
            </p>
            <Button 
              onClick={() => scrollToSection(productsRef)}
              className="bg-paper text-forest hover:bg-white px-8 py-6 text-base font-semibold rounded-full"
            >
              {t('featured.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 lg:py-32 bg-paper reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono-label text-xs text-olive mb-4 block">{t('gallery.label')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest">
              {t('gallery.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className={`relative rounded-2xl overflow-hidden img-zoom ${image.span || ''}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 lg:py-32 bg-forest/5 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono-label text-xs text-olive mb-4 block">{t('contact.label')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-text-secondary text-lg mb-10">
                {t('contact.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('contact.address.title')}</h3>
                    <p className="text-text-secondary">
                      {t('contact.address.line1')}<br />
                      {t('contact.address.line2')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Phone className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('contact.phone.title')}</h3>
                    <a href="tel:956858759" className="text-text-secondary hover:text-forest transition-colors">
                      956 85 87 59
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('contact.email.title')}</h3>
                    <a href="mailto:hola@campoyjardin.es" className="text-text-secondary hover:text-forest transition-colors">
                      {t('contact.email.value')}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-forest/10 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest mb-1">{t('contact.hours.title')}</h3>
                    <p className="text-text-secondary">
                      {t('contact.hours.weekdays')}<br />
                      {t('contact.hours.saturday')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <a 
                  href="tel:956858759"
                  className="inline-flex items-center gap-2 bg-forest hover:bg-forest/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  {t('contact.callNow')}
                </a>
                <a 
                  href="https://wa.me/34956858759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-olive hover:bg-olive/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('contact.whatsapp')}
                </a>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-3xl shadow-large p-8">
                <h3 className="font-heading text-xl font-semibold text-forest mb-6">
                  {t('contact.form.title')}
                </h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
                  <Input 
                    placeholder={t('contact.form.name') as string}
                    className="border-forest/20 focus:border-forest"
                  />
                  <Input 
                    placeholder={t('contact.form.email') as string}
                    type="email"
                    className="border-forest/20 focus:border-forest"
                  />
                  <Input 
                    placeholder={t('contact.form.phone') as string}
                    className="border-forest/20 focus:border-forest"
                  />
                  <Textarea 
                    placeholder={t('contact.form.message') as string}
                    className="border-forest/20 focus:border-forest min-h-[120px]"
                  />
                  <Button className="w-full bg-forest hover:bg-forest/90 text-white py-6">
                    {t('contact.form.send')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.0!2d-6.2275!3d36.5958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dd1c!2sAv.+del+Descubrimiento%2C+27%2C+11500+El+Puerto+de+Santa+Mar%C3%ADa%2C+C%C3%A1diz%2C+Spain!5e0!3m2!1sen!2ses!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Campo y Jardín Location"
        />
        <a 
          href="https://maps.google.com/?q=Av.+del+Descubrimiento,+27,+11500+El+Puerto+de+Santa+María,+Cádiz,+Spain"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 bg-forest hover:bg-forest/90 text-white px-6 py-3 rounded-full font-medium shadow-large transition-colors"
        >
          {t('contact.getDirections')}
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">CAMPO Y JARDÍN</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://wa.me/34956858759" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><button onClick={() => scrollToSection(heroRef)} className="hover:text-white transition-colors">{t('nav.home')}</button></li>
                <li><button onClick={() => scrollToSection(categoriesRef)} className="hover:text-white transition-colors">{t('nav.categories')}</button></li>
                <li><button onClick={() => scrollToSection(productsRef)} className="hover:text-white transition-colors">{t('nav.catalog')}</button></li>
                <li><button onClick={() => scrollToSection(quoteRef)} className="hover:text-white transition-colors">{t('nav.quote')}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>{t('services.items.0.title')}</li>
                <li>{t('services.items.1.title')}</li>
                <li>{t('services.items.2.title')}</li>
                <li>{t('services.items.4.title')}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>{t('contact.address.line1')}</li>
                <li>{t('contact.address.line2')}</li>
                <li><a href="tel:956858759" className="hover:text-white transition-colors">956 85 87 59</a></li>
                <li><a href="mailto:hola@campoyjardin.es" className="hover:text-white transition-colors">{t('contact.email.value')}</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-white/10 mb-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
            <p>&copy; 2024 Campo y Jardín. {t('footer.rights')}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/34956858759"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-large transition-all hover:scale-110 animate-float"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
