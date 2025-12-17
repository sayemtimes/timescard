import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  logo?: string;
  link: string;
}

interface OtherServicesSectionProps {
  brandColor?: string;
}

export default function OtherServicesSection({ brandColor = '#055353' }: OtherServicesSectionProps) {
  const services: Service[] = [
    {
      id: 1,
      name: 'Times Travel',
      description: 'Your trusted travel partner for unforgettable journeys and adventures worldwide.',
      logo: 'https://img.icons8.com/color/96/000000/airplane-take-off.png',
      link: 'https://timestravelbd.com'
    },
    {
      id: 2,
      name: 'Times Trading',
      description: 'Professional trading solutions for global commerce and business expansion.',
      logo: 'https://img.icons8.com/color/96/000000/buy.png',
      link: 'https://timestradingbd.com'
    },
    {
      id: 3,
      name: 'Times Graphics',
      description: 'Creative design and graphics solutions for your brand identity.',
      logo: 'https://img.icons8.com/color/96/000000/paint-palette.png',
      link: 'https://timesgraphicsbd.com'
    },
    {
      id: 4,
      name: 'Times Courses',
      description: 'Quality education and professional training programs for skill development.',
      logo: 'https://img.icons8.com/color/96/000000/book.png',
      link: 'https://timescoursesbd.com'
    },
    {
      id: 5,
      name: 'Times IT Services',
      description: 'Comprehensive IT solutions and technical support for businesses.',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9IiNGMkY4RkEiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI1NiIgaGVpZ2h0PSI0MCIgcng9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA1NTM1MyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTM4IDMybDEwIDEwbTAgMGwxMC0xMCIgc3Ryb2tlPSIjMDU1MzUzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxyZWN0IHg9IjIwIiB5PSI2MCIgd2lkdGg9IjU2IiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzA1NTM1MyIgb3BhY2l0eT0iMC4yIi8+PHJlY3QgeD0iMjgiIHk9IjY2IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBmaWxsPSIjMDU1MzUzIiBvcGFjaXR5PSIwLjYiIHJ4PSIxIi8+PHJlY3QgeD0iNDIiIHk9IjY2IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBmaWxsPSIjMDU1MzUzIiBvcGFjaXR5PSIwLjYiIHJ4PSIxIi8+PHJlY3QgeD0iNTYiIHk9IjY2IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBmaWxsPSIjMDU1MzUzIiBvcGFjaXR5PSIwLjYiIHJ4PSIxIi8+PC9zdmc+',
      link: 'https://timesitbd.com'
    },
    {
      id: 6,
      name: 'Sayem Trust',
      description: 'Building trust through reliable and ethical business practices.',
      logo: 'https://img.icons8.com/color/96/000000/handshake.png',
      link: 'https://sayemtrustbd.com'
    },
    {
      id: 7,
      name: 'Sayem Group',
      description: 'Diversified business group offering multiple services and solutions.',
      logo: 'https://img.icons8.com/color/96/000000/organization.png',
      link: 'https://sayemgroupbd.com'
    },
    {
      id: 8,
      name: 'Sayem Tech',
      description: 'Advanced technology solutions and digital transformation services.',
      logo: 'https://img.icons8.com/color/96/000000/settings.png',
      link: 'https://sayemtechbd.com'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/images/logos/sayemgroup.png" 
              alt="Sayem Group Logo" 
              className="h-24 w-24 object-contain"
            />
          </div>
          
          {/* Text Content */}
         <div className="flex flex-col space-y-3 text-center md:text-left">
  <h2 className="text-5xl font-bold text-[#055353]  rounded-lg">
    Sayem Group
  </h2>

  <p className="text-xl text-center font-medium text-white bg-[#055353]  rounded-lg">
    Our System Consultants
  </p>
</div>


        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full cursor-pointer no-underline"
            >
              {/* Logo Container */}
              <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                {service.logo ? (
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <Globe size={48} style={{ color: brandColor }} className="opacity-30" />
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>

                {/* Link Button */}
                <div className="mt-auto">
                  <div
                    className="block w-full text-center text-white font-semibold py-2 px-4 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: brandColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>Learn More</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Want to partner with us or learn more about our services?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: brandColor }}
          >
            Get In Touch
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
