"use client";

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShowInput from '../components/ShowInput'; 
import { Card, Button } from "flowbite-react";
import { LuPlane } from "react-icons/lu";
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default function Result() {
    const navigate = useNavigate();
    const data = useLocation().state?.data;
	const [animationClass, setAnimationClass] = useState("animate__flipInY");
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const formatDate = (isoDate) => {
		const date = parseISO(isoDate);
		return format(date, 'dd MMMM yyyy', { locale: enUS });
	};

	const handleBackButton = () => {
		setAnimationClass("animate__flipOutY");
		const timeout = setTimeout(() => {
			navigate('/', { state: { back: true } });
		}, 1000);
		return () => clearTimeout(timeout);
	};

	return (
		<div className='h-screen flex justify-center items-center'>
            <Card className={`max-w-slg mx-auto animate__animated ${animationClass}`} horizontal>
				<div className='grid grid-flow-col gap-2 justify-between items-center'>
					<div className='text-start'>
						<h1 className="text-2xl font-bold text-cyan-600">Your Flight Ticket</h1>
						<p className="text-cyan-600">Enjoy and happy advanture</p>
					</div>
					<div className='h-12 w-12'>
						<LuPlane className="h-full w-full text-cyan-600" />
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className={`grid grid-rows-2 ${isMobile ? '' : 'grid-flow-col'} gap-4`}>
						<div className="grid grid-cols-3 gap-4">
							<ShowInput id="fullName" label="Full Name" data={data.fullName}></ShowInput>
							<ShowInput id="phoneNumber" label="Phone Number" data={data.phoneNumber}></ShowInput>
							<ShowInput id="email" label="Email" data={data.email}></ShowInput>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="grid grid-rows-2 grid-flow-col gap-2">
								<ShowInput id="departure" label="Departure" data={data.departure}></ShowInput>
								<ShowInput id="arrival" label="Arrival" data={data.arrival}></ShowInput>
							</div>
							<div className='max-w-md'>
								<ShowInput id="passengers" label="Passengers" data={data.passengers+" person/s"}></ShowInput>
							</div>
								<ShowInput id="date" label="Date" data={formatDate(data.date)}></ShowInput>
						</div>
					</div>
				</div>
				<Button onClick={handleBackButton}>Back</Button>
			</Card>
		</div>
	);
}