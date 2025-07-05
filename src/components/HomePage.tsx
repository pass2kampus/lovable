
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, MessageSquare, Users, BookOpen, Languages, ArrowRight, Star, Globe, Award, Clock, Shield, Sparkles, MapPin, FileText, CreditCard, Plane, School } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
  onPageNavigation: (page: string) => void;
}

export const HomePage = ({ onGetStarted, onPageNavigation }: HomePageProps) => {
  const features = [
    {
      icon: School,
      title: "School Insights",
      description: "Explore universities and schools across France with detailed information and city insights",
      color: "text-indigo-600"
    },
    {
      icon: CheckSquare,
      title: "Pre-Arrival Checklists",
      description: "Campus France, visa applications, and essential preparations for your journey",
      color: "text-blue-600"
    },
    {
      icon: FileText,
      title: "Post-Arrival Tasks",
      description: "Bank accounts, social security, health insurance, and CAF applications",
      color: "text-green-600" 
    },
    {
      icon: CreditCard,
      title: "Finance Tracking",
      description: "Budget planning, expense management, and financial tools for students",
      color: "text-yellow-600"
    },
    {
      icon: Languages,
      title: "French Integration",
      description: "Language basics, cultural etiquette, and integration tips for daily life",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with fellow international students and share experiences",
      color: "text-pink-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Universities", icon: Award },
    { number: "50+", label: "Cities", icon: Globe },
    { number: "24/7", label: "AI Support", icon: Clock },
    { number: "100%", label: "Secure", icon: Shield }
  ];

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Master's Student at Sorbonne University",
      content: "pasS2Kampus made my transition to French university life so much smoother. The checklist helped me stay organized and avoid common mistakes!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Engineering Student at INSA Lyon",
      content: "The expert guidance helped me with all my visa questions instantly. The packing tips saved me from bringing unnecessary items. Couldn't have done it without this platform!",
      rating: 5
    },
    {
      name: "Ravi Kumar",
      role: "Business Student at HEC Paris",
      content: "The community feature helped me connect with other Indian students before I even arrived in France. We now have a great support network!",
      rating: 5
    }
  ];

  const updates = [
    {
      type: "warning",
      content: "Visa appointment changes for Sept intake - book 3 months in advance"
    },
    {
      type: "success",
      content: "CROUS housing applications now open until July 31"
    },
    {
      type: "info",
      content: "CAF processing times reduced to 4-6 weeks for complete applications"
    }
  ];

  const journeySnapshots = [
    {
      title: "What I packed for Grenoble — and wish I didn't",
      author: "Ananya K.",
      preview: "Bringing heavy winter clothes was a mistake. You can buy better ones here...",
      icon: "🧳"
    },
    {
      title: "Finding housing in Paris: CROUS vs. private options",
      author: "Vikram S.",
      preview: "After 3 rejections from private landlords, I finally found a solution...",
      icon: "🏠"
    },
    {
      title: "Applying for CAF without a French guarantor",
      author: "Meera P.",
      preview: "The exact documents and steps I used to get housing assistance...",
      icon: "📄"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden pb-12">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Updates Banner */}
      <div className="bg-gray-900 text-white py-2 px-4 overflow-hidden">
        <div className="flex items-center justify-center space-x-8 animate-marquee">
          {updates.map((update, index) => (
            <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
              <span className={`inline-block w-2 h-2 rounded-full ${
                update.type === 'warning' ? 'bg-yellow-400' : 
                update.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
              }`}></span>
              <span className="text-sm">{update.content}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            Built by Indian Students, for Indian Students
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            From university search to onboarding{" "}
            <span className="text-gray-900">
              pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Powered by real experience, not just advice. Everything here is based on what we wish we knew.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800 transition-all"
              onClick={() => window.open('https://wa.me/33745736466', '_blank')}
            >
              Talk to an Expert
              <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Students Trust Us */}
      <section className="px-4 py-12 bg-white/80">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl mb-2">🧠</div>
              <p className="text-gray-700">Built by students who've lived it</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">📦</div>
              <p className="text-gray-700">Based on packing regrets, visa errors, and city-wise hacks</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-gray-700">100+ Indian students shared input to help others avoid costly mistakes</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🔗</div>
              <p className="text-gray-700">Free to use. No agents. No forms. Just smart guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources to make your French education journey successful
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-4 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Snapshots Section */}
      <section className="px-4 py-12 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Live Journey Snapshots</h2>
            <p className="text-lg text-gray-600">Real experiences from Indian students in France</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {journeySnapshots.map((snapshot, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{snapshot.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{snapshot.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{snapshot.preview}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {snapshot.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="gap-2">
              Read Student Stories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful international students
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 text-white">
            <CardContent className="py-12 px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your French Education Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Join hundreds of Indian students who have successfully navigated their French education journey with pasS2Kampus
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                onClick={onGetStarted}
              >
                Explore Our Modules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-2">
            Have questions? Need personalized guidance?
          </p>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => window.open('https://wa.me/33745736466', '_blank')}
          >
            Chat with our team on WhatsApp
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};
