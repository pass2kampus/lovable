
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight, Volume2, Copy, BookOpen, Star, History } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
  isFavorite?: boolean;
}

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [favorites, setFavorites] = useState<Translation[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  const commonPhrases = [
    { en: 'Hello, how are you?', fr: 'Bonjour, comment allez-vous ?' },
    { en: 'Thank you very much', fr: 'Merci beaucoup' },
    { en: 'Excuse me, where is...?', fr: 'Excusez-moi, où est...?' },
    { en: 'I need help', fr: 'J\'ai besoin d\'aide' },
    { en: 'How much does this cost?', fr: 'Combien ça coûte ?' },
    { en: 'I don\'t understand', fr: 'Je ne comprends pas' }
  ];

  // Enhanced translation function with better mock translations
  const getMockTranslation = (text: string, from: string, to: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      'en-fr': {
        'hello': 'bonjour',
        'hello, how are you?': 'bonjour, comment allez-vous ?',
        'thank you': 'merci',
        'thank you very much': 'merci beaucoup',
        'please': 's\'il vous plaît',
        'goodbye': 'au revoir',
        'yes': 'oui',
        'no': 'non',
        'excuse me': 'excusez-moi',
        'excuse me, where is...?': 'excusez-moi, où est...?',
        'how are you': 'comment allez-vous',
        'i need help': 'j\'ai besoin d\'aide',
        'where is': 'où est',
        'how much does this cost?': 'combien ça coûte ?',
        'i don\'t understand': 'je ne comprends pas',
        'good morning': 'bonjour',
        'good evening': 'bonsoir',
        'good night': 'bonne nuit',
        'see you later': 'à bientôt',
        'my name is': 'je m\'appelle',
        'nice to meet you': 'enchanté(e)',
        'how much': 'combien',
        'water': 'eau',
        'food': 'nourriture',
        'restaurant': 'restaurant',
        'hotel': 'hôtel',
        'airport': 'aéroport',
        'train station': 'gare',
        'university': 'université'
      },
      'fr-en': {
        'bonjour': 'hello',
        'bonjour, comment allez-vous ?': 'hello, how are you?',
        'merci': 'thank you',
        'merci beaucoup': 'thank you very much',
        's\'il vous plaît': 'please',
        'au revoir': 'goodbye',
        'oui': 'yes',
        'non': 'no',
        'excusez-moi': 'excuse me',
        'excusez-moi, où est...?': 'excuse me, where is...?',
        'comment allez-vous': 'how are you',
        'j\'ai besoin d\'aide': 'i need help',
        'où est': 'where is',
        'combien ça coûte ?': 'how much does this cost?',
        'je ne comprends pas': 'i don\'t understand',
        'bonsoir': 'good evening',
        'bonne nuit': 'good night',
        'à bientôt': 'see you later',
        'je m\'appelle': 'my name is',
        'enchanté': 'nice to meet you',
        'combien': 'how much',
        'eau': 'water',
        'nourriture': 'food',
        'restaurant': 'restaurant',
        'hôtel': 'hotel',
        'aéroport': 'airport',
        'gare': 'train station',
        'université': 'university'
      }
    };

    const key = `${from}-${to}`;
    const lowerText = text.toLowerCase().trim();
    
    if (translations[key] && translations[key][lowerText]) {
      return translations[key][lowerText];
    }
    
    // For common words, provide basic translations
    if (from === 'en' && to === 'fr') {
      if (lowerText.includes('hi') || lowerText.includes('hey')) return 'salut';
      if (lowerText.includes('bye')) return 'au revoir';
      if (lowerText.includes('sorry')) return 'désolé';
      if (lowerText.includes('love')) return 'amour';
      if (lowerText.includes('friend')) return 'ami';
      if (lowerText.includes('study')) return 'étudier';
      if (lowerText.includes('work')) return 'travail';
      if (lowerText.includes('house')) return 'maison';
      if (lowerText.includes('car')) return 'voiture';
    }
    
    if (from === 'fr' && to === 'en') {
      if (lowerText.includes('salut')) return 'hi';
      if (lowerText.includes('désolé')) return 'sorry';
      if (lowerText.includes('amour')) return 'love';
      if (lowerText.includes('ami')) return 'friend';
      if (lowerText.includes('étudier')) return 'study';
      if (lowerText.includes('travail')) return 'work';
      if (lowerText.includes('maison')) return 'house';
      if (lowerText.includes('voiture')) return 'car';
    }
    
    // Simple word-by-word translation for demonstration
    const words = lowerText.split(' ');
    if (words.length <= 3) {
      const translatedWords = words.map(word => {
        if (translations[key] && translations[key][word]) {
          return translations[key][word];
        }
        return word; // Keep original if no translation found
      });
      const result = translatedWords.join(' ');
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    // For longer texts, provide a more realistic translation
    const targetLangName = languages.find(l => l.code === to)?.name || to.toUpperCase();
    return `Translated to ${targetLangName}: "${text}"`;
  };

  // Auto-translate when sourceText changes (like Google Translate)
  useEffect(() => {
    if (sourceText.trim()) {
      const delayedTranslate = setTimeout(() => {
        const mockTranslation = getMockTranslation(sourceText, sourceLang, targetLang);
        setTranslatedText(mockTranslation);
        
        // Add to history
        const newTranslation: Translation = {
          id: Date.now().toString(),
          sourceText,
          translatedText: mockTranslation,
          sourceLang,
          targetLang,
          timestamp: new Date()
        };
        
        setTranslations(prev => [newTranslation, ...prev.slice(0, 9)]); // Keep last 10
      }, 300); // Faster response time like Google Translate

      return () => clearTimeout(delayedTranslate);
    } else {
      setTranslatedText('');
    }
  }, [sourceText, sourceLang, targetLang]);

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  const toggleFavorite = (translation: Translation) => {
    const isFavorite = favorites.some(f => f.id === translation.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(f => f.id !== translation.id));
      toast("Removed from favorites");
    } else {
      setFavorites(prev => [...prev, { ...translation, isFavorite: true }]);
      toast("Added to favorites");
    }
  };

  const useCommonPhrase = (phrase: { en: string; fr: string }) => {
    if (sourceLang === 'en') {
      setSourceText(phrase.en);
    } else {
      setSourceText(phrase.fr);
    }
  };

  const getLanguageInfo = (code: string) => {
    return languages.find(lang => lang.code === code) || { name: code, flag: '🌐' };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <ArrowLeftRight className="h-8 w-8 mr-3 text-blue-600" />
          Universal Translator
        </h1>
        <p className="text-lg text-gray-600">
          Real-time translation between multiple languages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Translation Interface */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5" />
                  Translator
                </CardTitle>
                <Button variant="outline" size="sm" onClick={swapLanguages}>
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Translation Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {getLanguageInfo(sourceLang).flag} {getLanguageInfo(sourceLang).name}
                    </label>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(sourceText, sourceLang)}
                        disabled={!sourceText}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(sourceText)}
                        disabled={!sourceText}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      {getLanguageInfo(targetLang).flag} {getLanguageInfo(targetLang).name}
                    </label>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(translatedText, targetLang)}
                        disabled={!translatedText}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(translatedText)}
                        disabled={!translatedText}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={translatedText}
                    placeholder="Translation will appear here automatically..."
                    className="min-h-[120px] bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Phrases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Common Phrases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {commonPhrases.map((phrase, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => useCommonPhrase(phrase)}
                  >
                    <div>
                      <div className="font-medium">{phrase.en}</div>
                      <div className="text-sm text-gray-500">{phrase.fr}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Favorites */}
          {favorites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {favorites.slice(0, 5).map((translation) => (
                    <div key={translation.id} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-sm font-medium">{translation.sourceText}</div>
                      <div className="text-sm text-gray-600">{translation.translatedText}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {getLanguageInfo(translation.sourceLang).flag} → {getLanguageInfo(translation.targetLang).flag}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(translation)}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Translations */}
          {translations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Translations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {translations.slice(0, 5).map((translation) => (
                    <div key={translation.id} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium">{translation.sourceText}</div>
                      <div className="text-sm text-gray-600">{translation.translatedText}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {getLanguageInfo(translation.sourceLang).flag} → {getLanguageInfo(translation.targetLang).flag}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(translation)}
                        >
                          <Star className={`h-4 w-4 ${favorites.some(f => f.id === translation.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Translation Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Translation Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Translations Today</span>
                  <span className="font-semibold">{translations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorites</span>
                  <span className="font-semibold">{favorites.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Used</span>
                  <span className="font-semibold">🇫🇷 French</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
