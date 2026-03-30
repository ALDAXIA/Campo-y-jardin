import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-forest hover:text-olive hover:bg-forest/5"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline font-medium uppercase text-xs">
            {language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-paper border-forest/10">
        <DropdownMenuItem
          onClick={() => setLanguage('es')}
          className={`flex items-center justify-between cursor-pointer ${
            language === 'es' ? 'bg-forest/10 text-forest' : 'text-forest/80'
          }`}
        >
          <span>{t('language.es') as string}</span>
          {language === 'es' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={`flex items-center justify-between cursor-pointer ${
            language === 'en' ? 'bg-forest/10 text-forest' : 'text-forest/80'
          }`}
        >
          <span>{t('language.en') as string}</span>
          {language === 'en' && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
