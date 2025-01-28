import React from 'react';
import Image from 'next/image';
// import { IMedicine } from '@/interfaces/IMedicine';
import { Box, Flex } from '@radix-ui/themes';
import SimilarItems from '@/components/SimilarItems';
import { config } from '@/config';

// type pageProps = object;
// const dataTable: IMedicine[] = [
//   {
//     id: '1',
//     generic: { name: 'Paracetamol' },
//     dosage: '20mg tablet',
//     image:
//       'https://res.cloudinary.com/dsuiwxwkg/image/upload/v1727873184/medicine_883407_jolgrg.png',
//     price: 40,
//     brand: 'Square',
//     name: 'Napa',
//     description:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
//     discountedPrice: 0,
//     type: 'medicine',
//   },
// ];

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // const pathname = usePathname();

  const slug = (await params).id;
  const res = await fetch(`${config.backendURL}/api/service/single/${slug}`);
  const data = await res.json();

  return (
    <div className="w-full h-fit overflow-y-scroll no-scrollbar">
      <div className="relative flex flex-col lg:flex-row w-full lg:w-[70vw] items-center justify-evenly lg:h-fit">
        <Image
          width={300}
          height={300}
          src={data.banner_image}
          alt="medicine-picture"
          className="w-full lg:w-[25vw] p-2 lg:h-auto bg-red-200 mt-10"
        />
        <Flex
          justify={'between'}
          align={'center'}
          className="absolute lg:relative bottom-[-7.5vh]  bg-slate-300 w-[80vw] lg:w-[30vw] h-[15vh] rounded-full p-8 shadow-lg z-10 lg:z-0"
        >
          <Flex direction={'column'}>
            <p className="font-poppins font-bold text-xl">{data.name}</p>
            <p className="font-poppins font-bold">
              {data.sub_category.name} | {data.sub_category.category_id.name}
            </p>
            <p className="font-poppins">{data.brand?.toUpperCase()}</p>
          </Flex>
          <Flex direction={'column'} align={'center'} className="">
            <p
              className={`${data.discountedPrice ? 'line-through text-xl' : 'text-2xl'} font-poppins font-bold`}
            >
              Tk. {data?.price}
            </p>

            <p className="text-2xl font-poppins">
              {' '}
              {(data.discountedPrice as number) > 0 &&
                `Tk. ${data?.discountedPrice}`}
            </p>
          </Flex>
        </Flex>
      </div>
      <Box className="pt-[10vh] pl-[5vw] pr-[5vw] bg-white h-[60vh] w-full">
        <p className="text-black font-bold font-poppins text-xl mt-6">
          Dosage{' '}
        </p>
        <p className="text-black font-poppins mt-3">{data?.dosage}</p>
        <p className="text-black font-bold font-poppins text-xl mt-6">
          Description
        </p>
        <p className="text-black font-poppins mt-3">{data?.description}</p>
      </Box>
      <div className="lg:w-[70vw]">
        <SimilarItems serviceSlug="online-consultation"></SimilarItems>
      </div>
    </div>
  );
};
export default Page;