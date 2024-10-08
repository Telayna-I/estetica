"use client";
import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

interface Props {
	className?: string;
}

const DateTimeDisplay = ({ className }: Props) => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("es-AR", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("es-AR", {
			hour: "2-digit",
			minute: "2-digit",
			hourCycle: "h23",
		});
	};

	return (
		<div className={`flex items-center justify-center bg-gray-100 ${className}`}>
			<div className='bg-white p-4 rounded-lg shadow-sm'>
				<div className='flex items-center'>
					<FiClock className='text-2xl text-gray-600 mr-2' />
					<p
						className='text-xl font-light text-gray-800 mr-2'
						aria-label={`Hora actual: ${formatTime(currentDateTime)}`}>
						{formatTime(currentDateTime)}
					</p>
					<p
						className='text-sm text-gray-600'
						aria-label={`Fecha actual: ${formatDate(currentDateTime)}`}>
						{formatDate(currentDateTime)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DateTimeDisplay;
