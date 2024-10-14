'use client';
import React, { useState } from 'react';

type MedicineCategoriesProps = {};

type IMedicineCategory = {
  id: number;
  value: string;
  label: string;
};
const MedicineCategories: React.FC<MedicineCategoriesProps> = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const data = [
    {
      id: 1,
      value: 'recommended',
      label: 'Recommended For You',
    },
    {
      id: 2,
      value: 'cardiac',
      label: 'Cardiac',
    },
    {
      id: 3,
      value: 'orthopaedic',
      label: 'Orthopaedic',
    },
    {
      id: 4,
      value: 'diabetic',
      label: 'Diabetic',
    },
    {
      id: 5,
      value: 'cardiac',
      label: 'Cardiac',
    },
    {
      id: 6,
      value: 'orthopaedic',
      label: 'Orthopaedic',
    },
    {
      id: 7,
      value: 'diabetic',
      label: 'Diabetic',
    },
  ];

  return (
    <div className="w-[90vw] flex flex-wrap gap-3 mt-2">
      {data.slice(0, showMore ? data.length : 3).map((category) => (
        <div
          key={category.id}
          className="rounded-full bg-slate-800 py-0.5 px-2.5 border border-transparent text-base text-white font-poppins transition-all shadow-sm"
        >
          {category.label}
        </div>
      ))}
      <p
        onClick={() => {
          setShowMore((prev) => !prev);
        }}
      >
        {' '}
        Show {showMore ? 'less' : 'more'}
      </p>
    </div>
  );
};
export default MedicineCategories;