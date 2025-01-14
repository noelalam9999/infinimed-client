'use client';
import { useAppSelector } from '@/lib/hooks';
import { Box, Flex } from '@radix-ui/themes';
import React, { ReactNode } from 'react';

type SelectAreaOrderProps = {
  children?: ReactNode;
};

// const data: IArea[] = [
//   {
//     _id: 1,
//     label: 'Dhanmondi',
//     details: 'H57/1, R12/A, Dhanmondi',
//   },
//   {
//     id: 2,
//     label: 'Beribadh',
//     details: 'H57/1, R12/A, Beribadh',
//   },
// ];

const SelectAreaOrder: React.FC<SelectAreaOrderProps> = () => {
  const selected = 1;
  const area = useAppSelector((state) => state.area);
  console.log(area);

  return (
    <div className="mt-4 font-poppins">
      <p className="text-xl mb-5 font-bold">Select Area</p>
      <Box className="w-full">
        {/* {data.map((item) => (
          <Flex
            justify={'center'}
            width={'full'}
            direction={'column'}
            align={'start'}
            className={`${item.id === selected ? 'border-[#283b77]' : 'border-gray-400'}  border-2 p-2 rounded-md mb-2 shadow-md`}
            key={item.id}
          >
            <p className="">{item.label}</p>
            <p className="">{item.details}</p>
          </Flex>
        ))} */}

        <Flex
          justify={'center'}
          width={'full'}
          direction={'column'}
          align={'start'}
          className={`${1 === selected ? 'border-[#283b77]' : 'border-gray-400'}  border-2 p-2 rounded-md mb-2 shadow-md`}
          key={area._id}
        >
          <p className="">{area.area}</p>
          <p className="">{area.detail}</p>
        </Flex>
      </Box>
    </div>
  );
};
export default SelectAreaOrder;
