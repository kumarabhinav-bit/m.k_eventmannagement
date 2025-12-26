import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle, center = true, light = false }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <span className="block text-gold-500 font-semibold uppercase tracking-wider text-sm mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className={`h-1 w-20 bg-gold-500 mt-4 rounded ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;