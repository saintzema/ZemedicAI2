import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Emily Chen',
      role: 'Founder & CEO',
      bio: 'Former radiologist with 15+ years of experience. Passionate about using AI to improve diagnostic accuracy and patient outcomes.',
      image: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Chief Medical Officer',
      bio: 'Board-certified radiologist specializing in neuroimaging. Oversees clinical validation of all AI models.',
      image: 'https://randomuser.me/api/portraits/men/36.jpg'
    },
    {
      name: 'Sarah Wong',
      role: 'CTO',
      bio: 'AI researcher with Ph.D. from MIT. Previously led machine learning teams at Google Health and Stanford Medical AI Lab.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'David Park',
      role: 'VP of Engineering',
      bio: 'Software engineer with extensive experience in healthcare IT. Specialized in building secure, HIPAA-compliant systems.',
      image: 'https://randomuser.me/api/portraits/men/27.jpg'
    },
    {
      name: 'Dr. Aisha Johnson',
      role: 'Director of Research',
      bio: 'Leads our research partnerships with academic medical centers. Expert in translating clinical needs into technical solutions.',
      image: 'https://randomuser.me/api/portraits/women/59.jpg'
    },
    {
      name: 'Robert Zhang',
      role: 'Head of Product',
      bio: 'Product leader with experience from medical device companies and health tech startups. Focused on creating intuitive workflows.',
      image: 'https://randomuser.me/api/portraits/men/64.jpg'
    }
  ];
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg className="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-center">
              About ZemedicAI
            </h1>
            <div className="mt-6 max-w-3xl mx-auto text-xl text-gray-500 text-center">
              <p>
                Revolutionizing medical diagnostics through artificial intelligence for faster, more accurate analyses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                At ZemedicAI, we're on a mission to transform healthcare through AI-powered medical imaging analysis. We believe that by combining the expertise of medical professionals with the latest advancements in artificial intelligence, we can improve diagnostic accuracy, reduce healthcare costs, and ultimately save lives.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Our platform is designed to augment the capabilities of healthcare providers, not replace them. By handling routine analyses and flagging potential concerns, ZemedicAI allows medical professionals to focus their expertise where it matters most - caring for patients.
              </p>
              <div className="mt-8 flex">
                <div className="rounded-md shadow">
                  <a
                    href="#team"
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Meet Our Team
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-blue-50 rounded-lg overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Doctor using tablet"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-lg text-gray-500 mb-6">
              ZemedicAI began in 2018 when Dr. Emily Chen, a radiologist with 15 years of experience, became frustrated with the limitations of traditional diagnostic methods. She saw that radiologists were overworked, diagnoses were sometimes delayed, and subtle findings were occasionally missed.
            </p>
            <p className="text-lg text-gray-500 mb-6">
              Dr. Chen teamed up with Sarah Wong, an AI researcher from MIT, to explore how artificial intelligence could improve medical imaging analysis. They started with a simple algorithm designed to detect lung nodules in chest X-rays, achieving remarkable accuracy that surpassed many human radiologists.
            </p>
            <p className="text-lg text-gray-500 mb-6">
              Encouraged by these results, they founded ZemedicAI with a vision to create a comprehensive platform that could analyze various types of medical images. After securing initial funding, they assembled a team of medical professionals, AI researchers, and software engineers.
            </p>
            <p className="text-lg text-gray-500">
              Today, ZemedicAI's technology is used in hundreds of hospitals and clinics worldwide, helping healthcare providers make faster, more accurate diagnoses and improving patient outcomes. Our team continues to push the boundaries of what's possible at the intersection of artificial intelligence and healthcare.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              A diverse group of experts passionate about improving healthcare through technology.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-16 w-16 rounded-full" src={member.image} alt={member.name} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-500">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-blue-700 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-200 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              What We Stand For
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-700">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-white">Patient-Centered Innovation</h3>
                  <p className="mt-2 text-base text-blue-100">
                    We put patients first in everything we do. Our technologies are designed to improve patient outcomes and experiences.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-700">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-white">Rigorous Scientific Integrity</h3>
                  <p className="mt-2 text-base text-blue-100">
                    We are committed to the highest scientific standards. All our algorithms undergo extensive validation and peer review.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-700">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-white">Collaborative Approach</h3>
                  <p className="mt-2 text-base text-blue-100">
                    We believe in the power of collaboration between clinicians and technology. Our solutions are designed to enhance, not replace, human expertise.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-700">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-white">Privacy & Security</h3>
                  <p className="mt-2 text-base text-blue-100">
                    We maintain the highest standards of data privacy and security, ensuring that patient information is always protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Interested in joining our team?</span>
            <span className="block text-blue-600">Check out our open positions.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Careers
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;