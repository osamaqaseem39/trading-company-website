import React from 'react';
import ContactSection from '../../components/ContactSection';
import WhoWeAre from '../../components/WhoWeAre';
import WhyChooseUs from '../../components/WhyChooseUs';

const missionVisionGoal = [
  {
    title: 'Our Mission',
    desc: 'To deliver the world’s finest food and beverage products to our partners, ensuring quality, reliability, and value in every transaction.',
    image: '/images/mission.jpg',
    imageAlt: 'Mission',
  },
  {
    title: 'Our Vision',
    desc: 'To be the most trusted and innovative food and beverage trading company, connecting businesses globally and setting new standards in service and excellence.',
    image: '/images/vision.jpg',
    imageAlt: 'Vision',
  },
  {
    title: 'Our Goal',
    desc: 'To build lasting partnerships, expand our global reach, and continuously improve our offerings to meet the evolving needs of our clients.',
    image: '/images/goal.jpg',
    imageAlt: 'Goal',
  }
];

const CompanyProfilePage = () => (
  <main className="">
    {/* Mission, Vision, Goal Cards - Category style */}
    <section className="mb-16 max-w-7xl mx-auto py-12 ">
      <div className="text-center mb-12">
        <h1  className="font-bold text-center mb-4" style={{ fontSize: '60px', color: '#001a33' }}>Our Company</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-[#001a33]">
    
          In pursuit of perfection and cohesion in green is always our spiritual motto.
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {missionVisionGoal.map((item, idx) => (
          <div
            key={item.title}
            className={
              'flex flex-col md:flex-row items-center rounded-3xl shadow-lg overflow-hidden ' +
              (idx === 1 ? 'bg-[#001a33] text-white' : 'bg-[#ededed] text-[#001a33]')
            }
          >
            {/* Image left or right */}
            {((idx % 2 === 0) ? (
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full md:w-1/2 h-64 md:h-[340px] object-cover"
                style={{ objectPosition: 'center' }}
              />
            ) : null)}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
              <h2 className={`text-3xl font-bold mb-4 ${idx === 1 ? 'text-white' : 'text-[#001a33]'}`}>{item.title}</h2>
              <p className={`text-lg ${idx === 1 ? 'text-white/90' : 'text-[#001a33]'}`}>{item.desc}</p>
            </div>
            {((idx % 2 === 1) ? (
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full md:w-1/2 h-64 md:h-[340px] object-cover"
                style={{ objectPosition: 'center' }}
              />
            ) : null)}
          </div>
        ))}
      </div>
    </section>
    <WhoWeAre />
    <WhyChooseUs />
    <ContactSection />
  </main>
);

export default CompanyProfilePage; 