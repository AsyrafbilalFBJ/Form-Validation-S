"use client";

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Card, TextInput, Label, Button } from "flowbite-react";
import Input from '../components/Input'; 
import Dropdown from '../components/Dropdown';
import Datepicker from '../components/Datepicker';
import Modal from '../components/Modal';

import { LuPlaneLanding, LuPlaneTakeoff, LuUsers2, LuUser2, LuMail, LuPhone, LuMinus, LuPlus,LuPlane, LuAlertCircle } from "react-icons/lu";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
	const [provinces, setProvinces] = useState([]);
	const [selectedValue1, setSelectedValue1] = useState("");
	const [selectedValue2, setSelectedValue2] = useState("");
	const [passengers, setPassengers] = useState(1);
	const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
	const [date, setDate] = useState(new Date);
	const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [animationClass, setAnimationClass] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
    const loc = useLocation().state?.back;

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const response = await fetch("https://alamat.thecloudalert.com/api/provinsi/get");
				const data = await response.json();

				if (data.status === 200 && data.result) {
					setProvinces(data.result);
				}
			} catch (error) {
				setProvinces([{ id: "error", text: "Error fetching provinces" }]);
			}
		};
	
		fetchProvinces();
	}, []);

	const handleDecrease = () => {
	  if (passengers > 1) {
		setPassengers(passengers - 1);
	  }
	};
  
	const handleIncrease = () => {
	  if (passengers < 4) {
		setPassengers(passengers + 1);
	  }
	};

	const handleFullNameChange = (e) => {
		setFullName(e.target.value);
	};

	const handlePhoneNumberChange = (event) => {
		setPhoneNumber(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};
	
	const handleDateChange = (date) => {
		setDate(date);
	  };

	const handleFormSubmit = async (event) => {
        event.preventDefault();

		setIsSubmitting(true);

		const requestData = {
			fullName,
			phoneNumber,
			email,
			departure: selectedValue1,
			arrival: selectedValue2,
			passengers,
			date: date.toISOString()
		};
	
		try {
			const response = await fetch('http://localhost:3000', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestData)
			});
	
			const result = await response.json();
			
			if (result.status === 201 && result.data) {
				setAnimationClass("animate__flipOutY");
				const timeout = setTimeout(() => {
					navigate('/result', { state: { data: result.data } });
					setErrors({});
				}, 1000);
			
				return () => clearTimeout(timeout);
			} else {
				if (result.errors) {
					const fieldErrors = {};
					result.errors.forEach(error => {
						fieldErrors[error.path] = error.msg;
					});
					setErrors(fieldErrors);
				}
			}
		} catch (error) {
            setErrors({ msg: 'Failed to connect to the server.' });
			setShowModal(true);
		} finally {
			setIsSubmitting(false);
		}
    };

	return (
		<div className='h-screen flex justify-center items-center'>
            <Card className={`max-w-slg w-full mx-auto animate__animated ${animationClass} ${loc && ('animate__flipInY')}`} horizontal>
				<div className='grid grid-flow-col gap-2 justify-between items-center'>
					<div className='text-start'>
						<h1 className="text-2xl font-bold text-cyan-600">Book Your Flight</h1>
						<p className="text-cyan-600">Embark on your next adventure</p>
					</div>
					<div className='h-12 w-12'>
						<LuPlane className="h-full w-full text-cyan-600" />
					</div>
				</div>
				<form className="grid grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
					<div className={`grid grid-rows-2 ${isMobile ? '' : 'grid-flow-col'} gap-4`}>
						<div className="grid grid-cols-3 gap-4">
							<Input 
								id="fullName" 
								label="Full Name" 
								type="text" 
								value={fullName} 
								onChange={handleFullNameChange} 
								icon={LuUser2} 
								placeholder="John Doe" 
								errorMessage={errors.fullName}
								readOnly={isSubmitting}>
							</Input>
							<Input 
								id="phoneNumber" 
								label="Phone Number" 
								type="text" 
								value={phoneNumber} 
								onChange={handlePhoneNumberChange} 
								icon={LuPhone} 
								placeholder="628XXXXXXXXXX" 
								errorMessage={errors.phoneNumber}
								readOnly={isSubmitting}>
							</Input>
							<Input 
								id="email" 
								label="Email" 
								type="text" 
								value={email} 
								onChange={handleEmailChange} 
								icon={LuMail} 
								placeholder="name@email.com" 
								errorMessage={errors.email}
								readOnly={isSubmitting}>
							</Input>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="grid grid-rows-2 grid-flow-col gap-2">
								<Dropdown
									id="departure"
									label="Departure"
									icon={LuPlaneTakeoff}
									selectedValue={selectedValue1}
									setSelectedValue={setSelectedValue1}
									options={provinces}
									excludeValue={selectedValue2}
									errorMessage={errors.departure}
								/>
								<Dropdown
									id="arrival" 
									label="Arrival"
									icon={LuPlaneLanding}
									selectedValue={selectedValue2}
									setSelectedValue={setSelectedValue2}
									options={provinces}
									excludeValue={selectedValue1}
									errorMessage={errors.arrival}
								/>
							</div>
							<div className='max-w-md'>
								<div className="mb-2 block text-left">
									<Label htmlFor="passengers" value="Passengers" className="text-cyan-600" />
								</div>
								<div className="grid grid-flow-col gap-2 mb-5">
									<Button 
										outline 
										id='decrease' 
										type='button' 
										onClick={handleDecrease} 
										disabled={isSubmitting}>
										<LuMinus className="self-center"/>
									</Button>
									<TextInput 
										id='passengers' 
										type="number" 
										icon={LuUsers2} 
										value={passengers} 
										readOnly 
										className='text-center'/>
									<Button 
										outline 
										id='increase' 
										type='button' 
										onClick={handleIncrease} 
										disabled={isSubmitting}>
										<LuPlus className="self-center" />
									</Button>
								</div>
							</div>
							<Datepicker onSelectedDateChanged={handleDateChange}></Datepicker>
						</div>
					</div>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <AiOutlineLoading className="h-5 w-5 animate-spin" /> : "Submit"}
					</Button>
				</form>
			</Card>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				errorMessage={errors.msg}
				Icon={LuAlertCircle}
			/>
		</div>
	);
}
