'use client';
import Timeline from '@/components/Timeline';
import { IAppointmentDetails } from '@/interfaces/IAppointment';
import { getAppointment } from '@/services/getAppointment';
import { Box, Flex } from '@radix-ui/themes';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Check, Clock, X, AlertCircle } from 'lucide-react';
import { IGetStatusInfo } from '@/app/issue/past-issue/appointment/[apptId]/(components)/ApppointmentDetails';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { popNotification } from '@/services/getNotifications';

type DetailsProps = object;

type Status =
  | 'Pending'
  | 'Fixed Provider and Time'
  | 'Service Provider Reached'
  | 'Patient Served'
  | 'Provider Declined'
  | 'Client Declined';

const mainStatuses = [
  'Pending',
  'Fixed Provider and Time',
  'Service Provider Reached',
];

const finalStatuses = [
  'Patient Served',
  'Provider Declined',
  'Client Declined',
];

const AppointmentDetails: React.FC<DetailsProps> = () => {
  const { apptId } = useParams();
  const searchParams = useSearchParams();
  const [appointment, setAppointment] = useState<IAppointmentDetails>();
  const router = useRouter();

  const notification_body = searchParams.get('notification_body');

  useEffect(() => {
    getAppointment(apptId as string)
      .then((res) => res.json())
      .then((res) => {
        setAppointment(res);
      });
  }, []);

  useEffect(() => {
    if (notification_body) {
      popNotification(notification_body as string)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  }, [notification_body]);

  const getStatusInfo = (status: Status) => {
    switch (status) {
      case 'Pending':
        return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' };
      case 'Fixed Provider and Time':
        return { icon: Check, color: 'text-blue-500', bg: 'bg-blue-100' };
      case 'Service Provider Reached':
        return { icon: Check, color: 'text-blue-500', bg: 'bg-blue-100' };
      case 'Patient Served':
        return { icon: Check, color: 'text-green-500', bg: 'bg-green-100' };
      case 'Provider Declined':
        return { icon: X, color: 'text-red-500', bg: 'bg-red-100' };
      case 'Client Declined':
        return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' };
    }
  };

  function handleOrderMore() {
    router.push('/');
  }

  return (
    <>
      <Flex className="lg:flex-row flex-col lg:items-start">
        <Flex
          align={'center'}
          direction={'column'}
          justify={'between'}
          className="mt-[5vh] p-2 rounded-md shadow-md  mb-[5vh] border-[#283891] border-solid border-2 w-[90vw] lg:w-[30vw]"
        >
          <Flex className="items-center w-full">
            <div className="ml-2">
              <p className="font-poppins font-bold text-2xl">
                {appointment?.issue_id.service_id.name}
              </p>
              <p className="font-poppins mt-2">
                <span className="text-gray-700 font-bold">
                  Appointment Date
                </span>{' '}
                {appointment?.time_frame &&
                  new Date(
                    appointment?.time_frame.start_time as string,
                  ).toLocaleDateString()}
                <br />
                <span className="text-gray-700 font-bold">Timeframe</span>{' '}
                {appointment?.time_frame &&
                  format(
                    new Date(appointment?.time_frame.start_time as string),
                    'hh:mm a',
                  )}{' '}
                -{' '}
                {appointment?.time_frame &&
                  format(
                    new Date(appointment?.time_frame.end_time as string),
                    'hh:mm a',
                  )}
              </p>
            </div>
          </Flex>
          <Flex
            align={'start'}
            className="p-2 ml-4 font-poppins font-bold w-[90vw] lg:w-[30vw]"
          >
            {appointment?.issue_id?.assets &&
            appointment?.issue_id?.assets.length > 0
              ? 'Investigation documents'
              : ''}
          </Flex>
          <Flex align={'start'} className="p-2 ml-2 w-[90vw] lg:w-[30vw]">
            {appointment?.issue_id.assets.map((asset) => (
              <Image
                key={asset}
                src={asset}
                height={50}
                width={50}
                alt="service-asset"
                className="m-2"
              />
            ))}
          </Flex>
        </Flex>
        <Timeline
          currentStatus={appointment?.status as Status}
          getStatusInfo={getStatusInfo as IGetStatusInfo}
          mainStatuses={mainStatuses}
          finalStatuses={finalStatuses}
        ></Timeline>
      </Flex>
      {appointment?.status === 'Pending' && (
        <Box className="pb-[10vh]">
          <Box
            onClick={handleOrderMore}
            className="w-[96vw] lg:w-[40vw] m-2 bg-red-900 text-white font-poppins font-bold text-xl p-3 text-center rounded-md cursor-pointer"
          >
            Cancel Order
          </Box>
        </Box>
      )}
    </>
  );
};
export default AppointmentDetails;
