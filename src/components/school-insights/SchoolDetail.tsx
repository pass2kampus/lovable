
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, GraduationCap, Globe, Award, ExternalLink, Euro, Phone, Mail, Building, Instagram, Linkedin } from "lucide-react";
import { DatabaseSchool } from "@/types/database";

interface SchoolDetailProps {
  school: DatabaseSchool;
  onBack: () => void;
}

export function SchoolDetail({ school, onBack }: SchoolDetailProps) {
  const detailedPrograms = school.detailed_programs || [];
  const rankings = school.rankings || [];
  const accreditations = school.accreditations || [];
  const recognition = school.recognition || [];
  const specializations = school.specializations || [];
  const tuitionFees = school.tuition_fees;
  const contactInfo = school.contact_info;

  const formatTuitionDetails = (fees: any) => {
    if (!fees) return null;
    if (typeof fees === 'object') {
      return Object.entries(fees).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center py-1">
          <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
          <span className="font-semibold text-green-700">
            {String(value).includes('€') ? String(value) : `€${String(value)}`}
          </span>
        </div>
      ));
    }
    return (
      <div className="flex justify-between items-center py-1">
        <span className="text-gray-600">Annual Tuition:</span>
        <span className="font-semibold text-green-700">
          {String(fees).includes('€') ? String(fees) : `€${String(fees)}`}
        </span>
      </div>
    );
  };

  const formatProgramDuration = (program: any) => {
    if (program.duration) {
      return `${program.duration} • ${program.type || 'Program'}`;
    }
    return program.type || 'Program';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{school.emoji || "🎓"}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{school.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{school.long_description || school.description}</p>
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{school.city}, France</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Programs Card */}
        {detailedPrograms.length > 0 && (
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Programs Offered
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedPrograms.map((program: any, index: number) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold text-blue-900 mb-2">
                      {program.name}
                    </div>
                    <div className="text-sm text-blue-700 mb-2">
                      {program.description}
                    </div>
                    <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">
                      {formatProgramDuration(program)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tuition Fees Card */}
        {tuitionFees && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Euro className="h-5 w-5 mr-2 text-green-600" />
                Tuition Fees (Annual)
              </h3>
              <div className="space-y-2 bg-green-50 p-4 rounded-lg">
                {formatTuitionDetails(tuitionFees)}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                *Fees may vary based on program and nationality. Contact the school for the most current information.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Rankings & Recognition Card */}
        {(rankings.length > 0 || accreditations.length > 0 || recognition.length > 0 || specializations.length > 0) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Rankings & Recognition
              </h3>
              <div className="space-y-3">
                {[...rankings, ...accreditations, ...recognition, ...specializations].map((item: any, index: number) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-800">{item.title}</div>
                    <div className="text-sm text-yellow-700">{item.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-gray-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {school.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-3 text-gray-400" />
                    <a 
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {school.website.replace('https://', '').replace('http://', '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                {contactInfo?.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo?.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="text-gray-700">{contactInfo.phone}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {contactInfo?.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-3 text-gray-400" />
                    <a 
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {contactInfo?.instagram && (
                  <div className="flex items-center">
                    <Instagram className="h-4 w-4 mr-3 text-gray-400" />
                    <a 
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Instagram Page
                    </a>
                  </div>
                )}
                {contactInfo?.address && (
                  <div className="flex items-start">
                    <Building className="h-4 w-4 mr-3 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
